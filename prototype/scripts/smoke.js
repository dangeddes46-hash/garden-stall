import { DISPLAY_ZONES, PHASES } from '../src/data/constants.js';
import { VAN_LOAD_LIMITS } from '../src/data/vanCapacity.js';
import { initialState } from '../src/state/initialState.js';
import { reducer } from '../src/state/reducer.js';
import { getSupplierListingsForDay } from '../src/data/supplierListings.js';
import { locations } from '../src/data/locations.js';
import { calculateCart } from '../src/systems/orderSystem.js';
import { getBatchVanLoad, getVanLoadSummary } from '../src/systems/stockSystem.js';
import { consolidateCompatibleStock } from '../src/systems/stockConsolidationSystem.js';
import { createMarkdownReport } from '../src/systems/reportSystem.js';

const EXPECTED_VERSION = '0.1.25-stock-handling-summary-readability';

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function dispatch(state, action) {
  return reducer(state, action);
}

function chooseAffordableVariedListings(day, cash) {
  const listings = getSupplierListingsForDay(day).filter((listing) => listing.availability === 'available');
  const selected = [];
  const seenPlants = new Set();
  for (const listing of listings) {
    if (seenPlants.has(listing.plantId)) continue;
    const nextCart = [...selected, { ...listing, count: 1 }];
    if (calculateCart(nextCart).total <= cash) {
      selected.push({ ...listing, count: 1 });
      seenPlants.add(listing.plantId);
    }
    if (selected.length >= 5) break;
  }
  if (selected.length === 0 && listings[0]) selected.push({ ...listings[0], count: 1 });
  return selected;
}

function assertVanCapacity(state) {
  const vanLoad = getVanLoadSummary(state.stockBatches);
  assert(vanLoad.traySlots <= VAN_LOAD_LIMITS.traySlots, `Van tray slots exceeded: ${vanLoad.traySlots}/${VAN_LOAD_LIMITS.traySlots}.`);
  assert(vanLoad.featurePots <= VAN_LOAD_LIMITS.featurePots, `Van feature pots exceeded: ${vanLoad.featurePots}/${VAN_LOAD_LIMITS.featurePots}.`);
  assert(vanLoad.sundrySlots <= VAN_LOAD_LIMITS.sundrySlots, `Van sundry slots exceeded: ${vanLoad.sundrySlots}/${VAN_LOAD_LIMITS.sundrySlots}.`);
}

function assertDisplayCapacity(state) {
  for (const zone of DISPLAY_ZONES) {
    const used = state.stockBatches.filter((batch) => {
      if (batch.quantity <= 0) return false;
      if (zone.id === 'reduced-area') return batch.location === 'reduced-area';
      return batch.location === 'display' && batch.zoneId === zone.id;
    }).length;
    assert(used <= zone.capacity, `${zone.id} display capacity exceeded: ${used}/${zone.capacity}.`);
  }
  const displayed = state.stockBatches.filter((batch) => batch.location === 'display' && batch.quantity > 0);
  assert(displayed.every((batch) => batch.zoneId), 'Displayed non-reduced stock is missing zoneId.');
}

function assertMarkdownSections(markdown) {
  ['## Daily Review', '### Next Order Guidance', '## Week So Far', '## Seven-Day Breakdown', '## Weekly Accounting', '## Stock Summary', '## Special Requests', '## Pricing', '## Condition Summary', '## Detailed Condition Changes']
    .forEach((section) => assert(markdown.includes(section), `Markdown report missing ${section}.`));
}

