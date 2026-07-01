export const PHASES = {
  DAY0_ORDER: 'day0-order',
  MORNING_COLLECTION: 'morning-collection',
  WEATHER: 'weather',
  LOCATION_SELECTION: 'location-selection',
  VAN_LOADOUT: 'van-loadout',
  ROUTE_CONFIRMATION: 'route-confirmation',
  DISPLAY_SETUP: 'display-setup',
  TRADING: 'trading',
  DAILY_SUMMARY: 'daily-summary',
  EVENING_ORDER: 'evening-order',
  WEEKLY_SUMMARY: 'weekly-summary',
  FREEPLAY: 'freeplay'
};

export const PHASE_LABELS = {
  [PHASES.DAY0_ORDER]: 'Day 0 Evening Order',
  [PHASES.MORNING_COLLECTION]: 'Morning Collection',
  [PHASES.WEATHER]: 'Weather / Day Conditions',
  [PHASES.LOCATION_SELECTION]: 'Location Selection',
  [PHASES.VAN_LOADOUT]: 'Home Stock / Van Loadout',
  [PHASES.ROUTE_CONFIRMATION]: 'Route / Fuel Confirmation',
  [PHASES.DISPLAY_SETUP]: 'Display Setup',
  [PHASES.TRADING]: 'Trading Day View',
  [PHASES.DAILY_SUMMARY]: 'Daily Summary',
  [PHASES.EVENING_ORDER]: 'Evening Wholesaler Order',
  [PHASES.WEEKLY_SUMMARY]: 'Weekly Summary',
  [PHASES.FREEPLAY]: 'Freeplay / Complete'
};

export const PRICE_BANDS = ['bargain', 'normal', 'premium', 'reduced'];
export const CONDITIONS = ['excellent', 'good', 'tired', 'past-peak', 'unsellable'];
export const MOISTURE = ['waterlogged', 'watered', 'damp', 'dry', 'bone-dry'];
export const STOCK_LOCATIONS = ['home', 'van', 'display', 'reduced-area', 'sold', 'discarded'];

export const DISPLAY_ZONES = [
  {
    id: 'front-table',
    label: 'Front Table',
    capacity: 4,
    note: 'High visibility. Best for colourful, giftable, small, or impulse stock.'
  },
  {
    id: 'floor-crates',
    label: 'Floor / Crates',
    capacity: 6,
    note: 'Practical space for grow-your-own trays, compost, pots, and larger useful stock.'
  },
  {
    id: 'feature-spot',
    label: 'Feature Spot',
    capacity: 2,
    note: 'Premium attention space for showy potted plants and statement items.'
  },
  {
    id: 'reduced-area',
    label: 'Reduced Area',
    capacity: 3,
    note: 'Honest clearance space. Helps bargain hunters but can make the stall look tired.'
  }
];

export const STARTING_CASH = 80;
export const ORDER_FEE = 5;
export const FEE_FREE_THRESHOLD = 100;
export const VAN_CAPACITY = 12;
export const HOME_CAPACITY = 24;
