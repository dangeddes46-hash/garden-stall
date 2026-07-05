import { PHASE_LABELS, DISPLAY_ZONES, STARTING_CASH } from '../data/constants.js';
import { locationById } from '../data/locations.js';
import { describeMoistureForPlayer, summarizeConditionEvents } from './conditionSystem.js';
import { describePriceBand } from './pricingSystem.js';
import { buildWeekStrategyNote } from './weekStatsSystem.js';

function zoneLabel(zoneId) { return DISPLAY_ZONES.find((zone) => zone.id === zoneId)?.label ?? zoneId ?? 'none'; }
function latestReport(state) { const reports = state.dailyReports ?? []; return reports[reports.length - 1]; }
function money(value) { return `GBP${Number(value ?? 0).toFixed(2)}`; }
function conditionPhrase(entry) {
  if (entry?.mixedCondition) return `, mixed condition${entry.dominantCondition ? `, mostly ${entry.dominantCondition}` : ''}`;
  return entry?.dominantCondition ? ` ${entry.dominantCondition}` : '';
}

function buildSalesLines(report) {
  const sales = (report?.tradingLog ?? []).flatMap((wave) => wave.sales ?? []);
  const groups = sales.reduce((summary, sale) => {
    const key = sale.plantName ?? 'Unknown stock';
    const current = summary[key] ?? { plantName: key, quantity: 0, revenue: 0 };
    return { ...summary, [key]: { ...current, quantity: current.quantity + (sale.quantity ?? 0), revenue: current.revenue + ((sale.quantity ?? 0) * (sale.unitPrice ?? 0)) } };
  }, {});
  const passiveLines = Object.values(groups).sort((a, b) => b.revenue - a.revenue).map((entry) => `- ${entry.quantity} x ${entry.plantName} through passive trade (${money(entry.revenue)})`);
  const requestLines = (report?.requestLog ?? []).filter((request) => (request.revenue ?? 0) > 0).map((request) => `- ${request.plantName} answered ${request.requestName} (${money(request.revenue)})`);
  const lines = [...passiveLines, ...requestLines];
  return lines.length ? lines.join('\n') : '- No stock sold today';
}

function buildUnsoldLines(report) {
  const packed = report?.packedStockSummary ?? [];
  if (packed.length === 0) return '- No unsold visible/van stock was packed home';
  return packed.slice(0, 8).map((entry) => {
    const suffix = entry.reducedBatches > 0 ? ` (${entry.reducedBatches} reduced)` : '';
    if (entry.mixedCondition) return `- ${entry.units} ${entry.plantName} left across ${entry.batches} batch${entry.batches === 1 ? '' : 'es'}${conditionPhrase(entry)}${suffix}`;
    return `- ${entry.units}${conditionPhrase(entry)} ${entry.plantName} left across ${entry.batches} batch${entry.batches === 1 ? '' : 'es'}${suffix}`;
  }).join('\n');
}

function buildPressureLines(report) {
  const lines = [];
  const missedCount = report?.missedCount ?? 0;
  const soldPlantNames = new Set((report?.tradingLog ?? []).flatMap((wave) => wave.sales ?? []).map((sale) => sale.plantName));
  const untested = (report?.packedStockSummary ?? []).map((entry) => entry.plantName).filter((name) => !soldPlantNames.has(name));
  if (untested.length > 0) lines.push(`- ${untested.slice(0, 3).join(', ')} never really got a selling test; they were packed home unsold.`);
  if (missedCount > 0) lines.push(`- ${missedCount} missed demand note${missedCount === 1 ? '' : 's'} showed stock or placement gaps`);
  (report?.displayNotes ?? []).filter((note) => !(note.toLowerCase().includes('nothing is visible') && soldPlantNames.size > 0)).slice(0, 3).forEach((note) => lines.push(`- ${note}`));
  (report?.pricingSummary?.notes ?? []).slice(0, 3).forEach((note) => lines.push(`- ${note}`));
  if ((report?.conditionSummary ?? []).length > 0) lines.push('- Some visible stock lost freshness; check condition notes before ordering tomorrow');
  return lines.length ? [...new Set(lines)].slice(0, 8).join('\n') : '- No obvious sales blockers were recorded today';
}

