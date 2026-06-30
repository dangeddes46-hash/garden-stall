import { PHASES, STARTING_CASH } from '../data/constants.js';
import { weekDayByNumber } from '../data/weekScript.js';
import { calculateCart, createPendingOrder, createStockBatchesFromOrder } from '../systems/orderSystem.js';
import { canLoadBatchToVan, moveStockBatch, resetDisplayToVan } from '../systems/stockSystem.js';
import { simulateCustomerWave } from '../systems/customerSystem.js';
import { initialState } from './initialState.js';

function log(state, message) {
  return {
    ...state,
    debugLog: [`Day ${state.currentDay}: ${message}`, ...state.debugLog].slice(0, 80)
  };
}

function nextSetupPhase(phase) {
  const order = [
    PHASES.WEATHER,
    PHASES.LOCATION_SELECTION,
    PHASES.VAN_LOADOUT,
    PHASES.ROUTE_CONFIRMATION,
    PHASES.DISPLAY_SETUP,
    PHASES.TRADING,
    PHASES.DAILY_SUMMARY,
    PHASES.EVENING_ORDER
  ];
  const index = order.indexOf(phase);
  return index >= 0 ? order[index + 1] : null;
}

export function reducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const listing = action.listing;
      if (!listing || listing.availability !== 'available') return log(state, 'Unavailable listing was ignored.');
      const existing = state.cart.find((item) => item.id === listing.id);
      const cart = existing
        ? state.cart.map((item) => item.id === listing.id ? { ...item, count: item.count + 1 } : item)
        : [...state.cart, { ...listing, count: 1 }];
      return log({ ...state, cart }, `Added ${listing.plantId} to wholesaler cart.`);
    }

    case 'REMOVE_FROM_CART': {
      const cart = state.cart
        .map((item) => item.id === action.listingId ? { ...item, count: item.count - 1 } : item)
        .filter((item) => item.count > 0);
      return log({ ...state, cart }, 'Removed one item from cart.');
    }

    case 'CLEAR_CART':
      return log({ ...state, cart: [] }, 'Cleared wholesaler cart.');

    case 'PLACE_ORDER': {
      const totals = calculateCart(state.cart);
      if (state.cart.length === 0) return log(state, 'Order blocked: cart is empty.');
      if (totals.total > state.cash) return log(state, 'Order blocked: not enough cash.');
      const order = createPendingOrder({ dayPlaced: state.currentDay, cart: state.cart });
      return log({
        ...state,
        cash: state.cash - order.total,
        pendingOrders: [...state.pendingOrders, order],
        cart: [],
        currentDay: state.currentDay === 0 ? 1 : state.currentDay + 1,
        phase: PHASES.MORNING_COLLECTION,
        tradingWaveIndex: 0,
        tradingLog: []
      }, `Placed order for £${order.total.toFixed(2)}. Collection scheduled for Day ${order.dayArrives}.`);
    }

    case 'COLLECT_ORDERS': {
      const collectible = state.pendingOrders.filter((order) => order.dayArrives <= state.currentDay && !order.collected);
      if (collectible.length === 0) return log(state, 'No orders are ready to collect.');
      const newBatches = collectible.flatMap(createStockBatchesFromOrder);
      const pendingOrders = state.pendingOrders.map((order) => collectible.some((collected) => collected.id === order.id) ? { ...order, collected: true } : order);
      return log({
        ...state,
        pendingOrders,
        stockBatches: [...state.stockBatches, ...newBatches],
        phase: PHASES.WEATHER,
        selectedWeather: weekDayByNumber[state.currentDay]?.weather ?? null
      }, `Collected ${newBatches.length} stock batches into home stock.`);
    }

    case 'ADVANCE_PHASE': {
      if (state.phase === PHASES.DAY0_ORDER) return log(state, 'Place an opening order before advancing.');
      if (state.phase === PHASES.MORNING_COLLECTION) return log(state, 'Collect pending orders before advancing.');
      const next = nextSetupPhase(state.phase);
      if (!next) return state;
      return log({ ...state, phase: next }, `Advanced to ${next}.`);
    }

    case 'SELECT_LOCATION':
      return log({ ...state, selectedLocationId: action.locationId }, 'Selected trading location.');

    case 'CONFIRM_ROUTE':
      if (!state.selectedLocationId) return log(state, 'Route blocked: choose a location first.');
      return log({ ...state, phase: PHASES.DISPLAY_SETUP }, 'Confirmed route and operating costs placeholder.');

    case 'LOAD_TO_VAN': {
      if (!canLoadBatchToVan(state.stockBatches, action.batchId)) return log(state, 'Load blocked: van capacity is 6 trays and 6 feature potted plants.');
      return log({ ...state, stockBatches: moveStockBatch(state.stockBatches, action.batchId, 'van') }, 'Loaded stock batch into van.');
    }

    case 'UNLOAD_TO_HOME':
      return log({ ...state, stockBatches: moveStockBatch(state.stockBatches, action.batchId, 'home') }, 'Moved stock batch back to home stock.');

    case 'PLACE_ON_DISPLAY':
      return log({ ...state, stockBatches: moveStockBatch(state.stockBatches, action.batchId, 'display') }, 'Placed stock batch on display placeholder.');

    case 'MOVE_TO_REDUCED':
      return log({ ...state, stockBatches: moveStockBatch(state.stockBatches, action.batchId, 'reduced-area') }, 'Moved stock batch to reduced area placeholder.');

    case 'RETURN_DISPLAY_TO_VAN':
      return log({ ...state, stockBatches: resetDisplayToVan(state.stockBatches) }, 'Returned display stock to van.');

    case 'RUN_CUSTOMER_WAVE': {
      if (state.phase !== PHASES.TRADING) return log(state, 'Customer wave blocked: not in trading phase.');
      const result = simulateCustomerWave(state);
      return log({
        ...state,
        ...result.stateChanges,
        tradingLog: [result.report, ...state.tradingLog].slice(0, 12)
      }, `Simulated ${result.report.wave} wave: £${result.report.revenue.toFixed(2)} revenue.`);
    }

    case 'END_TRADING_DAY': {
      const revenue = state.tradingLog.reduce((sum, wave) => sum + (wave.revenue ?? 0), 0);
      const salesCount = state.tradingLog.reduce((sum, wave) => sum + (wave.sales?.length ?? 0), 0);
      const missedCount = state.tradingLog.reduce((sum, wave) => sum + (wave.missedDemand?.length ?? 0), 0);
      return log({
        ...state,
        phase: PHASES.DAILY_SUMMARY,
        dailyReports: [
          ...state.dailyReports,
          {
            day: state.currentDay,
            cash: state.cash,
            locationId: state.selectedLocationId,
            revenue,
            salesCount,
            missedCount,
            tradingLog: state.tradingLog,
            note: `Passive wave report: ${salesCount} sales, ${missedCount} missed demand notes, £${revenue.toFixed(2)} revenue.`
          }
        ]
      }, 'Ended trading day with passive wave report.');
    }

    case 'START_EVENING_ORDER':
      return log({ ...state, phase: PHASES.EVENING_ORDER }, 'Opened evening wholesaler order.');

    case 'DEBUG_ADD_CASH':
      return log({ ...state, cash: state.cash + action.amount }, `Debug added £${action.amount}.`);

    case 'DEBUG_JUMP_PHASE':
      return log({ ...state, phase: action.phase }, `Debug jumped to ${action.phase}.`);

    case 'DEBUG_NEXT_DAY':
      return log({
        ...state,
        currentDay: Math.min(7, state.currentDay + 1),
        phase: PHASES.MORNING_COLLECTION,
        selectedLocationId: null,
        selectedWeather: weekDayByNumber[Math.min(7, state.currentDay + 1)]?.weather ?? null,
        tradingWaveIndex: 0,
        tradingLog: []
      }, 'Debug jumped to next day.');

    case 'RESET_PROTOTYPE':
      return initialState;

    default:
      return state;
  }
}