function assertCapacityRules() {
  const compost = { plantId: 'sundry-compost', loadType: 'sundry', quantity: 1 };
  const pots = { plantId: 'sundry-terracotta-pot', loadType: 'sundry', quantity: 10 };
  const lilies3 = { plantId: 'plant-potted-lily', loadType: 'feature-pots', quantity: 3 };
  const lilies4 = { plantId: 'plant-potted-lily', loadType: 'feature-pots', quantity: 4 };
  assert(VAN_LOAD_LIMITS.sundrySlots === 3, 'Sundry capacity bucket is missing or wrong.');
  assert(getBatchVanLoad(compost).sundrySlots === 1 && getBatchVanLoad(compost).traySlots === 0 && getBatchVanLoad(compost).featurePots === 0, 'Compost did not use exactly one sundry slot.');
  assert(getBatchVanLoad(pots).sundrySlots === 1 && getBatchVanLoad(pots).traySlots === 0 && getBatchVanLoad(pots).featurePots === 0, 'Terracotta pot pack did not use one sundry slot.');
  assert(getBatchVanLoad(lilies3).featurePots === 1, '1-3 potted lilies should use one feature-pot slot.');
  assert(getBatchVanLoad(lilies4).featurePots === 2, '4-6 potted lilies should use two feature-pot slots.');
}

function assertConsolidationRules() {
  const base = { batchType: 'bedding-tray-24', batchLabel: '4x6 tray', loadType: 'tray', location: 'home', zoneId: null, condition: 'good', moisture: 'damp', priceBand: 'normal', unitRetailPrice: 2, reduced: false, quantitySold: 0, unitHealth: [] };
  const batches = [
    { ...base, id: 'a', plantId: 'plant-petunia', plantName: 'Petunias', quantity: 10 },
    { ...base, id: 'b', plantId: 'plant-petunia', plantName: 'Petunias', quantity: 6 },
    { ...base, id: 'c', plantId: 'plant-tomato', plantName: 'Tomato Plants', quantity: 4 },
    { ...base, id: 'd', plantId: 'plant-petunia', plantName: 'Petunias', quantity: 3, condition: 'tired' }
  ];
  const beforeUnits = batches.reduce((sum, batch) => sum + batch.quantity, 0);
  const result = consolidateCompatibleStock(batches, 'home');
  const afterUnits = result.stockBatches.reduce((sum, batch) => sum + batch.quantity, 0);
  assert(afterUnits === beforeUnits, 'Consolidation changed total unit count.');
  assert(result.stockBatches.some((batch) => batch.plantId === 'plant-petunia' && batch.quantity === 16), 'Compatible same-plant trays did not consolidate.');
  assert(result.stockBatches.some((batch) => batch.plantId === 'plant-tomato' && batch.quantity === 4), 'Consolidation merged a different plantId.');
  assert(result.stockBatches.some((batch) => batch.plantId === 'plant-petunia' && batch.condition === 'tired' && batch.quantity === 3), 'Consolidation merged a different condition band.');
}

function addOpeningOrder(state) {
  const openingItems = chooseAffordableVariedListings(state.currentDay, state.cash);
  assert(openingItems.length > 0, 'No affordable opening stock listings found.');
  for (const item of openingItems) state = dispatch(state, { type: 'ADD_TO_CART', listing: item });
  assert(state.cart.length > 0, 'Cart did not receive opening items.');
  return { state, openingItems };
}

