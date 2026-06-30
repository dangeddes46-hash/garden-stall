function groupKey(batch) {
  return [
    batch.location,
    batch.plantId,
    batch.batchLabel,
    batch.condition,
    batch.moisture,
    batch.priceBand,
    batch.unitRetailPrice,
    batch.loadType,
    batch.reduced ? 'reduced' : 'normal'
  ].join('|');
}

export function groupStockBatches(batches) {
  const groups = new Map();

  batches.forEach((batch) => {
    const key = groupKey(batch);
    const existing = groups.get(key);
    if (!existing) {
      groups.set(key, {
        key,
        representativeBatchId: batch.id,
        plantId: batch.plantId,
        plantName: batch.plantName,
        batchLabel: batch.batchLabel,
        condition: batch.condition,
        moisture: batch.moisture,
        priceBand: batch.priceBand,
        unitRetailPrice: batch.unitRetailPrice,
        loadType: batch.loadType,
        location: batch.location,
        reduced: batch.reduced,
        trayCount: 1,
        totalUnits: batch.quantity,
        batches: [batch]
      });
      return;
    }

    existing.trayCount += 1;
    existing.totalUnits += batch.quantity;
    existing.batches.push(batch);
  });

  return Array.from(groups.values()).sort((a, b) => {
    const plantCompare = a.plantName.localeCompare(b.plantName);
    if (plantCompare !== 0) return plantCompare;
    return a.condition.localeCompare(b.condition) || a.moisture.localeCompare(b.moisture);
  });
}