function buildOrderGuidanceLines(report) { const guidance = report?.orderGuidance ?? []; return guidance.length ? guidance.map((entry) => `- ${entry.summary} (${entry.reason})`).join('\n') : '- No next-order guidance was generated'; }
function buildTomorrowLines(report) {
  const lines = [];
  const missedCount = report?.missedCount ?? 0;
  const reducedSold = report?.pricingSummary?.soldByBand?.reduced ?? 0;
  const premiumSold = report?.pricingSummary?.soldByBand?.premium ?? 0;
  const topUnsold = (report?.packedStockSummary ?? [])[0];
  if (topUnsold) lines.push(`- Decide what to do with leftover ${topUnsold.plantName}: reduce it, move it, or avoid reordering too much`);
  if (missedCount > 0) lines.push('- Use missed demand as tomorrow shopping/placement clue');
  if (reducedSold > 0) lines.push('- Reduced stock can clear awkward leftovers, but keep it from taking over the stall mood');
  if (premiumSold === 0) lines.push('- Try premium pricing only on good-condition stock in a strong zone');
  if ((report?.conditionSummary ?? []).length > 0) lines.push('- Water thirsty trays before later waves, but avoid repeated watering on the same batch');
  lines.push('- Test a simple mix: one colourful draw, one useful edible tray, and one giftable/showy item');
  return [...new Set(lines)].slice(0, 5).join('\n');
}

function buildWeekLines(state) {
  const stats = state.weekStats;
  if (!stats || stats.daysCompleted === 0) return '- No completed trading days yet';
  const best = stats.bestRevenueDay ? `Day ${stats.bestRevenueDay.day} at ${money(stats.bestRevenueDay.revenue)}` : 'not established yet';
  return [`- Days completed: ${stats.daysCompleted}`, `- Total revenue: ${money(stats.totalRevenue)}`, `- Best day: ${best}`, `- Total missed demand: ${stats.totalMissedDemand}`, `- Notebook discoveries: ${stats.notebookDiscoveriesCount}`, `- Strategy note: ${buildWeekStrategyNote(stats)}`].join('\n');
}

function buildDailyBreakdown(state) {
  const reports = state.dailyReports ?? [];
  if (reports.length === 0) return '- No daily reports yet';
  return reports.map((report) => {
    const location = report.locationId ? locationById[report.locationId]?.displayName ?? report.locationId : 'No location';
    const topUnsold = (report.packedStockSummary ?? [])[0];
    const topUnsoldText = topUnsold ? `${topUnsold.units}${conditionPhrase(topUnsold)} ${topUnsold.plantName}` : 'none';
    return `- Day ${report.day}: ${location}; revenue ${money(report.revenue)}; order spend ${money(report.orderSpend)}; sales ${report.salesCount}; requests ${money(report.requestRevenue)} / ${report.requestCount}; missed ${report.missedCount}; packed home ${report.packedCount ?? 0}; condition notes ${(report.conditionSummary ?? []).length}; top unsold ${topUnsoldText}`;
  }).join('\n');
}

function buildStockSummary(state) {
  const stock = state.stockBatches ?? [];
  const group = (label, filter) => {
    const batches = stock.filter(filter);
    if (batches.length === 0) return `- ${label}: none`;
    const units = batches.reduce((sum, batch) => sum + (batch.quantity ?? 0), 0);
    const names = [...new Set(batches.map((batch) => batch.plantName))].slice(0, 5).join(', ');
    return `- ${label}: ${units} units across ${batches.length} batches (${names})`;
  };
  return [
    group('Sellable home stock', (batch) => batch.location === 'home' && !['tired', 'past-peak', 'unsellable'].includes(batch.condition) && batch.loadType !== 'sundry'),
    group('Tired/past-peak stock', (batch) => ['tired', 'past-peak'].includes(batch.condition)),
    group('Unsellable stock', (batch) => batch.condition === 'unsellable'),
    group('Sold stock summary', (batch) => batch.location === 'sold'),
    group('Sundries', (batch) => batch.loadType === 'sundry')
  ].join('\n');
}

