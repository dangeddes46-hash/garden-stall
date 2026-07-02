import { PHASES, STARTING_CASH } from '../data/constants.js';
import { weekDayByNumber } from '../data/weekScript.js';
import { calculateCart, createPendingOrder, createStockBatchesFromOrder } from '../systems/orderSystem.js';
import { canLoadBatchToVan, moveStockBatch, packUnsoldTradingStockHome, resetDisplayToVan, updateStockBatchPriceBand } from '../systems/stockSystem.js';
import { simulateCustomerWave } from '../systems/customerSystem.js';
import { canPlaceBatchInDisplayZone, getDisplayZoneSummary } from '../systems/displaySystem.js';
import { pickSpecialRequest, scoreSpecialRequest } from '../systems/requestSystem.js';
import { summarizePricingFromTradingLog } from '../systems/pricingSystem.js';
import { buildNotebookDiscoveriesForDay, createNotebookDailyNotes, mergeNotebookDiscoveries } from '../systems/notebookSystem.js';
import { applyEndOfDayConditionPressure, applyTradingWaveConditionPressure, summarizeConditionEvents, summarizeWateredStock, waterStockBatch } from '../systems/conditionSystem.js';
import { advanceTradingClock, createTradingClock, getNextTradingCheckpoint, setTradingClockMode } from '../systems/tradingClockSystem.js';
import { autoloadVan, autodisplayStock } from '../systems/autoStockSystem.js';
import { initialState } from './initialState.js';

function log(state, message) {
  return {
    ...state,
    debugLog: [`Day ${state.currentDay}: ${message}`, ...state.debugLog].slice(0, 80)
  };
}

function summarizeUnsoldStock(stockBatches = []) {
  const packed = stockBatches.filter((batch) => ['display', 'reduced-area', 'van'].includes(batch.location) && batch.quantity > 0);
  const byPlant = packed.reduce((summary, batch) => {
    const current = summary[batch.plantName] ?? {
      plantName: batch.plantName,
      batches: 0,
      units: 0,
      tiredBatches: 0,
      reducedBatches: 0
    };
    return {
      ...summary,
      [batch.plantName]: {
        ...current,
        batches: current.batches + 1,
        units: current.units + (batch.quantity ?? 0),
        tiredBatches: current.tiredBatches + (['tired', 'past-peak'].includes(batch.condition) ? 1 : 0),
        reducedBatches: current.reducedBatches + (batch.location === 'reduced-area' || batch.reduced ? 1 : 0)
      }
    };
  }, {});

  return Object.values(byPlant).sort((a, b) => b.units - a.units || b.batches - a.batches);
}

