import { PHASE_LABELS, DISPLAY_ZONES } from '../data/constants.js';
import { locationById } from '../data/locations.js';
import { describeMoistureForPlayer, summarizeConditionEvents } from './conditionSystem.js';
import { describePriceBand } from './pricingSystem.js';

function zoneLabel(zoneId) {
  return DISPLAY_ZONES.find((zone) => zone.id === zoneId)?.label ?? zoneId ?? 'none';
}

function latestReport(state) {
  const reports = state.dailyReports ?? [];
  return reports[reports.length - 1];
}

function buildSalesLines(report) {
  const sales = (report?.tradingLog ?? []).flatMap((wave) => wave.sales ?? []);
  const groups = sales.reduce((summary, sale) => {
    const key = sale.plantName ?? 'Unknown stock';
    const current = summary[key] ?? { plantName: key, quantity: 0, revenue: 0 };
    return {
      ...summary,
      [key]: {
        ...current,
        quantity: current.quantity + (sale.quantity ?? 0),
        revenue: current.revenue + ((sale.quantity ?? 0) * (sale.unitPrice ?? 0))
      }
    };
  }, {});

  const passiveLines = Object.values(groups)
    .sort((a, b) => b.revenue - a.revenue)
    .map((entry) => `- ${entry.quantity} x ${entry.plantName} through passive trade (£${entry.revenue.toFixed(2)})`);

  const requestLines = (report?.requestLog ?? [])
    .filter((request) => (request.revenue ?? 0) > 0)
    .map((request) => `- ${request.plantName} answered ${request.requestName} (£${request.revenue.toFixed(2)})`);

  const lines = [...passiveLines, ...requestLines];
  return lines.length ? lines.join('\n') : '- No stock sold today';
}

function buildUnsoldLines(report) {
  const packed = report?.packedStockSummary ?? [];
  if (packed.length === 0) return '- No unsold visible/van stock was packed home';
  return packed.slice(0, 8).map((entry) => {
    const notes = [];
    if (entry.tiredBatches > 0) notes.push(`${entry.tiredBatches} tired/past-peak`);
    if (entry.reducedBatches > 0) notes.push(`${entry.reducedBatches} reduced`);
    const suffix = notes.length ? ` (${notes.join(', ')})` : '';
    return `- ${entry.units} ${entry.plantName} left across ${entry.batches} batch${entry.batches === 1 ? '' : 'es'}${suffix}`;
  }).join('\n');
}

function buildPressureLines(report) {
  const lines = [];
  const missedCount = report?.missedCount ?? 0;
  if (missedCount > 0) lines.push(`- ${missedCount} missed demand note${missedCount === 1 ? '' : 's'} showed stock or placement gaps`);
  (report?.displayNotes ?? []).slice(0, 3).forEach((note) => lines.push(`- ${note}`));
  (report?.pricingSummary?.notes ?? []).slice(0, 3).forEach((note) => lines.push(`- ${note}`));
  if ((report?.conditionSummary ?? []).length > 0) lines.push('- Some visible stock lost freshness; check condition notes before ordering tomorrow');
  return lines.length ? [...new Set(lines)].slice(0, 8).join('\n') : '- No obvious sales blockers were recorded today';
}

function buildOrderGuidanceLines(report) {
  const guidance = report?.orderGuidance ?? [];
  if (guidance.length === 0) return '- No next-order guidance was generated';
  return guidance.map((entry) => `- ${entry.summary} (${entry.reason})`).join('\n');
}

function buildTomorrowLines(report) {
  const lines = [];
  const missedCount = report?.missedCount ?? 0;
  const reducedSold = report?.pricingSummary?.soldByBand?.reduced ?? 0;
  const premiumSold = report?.pricingSummary?.soldByBand?.premium ?? 0;
  const unsold = report?.packedStockSummary ?? [];
  const topUnsold = unsold[0];

  if (topUnsold) lines.push(`- Decide what to do with leftover ${topUnsold.plantName}: reduce it, move it, or avoid reordering too much`);
  if (missedCount > 0) lines.push('- Use missed demand as tomorrow\'s shopping/placement clue');
  if (reducedSold > 0) lines.push('- Reduced stock can clear awkward leftovers, but keep it from taking over the stall mood');
  if (premiumSold === 0) lines.push('- Try premium pricing only on good-condition stock in a strong zone');
  if ((report?.conditionSummary ?? []).length > 0) lines.push('- Water thirsty trays before later waves, but avoid repeated watering on the same batch');
  lines.push('- Test a simple mix: one colourful draw, one useful edible tray, and one giftable/showy item');

  return [...new Set(lines)].slice(0, 5).join('\n');
}