function buildWeeklyAccounting(state) {
  const reports = state.dailyReports ?? [];
  const totalOrderSpend = reports.reduce((sum, report) => sum + (report.orderSpend ?? 0), 0);
  const totalRevenue = reports.reduce((sum, report) => sum + (report.revenue ?? 0), 0);
  const remainingStock = (state.stockBatches ?? []).filter((batch) => batch.quantity > 0 && batch.location !== 'sold');
  const remainingUnits = remainingStock.reduce((sum, batch) => sum + (batch.quantity ?? 0), 0);
  const remainingWholesaleValue = remainingStock.reduce((sum, batch) => sum + ((batch.wholesaleCostPerUnit ?? 0) * (batch.quantity ?? 0)), 0);
  const unsellable = remainingStock.filter((batch) => batch.condition === 'unsellable');
  const unsellableUnits = unsellable.reduce((sum, batch) => sum + (batch.quantity ?? 0), 0);
  const unsellableValue = unsellable.reduce((sum, batch) => sum + ((batch.wholesaleCostPerUnit ?? 0) * (batch.quantity ?? 0)), 0);
  const premiumRevenue = reports.reduce((sum, report) => sum + (report.pricingSummary?.revenue?.premium ?? 0), 0);
  const premiumShare = totalRevenue > 0 ? `${Math.round((premiumRevenue / totalRevenue) * 100)}%` : '0%';
  return [`- Starting cash: ${money(STARTING_CASH)}`, `- Total order spend: ${money(totalOrderSpend)}`, `- Total revenue: ${money(totalRevenue)}`, `- Final cash: ${money(state.cash)}`, `- Cash gain/loss versus start: ${money((state.cash ?? 0) - STARTING_CASH)}`, `- Remaining stock units: ${remainingUnits}`, `- Rough remaining wholesale value: ${money(remainingWholesaleValue)}`, `- Unsellable stock: ${unsellableUnits} units / ${money(unsellableValue)}`, `- Premium revenue/share: ${money(premiumRevenue)} / ${premiumShare}`].join('\n');
}

export function createDebugExport(state) {
  return { exportedAt: new Date().toISOString(), prototype: 'Garden Stall Prototype 0.1', phase: state.phase, phaseLabel: PHASE_LABELS[state.phase], currentDay: state.currentDay, cash: state.cash, selectedLocation: state.selectedLocationId ? locationById[state.selectedLocationId]?.displayName : null, pendingOrders: state.pendingOrders, stockBatches: state.stockBatches, activeRequest: state.activeRequest, tradingLog: state.tradingLog, requestLog: state.requestLog, conditionLog: state.conditionLog, dailyReports: state.dailyReports, weekStats: state.weekStats, notebook: state.notebook, debugLog: state.debugLog };
}

