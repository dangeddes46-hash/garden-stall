import { FEATURE_POT_UNITS_PER_SLOT, SUNDRY_UNITS_PER_SLOT, VAN_LOAD_LIMITS } from '../data/vanCapacity.js';
import { markUnitsSold } from './healthProfileSystem.js';
import { applyPriceBand } from './pricingSystem.js';

export function getStockByLocation(stockBatches, location) {
  return stockBatches.filter((batch) => batch.location === location && batch.quantity > 0);
}

export function getFeaturePotSlotsForBatch(batch) {
  const unitsPerSlot = FEATURE_POT_UNITS_PER_SLOT[batch.plantId] ?? 1;
  return Math.ceil((batch.quantity ?? 0) / unitsPerSlot);
}

export function getSundrySlotsForBatch(batch) {
  const unitsPerSlot = SUNDRY_UNITS_PER_SLOT[batch.plantId] ?? 1;
  return Math.ceil((batch.quantity ?? 0) / unitsPerSlot);
}

export function getBatchVanLoad(batch) {
  if (batch.loadType === 'feature-pots') {
    return {
      traySlots: 0,
      featurePots: getFeaturePotSlotsForBatch(batch),
      sundrySlots: 0
    };
  }

  if (batch.loadType === 'sundry') {
    return {
      traySlots: 0,
      featurePots: 0,
      sundrySlots: getSundrySlotsForBatch(batch)
    };
  }

  return {
    traySlots: 1,
    featurePots: 0,
    sundrySlots: 0
  };
}

export function getVanLoadSummary(stockBatches) {
  return getStockByLocation(stockBatches, 'van').reduce((summary, batch) => {
    const load = getBatchVanLoad(batch);
    return {
      traySlots: summary.traySlots + load.traySlots,
      featurePots: summary.featurePots + load.featurePots,
      sundrySlots: summary.sundrySlots + load.sundrySlots,
      batchCount: summary.batchCount + 1
    };
  }, { traySlots: 0, featurePots: 0, sundrySlots: 0, batchCount: 0 });
}

export function getVanLoadStatus(stockBatches, batchId) {
  const batch = stockBatches.find((item) => item.id === batchId);
  const current = getVanLoadSummary(stockBatches);
  if (!batch || batch.location !== 'home') {
    return { canLoad: false, reason: 'Only home stock can be loaded.' };
  }

  const incoming = getBatchVanLoad(batch);
  const nextTraySlots = current.traySlots + incoming.traySlots;
  const nextFeaturePots = current.featurePots + incoming.featurePots;
  const nextSundrySlots = current.sundrySlots + incoming.sundrySlots;
  const trayOverflow = nextTraySlots > VAN_LOAD_LIMITS.traySlots;
  const featureOverflow = nextFeaturePots > VAN_LOAD_LIMITS.featurePots;
  const sundryOverflow = nextSundrySlots > VAN_LOAD_LIMITS.sundrySlots;

  const blocks = [];
  if (trayOverflow) blocks.push(`tray space is full (${current.traySlots}/${VAN_LOAD_LIMITS.traySlots})`);
  if (featureOverflow) blocks.push(`feature-pot space is full (${current.featurePots}/${VAN_LOAD_LIMITS.featurePots})`);
  if (sundryOverflow) blocks.push(`sundry space is full (${current.sundrySlots}/${VAN_LOAD_LIMITS.sundrySlots})`);

  if (blocks.length > 0) {
    return { canLoad: false, reason: `Van ${blocks.join(' and ')}.` };
  }

  return { canLoad: true, reason: 'Fits in the van.' };
}

export function canLoadBatchToVan(stockBatches, batchId) {
  return getVanLoadStatus(stockBatches, batchId).canLoad;
}

export function moveStockBatch(stockBatches, batchId, nextLocation, zoneId = null) {
  return stockBatches.map((batch) => {
    if (batch.id !== batchId) return batch;
    const targetZoneId = nextLocation === 'display' ? zoneId : null;
    return {
      ...batch,
      location: nextLocation,
      zoneId: targetZoneId,
      reduced: nextLocation === 'reduced-area' ? true : batch.reduced
    };
  });
}

export function updateStockBatchPriceBand(stockBatches, batchId, priceBand) {
  return stockBatches.map((batch) => {
    if (batch.id !== batchId) return batch;
    return applyPriceBand(batch, priceBand);
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

export function packUnsoldTradingStockHome(stockBatches) {
  let packedCount = 0;
  const nextStock = stockBatches.map((batch) => {
    if (!['display', 'reduced-area', 'van'].includes(batch.location) || batch.quantity <= 0) return batch;
    packedCount += 1;
    return {
      ...batch,
      location: 'home',
      zoneId: null
    };
  });

  return { stockBatches: nextStock, packedCount };
}

export function applySaleToBatch(stockBatches, batchId, quantitySold) {
  return stockBatches.map((batch) => {
    if (batch.id !== batchId) return batch;
    const soldBatch = markUnitsSold(batch, quantitySold);
    return {
      ...soldBatch,
      location: soldBatch.quantity <= 0 ? 'sold' : batch.location
    };
  });
}
