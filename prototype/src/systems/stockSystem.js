import { VAN_CAPACITY } from '../data/constants.js';

export function getStockByLocation(stockBatches, location) {
  return stockBatches.filter((batch) => batch.location === location && batch.quantity > 0);
}

export function getVanCount(stockBatches) {
  return getStockByLocation(stockBatches, 'van').reduce((sum, batch) => sum + batch.quantity, 0);
}

export function canLoadBatchToVan(stockBatches, batchId) {
  const batch = stockBatches.find((item) => item.id === batchId);
  if (!batch || batch.location !== 'home') return false;
  return getVanCount(stockBatches) + batch.quantity <= VAN_CAPACITY;
}

export function moveStockBatch(stockBatches, batchId, nextLocation) {
  return stockBatches.map((batch) => {
    if (batch.id !== batchId) return batch;
    return {
      ...batch,
      location: nextLocation,
      zoneId: nextLocation === 'display' || nextLocation === 'reduced-area' ? batch.zoneId : null,
      reduced: nextLocation === 'reduced-area' ? true : batch.reduced
    };
  });
}

export function resetDisplayToVan(stockBatches) {
  return stockBatches.map((batch) => {
    if (batch.location !== 'display' && batch.location !== 'reduced-area') return batch;
    return {
      ...batch,
      location: 'van',
      zoneId: null
    };
  });
}
