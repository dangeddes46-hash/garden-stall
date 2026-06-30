export function groupStockByPlant(batches) {
  const groups = new Map();

  batches.forEach((batch) => {
    const key = [batch.location, batch.plantId].join('|');
    if (!groups.has(key)) {
      groups.set(key, {
        key,
        plantId: batch.plantId,
        plantName: batch.plantName,
        location: batch.location,
        trayCount: 0,
        totalUnits: 0,
        defaultOpen: true,
        batches: []
      });
    }

    const group = groups.get(key);
    group.trayCount += 1;
    group.totalUnits += batch.quantity;
    group.batches.push(batch);
    group.defaultOpen = group.trayCount < 5;
  });

  return Array.from(groups.values()).sort((a, b) => a.plantName.localeCompare(b.plantName));
}
