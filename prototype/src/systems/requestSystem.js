import { specialRequests } from '../data/specialRequests.js';
import { plantById } from '../data/plants.js';
import { applySaleToBatch } from './stockSystem.js';

const outcomeRank = {
  perfect: 5,
  excellent: 4,
  good: 3,
  acceptable: 2,
  poor: 1,
  bad: 0
};

export function pickSpecialRequest(state) {
  const index = ((state.currentDay || 1) + (state.requestLog?.length || 0)) % specialRequests.length;
  return specialRequests[index];
}

function outcomeForPlant(request, plantId) {
  if (request.badPlantIds?.includes(plantId)) return 'bad';
  if (request.perfectPlantIds?.includes(plantId)) return 'excellent';
  if (request.goodPlantIds?.includes(plantId)) return 'good';
  if (request.acceptablePlantIds?.includes(plantId)) return 'acceptable';
  if (request.poorPlantIds?.includes(plantId)) return 'poor';
  return 'poor';
}

function reasonForOutcome(outcome, plant, request) {
  if (outcome === 'excellent') return `${plant.displayName} is an excellent match for this request.`;
  if (outcome === 'good') return `${plant.displayName} fits the customer's main need.`;
  if (outcome === 'acceptable') return `${plant.displayName} is workable, but not the strongest match.`;
  if (outcome === 'poor') return `${plant.displayName} misses the main point of the request.`;
  if (request.requiredWarnings?.length) return `This choice fails an important warning: ${request.requiredWarnings[0]}`;
  return `${plant.displayName} is a bad match for this customer.`;
}

export function scoreSpecialRequest({ state, request, batchId }) {
  const batch = state.stockBatches.find((item) => item.id === batchId);
  if (!batch) {
    return {
      stockBatches: state.stockBatches,
      cash: state.cash,
      result: {
        requestId: request.id,
        requestName: request.displayName,
        plantName: 'No stock selected',
        outcome: 'bad',
        revenue: 0,
        reason: 'No stock batch was selected.',
        notebookRewards: []
      }
    };
  }

  const plant = plantById[batch.plantId];
  const outcome = outcomeForPlant(request, batch.plantId);
  const shouldSell = outcomeRank[outcome] >= outcomeRank.acceptable;
  const saleQuantity = shouldSell ? 1 : 0;
  const revenue = saleQuantity * batch.unitRetailPrice;
  const stockBatches = saleQuantity > 0
    ? applySaleToBatch(state.stockBatches, batchId, saleQuantity)
    : state.stockBatches;

  return {
    stockBatches,
    cash: state.cash + revenue,
    result: {
      requestId: request.id,
      requestName: request.displayName,
      plantName: plant.displayName,
      outcome,
      revenue,
      unitPrice: batch.unitRetailPrice,
      priceBand: batch.priceBand,
      reason: reasonForOutcome(outcome, plant, request),
      notebookRewards: outcomeRank[outcome] >= outcomeRank.good ? request.notebookRewards ?? [] : [],
      warning: request.requiredWarnings?.[0] ?? null
    }
  };
}
