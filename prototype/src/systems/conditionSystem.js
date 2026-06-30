import { plantById } from '../data/plants.js';

const conditionOrder = ['excellent', 'good', 'tired', 'past-peak', 'unsellable'];
const moistureOrder = ['watered', 'damp', 'dry', 'bone-dry'];

function worsenCondition(condition, steps = 1) {
  const index = conditionOrder.indexOf(condition);
  if (index < 0) return condition;
  return conditionOrder[Math.min(conditionOrder.length - 1, index + steps)];
}

function dryMoisture(moisture, steps = 1) {
  const index = moistureOrder.indexOf(moisture);
  if (index < 0) return moisture;
  return moistureOrder[Math.min(moistureOrder.length - 1, index + steps)];
}

function createConditionEvent(batch, nextCondition, nextMoisture, reason, timing) {
  return {
    plantName: batch.plantName,
    fromCondition: batch.condition,
    toCondition: nextCondition,
    fromMoisture: batch.moisture,
    toMoisture: nextMoisture,
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

    const nextMoisture = dryMoisture(batch.moisture, pressure.moistureSteps);
    let nextCondition = worsenCondition(batch.condition, pressure.conditionSteps);

    if (nextMoisture === 'bone-dry' && ['display', 'reduced-area'].includes(batch.location)) {
      nextCondition = worsenCondition(nextCondition, intensity === 'wave' ? 0 : 1);
    }

    if (nextMoisture !== batch.moisture || nextCondition !== batch.condition) {
      conditionEvents.push(createConditionEvent(batch, nextCondition, nextMoisture, pressure.reason, timing));
    }

    return {
      ...batch,
      moisture: nextMoisture,
      condition: nextCondition
    };
  });

  return { stockBatches: nextStock, conditionEvents };
}

export function waterVisibleStock(stockBatches) {
  let changedCount = 0;
  const nextStock = stockBatches.map((batch) => {
    if (!['display', 'reduced-area'].includes(batch.location)) return batch;
    const plant = plantById[batch.plantId];
    if (plant?.moistureProfile === 'none') return batch;
    if (batch.moisture === 'watered') return batch;
    changedCount += 1;
    return {
      ...batch,
      moisture: 'watered'
    };
  });

  return { stockBatches: nextStock, changedCount };
}

export function applyTradingWaveConditionPressure(stockBatches, weather, waveNumber) {
  return applyConditionPressure(stockBatches, weather, 'wave', `wave-${waveNumber}`);
}

export function applyEndOfDayConditionPressure(stockBatches, weather) {
  return applyConditionPressure(stockBatches, weather, 'day', 'end-of-day');
}
