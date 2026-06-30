export const conditionOrder = ['excellent', 'good', 'tired', 'past-peak', 'unsellable'];
export const moistureOrder = ['waterlogged', 'watered', 'damp', 'dry', 'bone-dry'];

function averageStatus(units, key, order) {
  const activeUnits = units.filter((unit) => !unit.sold);
  if (activeUnits.length === 0) return order[0];
  const total = activeUnits.reduce((sum, unit) => {
    const index = order.indexOf(unit[key]);
    return sum + (index >= 0 ? index : 0);
  }, 0);
  return order[Math.round(total / activeUnits.length)] ?? order[0];
}

export function getActiveUnitHealth(batch) {
  if (Array.isArray(batch.unitHealth) && batch.unitHealth.length > 0) {
    return batch.unitHealth.filter((unit) => !unit.sold);
  }

  return Array.from({ length: Math.max(0, batch.quantity ?? 0) }, (_, index) => ({
    id: `${batch.id}-legacy-${index}`,
    condition: batch.condition ?? 'excellent',
    moisture: batch.moisture ?? 'damp',
    sold: false
  }));
}

export function aggregateBatchHealth(batch) {
  const unitHealth = Array.isArray(batch.unitHealth) && batch.unitHealth.length > 0
    ? batch.unitHealth
    : getActiveUnitHealth(batch);
  const activeCount = unitHealth.filter((unit) => !unit.sold).length;

  return {
    ...batch,
    unitHealth,
    quantity: activeCount,
    condition: averageStatus(unitHealth, 'condition', conditionOrder),
    moisture: averageStatus(unitHealth, 'moisture', moistureOrder)
  };
}

export function markUnitsSold(batch, quantitySold) {
  const saleQuantity = Math.min(quantitySold, batch.quantity);
  let remainingToSell = saleQuantity;
  const unitHealth = getActiveOrExistingUnits(batch).map((unit) => {
    if (unit.sold || remainingToSell <= 0) return unit;
    remainingToSell -= 1;
    return { ...unit, sold: true };
  });

  return aggregateBatchHealth({
    ...batch,
    unitHealth,
    quantitySold: (batch.quantitySold ?? 0) + saleQuantity
  });
}

function getActiveOrExistingUnits(batch) {
  if (Array.isArray(batch.unitHealth) && batch.unitHealth.length > 0) return batch.unitHealth;
  return getActiveUnitHealth(batch);
}

export function waterBatchUnits(batch) {
  let changedCount = 0;
  const unitHealth = getActiveOrExistingUnits(batch).map((unit) => {
    if (unit.sold) return unit;
    changedCount += 1;
    if (unit.moisture === 'watered' || unit.moisture === 'waterlogged') {
      return { ...unit, moisture: 'waterlogged' };
    }
    return { ...unit, moisture: 'watered' };
  });

  return {
    batch: aggregateBatchHealth({ ...batch, unitHealth }),
    changedCount
  };
}

export function dryBatchUnits(batch, steps) {
  if (steps <= 0) return { batch: aggregateBatchHealth(batch), changedCount: 0 };
  let changedCount = 0;
  const unitHealth = getActiveOrExistingUnits(batch).map((unit) => {
    if (unit.sold) return unit;
    const index = moistureOrder.indexOf(unit.moisture);
    const nextIndex = Math.min(moistureOrder.length - 1, Math.max(0, index) + steps);
    const nextMoisture = moistureOrder[nextIndex] ?? unit.moisture;
    if (nextMoisture !== unit.moisture) changedCount += 1;
    return { ...unit, moisture: nextMoisture };
  });

  return {
    batch: aggregateBatchHealth({ ...batch, unitHealth }),
    changedCount
  };
}

export function worsenBatchUnits(batch, steps) {
  if (steps <= 0) return { batch: aggregateBatchHealth(batch), changedCount: 0 };
  let changedCount = 0;
  const unitHealth = getActiveOrExistingUnits(batch).map((unit) => {
    if (unit.sold) return unit;
    const index = conditionOrder.indexOf(unit.condition);
    const nextIndex = Math.min(conditionOrder.length - 1, Math.max(0, index) + steps);
    const nextCondition = conditionOrder[nextIndex] ?? unit.condition;
    if (nextCondition !== unit.condition) changedCount += 1;
    return { ...unit, condition: nextCondition };
  });

  return {
    batch: aggregateBatchHealth({ ...batch, unitHealth }),
    changedCount
  };
}
