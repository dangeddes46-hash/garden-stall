import { PHASES, STARTING_CASH } from '../data/constants.js';
import { createTradingClock } from '../systems/tradingClockSystem.js';

export const initialState = {
  prototypeVersion: '0.1.20-evening-order-feedback',
  phase: PHASES.DAY0_ORDER,
  currentDay: 0,
  cash: STARTING_CASH,
  cart: [],
  pendingOrders: [],
  stockBatches: [],
  selectedWeather: null,
  selectedLocationId: null,
  dailyReports: [],
  notebook: {
    discoveries: [],
    lastDiscoveries: [],
    skills: []
  },
  tradingClock: createTradingClock(),
  tradingWaveIndex: 0,
  tradingLog: [],
  activeRequest: null,
  requestLog: [],
  conditionLog: [],
  debugLog: ['Prototype started at Day 0 evening order.']
};
