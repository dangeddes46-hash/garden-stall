import { DISPLAY_ZONES } from '../data/constants.js';
import { plantById } from '../data/plants.js';

export function getDisplayedStock(stockBatches) {
  return stockBatches.filter((batch) => ['display', 'reduced-area'].includes(batch.location) && batch.quantity > 0);
}

export function getDisplayZoneSummary(stockBatches) {
  const displayed = getDisplayedStock(stockBatches);
  const zoneCapacity = DISPLAY_ZONES.reduce((sum, zone) => sum + zone.capacity, 0);
  const usedSlots = displayed.length;
  const tiredCount = displayed.filter((batch) => ['tired', 'past-peak'].includes(batch.condition)).length;
  const reducedCount = displayed.filter((batch) => batch.location === 'reduced-area' || batch.reduced).length;
  const giftableCount = displayed.filter((batch) => plantById[batch.plantId]?.tags.includes('giftable')).length;
  const colourCount = displayed.filter((batch) => {
    const tags = plantById[batch.plantId]?.tags ?? [];
    return tags.includes('cheerful') || tags.includes('colourful') || tags.includes('flowering');
  }).length;

  const fullnessScore = Math.min(4, usedSlots);
  const colourScore = Math.min(2, colourCount);
  const giftScore = Math.min(1, giftableCount);
  const tiredPenalty = tiredCount * 2;
  const reducedPenalty = Math.max(0, reducedCount - 1);
  const rawScore = fullnessScore + colourScore + giftScore - tiredPenalty - reducedPenalty;
  const score = Math.max(0, Math.min(7, rawScore));

  let rating = 'poor';
  if (score >= 6) rating = 'strong';
  else if (score >= 4) rating = 'good';
  else if (score >= 2) rating = 'basic';

  const notes = [];
  if (usedSlots === 0) notes.push('Nothing is visible yet. Customers cannot buy what they cannot see.');
  if (usedSlots > 0 && usedSlots < 3) notes.push('The stall still looks a bit gappy.');
  if (colourCount > 0) notes.push('Visible colour makes the stall more inviting.');
  if (giftableCount > 0) notes.push('Giftable stock gives impulse buyers something obvious to pick up.');
  if (tiredCount > 0) notes.push('Tired stock drags down the display.');
  if (reducedCount > 1) notes.push('Too much reduced stock can make the stall feel picked over.');

  return {
    displayed,
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
  if (displaySummary.rating === 'poor') return -2;
  return 0;
}
