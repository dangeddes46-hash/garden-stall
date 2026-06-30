import { ORDER_FEE, FEE_FREE_THRESHOLD } from './constants.js';
import { plants } from './plants.js';
import { getTrayProfileForPlant } from './trayProfiles.js';

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

const estimatedWholesalePerUnit = {
  'plant-tomato': 0.85,
  'plant-strawberry': 0.95,
  'plant-chilli': 1.1,
  'plant-lettuce': 0.45,
  'plant-basil': 0.7,
  'plant-mint': 0.65,
  'plant-parsley': 0.55,
  'plant-rosemary': 1.75,
  'plant-pansy': 0.45,
  'plant-viola': 0.45,
  'plant-primrose': 0.65,
  'plant-bellis': 0.55,
  'plant-wallflower': 0.6,
  'plant-marigold': 0.6,
  'plant-petunia': 0.75,
  'plant-busy-lizzie': 0.6,
  'plant-begonia': 0.8,
  'plant-lobelia': 0.45,
  'plant-pelargonium': 1.6,
  'plant-fuchsia': 1.7,
  'plant-potted-lily': 3.25,
  'plant-daffodil-pot': 1.9,
  'plant-hyacinth-pot': 2.2,
  'sundry-compost': 3,
  'sundry-terracotta-pot': 1.25
};

function availabilityForPlant(day, plantId) {
  if (day === 0) return day0Available.has(plantId) ? 'available' : 'sold-out';
  if (day === 1) return day0Available.has(plantId) ? 'available' : 'sold-out';
  if (day === 2) return day0Available.has(plantId) || day2Additions.has(plantId) ? 'available' : 'sold-out';
  if (day >= 3) return day0Available.has(plantId) || day2Additions.has(plantId) || day3Specials.has(plantId) ? 'available' : 'sold-out';
  return 'sold-out';
}

function listingNote(day, plant, trayProfile) {
  const trayText = `${trayProfile.label}, ${trayProfile.quantity} units`;
  if (day === 0 && day0Available.has(plant.id)) return `Opening order stock. ${trayText}. Collect tomorrow morning.`;
  if (day === 2 && day2Additions.has(plant.id)) return `New line added after the first trading day. ${trayText}.`;
  if (day >= 3 && day3Specials.has(plant.id)) return `Special offer line. ${trayText}. Tune before serious balancing.`;
  return `Visible on the trade site, but not available yet. Usual batch: ${trayText}.`;
}

function estimateWholesaleCost(plant, trayProfile, specialOffer) {
  const perUnit = estimatedWholesalePerUnit[plant.id] ?? Math.max(0.45, plant.basePrices.normal * 0.45);
  const baseCost = Math.round(perUnit * trayProfile.quantity);
  return specialOffer ? Math.max(4, baseCost - 2) : Math.max(1, baseCost);
}

export function getSupplierListingsForDay(day) {
  return plants.map((plant) => {
    const trayProfile = getTrayProfileForPlant(plant.id);
    const specialOffer = day >= 3 && day3Specials.has(plant.id);
    const wholesaleCost = estimateWholesaleCost(plant, trayProfile, specialOffer);

    return {
      id: `listing-day-${day}-${plant.id}`,
      dayAvailable: day,
      plantId: plant.id,
      supplierId: 'county-plant-wholesale',
      batchType: trayProfile.id,
      batchLabel: trayProfile.label,
      loadType: trayProfile.loadType,
      quantity: trayProfile.quantity,
      wholesaleCost,
      suggestedRetail: plant.basePrices.normal,
      condition: specialOffer && plant.conditionRisk === 'high' ? 'good' : 'excellent',
      marginRating: specialOffer ? 'tempting' : 'normal',
      availability: availabilityForPlant(day, plant.id),
      tags: plant.tags,
      supplierNote: listingNote(day, plant, trayProfile),
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
