import { DISPLAY_ZONES } from '../data/constants.js';
import { plantById } from '../data/plants.js';

export const displayZoneById = Object.fromEntries(DISPLAY_ZONES.map((zone) => [zone.id, zone]));

export function getBatchDisplayZoneId(batch) {
  if (batch.location === 'reduced-area') return 'reduced-area';
  return batch.zoneId ?? 'front-table';
}

export function getDisplayedStock(stockBatches) {
  return stockBatches.filter((batch) => ['display', 'reduced-area'].includes(batch.location) && batch.quantity > 0);
}

export function getDisplayZoneUsage(stockBatches) {
  const displayed = getDisplayedStock(stockBatches);
  return DISPLAY_ZONES.map((zone) => {
    const batches = displayed.filter((batch) => getBatchDisplayZoneId(batch) === zone.id);
    return {
      ...zone,
      usedSlots: batches.length,
      remainingSlots: Math.max(0, zone.capacity - batches.length),
      batches
    };
  });
}

export function canPlaceBatchInDisplayZone(stockBatches, zoneId) {
  const zone = displayZoneById[zoneId];
  if (!zone) return false;
  const usage = getDisplayZoneUsage(stockBatches).find((entry) => entry.id === zoneId);
  return (usage?.usedSlots ?? 0) < zone.capacity;
}

function zoneScoreForBatch(batch) {
  const plant = plantById[batch.plantId];
  const tags = plant?.tags ?? [];
  const zoneId = getBatchDisplayZoneId(batch);
  let score = 0;

  if (zoneId === 'front-table') {
    if (tags.includes('cheerful') || tags.includes('colourful') || tags.includes('flowering') || tags.includes('giftable')) score += 2;
    if (batch.loadType === 'feature-pots') score -= 1;
    if (tags.includes('compost') || tags.includes('sundry')) score -= 1;
  }

  if (zoneId === 'floor-crates') {
    if (tags.includes('grow-your-own') || tags.includes('edible') || tags.includes('useful') || batch.loadType === 'sundry') score += 1;
    if (batch.loadType === 'feature-pots') score += 1;
    if (tags.includes('giftable')) score -= 1;
  }

  if (zoneId === 'feature-spot') {
    if (batch.loadType === 'feature-pots' || tags.includes('giftable') || tags.includes('flowering')) score += 2;
    if (tags.includes('low-price')) score -= 1;
  }

  if (zoneId === 'reduced-area') {
    if (batch.reduced || batch.priceBand === 'reduced') score += 1;
    if (tags.includes('giftable')) score -= 1;
  }

  return score;
}

export function getDisplayZoneSummary(stockBatches) {
  const displayed = getDisplayedStock(stockBatches);
  const zoneUsage = getDisplayZoneUsage(stockBatches);
  const zoneCapacity = DISPLAY_ZONES.reduce((sum, zone) => sum + zone.capacity, 0);
  const usedSlots = displayed.length;
  const tiredCount = displayed.filter((batch) => ['tired', 'past-peak'].includes(batch.condition)).length;
  const reducedCount = displayed.filter((batch) => batch.location === 'reduced-area' || batch.reduced).length;
  const giftableCount = displayed.filter((batch) => plantById[batch.plantId]?.tags.includes('giftable')).length;
  const colourCount = displayed.filter((batch) => {
    const tags = plantById[batch.plantId]?.tags ?? [];
    return tags.includes('cheerful') || tags.includes('colourful') || tags.includes('flowering');
  }).length;
  const zoneFitScore = displayed.reduce((sum, batch) => sum + zoneScoreForBatch(batch), 0);

  const fullnessScore = Math.min(4, usedSlots);
  const colourScore = Math.min(2, colourCount);
  const giftScore = Math.min(1, giftableCount);
  const tiredPenalty = tiredCount * 2;
  const reducedPenalty = Math.max(0, reducedCount - 2);
  const rawScore = fullnessScore + colourScore + giftScore + Math.min(4, zoneFitScore) - tiredPenalty - reducedPenalty;
  const score = Math.max(0, Math.min(10, rawScore));

  let rating = 'poor';
  if (score >= 8) rating = 'strong';
  else if (score >= 5) rating = 'good';
  else if (score >= 2) rating = 'basic';

  const notes = [];
  if (usedSlots === 0) notes.push('Nothing is visible yet. Customers cannot buy what they cannot see.');
  if (usedSlots > 0 && usedSlots < 3) notes.push('The stall still looks a bit gappy. Three or more visible batches usually reads better.');
  if (colourCount > 0) notes.push('Visible colour makes the stall more inviting.');
  if (giftableCount > 0) notes.push('Giftable stock gives impulse buyers something obvious to pick up.');
  if (zoneFitScore > 1) notes.push('Some stock is sitting in a helpful display zone.');
  if (zoneFitScore < 0) notes.push('Some stock may be in the wrong display zone.');
  if (tiredCount > 0) notes.push('Tired stock drags down the display. Consider reducing it or moving it away from the best spots.');
  if (reducedCount > 2) notes.push('Too much reduced stock can make the stall feel picked over.');

  return {
    displayed,
    zoneUsage,
    usedSlots,
    zoneCapacity,
    tiredCount,
    reducedCount,
    score,
    rating,
    notes
  };
}

export function getDisplaySaleModifier(displaySummary) {
  if (displaySummary.rating === 'strong') return 2;
  if (displaySummary.rating === 'good') return 1;
  if (displaySummary.rating === 'poor') return -1.5;
  return 0;
}

export function getBatchZoneSaleModifier(batch, archetype) {
  const plant = plantById[batch.plantId];
  const tags = plant?.tags ?? [];
  const zoneId = getBatchDisplayZoneId(batch);

  if (zoneId === 'front-table') {
    if (tags.includes('giftable') || tags.includes('colourful') || tags.includes('cheerful')) return 1;
    if (tags.includes('compost') || batch.loadType === 'sundry') return -1;
  }

  if (zoneId === 'floor-crates') {
    if (tags.includes('grow-your-own') || tags.includes('edible') || tags.includes('useful')) return 1;
    if (archetype?.displayName?.toLowerCase().includes('gift')) return -1;
  }

  if (zoneId === 'feature-spot') {
    if (batch.loadType === 'feature-pots' || tags.includes('giftable') || tags.includes('flowering')) return 2;
    return -1;
  }

  if (zoneId === 'reduced-area') {
    return archetype?.reducedInterest === 'high' ? 1.5 : -0.5;
  }

  return 0;
}
