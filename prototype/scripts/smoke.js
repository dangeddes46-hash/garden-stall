import { initialState } from '../src/state/initialState.js';
import { reducer } from '../src/state/reducer.js';
import { getSupplierListingsForDay } from '../src/data/supplierListings.js';
import { locations } from '../src/data/locations.js';
import { calculateCart } from '../src/systems/orderSystem.js';
import { createMarkdownReport } from '../src/systems/reportSystemPatched.js';

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

function runSmoke() {
  let state = initialState;
  assert(state.prototypeVersion, 'Initial state has no prototypeVersion.');

  const openingItems = chooseAffordableVariedListings(state.currentDay, state.cash);
  assert(openingItems.length > 0, 'No affordable opening stock listings found.');

  for (const item of openingItems) {
    state = dispatch(state, { type: 'ADD_TO_CART', listing: item });
  }
  assert(state.cart.length > 0, 'Cart did not receive opening items.');

  state = dispatch(state, { type: 'PLACE_ORDER' });
  assert(state.phase === 'morning-collection', 'Place order did not move to morning collection.');
  assert(state.pendingOrders.length > 0, 'No pending order after PLACE_ORDER.');

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

  state = dispatch(state, { type: 'ADVANCE_PHASE' });
  assert(state.phase === 'route-confirmation', 'Van loadout advance did not move to route confirmation.');

  state = dispatch(state, { type: 'CONFIRM_ROUTE' });
  assert(state.phase === 'display-setup', 'Route confirmation did not move to display setup.');

  state = dispatch(state, { type: 'AUTODISPLAY_STOCK' });
  const displayStock = state.stockBatches.filter((batch) => ['display', 'reduced-area'].includes(batch.location) && batch.quantity > 0);
  assert(displayStock.length > 0, 'AUTODISPLAY_STOCK did not display any stock.');
  assert(displayStock.every((batch) => batch.location === 'reduced-area' || batch.zoneId), 'Displayed stock is missing zoneId.');

  state = dispatch(state, { type: 'ADVANCE_PHASE' });
  assert(state.phase === 'trading', 'Display setup advance did not move to trading.');

  state = dispatch(state, { type: 'RUN_REST_TRADING_DAY' });
  assert(state.tradingClock?.isComplete, 'RUN_REST_TRADING_DAY did not complete the trading clock.');
  assert(state.tradingLog.length > 0, 'Trading log stayed empty after RUN_REST_TRADING_DAY.');

  state = dispatch(state, { type: 'END_TRADING_DAY' });
  assert(state.phase === 'daily-summary', 'END_TRADING_DAY did not move to daily summary.');
  assert(state.dailyReports.length > 0, 'END_TRADING_DAY did not create a daily report.');

  const markdown = createMarkdownReport(state);
  assert(markdown.includes('## Daily Review'), 'Markdown report missing Daily Review section.');
  assert(markdown.includes('### Next Order Guidance'), 'Markdown report missing Next Order Guidance section.');

  return {
    version: state.prototypeVersion,
    openingLines: openingItems.length,
    vanBatches: vanStock.length,
    displayedBatches: displayStock.length,
    tradingReports: state.tradingLog.length,
    dailyReports: state.dailyReports.length
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
