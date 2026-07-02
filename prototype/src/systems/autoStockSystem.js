import { DISPLAY_ZONES } from '../data/constants.js';
import { plantById } from '../data/plants.js';
import { applyPriceBand } from './pricingSystem.js';
import { canLoadBatchToVan, getBatchVanLoad } from './stockSystem.js';

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

function variedOldestSort(a, b) {
  return batchAge(a) - batchAge(b) || plantKey(a).localeCompare(plantKey(b)) || potentialValue(b) - potentialValue(a);
}

function variedNewestSort(a, b) {
  return batchAge(b) - batchAge(a) || plantKey(a).localeCompare(plantKey(b)) || displayValue(b) - displayValue(a);
}

function pickVariedBatches(candidates, maxCount, sortFunction) {
  const sorted = [...candidates].sort(sortFunction);
  const selected = [];
  const selectedIds = new Set();
  const plantCounts = new Map();

  while (selected.length < maxCount) {
    const next = sorted.find((batch) => {
      if (selectedIds.has(batch.id)) return false;
      const count = plantCounts.get(plantKey(batch)) ?? 0;
      return count === 0;
    }) ?? sorted.find((batch) => !selectedIds.has(batch.id));

    if (!next) break;
    selected.push(next);
    selectedIds.add(next.id);
    plantCounts.set(plantKey(next), (plantCounts.get(plantKey(next)) ?? 0) + 1);
  }

  return selected;
}

export function autoloadVan(stockBatches) {
  const candidates = stockBatches.filter((batch) => batch.location === 'home' && batch.quantity > 0);
  const selected = [];
  let working = stockBatches;

  for (const batch of pickVariedBatches(candidates, candidates.length, variedOldestSort)) {
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
  const selected = pickVariedBatches(candidates, displayCapacity, variedNewestSort);
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
