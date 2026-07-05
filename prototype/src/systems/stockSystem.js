import { POTTRAY_UNITS_PER_SLOT, SUNDRYTRAY_UNITS_PER_SLOT, VAN_LOAD_LIMITS } from '../data/vanCapacity.js';
import { markUnitsSold } from './healthProfileSystem.js';
import { applyPriceBand } from './pricingSystem.js';

export function getStockByLocation(stockBatches, location) {
  return stockBatches.filter((batch) => batch.location === location && batch.quantity > 0);
}

export function getPottraySlotsForBatch(batch) {
  const unitsPerSlot = POTTRAY_UNITS_PER_SLOT[batch.plantId] ?? 1;
  return Math.ceil((batch.quantity ?? 0) / unitsPerSlot);
}

export function getSundrytraySlotsForBatch(batch) {
  const unitsPerSlot = SUNDRYTRAY_UNITS_PER_SLOT[batch.plantId] ?? 1;
  return Math.ceil((batch.quantity ?? 0) / unitsPerSlot);
}

export function getBatchVanLoad(batch) {
  if (batch.loadType === 'pottray') {
    return {
      traySlots: 0,
      pottraySlots: getPottraySlotsForBatch(batch),
      sundrytraySlots: 0
    };
  }

  if (batch.loadType === 'sundrytray') {
    return {
      traySlots: 0,
      pottraySlots: 0,
      sundrytraySlots: getSundrytraySlotsForBatch(batch)
    };
  }

  return {
    traySlots: 1,
    pottraySlots: 0,
    sundrytraySlots: 0
  };
}

export function getVanLoadSummary(stockBatches) {
  return getStockByLocation(stockBatches, 'van').reduce((summary, batch) => {
    const load = getBatchVanLoad(batch);
    return {
      traySlots: summary.traySlots + load.traySlots,
      pottraySlots: summary.pottraySlots + load.pottraySlots,
      sundrytraySlots: summary.sundrytraySlots + load.sundrytraySlots,
      batchCount: summary.batchCount + 1
    };
  }, { traySlots: 0, pottraySlots: 0, sundrytraySlots: 0, batchCount: 0 });
}

export function getVanLoadStatus(stockBatches, batchId) {
  const batch = stockBatches.find((item) => item.id === batchId);
  const current = getVanLoadSummary(stockBatches);
  if (!batch || batch.location !== 'home') {
    return { canLoad: false, reason: 'Only home stock can be loaded.' };
  }

  const incoming = getBatchVanLoad(batch);
  const nextTraySlots = current.traySlots + incoming.traySlots;
  const nextPottraySlots = current.pottraySlots + incoming.pottraySlots;
  const nextSundrytraySlots = current.sundrytraySlots + incoming.sundrytraySlots;
  const trayOverflow = nextTraySlots > VAN_LOAD_LIMITS.traySlots;
  const pottrayOverflow = nextPottraySlots > VAN_LOAD_LIMITS.pottraySlots;
  const sundrytrayOverflow = nextSundrytraySlots > VAN_LOAD_LIMITS.sundrytraySlots;

  const blocks = [];
  if (trayOverflow) blocks.push(`tray space is full (${current.traySlots}/${VAN_LOAD_LIMITS.traySlots})`);
  if (pottrayOverflow) blocks.push(`pottray space is full (${current.pottraySlots}/${VAN_LOAD_LIMITS.pottraySlots})`);
  if (sundrytrayOverflow) blocks.push(`sundrytray space is full (${current.sundrytraySlots}/${VAN_LOAD_LIMITS.sundrytraySlots})`);

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
