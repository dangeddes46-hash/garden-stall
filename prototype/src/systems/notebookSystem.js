const discoveryCatalog = {
  front_table_colour: {
    id: 'front_table_colour',
    title: 'Colour sells from the front table',
    category: 'Display',
    text: 'Bright, giftable plants become easier impulse buys when they are placed on the Front Table.'
  },
  floor_crates_grow_your_own: {
    id: 'floor_crates_grow_your_own',
    title: 'Grow-your-own stock tolerates crate space',
    category: 'Display',
    text: 'Practical edible stock can still sell from Floor / Crates if the customer already knows what they want.'
  },
  feature_spot_pots: {
    id: 'feature_spot_pots',
    title: 'Feature plants need a feature spot',
    category: 'Display',
    text: 'Showy potted plants are easier to sell when they have a dedicated Feature Spot rather than being lost among trays.'
  },
  bargain_value_buyers: {
    id: 'bargain_value_buyers',
    title: 'Bargain signs move value stock',
    category: 'Pricing',
    text: 'Bargain pricing helps price-sensitive customers commit, especially on useful everyday plants.'
  },
  premium_needs_confidence: {
    id: 'premium_needs_confidence',
    title: 'Premium pricing needs confidence',
    category: 'Pricing',
    text: 'Premium pricing can work, but it needs strong condition, good placement, or obvious gift appeal.'
  },
  reduced_clears_stock: {
    id: 'reduced_clears_stock',
    title: 'Reduced stock clears, but changes the mood',
    category: 'Pricing',
    text: 'Reduced pricing can clear weaker stock, but too much of it makes the stall feel picked over.'
  },
  drying_visible_between_waves: {
    id: 'drying_visible_between_waves',
    title: 'Drying can be spotted before packdown',
    category: 'Condition',
    text: 'Visible stock can dry during the trading day. Checking between waves gives time to water specific trays.'
  },
  requests_teach_customer_needs: {
    id: 'requests_teach_customer_needs',
    title: 'Requests reveal what customers mean',
    category: 'Customers',
    text: 'A successful recommendation teaches more than a sale: it links plant traits to a customer need.'
  },
  missed_demand_is_feedback: {
    id: 'missed_demand_is_feedback',
    title: 'Missed demand is still useful',
    category: 'Customers',
    text: 'Browsers who leave empty-handed are a signal that stock, price, placement, or condition did not line up.'
  }
};

function uniqueById(items) {
  const seen = new Set();
  return items.filter((item) => {
    if (!item || seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });
}

function discovery(id, reason) {
  const base = discoveryCatalog[id];
  if (!base) return null;
  return {
    ...base,
    reason
  };
}

export function buildNotebookDiscoveriesForDay(report) {
  const discoveries = [];
  const sales = report.tradingLog?.flatMap((wave) => wave.sales ?? []) ?? [];
  const missedDemand = report.tradingLog?.flatMap((wave) => wave.missedDemand ?? []) ?? [];
  const priceNotes = report.tradingLog?.flatMap((wave) => wave.priceNotes ?? []) ?? [];
  const requestWins = report.requestLog?.filter((entry) => ['excellent', 'good'].includes(entry.outcome)) ?? [];
  const conditionEvents = report.conditionEvents ?? [];

  if (sales.some((sale) => sale.zoneId === 'front-table')) {
    discoveries.push(discovery('front_table_colour', 'A sale came from the Front Table.'));
  }
  if (sales.some((sale) => sale.zoneId === 'floor-crates')) {
    discoveries.push(discovery('floor_crates_grow_your_own', 'A sale came from Floor / Crates.'));
  }
  if (sales.some((sale) => sale.zoneId === 'feature-spot')) {
    discoveries.push(discovery('feature_spot_pots', 'A sale came from the Feature Spot.'));
  }
  if (sales.some((sale) => sale.priceBand === 'bargain')) {
    discoveries.push(discovery('bargain_value_buyers', 'Bargain pricing converted at least one sale.'));
  }
  if (sales.some((sale) => sale.priceBand === 'premium') || priceNotes.some((note) => note.toLowerCase().includes('premium'))) {
    discoveries.push(discovery('premium_needs_confidence', 'Premium pricing affected today’s customer decisions.'));
  }
  if (sales.some((sale) => sale.priceBand === 'reduced')) {
    discoveries.push(discovery('reduced_clears_stock', 'Reduced pricing cleared at least one item.'));
  }
  if (conditionEvents.some((event) => event.timing?.startsWith('wave-'))) {
    discoveries.push(discovery('drying_visible_between_waves', 'A tray changed moisture during a trading wave.'));
  }
  if (requestWins.length > 0) {
    discoveries.push(discovery('requests_teach_customer_needs', 'A special request was answered well.'));
  }
  if (missedDemand.length > 0 || priceNotes.length > 0) {
    discoveries.push(discovery('missed_demand_is_feedback', 'Customers browsed without buying or hesitated over price.'));
  }

  return uniqueById(discoveries);
}

export function mergeNotebookDiscoveries(notebook, discoveries, day) {
  const existing = notebook?.discoveries ?? [];
  const existingIds = new Set(existing.map((item) => item.id));
  const newDiscoveries = discoveries
    .filter((item) => item && !existingIds.has(item.id))
    .map((item) => ({ ...item, discoveredDay: day }));

  return {
    ...notebook,
    discoveries: [...existing, ...newDiscoveries],
    lastDiscoveries: newDiscoveries
  };
}

export function createNotebookDailyNotes(report, newDiscoveries) {
  const notes = [];
  const discoveryCount = newDiscoveries.length;
  if (discoveryCount > 0) notes.push(`${discoveryCount} new notebook ${discoveryCount === 1 ? 'entry' : 'entries'} added.`);
  if (report.missedCount > 0) notes.push(`${report.missedCount} missed-demand notes are available for review.`);
  if (report.pricingSummary?.notes?.length > 0) notes.push('Pricing produced useful feedback today.');
  if (notes.length === 0) notes.push('No new notebook entries today. Try changing stock mix, zones, or prices tomorrow.');
  return notes;
}