export function createMarkdownReport(state) {
  const locationName = state.selectedLocationId ? locationById[state.selectedLocationId]?.displayName : 'No location selected';
  const report = latestReport(state);
  const stockLines = state.stockBatches.length ? state.stockBatches.map((batch) => `- ${batch.plantName}: ${batch.quantity} units, ${batch.location}, ${zoneLabel(batch.location === 'reduced-area' ? 'reduced-area' : batch.zoneId)}, ${describePriceBand(batch.priceBand ?? 'normal')}, ${money(batch.unitRetailPrice)}, ${batch.condition}, ${describeMoistureForPlayer(batch.moisture)}`).join('\n') : '- No stock batches yet';
  const orderLines = state.pendingOrders.length ? state.pendingOrders.map((order) => `- ${order.id}: ${money(order.total)}, arrives Day ${order.dayArrives}, collected: ${order.collected ? 'yes' : 'no'}`).join('\n') : '- No pending orders';
  const requestSource = report?.requestLog ?? state.requestLog ?? [];
  const requestLines = requestSource.length ? requestSource.map((request) => `- ${request.requestName}: ${request.outcome}, ${request.plantName}, ${describePriceBand(request.priceBand ?? 'normal')}, ${money(request.revenue)} - ${request.reason}`).join('\n') : '- No special requests resolved yet';
  const conditionSummary = report?.conditionSummary ?? summarizeConditionEvents(state.conditionLog ?? []);
  const conditionLines = conditionSummary.length ? conditionSummary.map((entry) => `- ${entry.summary}`).join('\n') : '- No condition changes recorded yet';
  const rawConditionEvents = report?.conditionEvents?.length ? report.conditionEvents : (state.conditionLog ?? []);
  const rawConditionLines = rawConditionEvents.length ? rawConditionEvents.map((event) => `- ${event.timing ?? 'unknown'}: ${event.plantName}: ${event.fromCondition} to ${event.toCondition}; ${describeMoistureForPlayer(event.fromMoisture)} to ${describeMoistureForPlayer(event.toMoisture)}; ${event.reason}`).join('\n') : '- No raw condition changes recorded yet';
  const pricingLines = report?.pricingSummary?.notes?.length ? report.pricingSummary.notes.map((note) => `- ${note}`).join('\n') : '- No pricing summary yet';
  const notebookLines = state.notebook?.discoveries?.length ? state.notebook.discoveries.map((entry) => `- ${entry.title} (${entry.category}, Day ${entry.discoveredDay}): ${entry.text}`).join('\n') : '- No notebook discoveries yet';
  const moneyLines = report ? `- Passive trade: ${money(report.passiveRevenue)}\n- Requests: ${money(report.requestRevenue)}\n- Unsold batches packed home: ${report.packedCount ?? 0}` : '- No daily money summary yet';
  return `# Garden Stall Prototype 0.1 Debug Report\n\nGenerated: ${new Date().toISOString()}\n\n` +
    `## Current State\n\n- Day: ${state.currentDay}\n- Phase: ${PHASE_LABELS[state.phase] ?? state.phase}\n- Cash: ${money(state.cash)}\n- Location: ${locationName}\n\n` +
    `## Daily Review\n\n### What Sold\n\n${buildSalesLines(report)}\n\n### What Did Not Sell\n\n${buildUnsoldLines(report)}\n\n### Money\n\n${moneyLines}\n\n### What Held Sales Back\n\n${buildPressureLines(report)}\n\n### Next Order Guidance\n\n${buildOrderGuidanceLines(report)}\n\n### Try Tomorrow\n\n${buildTomorrowLines(report)}\n\n` +
    `## Week So Far\n\n${buildWeekLines(state)}\n\n## Seven-Day Breakdown\n\n${buildDailyBreakdown(state)}\n\n## Weekly Accounting\n\n${buildWeeklyAccounting(state)}\n\n` +
    `## Pending Orders\n\n${orderLines}\n\n## Stock Summary\n\n${buildStockSummary(state)}\n\n## Stock Batches\n\n${stockLines}\n\n` +
    `## Special Requests\n\n${requestLines}\n\n## Pricing\n\n${pricingLines}\n\n## Notebook\n\n${notebookLines}\n\n## Condition Summary\n\n${conditionLines}\n\n## Detailed Condition Changes\n\n${rawConditionLines}\n\n## Debug Log\n\n${state.debugLog.map((entry) => `- ${entry}`).join('\n') || '- No debug actions yet'}\n`;
}
