import { ORDER_FEE, FEE_FREE_THRESHOLD } from './constants.js';
import { plants } from './plants.js';

const day0Available = new Set([
  'plant-tomato',
  'plant-strawberry',
  'plant-busy-lizzie',
  'plant-potted-lily'
]);

const day2Additions = new Set([
  'plant-pansy',
  'plant-primrose',
  'sundry-compost',
  'sundry-terracotta-pot'
]);

const day3Specials = new Set([
  'plant-basil',
  'plant-rosemary',
  'plant-petunia',
  'plant-daffodil-pot'
]);

const baseWholesaleCosts = {
  'plant-tomato': 12,
  'plant-strawberry': 14,
  'plant-chilli': 15,
  'plant-lettuce': 8,
  'plant-basil': 12,
  'plant-mint': 11,
  'plant-parsley': 9,
  'plant-rosemary': 14,
  'plant-pansy': 9,
  'plant-viola': 9,
  'plant-primrose': 10,
  'plant-bellis': 9,
  'plant-wallflower': 10,
  'plant-marigold': 9,
  'plant-petunia': 12,
  'plant-busy-lizzie': 11,
  'plant-begonia': 13,
  'plant-lobelia': 9,
  'plant-pelargonium': 14,
  'plant-fuchsia': 14,
  'plant-potted-lily': 16,
  'plant-daffodil-pot': 9,
  'plant-hyacinth-pot': 11,
  'sundry-compost': 9,
  'sundry-terracotta-pot': 10
};

function availabilityForPlant(day, plantId) {
  if (day === 0) return day0Available.has(plantId) ? 'available' : 'sold-out';
  if (day === 1) return day0Available.has(plantId) ? 'available' : 'sold-out';
  if (day === 2) return day0Available.has(plantId) || day2Additions.has(plantId) ? 'available' : 'sold-out';
  if (day >= 3) return day0Available.has(plantId) || day2Additions.has(plantId) || day3Specials.has(plantId) ? 'available' : 'sold-out';
  return 'sold-out';
}

function listingNote(day, plant) {
  if (day === 0 && day0Available.has(plant.id)) return 'Opening order stock. Collect tomorrow morning.';
  if (day === 2 && day2Additions.has(plant.id)) return 'New line added after the first trading day.';
  if (day >= 3 && day3Specials.has(plant.id)) return 'Special offer line. Tune before serious balancing.';
  return 'Visible on the trade site, but not available yet.';
}

export function getSupplierListingsForDay(day) {
  return plants.map((plant) => {
    const specialOffer = day >= 3 && day3Specials.has(plant.id);
    const wholesaleCost = baseWholesaleCosts[plant.id] ?? Math.max(6, Math.round(plant.batchSize * plant.basePrices.normal * 0.55));

    return {
      id: `listing-day-${day}-${plant.id}`,
      dayAvailable: day,
      plantId: plant.id,
      supplierId: 'county-plant-wholesale',
      batchType: plant.trayFormat,
      quantity: plant.batchSize,
      wholesaleCost: specialOffer ? Math.max(4, wholesaleCost - 2) : wholesaleCost,
      suggestedRetail: plant.basePrices.normal,
      condition: specialOffer && plant.conditionRisk === 'high' ? 'good' : 'excellent',
      marginRating: specialOffer ? 'tempting' : 'normal',
      availability: availabilityForPlant(day, plant.id),
      tags: plant.tags,
      supplierNote: listingNote(day, plant),
      locationFitHints: plant.tags.filter((tag) => ['giftable', 'edible', 'herb', 'bedding', 'container-suitable', 'compact'].includes(tag)),
      specialOffer,
      trueValueRating: specialOffer && plant.conditionRisk === 'high' ? 'risky' : 'fair'
    };
  });
}

export function calculateOrderFee(subtotal) {
  if (subtotal <= 0) return 0;
  return subtotal >= FEE_FREE_THRESHOLD ? 0 : ORDER_FEE;
}
