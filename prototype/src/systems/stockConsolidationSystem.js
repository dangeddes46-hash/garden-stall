function consolidationKey(batch) {
  return [
    batch.plantId,
    batch.batchType,
    batch.batchLabel,
    batch.loadType,
    batch.location,
    batch.zoneId ?? 'none',
    batch.condition,
    batch.moisture,
    batch.priceBand ?? 'normal',
    Number(batch.unitRetailPrice ?? 0),
    batch.reduced ? 'reduced' : 'not-reduced'
  ].join('|');
}

function isConsolidatable(batch, allowedLocations) {
  if (!batch || batch.quantity <= 0) return false;
  if (batch.location === 'sold' || batch.location === 'discarded') return false;
  if (!allowedLocations.includes(batch.location)) return false;
  if (!batch.plantId || !batch.batchType || !batch.loadType) return false;
  return true;
}

function mergeBatchGroup(group) {
  const [first, ...rest] = group;
  const mergedUnitHealth = group.flatMap((batch) => batch.unitHealth ?? []);
  const mergedNotes = [...new Set(group.flatMap((batch) => batch.notes ?? []))];
  const mergedIds = group.map((batch) => batch.id);

  return {
    ...first,
    id: `${first.id}-consolidated-${group.length}`,
    quantity: group.reduce((sum, batch) => sum + (batch.quantity ?? 0), 0),
    quantitySold: group.reduce((sum, batch) => sum + (batch.quantitySold ?? 0), 0),
    unitHealth: mergedUnitHealth,
    notes: mergedNotes,
    consolidatedFrom: [...(first.consolidatedFrom ?? [first.id]), ...rest.flatMap((batch) => batch.consolidatedFrom ?? [batch.id])],
    sourceBatchIds: mergedIds
  };
}

export function consolidateCompatibleStock(stockBatches, scope = 'all') {
  const allowedLocationsByScope = {
    home: ['home'],
    visible: ['display', 'reduced-area'],
    all: ['home', 'van', 'display', 'reduced-area']
  };
  const allowedLocations = allowedLocationsByScope[scope] ?? allowedLocationsByScope.all;
  const groups = new Map();

  stockBatches.forEach((batch) => {
    if (!isConsolidatable(batch, allowedLocations)) return;
    const key = consolidationKey(batch);
    groups.set(key, [...(groups.get(key) ?? []), batch]);
  });

  const replacements = new Map();
  const removedIds = new Set();
  let mergedBatchCount = 0;

  groups.forEach((group) => {
    if (group.length < 2) return;
    const merged = mergeBatchGroup(group);
    replacements.set(group[0].id, merged);
    group.slice(1).forEach((batch) => removedIds.add(batch.id));
    mergedBatchCount += group.length - 1;
  });

  const nextBatches = stockBatches
    .filter((batch) => !removedIds.has(batch.id))
    .map((batch) => replacements.get(batch.id) ?? batch);

  return {
    stockBatches: nextBatches,
    mergedBatchCount,
    groupCount: [...groups.values()].filter((group) => group.length > 1).length
  };
}
