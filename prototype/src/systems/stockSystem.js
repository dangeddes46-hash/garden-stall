import { FEATURE_POT_TRAY_FORMATS, VAN_LOAD_LIMITS } from '../data/vanCapacity.js';
import { plantById } from '../data/plants.js';

export function getStockByLocation(stockBatches, location) {
  return stockBatches.filter((batch) => batch.location === location && batch.quantity > 0);
}

export function getBatchVanLoad(batch) {
  const plant = plantById[batch.plantId];
  const isFeaturePotGroup = FEATURE_POT_TRAY_FORMATS.includes(plant?.trayFormat);

  if (isFeaturePotGroup) {
    return {
      traySlots: 0,
      featurePots: batch.quantity
    };
  }

  return {
    traySlots: 1,
    featurePots: 0
  };
}

export function getVanLoadSummary(stockBatches) {
  return getStockByLocation(stockBatches, 'van').reduce((summary, batch) => {
    const load = getBatchVanLoad(batch);
    return {
      traySlots: summary.traySlots + load.traySlots,
      featurePots: summary.featurePots + load.featurePots,
      batchCount: summary.batchCount + 1
    };
  }, { traySlots: 0, featurePots: 0, batchCount: 0 });
}

export function canLoadBatchToVan(stockBatches, batchId) {
  const batch = stockBatches.find((item) => item.id === batchId);
  if (!batch || batch.location !== 'home') return false;

  const current = getVanLoadSummary(stockBatches);
  const incoming = getBatchVanLoad(batch);

  return current.traySlots + incoming.traySlots <= VAN_LOAD_LIMITS.traySlots
    && current.featurePots + incoming.featurePots <= VAN_LOAD_LIMITS.featurePots;
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
