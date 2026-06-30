import { plantById } from '../data/plants.js';
import { dryBatchUnits, waterBatchUnits, worsenBatchUnits } from './healthProfileSystem.js';

function createConditionEvent(batch, nextBatch, reason, timing) {
  return {
    batchId: batch.id,
    plantName: batch.plantName,
    fromCondition: batch.condition,
    toCondition: nextBatch.condition,
    fromMoisture: batch.moisture,
    toMoisture: nextBatch.moisture,
    location: batch.location,
    timing,
    reason
  };
}

function conditionPressureForBatch(batch, weather, intensity = 'day') {
  const plant = plantById[batch.plantId];
  if (!plant || plant.conditionRisk === 'none') return { moistureSteps: 0, conditionSteps: 0, reason: 'No condition pressure.' };

  const exposed = batch.location === 'display' || batch.location === 'reduced-area';
  const inVan = batch.location === 'van';
  const highRisk = plant.conditionRisk === 'high';
  const moderateRisk = plant.conditionRisk === 'moderate';
  const dryTolerant = plant.moistureProfile === 'dry-tolerant';
  const thirsty = plant.moistureProfile === 'thirsty';
  const moderateMoisture = plant.moistureProfile === 'moderate';
  const stress = weather?.displayStress ?? 'low';
  const dryingModifier = weather?.dryingModifier ?? 1;

  let moistureSteps = 0;
  let conditionSteps = 0;
  const reasons = [];

  if (exposed) {
    if (intensity === 'wave') {
      moistureSteps += thirsty || dryingModifier >= 1.1 ? 1 : 0;
      if (moderateMoisture && dryingModifier >= 1) moistureSteps += 1;
      if (dryTolerant) moistureSteps = 0;
      reasons.push('spent part of the day exposed on display');
    } else {
      moistureSteps += 1;
      if (dryingModifier >= 1 || thirsty || moderateMoisture) moistureSteps += 1;
      if (dryingModifier >= 1.2 || thirsty) moistureSteps += 1;
      if (dryTolerant) moistureSteps = Math.max(1, moistureSteps - 1);
      reasons.push('spent the day on display');
    }
  } else if (inVan && intensity === 'day') {
    moistureSteps += dryingModifier >= 1.1 ? 1 : 0;
    if (moistureSteps > 0) reasons.push('spent the day in the van');
  }

  const driedAlready = ['dry', 'bone-dry'].includes(batch.moisture);
  if (exposed && stress === 'medium' && (highRisk || thirsty) && (intensity === 'day' || driedAlready)) {
    conditionSteps += 1;
    reasons.push('weather/display stress affected fragile stock');
  }

  if (exposed && batch.moisture === 'bone-dry') {
    conditionSteps += 1;
    reasons.push('was already bone-dry');
  }

  if (intensity === 'day' && batch.location === 'reduced-area' && batch.condition === 'tired') {
    conditionSteps += 1;
    reasons.push('was already tired in reduced stock');
  }

  if (moderateRisk && exposed && stress === 'medium' && driedAlready) {
    conditionSteps += 1;
    reasons.push('moderate-risk stock dried on a stressful day');
  }

  return {
    moistureSteps,
    conditionSteps,
    reason: reasons.join(', ') || 'No meaningful pressure.'
  };
}

function applyConditionPressure(stockBatches, weather, intensity, timing) {
  const conditionEvents = [];
  const nextStock = stockBatches.map((batch) => {
    if (['sold', 'discarded', 'home'].includes(batch.location)) return batch;
    const pressure = conditionPressureForBatch(batch, weather, intensity);
    if (pressure.moistureSteps === 0 && pressure.conditionSteps === 0) return batch;

    const dried = dryBatchUnits(batch, pressure.moistureSteps).batch;
    const conditionSteps = dried.moisture === 'bone-dry' && ['display', 'reduced-area'].includes(batch.location)
      ? pressure.conditionSteps + (intensity === 'wave' ? 0 : 1)
      : pressure.conditionSteps;
    const nextBatch = worsenBatchUnits(dried, conditionSteps).batch;

    if (nextBatch.moisture !== batch.moisture || nextBatch.condition !== batch.condition) {
      conditionEvents.push(createConditionEvent(batch, nextBatch, pressure.reason, timing));
    }

    return nextBatch;
  });

  return { stockBatches: nextStock, conditionEvents };
}

export function waterStockBatch(stockBatches, batchId) {
  let changedCount = 0;
  const nextStock = stockBatches.map((batch) => {
    if (batch.id !== batchId) return batch;
    if (!['display', 'reduced-area'].includes(batch.location)) return batch;
    const plant = plantById[batch.plantId];
    if (plant?.moistureProfile === 'none') return batch;
    const watered = waterBatchUnits(batch);
    changedCount += watered.changedCount;
    return watered.batch;
  });

  return { stockBatches: nextStock, changedCount };
}

export function waterVisibleStock(stockBatches) {
  let changedCount = 0;
  const nextStock = stockBatches.map((batch) => {
    if (!['display', 'reduced-area'].includes(batch.location)) return batch;
    const plant = plantById[batch.plantId];
    if (plant?.moistureProfile === 'none') return batch;
    const watered = waterBatchUnits(batch);
    changedCount += watered.changedCount;
    return watered.batch;
  });

  return { stockBatches: nextStock, changedCount };
}

export function applyTradingWaveConditionPressure(stockBatches, weather, waveNumber) {
  return applyConditionPressure(stockBatches, weather, 'wave', `wave-${waveNumber}`);
}

export function applyEndOfDayConditionPressure(stockBatches, weather) {
  return applyConditionPressure(stockBatches, weather, 'day', 'end-of-day');
}
