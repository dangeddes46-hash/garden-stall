import { VAN_LOAD_LIMITS } from '../src/data/vanCapacity.js';
import { initialState } from '../src/state/initialState.js';
import { getBatchVanLoad, getVanLoadSummary } from '../src/systems/stockSystem.js';
import { canPlaceBatchInDisplayZone } from '../src/systems/displaySystem.js';

const EXPECTED_VERSION = '0.1.25.1-transport-unit-correction';

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function runChecks() {
  assert(initialState.prototypeVersion === EXPECTED_VERSION, `Expected ${EXPECTED_VERSION}, got ${initialState.prototypeVersion}.`);

  const tray = { id: 'tray', plantId: 'plant-tomato', loadType: 'tray', quantity: 24, location: 'home' };
  const pots = { id: 'pots', plantId: 'sundry-terracotta-pot', loadType: 'sundrytray', quantity: 3, location: 'home' };
  const compost = { id: 'compost', plantId: 'sundry-compost', loadType: 'sundrytray', quantity: 1, location: 'home' };
  const lilies = { id: 'lilies', plantId: 'plant-potted-lily', loadType: 'pottray', quantity: 3, location: 'home' };
  const daffodils = { id: 'daffodils', plantId: 'plant-daffodil-pot', loadType: 'pottray', quantity: 4, location: 'home' };

  assert(getBatchVanLoad(pots).sundrytraySlots === 1, '3 terracotta pots should consume 1 sundrytray van slot.');
  assert(getBatchVanLoad(compost).sundrytraySlots === 1, '1 compost bag should consume 1 sundrytray van slot.');
  assert(getBatchVanLoad(lilies).pottraySlots === 1, '3 potted lilies should consume 1 pottray van slot.');
  assert(getBatchVanLoad(daffodils).pottraySlots === 1, '4 daffodil pots should consume 1 pottray van slot.');
  assert(getBatchVanLoad(tray).traySlots === 1, 'A normal tray should consume 1 tray van slot.');

  const displayed = [tray, pots, lilies].map((batch, index) => ({ ...batch, id: `display-${index}`, location: 'display', zoneId: 'front-table' }));
  assert(canPlaceBatchInDisplayZone(displayed.slice(0, 2), 'front-table'), 'Display should accept tray, pottray, and sundrytray as generic occupied slots.');

  const fullVan = [
    { ...tray, id: 't1', location: 'van' }, { ...tray, id: 't2', location: 'van' }, { ...tray, id: 't3', location: 'van' },
    { ...tray, id: 't4', location: 'van' }, { ...tray, id: 't5', location: 'van' }, { ...tray, id: 't6', location: 'van' },
    { ...lilies, id: 'p1', location: 'van' }, { ...lilies, id: 'p2', location: 'van' }, { ...lilies, id: 'p3', location: 'van' },
    { ...lilies, id: 'p4', location: 'van' }, { ...lilies, id: 'p5', location: 'van' }, { ...lilies, id: 'p6', location: 'van' },
    { ...compost, id: 's1', location: 'van' }, { ...compost, id: 's2', location: 'van' }, { ...compost, id: 's3', location: 'van' }
  ];
  const load = getVanLoadSummary(fullVan);
  assert(load.traySlots === VAN_LOAD_LIMITS.traySlots, 'Van tray bucket did not fill exactly.');
  assert(load.pottraySlots === VAN_LOAD_LIMITS.pottraySlots, 'Van pottray bucket did not fill exactly.');
  assert(load.sundrytraySlots === VAN_LOAD_LIMITS.sundrytraySlots, 'Van sundrytray bucket did not fill exactly.');

  return { version: initialState.prototypeVersion, traySlots: load.traySlots, pottraySlots: load.pottraySlots, sundrytraySlots: load.sundrytraySlots };
}

const result = runChecks();
console.log('Garden Stall transport checks passed.');
console.log(JSON.stringify(result, null, 2));
