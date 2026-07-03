import { DISPLAY_ZONES } from '../data/constants.js';
import { plantById } from '../data/plants.js';
import { applyPriceBand } from './pricingSystem.js';
import { canLoadBatchToVan } from './stockSystem.js';

function batchAge(batch) {
  return batch.dayCollected ?? batch.dayCreated ?? batch.dayArrived ?? batch.createdDay ?? 0;
}

function plantKey(batch) {
  return batch.plantId ?? batch.plantName;
}

function plantTags(batch) {
  return plantById[batch.plantId]?.tags ?? [];
}

function potentialValue(batch) {
  return Number(batch.baseRetailPrice ?? batch.unitRetailPrice ?? plantById[batch.plantId]?.basePrices?.normal ?? 0) * Number(batch.quantity ?? 0);
}

function displayValue(batch) {
  const tags = plantTags(batch);
  let score = potentialValue(batch);
  if (batch.loadType === 'feature-pots') score += 20;
  if (tags.includes('giftable')) score += 12;
  if (tags.includes('flowering') || tags.includes('colourful') || tags.includes('cheerful')) score += 8;
  if (tags.includes('edible') || tags.includes('grow-your-own') || tags.includes('useful')) score += 4;
  if (tags.includes('low-price')) score -= 3;
  return score;
}

function oldestFirst(a, b) {
  return batchAge(a) - batchAge(b) || potentialValue(b) - potentialValue(a) || a.id.localeCompare(b.id);
}

function newestFirst(a, b) {
  return batchAge(b) - batchAge(a) || displayValue(b) - displayValue(a) || a.id.localeCompare(b.id);
}

function groupByPlant(candidates, sortFunction) {
  const groups = new Map();
  candidates.forEach((batch) => {
    const key = plantKey(batch);
    groups.set(key, [...(groups.get(key) ?? []), batch]);
  });

  return [...groups.entries()]
    .map(([key, batches]) => ({
      key,
      batches: [...batches].sort(sortFunction),
      firstAge: Math.min(...batches.map(batchAge)),
      newestAge: Math.max(...batches.map(batchAge)),
      topValue: Math.max(...batches.map(displayValue))
    }))
    .sort((a, b) => a.firstAge - b.firstAge || b.topValue - a.topValue || a.key.localeCompare(b.key));
}

function pickVariedBatches(candidates, maxCount, sortFunction, options = {}) {
  const groups = groupByPlant(candidates, sortFunction);
  const selected = [];
  let depth = 0;

  while (selected.length < maxCount) {
    let pickedThisPass = 0;
    const orderedGroups = [...groups].sort((a, b) => {
      const aBatch = a.batches[depth];
      const bBatch = b.batches[depth];
      if (!aBatch && !bBatch) return 0;
      if (!aBatch) return 1;
      if (!bBatch) return -1;
      return sortFunction(aBatch, bBatch);
    });

    for (const group of orderedGroups) {
      const next = group.batches[depth];
      if (!next) continue;
      selected.push(next);
      pickedThisPass += 1;
      if (selected.length >= maxCount) break;
    }

    if (pickedThisPass === 0) break;
    depth += 1;

    if (options.oneFullVarietyPassOnly && depth > 0) break;
  }

  return selected;
}

export function autoloadVan(stockBatches) {
  const candidates = stockBatches.filter((batch) => batch.location === 'home' && batch.quantity > 0);
  const selected = [];
  let working = stockBatches;

  for (const batch of pickVariedBatches(candidates, candidates.length, oldestFirst)) {
    if (!canLoadBatchToVan(working, batch.id)) continue;
    selected.push(batch.id);
    working = working.map((item) => item.id === batch.id ? { ...item, location: 'van', zoneId: null } : item);
  }

  const loadedNames = selected.map((id) => stockBatches.find((batch) => batch.id === id)?.plantName).filter(Boolean);
  return {
    stockBatches: working,
    loadedCount: selected.length,
    loadedNames
  };
}

function chooseZone(batch, zoneUse) {
  const tags = plantTags(batch);
  const zoneById = Object.fromEntries(DISPLAY_ZONES.map((zone) => [zone.id, zone]));
  const room = (zoneId) => (zoneUse[zoneId] ?? 0) < (zoneById[zoneId]?.capacity ?? 0);

  if ((batch.loadType === 'feature-pots' || tags.includes('giftable') || tags.includes('flowering')) && room('feature-spot')) return 'feature-spot';
  if ((tags.includes('colourful') || tags.includes('cheerful') || tags.includes('giftable')) && room('front-table')) return 'front-table';
  if ((tags.includes('edible') || tags.includes('grow-your-own') || tags.includes('useful') || batch.loadType === 'sundry') && room('floor-crates')) return 'floor-crates';
  if (room('front-table')) return 'front-table';
  if (room('floor-crates')) return 'floor-crates';
  if (room('feature-spot')) return 'feature-spot';
  return null;
}

export function autodisplayStock(stockBatches) {
  const candidates = stockBatches.filter((batch) => batch.location === 'van' && batch.quantity > 0);
  const displayCapacity = DISPLAY_ZONES.filter((zone) => zone.id !== 'reduced-area').reduce((sum, zone) => sum + zone.capacity, 0);
  const selected = pickVariedBatches(candidates, displayCapacity, newestFirst);
  const selectedIds = new Set(selected.map((batch) => batch.id));
  const zoneUse = Object.fromEntries(DISPLAY_ZONES.map((zone) => [zone.id, stockBatches.filter((batch) => (batch.zoneId ?? (batch.location === 'reduced-area' ? 'reduced-area' : null)) === zone.id && ['display', 'reduced-area'].includes(batch.location) && batch.quantity > 0).length]));
  const placements = [];

  const nextStock = stockBatches.map((batch) => {
    if (!selectedIds.has(batch.id)) return batch;
    const zoneId = chooseZone(batch, zoneUse);
    if (!zoneId) return batch;
    zoneUse[zoneId] = (zoneUse[zoneId] ?? 0) + 1;
    placements.push({ batchId: batch.id, plantName: batch.plantName, zoneId });
    const shouldPremium = zoneId === 'feature-spot' || (zoneId === 'front-table' && displayValue(batch) >= 25);
    const pricedBatch = shouldPremium ? applyPriceBand(batch, 'premium') : batch;
    return {
      ...pricedBatch,
      location: 'display',
      zoneId,
      reduced: false
    };
  });

  return {
    stockBatches: nextStock,
    placedCount: placements.length,
    placements
  };
}
