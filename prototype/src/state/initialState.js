import { PHASES, STARTING_CASH } from '../data/constants.js';

export const initialState = {
  prototypeVersion: '0.1.7-display-zones',
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
    skills: []
  },
  tradingWaveIndex: 0,
  tradingLog: [],
  activeRequest: null,
  requestLog: [],
  conditionLog: [],
  debugLog: ['Prototype started at Day 0 evening order.']
};
