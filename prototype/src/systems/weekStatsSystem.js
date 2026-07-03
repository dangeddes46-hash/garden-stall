export function createInitialWeekStats() {
  return {
    daysCompleted: 0,
    totalRevenue: 0,
    totalPassiveRevenue: 0,
    totalRequestRevenue: 0,
    totalSalesCount: 0,
    totalRequestCount: 0,
    totalMissedDemand: 0,
    totalPackedHome: 0,
    totalConditionNotes: 0,
    bestRevenueDay: null,
    bestLocation: null,
    mostUnsoldPlant: null,
    notebookDiscoveriesCount: 0,
    unsoldByPlant: {}
  };
}

function roundMoney(value) {
  return Number(Number(value ?? 0).toFixed(2));
}

export function updateWeekStats(previousStats, dailyReport, notebook) {
  const previous = previousStats ?? createInitialWeekStats();
  const report = dailyReport ?? {};
  const nextDaysCompleted = Math.max(previous.daysCompleted ?? 0, report.day ?? 0);
  const totalRevenue = roundMoney((previous.totalRevenue ?? 0) + (report.revenue ?? 0));
  const totalPassiveRevenue = roundMoney((previous.totalPassiveRevenue ?? 0) + (report.passiveRevenue ?? 0));
  const totalRequestRevenue = roundMoney((previous.totalRequestRevenue ?? 0) + (report.requestRevenue ?? 0));
  const totalSalesCount = (previous.totalSalesCount ?? 0) + (report.salesCount ?? 0);
  const totalRequestCount = (previous.totalRequestCount ?? 0) + (report.requestCount ?? 0);
  const totalMissedDemand = (previous.totalMissedDemand ?? 0) + (report.missedCount ?? 0);
  const totalPackedHome = (previous.totalPackedHome ?? 0) + (report.packedCount ?? 0);
  const totalConditionNotes = (previous.totalConditionNotes ?? 0) + ((report.conditionSummary ?? []).length);

  const bestRevenueDay = !previous.bestRevenueDay || (report.revenue ?? 0) > (previous.bestRevenueDay.revenue ?? 0)
    ? { day: report.day, revenue: roundMoney(report.revenue ?? 0), locationId: report.locationId ?? null }
    : previous.bestRevenueDay;

  const unsoldByPlant = { ...(previous.unsoldByPlant ?? {}) };
  (report.packedStockSummary ?? []).forEach((entry) => {
    unsoldByPlant[entry.plantName] = (unsoldByPlant[entry.plantName] ?? 0) + (entry.units ?? 0);
  });

  const mostUnsoldPlant = Object.entries(unsoldByPlant).sort((a, b) => b[1] - a[1])[0];

  return {
    daysCompleted: nextDaysCompleted,
    totalRevenue,
    totalPassiveRevenue,
    totalRequestRevenue,
    totalSalesCount,
    totalRequestCount,
    totalMissedDemand,
    totalPackedHome,
    totalConditionNotes,
    bestRevenueDay,
    bestLocation: bestRevenueDay?.locationId ?? previous.bestLocation ?? null,
    mostUnsoldPlant: mostUnsoldPlant ? { plantName: mostUnsoldPlant[0], units: mostUnsoldPlant[1] } : null,
    notebookDiscoveriesCount: (notebook?.discoveries ?? []).length,
    unsoldByPlant
  };
}

export function buildWeekStrategyNote(weekStats) {
  const stats = weekStats ?? createInitialWeekStats();
  if ((stats.daysCompleted ?? 0) === 0) return 'No trading days completed yet. Start with a balanced first order and watch what customers ask for.';
  if ((stats.totalMissedDemand ?? 0) > 0) return 'Missed demand is still appearing, so tomorrow should test one customer need rather than simply restocking the biggest leftover.';
  if (stats.mostUnsoldPlant) return `${stats.mostUnsoldPlant.plantName} is building up as leftover stock, so treat it carefully before reordering.`;
  if ((stats.totalConditionNotes ?? 0) > 0) return 'Condition notes are building up, so water timing and display exposure deserve attention tomorrow.';
  return 'The week is steady so far. Keep a balanced mix and change only one thing at a time.';
}

export function buildWeeklyLesson(weekStats) {
  const stats = weekStats ?? createInitialWeekStats();
  const strongest = stats.bestRevenueDay
    ? `Strongest pattern: Day ${stats.bestRevenueDay.day} was the best revenue day at GBP${Number(stats.bestRevenueDay.revenue ?? 0).toFixed(2)}.`
    : 'Strongest pattern: not enough trading data yet.';
  const weakest = stats.mostUnsoldPlant
    ? `Weakest pattern: ${stats.mostUnsoldPlant.plantName} was the largest accumulated leftover line.`
    : stats.totalMissedDemand > 0
      ? 'Weakest pattern: missed demand still needs clearer ordering or display tests.'
      : 'Weakest pattern: no single weak line stands out yet.';
  return { strongest, weakest };
}
