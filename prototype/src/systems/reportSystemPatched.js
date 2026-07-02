import { PHASE_LABELS } from '../data/constants.js';
import { locationById } from '../data/locations.js';
import { createDebugExport } from './reportSystem.js';
import { describeMoistureForPlayer } from './conditionSystem.js';

function latestReport(state) {
  const reports = state.dailyReports ?? [];
  return reports[reports.length - 1];
}

function bullet(lines, fallback) {
  return lines.length ? lines.map((line) => `- ${line}`).join('\n') : `- ${fallback}`;
}

function soldLines(report) {
  const sales = (report?.tradingLog ?? []).flatMap((wave) => wave.sales ?? []);
  const byPlant = sales.reduce((groups, sale) => {
    const current = groups[sale.plantName] ?? { quantity: 0, revenue: 0 };
    return {
      ...groups,
      [sale.plantName]: {
        quantity: current.quantity + (sale.quantity ?? 0),
        revenue: current.revenue + ((sale.quantity ?? 0) * (sale.unitPrice ?? 0))
      }
    };
  }, {});
  const passive = Object.entries(byPlant).map(([plantName, entry]) => `${entry.quantity} x ${plantName} through passive trade (£${entry.revenue.toFixed(2)})`);
  const requests = (report?.requestLog ?? []).filter((request) => (request.revenue ?? 0) > 0).map((request) => `${request.plantName} answered ${request.requestName} (£${request.revenue.toFixed(2)})`);
  return [...passive, ...requests];
}

function unsoldLines(report) {
  return (report?.packedStockSummary ?? []).slice(0, 8).map((entry) => {
    const notes = [];
    if (entry.tiredBatches > 0) notes.push(`${entry.tiredBatches} tired/past-peak`);
    if (entry.reducedBatches > 0) notes.push(`${entry.reducedBatches} reduced`);
    return `${entry.units} ${entry.plantName} left across ${entry.batches} batch${entry.batches === 1 ? '' : 'es'}${notes.length ? ` (${notes.join(', ')})` : ''}`;
  });
}

function pressureLines(report) {
  const lines = [];
  const soldPlantNames = new Set((report?.tradingLog ?? []).flatMap((wave) => wave.sales ?? []).map((sale) => sale.plantName));
  const untested = (report?.packedStockSummary ?? []).map((entry) => entry.plantName).filter((name) => !soldPlantNames.has(name));
  if (untested.length) lines.push(`${untested.slice(0, 3).join(', ')} never really got a selling test; they were packed home unsold.`);
  if ((report?.missedCount ?? 0) > 0) lines.push(`${report.missedCount} missed demand note${report.missedCount === 1 ? '' : 's'} showed stock, placement, or price gaps.`);
  (report?.displayNotes ?? []).filter((note) => !(note.toLowerCase().includes('nothing is visible') && soldPlantNames.size > 0)).forEach((note) => lines.push(note));
  (report?.pricingSummary?.notes ?? []).forEach((note) => lines.push(note));
  if ((report?.conditionSummary ?? []).length > 0) lines.push('Some visible stock lost freshness; check condition notes before ordering tomorrow.');
  return [...new Set(lines)].slice(0, 8);
}

function guidanceLines(report) {
  return (report?.orderGuidance ?? []).map((entry) => `${entry.summary} (${entry.reason})`);
}

function conditionLines(report) {
  return (report?.conditionSummary ?? []).map((entry) => entry.summary);
}

function rawConditionLines(report, state) {
  const events = report?.conditionEvents?.length ? report.conditionEvents : (state.conditionLog ?? []);
  return events.map((event) => `${event.timing ?? 'unknown'}: ${event.plantName}: ${event.fromCondition} to ${event.toCondition}; ${describeMoistureForPlayer(event.fromMoisture)} to ${describeMoistureForPlayer(event.toMoisture)}; ${event.reason}`);
}

function tomorrowLines(report) {
  const lines = [];
  const topUnsold = (report?.packedStockSummary ?? [])[0];
  if (topUnsold) lines.push(`Decide what to do with leftover ${topUnsold.plantName}: reduce it, move it, or avoid reordering too much`);
  if ((report?.missedCount ?? 0) > 0) lines.push('Use missed demand as tomorrow\'s shopping/placement clue');
  if ((report?.conditionSummary ?? []).length > 0) lines.push('Water thirsty trays before later checkpoints, but avoid repeated watering on the same batch');
  lines.push('Test a simple mix: one colourful draw, one useful edible tray, and one giftable/showy item');
  return [...new Set(lines)].slice(0, 5);
}

export { createDebugExport };

export function createMarkdownReport(state) {
  const report = latestReport(state);
  const locationName = state.selectedLocationId ? locationById[state.selectedLocationId]?.displayName : 'No location selected';
  const moneyLines = report ? [
    `Passive trade: £${Number(report.passiveRevenue ?? 0).toFixed(2)}`,
    `Requests: £${Number(report.requestRevenue ?? 0).toFixed(2)}`,
    `Unsold batches packed home: ${report.packedCount ?? 0}`
  ] : [];
  const orderLines = (state.pendingOrders ?? []).map((order) => `${order.id}: £${order.total.toFixed(2)}, arrives Day ${order.dayArrives}, collected: ${order.collected ? 'yes' : 'no'}`);
  const stockLines = (state.stockBatches ?? []).map((batch) => `${batch.plantName}: ${batch.quantity} units, ${batch.location}, ${batch.condition}, ${describeMoistureForPlayer(batch.moisture)}`);
  const notebookLines = (state.notebook?.discoveries ?? []).map((entry) => `${entry.title} (${entry.category}, Day ${entry.discoveredDay}): ${entry.text}`);

  return `# Garden Stall Prototype 0.1 Debug Report\n\n` +
    `Generated: ${new Date().toISOString()}\n\n` +
    `## Current State\n\n` +
    `- Day: ${state.currentDay}\n` +
    `- Phase: ${PHASE_LABELS[state.phase] ?? state.phase}\n` +
    `- Cash: £${state.cash.toFixed(2)}\n` +
    `- Location: ${locationName}\n\n` +
    `## Daily Review\n\n` +
    `### What Sold\n\n${bullet(soldLines(report), 'No stock sold today')}\n\n` +
    `### What Did Not Sell\n\n${bullet(unsoldLines(report), 'No unsold visible/van stock was packed home')}\n\n` +
    `### Money\n\n${bullet(moneyLines, 'No daily money summary yet')}\n\n` +
    `### What Held Sales Back\n\n${bullet(pressureLines(report), 'No obvious sales blockers were recorded today')}\n\n` +
    `### Next Order Guidance\n\n${bullet(guidanceLines(report), 'No next-order guidance was generated')}\n\n` +
    `### Try Tomorrow\n\n${bullet(tomorrowLines(report), 'No tomorrow notes yet')}\n\n` +
    `## Pending Orders\n\n${bullet(orderLines, 'No pending orders')}\n\n` +
    `## Stock Batches\n\n${bullet(stockLines, 'No stock batches yet')}\n\n` +
    `## Notebook\n\n${bullet(notebookLines, 'No notebook discoveries yet')}\n\n` +
    `## Condition Summary\n\n${bullet(conditionLines(report), 'No condition changes recorded yet')}\n\n` +
    `## Detailed Condition Changes\n\n${bullet(rawConditionLines(report, state), 'No raw condition changes recorded yet')}\n\n` +
    `## Debug Log\n\n${bullet(state.debugLog ?? [], 'No debug actions yet')}\n`;
}