function buildNextOrderGuidance({ packedStockSummary = [], tradingLog = [], pricingSummary = {}, conditionSummary = [] }) {
  const guidance = [];
  const topUnsold = packedStockSummary[0];
  const missedExamples = tradingLog.flatMap((wave) => wave.missedDemand ?? []).slice(0, 2);
  const soldByBand = pricingSummary.soldByBand ?? pricingSummary.sold ?? {};

  if (topUnsold) {
    guidance.push({
      type: 'reduce-order-risk',
      summary: `Do not blindly reorder ${topUnsold.plantName}. ${topUnsold.units} were packed home across ${topUnsold.batches} batch${topUnsold.batches === 1 ? '' : 'es'}.`,
      reason: 'Largest unsold line after packdown.'
    });
  }

  if (packedStockSummary.some((entry) => entry.tiredBatches > 0)) {
    guidance.push({
      type: 'freshness-risk',
      summary: 'Give tired leftovers priority tomorrow: reduce them, place them better, or avoid adding more of the same line.',
      reason: 'Some packed stock was tired or past-peak.'
    });
  }

  if (missedExamples.length > 0) {
    guidance.push({
      type: 'missed-demand-clue',
      summary: `Use missed demand as the next shopping clue: ${missedExamples[0]}`,
      reason: 'At least one customer browsed without finding a good match.'
    });
  }

  if ((soldByBand.premium ?? 0) === 0 && (soldByBand.bargain ?? 0) > 0) {
    guidance.push({
      type: 'pricing-shape',
      summary: 'Premium did not prove itself today. Keep premium for very fresh, well-placed showy stock only.',
      reason: 'Bargain sold but premium did not.'
    });
  }

  if ((soldByBand.reduced ?? 0) > 0) {
    guidance.push({
      type: 'clearance-worked',
      summary: 'Reduced pricing moved stock, but treat it as a cleanup tool rather than the main stall identity.',
      reason: 'Reduced stock sold today.'
    });
  }

  if (conditionSummary.length > 0) {
    guidance.push({
      type: 'condition-risk',
      summary: 'Order fewer thirsty/high-risk trays unless you plan to check and water between waves.',
      reason: 'Condition notes were recorded during the day.'
    });
  }

  if (guidance.length === 0) {
    guidance.push({
      type: 'balanced-repeat',
      summary: 'Repeat a balanced basket: one colourful draw, one useful edible tray, and one giftable/showy item.',
      reason: 'No strong warning signal was recorded.'
    });
  }

  return guidance.slice(0, 5);
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

function runTradingCheckpoint(state) {
  if (state.phase !== PHASES.TRADING) return log(state, 'Trading checkpoint blocked: not in trading phase.');

  const nextCheckpoint = getNextTradingCheckpoint(state.tradingClock);
  const nextClock = advanceTradingClock(state.tradingClock);

  if ((state.tradingWaveIndex ?? 0) >= 4) {
    return log({
      ...state,
      tradingClock: nextClock
    }, `Advanced trading clock to ${nextCheckpoint.timeLabel}: ${nextCheckpoint.title}.`);
  }

  const result = simulateCustomerWave(state);
  const waveNumber = (state.tradingWaveIndex ?? 0) + 1;
  const conditionResult = applyTradingWaveConditionPressure(result.stateChanges.stockBatches ?? state.stockBatches, state.selectedWeather, waveNumber);
  const conditionSummary = summarizeConditionEvents(conditionResult.conditionEvents);
  const timedReport = {
    ...result.report,
    timeLabel: nextCheckpoint.timeLabel,
    checkpointTitle: nextCheckpoint.title,
    checkpointDescription: nextCheckpoint.description,
    clockMode: state.tradingClock?.mode ?? 'step',
    conditionEvents: conditionResult.conditionEvents,
    conditionSummary
  };

  return log({
    ...state,
    ...result.stateChanges,
    tradingClock: nextClock,
    stockBatches: conditionResult.stockBatches,
    conditionLog: [...conditionResult.conditionEvents, ...(state.conditionLog ?? [])].slice(0, 80),
    tradingLog: [timedReport, ...state.tradingLog].slice(0, 12)
  }, `${nextCheckpoint.timeLabel} ${nextCheckpoint.title}: ${result.report.wave} produced £${result.report.revenue.toFixed(2)} revenue and ${conditionSummary.length} condition notes.`);
}

function runRemainingTradingDay(state) {
  if (state.phase !== PHASES.TRADING) return log(state, 'Run rest of day blocked: not in trading phase.');
  let nextState = state;
  let steps = 0;

  while (!(nextState.tradingClock?.isComplete) && steps < 6) {
    nextState = runTradingCheckpoint(nextState);
    steps += 1;
  }

  return log(nextState, `Debug resolved ${steps} trading checkpoint${steps === 1 ? '' : 's'} to ${nextState.tradingClock?.currentTime ?? 'unknown time'}.`);
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
        tradingClock: createTradingClock(),
        tradingWaveIndex: 0,
        tradingLog: [],
        activeRequest: null,
        conditionLog: []
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
      }, `Collected ${newBatches.length} stock tray batches into home stock.`);
    }

    case 'ADVANCE_PHASE': {
      if (state.phase === PHASES.DAY0_ORDER) return log(state, 'Place an opening order before advancing.');
      if (state.phase === PHASES.MORNING_COLLECTION) return log(state, 'Collect pending orders before advancing.');
      const next = nextSetupPhase(state.phase);
      if (!next) return state;
      return log({
        ...state,
        phase: next,
        tradingClock: next === PHASES.TRADING ? createTradingClock() : state.tradingClock
      }, `Advanced to ${next}.`);
    }

    case 'SELECT_LOCATION':
      return log({ ...state, selectedLocationId: action.locationId }, 'Selected trading location.');

    case 'CONFIRM_ROUTE':
      if (!state.selectedLocationId) return log(state, 'Route blocked: choose a location first.');
      return log({ ...state, phase: PHASES.DISPLAY_SETUP }, 'Confirmed route and operating costs placeholder.');

    case 'LOAD_TO_VAN': {
      if (!canLoadBatchToVan(state.stockBatches, action.batchId)) return log(state, 'Load blocked: van capacity is 6 trays and 6 feature potted plants.');
      return log({ ...state, stockBatches: moveStockBatch(state.stockBatches, action.batchId, 'van') }, 'Loaded one tray batch into van.');
    }

    case 'AUTOLOAD_VAN': {
      const result = autoloadVan(state.stockBatches);
      return log({ ...state, stockBatches: result.stockBatches }, `Autoloaded ${result.loadedCount} varied batch${result.loadedCount === 1 ? '' : 'es'} into the van, prioritising older plants.`);
    }

    case 'UNLOAD_TO_HOME':
      return log({ ...state, stockBatches: moveStockBatch(state.stockBatches, action.batchId, 'home') }, 'Moved one tray batch back to home stock.');

    case 'SET_PRICE_BAND': {
      const batch = state.stockBatches.find((item) => item.id === action.batchId);
      if (!batch) return log(state, 'Price change blocked: batch not found.');
      return log({ ...state, stockBatches: updateStockBatchPriceBand(state.stockBatches, action.batchId, action.priceBand) }, `Set ${batch.plantName} to ${action.priceBand} pricing.`);
    }

    case 'PLACE_ON_DISPLAY': {
      const zoneId = action.zoneId ?? 'front-table';
      if (!canPlaceBatchInDisplayZone(state.stockBatches, zoneId)) return log(state, `Display blocked: ${zoneId} is full.`);
      return log({ ...state, stockBatches: moveStockBatch(state.stockBatches, action.batchId, 'display', zoneId) }, `Placed one tray batch in ${zoneId}.`);
    }

    case 'AUTODISPLAY_STOCK': {
      const result = autodisplayStock(state.stockBatches);
      return log({ ...state, stockBatches: result.stockBatches }, `Autodisplayed ${result.placedCount} varied batch${result.placedCount === 1 ? '' : 'es'}, prioritising newer plants and premium-value spots.`);
    }

    case 'MOVE_TO_REDUCED': {
      if (!canPlaceBatchInDisplayZone(state.stockBatches, 'reduced-area')) return log(state, 'Reduced area is full.');
      const moved = moveStockBatch(state.stockBatches, action.batchId, 'reduced-area');
      return log({ ...state, stockBatches: updateStockBatchPriceBand(moved, action.batchId, 'reduced') }, 'Moved one tray batch to reduced area at reduced pricing.');
    }

    case 'RETURN_REDUCED_TO_DISPLAY': {
      const zoneId = action.zoneId ?? 'front-table';
      const stockWithoutBatch = state.stockBatches.filter((batch) => batch.id !== action.batchId);
      if (!canPlaceBatchInDisplayZone(stockWithoutBatch, zoneId)) return log(state, `Display blocked: ${zoneId} is full.`);
      return log({ ...state, stockBatches: moveStockBatch(state.stockBatches, action.batchId, 'display', zoneId) }, `Returned reduced tray batch to ${zoneId}.`);
    }

    case 'RETURN_REDUCED_TO_VAN':
      return log({ ...state, stockBatches: moveStockBatch(state.stockBatches, action.batchId, 'van') }, 'Returned reduced tray batch to van.');

    case 'RETURN_BATCH_TO_VAN':
      return log({ ...state, stockBatches: moveStockBatch(state.stockBatches, action.batchId, 'van') }, 'Returned one tray batch to van.');

    case 'RETURN_DISPLAY_TO_VAN':
      return log({ ...state, stockBatches: resetDisplayToVan(state.stockBatches) }, 'Returned display stock to van.');

    case 'WATER_STOCK_BATCH': {
      const watered = waterStockBatch(state.stockBatches, action.batchId);
      return log({ ...state, stockBatches: watered.stockBatches }, `Watered ${watered.changedCount} plants in one tray batch.`);
    }

    case 'SET_TRADING_CLOCK_MODE':
      return log({ ...state, tradingClock: setTradingClockMode(state.tradingClock, action.mode) }, `Trading clock mode set to ${action.mode}.`);

    case 'RUN_TRADING_CHECKPOINT':
      return runTradingCheckpoint(state);

    case 'RUN_REST_TRADING_DAY':
      return runRemainingTradingDay(state);

    case 'RUN_CUSTOMER_WAVE':
      return runTradingCheckpoint(state);

    case 'GENERATE_SPECIAL_REQUEST': {
      if (state.phase !== PHASES.TRADING) return log(state, 'Special request blocked: not in trading phase.');
      if (state.activeRequest) return log(state, 'Special request already active.');
      const request = pickSpecialRequest(state);
      return log({ ...state, activeRequest: request }, `Special request generated: ${request.displayName}.`);
    }

    case 'ANSWER_SPECIAL_REQUEST': {
      if (!state.activeRequest) return log(state, 'No active special request to answer.');
      const scored = scoreSpecialRequest({ state, request: state.activeRequest, batchId: action.batchId });
      return log({
        ...state,
        stockBatches: scored.stockBatches,
        cash: scored.cash,
        activeRequest: null,
        requestLog: [scored.result, ...state.requestLog].slice(0, 12)
      }, `Special request result: ${scored.result.outcome} with ${scored.result.plantName}.`);
    }

    case 'CANCEL_SPECIAL_REQUEST':
      return log({ ...state, activeRequest: null }, 'Special request dismissed without recommendation.');

    case 'END_TRADING_DAY': {
      const revenue = state.tradingLog.reduce((sum, wave) => sum + (wave.revenue ?? 0), 0);
      const requestRevenue = state.requestLog.reduce((sum, request) => sum + (request.revenue ?? 0), 0);
      const salesCount = state.tradingLog.reduce((sum, wave) => sum + (wave.sales?.length ?? 0), 0);
      const missedCount = state.tradingLog.reduce((sum, wave) => sum + (wave.missedDemand?.length ?? 0), 0);
      const pricingSummary = summarizePricingFromTradingLog(state.tradingLog);
      const conditionResult = applyEndOfDayConditionPressure(state.stockBatches, state.selectedWeather);
      const conditionEvents = [...conditionResult.conditionEvents, ...(state.conditionLog ?? [])];
      const conditionSummary = summarizeConditionEvents(conditionEvents);
      const wateredSummary = summarizeWateredStock(conditionResult.stockBatches);
      const displaySummary = getDisplayZoneSummary(conditionResult.stockBatches);
      const packedStockSummary = summarizeUnsoldStock(conditionResult.stockBatches);
      const orderGuidance = buildNextOrderGuidance({ packedStockSummary, tradingLog: state.tradingLog, pricingSummary, conditionSummary });
      const dailyReport = {
        day: state.currentDay,
        cash: state.cash,
        locationId: state.selectedLocationId,
        revenue: revenue + requestRevenue,
        passiveRevenue: revenue,
        requestRevenue,
        salesCount,
        requestCount: state.requestLog.length,
        missedCount,
        tradingClock: state.tradingClock,
        tradingLog: state.tradingLog,
        requestLog: state.requestLog,
        conditionEvents,
        conditionSummary,
        wateredSummary,
        pricingSummary,
        zoneUsage: displaySummary.zoneUsage,
        displayNotes: displaySummary.notes,
        packedStockSummary,
        orderGuidance
      };
      const discovered = buildNotebookDiscoveriesForDay(dailyReport);
      const notebook = mergeNotebookDiscoveries(state.notebook, discovered, state.currentDay);
      const notebookNotes = createNotebookDailyNotes(dailyReport, notebook.lastDiscoveries ?? []);
      const packdown = packUnsoldTradingStockHome(conditionResult.stockBatches);
      const topUnsold = packedStockSummary.slice(0, 3).map((entry) => `${entry.units} ${entry.plantName}`).join(', ');
      const unsoldNote = topUnsold ? ` Unsold highlights: ${topUnsold}.` : '';
      const guidanceNote = orderGuidance[0]?.summary ? ` Next order clue: ${orderGuidance[0].summary}` : '';
      const finalReport = {
        ...dailyReport,
        packedCount: packdown.packedCount,
        notebookDiscoveries: notebook.lastDiscoveries ?? [],
        notebookNotes,
        note: `Trading report: ${salesCount} passive sales, ${state.requestLog.length} special requests, ${missedCount} missed demand notes, £${(revenue + requestRevenue).toFixed(2)} revenue, ${conditionSummary.length} condition notes, ${packdown.packedCount} unsold tray batches packed home, ${(notebook.lastDiscoveries ?? []).length} new notebook entries.${unsoldNote}${guidanceNote}`
      };
      return log({
        ...state,
        stockBatches: packdown.stockBatches,
        conditionLog: conditionEvents,
        notebook,
        activeRequest: null,
        phase: PHASES.DAILY_SUMMARY,
        dailyReports: [...state.dailyReports, finalReport]
      }, `Ended trading day: ${packdown.packedCount} unsold tray batches packed home, ${conditionSummary.length} condition notes, ${(notebook.lastDiscoveries ?? []).length} new notebook entries.`);
    }

    case 'START_EVENING_ORDER':
      return log({ ...state, phase: PHASES.EVENING_ORDER, tradingClock: createTradingClock() }, 'Opened evening wholesaler order.');

    case 'DEBUG_ADD_CASH':
      return log({ ...state, cash: state.cash + action.amount }, `Debug added £${action.amount}.`);

    case 'DEBUG_JUMP_PHASE':
      return log({
        ...state,
        phase: action.phase,
        tradingClock: action.phase === PHASES.TRADING ? createTradingClock() : state.tradingClock
      }, `Debug jumped to ${action.phase}.`);

    case 'DEBUG_NEXT_DAY':
      return log({
        ...state,
        currentDay: Math.min(7, state.currentDay + 1),
        phase: PHASES.MORNING_COLLECTION,
        selectedLocationId: null,
        selectedWeather: weekDayByNumber[Math.min(7, state.currentDay + 1)]?.weather ?? null,
        tradingClock: createTradingClock(),
        tradingWaveIndex: 0,
        tradingLog: [],
        activeRequest: null,
        conditionLog: []
      }, 'Debug jumped to next day.');

    case 'RESET_PROTOTYPE':
      return initialState;

    default:
      return state;
  }
}
