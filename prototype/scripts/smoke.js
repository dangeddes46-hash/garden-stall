import { DISPLAY_ZONES, PHASES } from '../src/data/constants.js';
import { VAN_LOAD_LIMITS } from '../src/data/vanCapacity.js';
import { initialState } from '../src/state/initialState.js';
import { reducer } from '../src/state/reducer.js';
import { getSupplierListingsForDay } from '../src/data/supplierListings.js';
import { locations } from '../src/data/locations.js';
import { calculateCart } from '../src/systems/orderSystem.js';
import { getVanLoadSummary } from '../src/systems/stockSystem.js';
import { createMarkdownReport } from '../src/systems/reportSystem.js';

const EXPECTED_VERSION = '0.1.24-daily-weekly-continuity';

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
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
  [
    '## Daily Review',
    '### Next Order Guidance',
    '## Week So Far',
    '## Special Requests',
    '## Pricing',
    '## Condition Summary',
    '## Detailed Condition Changes'
  ].forEach((section) => assert(markdown.includes(section), `Markdown report missing ${section}.`));
}

function addOpeningOrder(state) {
  const openingItems = chooseAffordableVariedListings(state.currentDay, state.cash);
  assert(openingItems.length > 0, 'No affordable opening stock listings found.');
  for (const item of openingItems) {
    state = dispatch(state, { type: 'ADD_TO_CART', listing: item });
  }
  assert(state.cart.length > 0, 'Cart did not receive opening items.');
  return { state, openingItems };
}

function runSmoke() {
  let state = initialState;
  assert(state.prototypeVersion === EXPECTED_VERSION, `Expected ${EXPECTED_VERSION}, got ${state.prototypeVersion}.`);
  assert(state.weekStats?.daysCompleted === 0, 'Initial weekStats missing or not reset.');

  const opening = addOpeningOrder(state);
  state = opening.state;

  state = dispatch(state, { type: 'PLACE_ORDER' });
  assert(state.phase === 'morning-collection', 'Place order did not move to morning collection.');
  assert(state.pendingOrders.length > 0, 'No pending order after PLACE_ORDER.');
  assert(state.requestLog.length === 0, 'Request log did not reset when a new order/day cycle began.');

  state = dispatch(state, { type: 'COLLECT_ORDERS' });
  assert(state.stockBatches.some((batch) => batch.location === 'home'), 'Collection did not create home stock.');

  state = dispatch(state, { type: 'ADVANCE_PHASE' });
  assert(state.phase === 'location-selection', 'Weather advance did not move to location selection.');

  state = dispatch(state, { type: 'SELECT_LOCATION', locationId: locations[0].id });
  assert(state.selectedLocationId === locations[0].id, 'Location selection did not stick.');

  state = dispatch(state, { type: 'ADVANCE_PHASE' });
  assert(state.phase === 'van-loadout', 'Location advance did not move to van loadout.');

  state = dispatch(state, { type: 'AUTOLOAD_VAN' });
  const vanStock = state.stockBatches.filter((batch) => batch.location === 'van' && batch.quantity > 0);
  assert(vanStock.length > 0, 'AUTOLOAD_VAN did not load any stock.');
  assert(new Set(vanStock.map((batch) => batch.plantId)).size > 1 || vanStock.length === 1, 'AUTOLOAD_VAN did not preserve variety when variety was available.');
  assertVanCapacity(state);

  state = dispatch(state, { type: 'ADVANCE_PHASE' });
  assert(state.phase === 'route-confirmation', 'Van loadout advance did not move to route confirmation.');

  state = dispatch(state, { type: 'CONFIRM_ROUTE' });
  assert(state.phase === 'display-setup', 'Route confirmation did not move to display setup.');

  state = dispatch(state, { type: 'AUTODISPLAY_STOCK' });
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
  assert(state.dailyReports[0].requestRevenue === 0, 'Unexpected request revenue appeared without a resolved request.');
  assert(state.weekStats?.daysCompleted >= 1, 'Ending a day did not increment weekStats.daysCompleted.');
  assert(state.weekStats?.totalRevenue >= state.dailyReports[0].revenue, 'Week total revenue did not include the daily report.');
  assert(typeof state.weekStats?.notebookDiscoveriesCount === 'number', 'Week stats did not track notebook discovery count.');

  const markdown = createMarkdownReport(state);
  assertMarkdownSections(markdown);

  const daySevenSummary = { ...state, currentDay: 7, phase: PHASES.DAILY_SUMMARY };
  const weeklyState = dispatch(daySevenSummary, { type: 'START_EVENING_ORDER' });
  assert(weeklyState.phase === PHASES.WEEKLY_SUMMARY, 'Day 7 summary did not route safely to weekly summary.');
  assert(weeklyState.weekStats?.daysCompleted >= 1, 'Weekly summary state lost week stats.');

  state = dispatch(state, { type: 'START_EVENING_ORDER' });
  state = dispatch(state, { type: 'DEBUG_ADD_CASH', amount: 200 });
  const secondOrder = addOpeningOrder(state);
  state = dispatch(secondOrder.state, { type: 'PLACE_ORDER' });
  assert(state.requestLog.length === 0, 'Request log leaked into the second day order cycle.');

  return {
    version: state.prototypeVersion,
    openingLines: opening.openingItems.length,
    vanBatches: vanStock.length,
    displayedBatches: displayStock.length,
    tradingReports: completeLogLength,
    dailyReports: state.dailyReports.length,
    daysCompleted: state.weekStats.daysCompleted
  };
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
