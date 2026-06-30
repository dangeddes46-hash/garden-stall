import { archetypeById } from '../data/customerArchetypes.js';
import { customerSeeds } from '../data/customerSeeds.js';
import { plantById } from '../data/plants.js';
import { locationById } from '../data/locations.js';
import { getDisplaySaleModifier, getDisplayZoneSummary } from './displaySystem.js';

const waveNames = ['Morning', 'Midday', 'Afternoon', 'Closing'];

function pickWeightedArchetype(location, waveIndex) {
  const entries = Object.entries(location.customerWeights ?? {});
  if (entries.length === 0) return 'new-gardener';
  const total = entries.reduce((sum, [, weight]) => sum + weight, 0);
  const target = (waveIndex * 3 + 2) % total;
  let running = 0;
  for (const [id, weight] of entries) {
    running += weight;
    if (target < running) return id;
  }
  return entries[0][0];
}

function findSeed(archetypeId, waveIndex) {
  const matches = customerSeeds.filter((seed) => seed.archetypeId === archetypeId);
  if (matches.length === 0) return customerSeeds[waveIndex % customerSeeds.length];
  return matches[waveIndex % matches.length];
}

function scoreBatchForCustomer(batch, archetype, location, displayModifier) {
  const plant = plantById[batch.plantId];
  if (!plant) return { score: -99, reasons: ['Unknown plant.'] };

  const reasons = [];
  let score = 0;

  for (const tag of plant.tags) {
    if (archetype.preferredTags.includes(tag)) {
      score += 2;
      reasons.push(`matches ${archetype.displayName.toLowerCase()} interest: ${tag}`);
    }
    if (location.demandTags?.includes(tag)) {
      score += 1;
      reasons.push(`fits ${location.displayName}: ${tag}`);
    }
    if (archetype.dislikedTags.includes(tag) || location.weakDemandTags?.includes(tag)) {
      score -= 1;
    }
  }

  if (batch.condition === 'excellent') score += 1;
  if (batch.condition === 'tired') score -= 2;
  if (batch.condition === 'past-peak') score -= 4;
  if (batch.priceBand === 'premium' && archetype.priceSensitivity === 'high') score -= 2;
  if (batch.priceBand === 'reduced' || batch.reduced || batch.location === 'reduced-area') {
    score += archetype.reducedInterest === 'high' ? 3 : -1;
  }

  score += displayModifier;

  return {
    score,
    reasons: reasons.slice(0, 3)
  };
}

export function simulateCustomerWave(state) {
  const location = locationById[state.selectedLocationId];
  if (!location) {
    return {
      stateChanges: {},
      report: {
        wave: 'No location',
        events: ['No location selected, so no customers arrived.'],
        sales: [],
        missedDemand: []
      }
    };
  }

  const displaySummary = getDisplayZoneSummary(state.stockBatches);
  const displayModifier = getDisplaySaleModifier(displaySummary);
  const waveIndex = state.tradingWaveIndex ?? 0;
  const customersThisWave = Math.min(4, 2 + waveIndex);
  const sales = [];
  const missedDemand = [];
  const events = [];
  let stockBatches = state.stockBatches;
  let cashDelta = 0;

  for (let i = 0; i < customersThisWave; i += 1) {
    const archetypeId = pickWeightedArchetype(location, waveIndex + i);
    const archetype = archetypeById[archetypeId];
    const seed = findSeed(archetypeId, waveIndex + i);
    const visible = stockBatches.filter((batch) => ['display', 'reduced-area'].includes(batch.location) && batch.quantity > 0);

    if (visible.length === 0) {
      missedDemand.push(`${seed.displayName} found nothing visible to buy.`);
      continue;
    }

    const scored = visible
      .map((batch) => ({ batch, ...scoreBatchForCustomer(batch, archetype, location, displayModifier) }))
      .sort((a, b) => b.score - a.score);

    const best = scored[0];
    const threshold = archetype.priceSensitivity === 'high' ? 5 : 4;

    if (!best || best.score < threshold) {
      missedDemand.push(`${seed.displayName} browsed as a ${archetype.displayName}, but nothing felt quite right.`);
      continue;
    }

    const saleQuantity = best.batch.loadType === 'feature-pots' ? 1 : Math.min(3, best.batch.quantity);
    const revenue = saleQuantity * best.batch.unitRetailPrice;
    cashDelta += revenue;
    stockBatches = stockBatches.map((batch) => {
      if (batch.id !== best.batch.id) return batch;
      const remaining = batch.quantity - saleQuantity;
      return {
        ...batch,
        quantity: remaining,
        quantitySold: batch.quantitySold + saleQuantity,
        location: remaining <= 0 ? 'sold' : batch.location
      };
    });

    sales.push({
      customerName: seed.displayName,
      archetype: archetype.displayName,
      plantName: best.batch.plantName,
      quantity: saleQuantity,
      revenue,
      score: best.score,
      reason: best.reasons[0] ?? 'Good visible match.'
    });
    events.push(`${seed.displayName} bought ${saleQuantity} × ${best.batch.plantName}.`);
  }

  return {
    stateChanges: {
      stockBatches,
      cash: state.cash + cashDelta,
      tradingWaveIndex: waveIndex + 1
    },
    report: {
      wave: waveNames[waveIndex] ?? `Wave ${waveIndex + 1}`,
      displayRating: displaySummary.rating,
      displayNotes: displaySummary.notes,
      events,
      sales,
      missedDemand,
      revenue: cashDelta
    }
  };
}