function runSmoke() {
  assertCapacityRules();
  assertConsolidationRules();
  let state = initialState;
  assert(state.prototypeVersion === EXPECTED_VERSION, `Expected ${EXPECTED_VERSION}, got ${state.prototypeVersion}.`);
  assert(state.weekStats?.daysCompleted === 0, 'Initial weekStats missing or not reset.');

  const opening = addOpeningOrder(state);
  state = dispatch(opening.state, { type: 'PLACE_ORDER' });
  assert(state.phase === 'morning-collection', 'Place order did not move to morning collection.');
  assert(state.pendingOrders.length > 0, 'No pending order after PLACE_ORDER.');
  assert(state.requestLog.length === 0, 'Request log did not reset when a new order/day cycle began.');

  state = dispatch(state, { type: 'COLLECT_ORDERS' });
  assert(state.stockBatches.some((batch) => batch.location === 'home'), 'Collection did not create home stock.');
  state = dispatch(state, { type: 'CONSOLIDATE_HOME_STOCK' });
  state = dispatch(state, { type: 'ADVANCE_PHASE' });
  assert(state.phase === 'location-selection', 'Weather advance did not move to location selection.');
  state = dispatch(state, { type: 'SELECT_LOCATION', locationId: locations[0].id });
  state = dispatch(state, { type: 'ADVANCE_PHASE' });
  assert(state.phase === 'van-loadout', 'Location advance did not move to van loadout.');

  state = dispatch(state, { type: 'AUTOLOAD_VAN' });
  const vanStock = state.stockBatches.filter((batch) => batch.location === 'van' && batch.quantity > 0);
  assert(vanStock.length > 0, 'AUTOLOAD_VAN did not load any stock.');
  assertVanCapacity(state);
  state = dispatch(state, { type: 'ADVANCE_PHASE' });
  assert(state.phase === 'route-confirmation', 'Van loadout advance did not move to route confirmation.');
  state = dispatch(state, { type: 'CONFIRM_ROUTE' });
  assert(state.phase === 'display-setup', 'Route confirmation did not move to display setup.');

  state = dispatch(state, { type: 'AUTODISPLAY_STOCK' });
  state = dispatch(state, { type: 'CONSOLIDATE_VISIBLE_STOCK' });
  const displayStock = state.stockBatches.filter((batch) => ['display', 'reduced-area'].includes(batch.location) && batch.quantity > 0);
  assert(displayStock.length > 0, 'AUTODISPLAY_STOCK did not display any stock.');
  assertDisplayCapacity(state);

  state = dispatch(state, { type: 'ADVANCE_PHASE' });
  assert(state.phase === 'trading', 'Display setup advance did not move to trading.');
  state = dispatch(state, { type: 'RUN_REST_TRADING_DAY' });
  assert(state.tradingClock?.isComplete, 'RUN_REST_TRADING_DAY did not complete the trading clock.');
  assert(state.tradingLog.length > 0, 'Trading log stayed empty after RUN_REST_TRADING_DAY.');
  assert(state.tradingLog.length <= 4, `Too many customer checkpoints were created: ${state.tradingLog.length}.`);

  const completeLogLength = state.tradingLog.length;
  const completeIndex = state.tradingClock?.currentIndex;
  state = dispatch(state, { type: 'RUN_TRADING_CHECKPOINT' });
  assert(state.tradingLog.length === completeLogLength, 'RUN_TRADING_CHECKPOINT added a wave after clock completion.');
  assert(state.tradingClock?.currentIndex === completeIndex, 'RUN_TRADING_CHECKPOINT advanced the clock after completion.');

  state = dispatch(state, { type: 'END_TRADING_DAY' });
  assert(state.phase === 'daily-summary', 'END_TRADING_DAY did not move to daily summary.');
  assert(state.dailyReports.length > 0, 'END_TRADING_DAY did not create a daily report.');
  assert(state.dailyReports[0].packedStockSummary?.[0]?.conditionCounts, 'Packed stock summary missing condition counts.');
  assert(state.weekStats?.daysCompleted >= 1, 'Ending a day did not increment weekStats.daysCompleted.');

  const markdown = createMarkdownReport(state);
  assertMarkdownSections(markdown);

  const weeklyState = dispatch({ ...state, currentDay: 7, phase: PHASES.DAILY_SUMMARY }, { type: 'START_EVENING_ORDER' });
  assert(weeklyState.phase === PHASES.WEEKLY_SUMMARY, 'Day 7 summary did not route safely to weekly summary.');

  state = dispatch(state, { type: 'START_EVENING_ORDER' });
  state = dispatch(state, { type: 'DEBUG_ADD_CASH', amount: 200 });
  const secondOrder = addOpeningOrder(state);
  state = dispatch(secondOrder.state, { type: 'PLACE_ORDER' });
  assert(state.requestLog.length === 0, 'Request log leaked into the second day order cycle.');

  return { version: state.prototypeVersion, vanBatches: vanStock.length, displayedBatches: displayStock.length, tradingReports: completeLogLength, dailyReports: state.dailyReports.length, daysCompleted: state.weekStats.daysCompleted };
}

try {
  const result = runSmoke();
  console.log('Garden Stall smoke test passed.');
  console.log(JSON.stringify(result, null, 2));
} catch (error) {
  console.error('Garden Stall smoke test failed.');
  console.error(error?.stack ?? error);
  process.exit(1);
}