export function createDebugExport(state) {
  return {
    exportedAt: new Date().toISOString(),
    prototype: 'Garden Stall Prototype 0.1',
    phase: state.phase,
    phaseLabel: PHASE_LABELS[state.phase],
    currentDay: state.currentDay,
    cash: state.cash,
    selectedLocation: state.selectedLocationId ? locationById[state.selectedLocationId]?.displayName : null,
    pendingOrders: state.pendingOrders,
    stockBatches: state.stockBatches,
    activeRequest: state.activeRequest,
    tradingLog: state.tradingLog,
    requestLog: state.requestLog,
    conditionLog: state.conditionLog,
    dailyReports: state.dailyReports,
    notebook: state.notebook,
    debugLog: state.debugLog
  };
}

export function createMarkdownReport(state) {
  const locationName = state.selectedLocationId ? locationById[state.selectedLocationId]?.displayName : 'No location selected';
  const report = latestReport(state);
  const stockLines = state.stockBatches.length
    ? state.stockBatches.map((batch) => `- ${batch.plantName}: ${batch.quantity} units, ${batch.location}, ${zoneLabel(batch.location === 'reduced-area' ? 'reduced-area' : batch.zoneId)}, ${describePriceBand(batch.priceBand ?? 'normal')}, £${Number(batch.unitRetailPrice ?? 0).toFixed(2)}, ${batch.condition}, ${describeMoistureForPlayer(batch.moisture)}`).join('\n')
    : '- No stock batches yet';

  const orderLines = state.pendingOrders.length
    ? state.pendingOrders.map((order) => `- ${order.id}: £${order.total.toFixed(2)}, arrives Day ${order.dayArrives}, collected: ${order.collected ? 'yes' : 'no'}`).join('\n')
    : '- No pending orders';

  const requestLines = state.requestLog?.length
    ? state.requestLog.map((request) => `- ${request.requestName}: ${request.outcome}, ${request.plantName}, ${describePriceBand(request.priceBand ?? 'normal')}, £${request.revenue.toFixed(2)} - ${request.reason}`).join('\n')
    : '- No special requests resolved yet';

  const conditionSummary = report?.conditionSummary ?? summarizeConditionEvents(state.conditionLog ?? []);
  const conditionLines = conditionSummary.length
    ? conditionSummary.map((entry) => `- ${entry.summary}`).join('\n')
    : '- No condition changes recorded yet';

  const rawConditionLines = state.conditionLog?.length
    ? state.conditionLog.map((event) => `- ${event.timing ?? 'unknown'}: ${event.plantName}: ${event.fromCondition} to ${event.toCondition}; ${describeMoistureForPlayer(event.fromMoisture)} to ${describeMoistureForPlayer(event.toMoisture)}; ${event.reason}`).join('\n')
    : '- No raw condition changes recorded yet';

  const pricingLines = report?.pricingSummary?.notes?.length
    ? report.pricingSummary.notes.map((note) => `- ${note}`).join('\n')
    : '- No pricing summary yet';

  const notebookLines = state.notebook?.discoveries?.length
    ? state.notebook.discoveries.map((entry) => `- ${entry.title} (${entry.category}, Day ${entry.discoveredDay}): ${entry.text}`).join('\n')
    : '- No notebook discoveries yet';

  const moneyLines = report
    ? `- Passive trade: £${Number(report.passiveRevenue ?? 0).toFixed(2)}\n- Requests: £${Number(report.requestRevenue ?? 0).toFixed(2)}\n- Unsold batches packed home: ${report.packedCount ?? 0}`
    : '- No daily money summary yet';

  return `# Garden Stall Prototype 0.1 Debug Report\n\n` +
    `Generated: ${new Date().toISOString()}\n\n` +
    `## Current State\n\n` +
    `- Day: ${state.currentDay}\n` +
    `- Phase: ${PHASE_LABELS[state.phase] ?? state.phase}\n` +
    `- Cash: £${state.cash.toFixed(2)}\n` +
    `- Location: ${locationName}\n\n` +
    `## Daily Review\n\n` +
    `### What Sold\n\n${buildSalesLines(report)}\n\n` +
    `### What Did Not Sell\n\n${buildUnsoldLines(report)}\n\n` +
    `### Money\n\n${moneyLines}\n\n` +
    `### What Held Sales Back\n\n${buildPressureLines(report)}\n\n` +
    `### Next Order Guidance\n\n${buildOrderGuidanceLines(report)}\n\n` +
    `### Try Tomorrow\n\n${buildTomorrowLines(report)}\n\n` +
    `## Pending Orders\n\n${orderLines}\n\n` +
    `## Stock Batches\n\n${stockLines}\n\n` +
    `## Special Requests\n\n${requestLines}\n\n` +
    `## Pricing\n\n${pricingLines}\n\n` +
    `## Notebook\n\n${notebookLines}\n\n` +
    `## Condition Summary\n\n${conditionLines}\n\n` +
    `## Detailed Condition Changes\n\n${rawConditionLines}\n\n` +
    `## Debug Log\n\n${state.debugLog.map((entry) => `- ${entry}`).join('\n') || '- No debug actions yet'}\n`;
}
