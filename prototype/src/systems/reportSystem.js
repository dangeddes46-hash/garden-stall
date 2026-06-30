import { PHASE_LABELS } from '../data/constants.js';
import { locationById } from '../data/locations.js';

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
  const stockLines = state.stockBatches.length
    ? state.stockBatches.map((batch) => `- ${batch.plantName}: ${batch.quantity} units, ${batch.location}, ${batch.condition}, ${batch.moisture}`).join('\n')
    : '- No stock batches yet';

  const orderLines = state.pendingOrders.length
    ? state.pendingOrders.map((order) => `- ${order.id}: £${order.total.toFixed(2)}, arrives Day ${order.dayArrives}, collected: ${order.collected ? 'yes' : 'no'}`).join('\n')
    : '- No pending orders';

  const requestLines = state.requestLog?.length
    ? state.requestLog.map((request) => `- ${request.requestName}: ${request.outcome}, ${request.plantName}, £${request.revenue.toFixed(2)} — ${request.reason}`).join('\n')
    : '- No special requests resolved yet';

  const conditionLines = state.conditionLog?.length
    ? state.conditionLog.map((event) => `- ${event.plantName}: ${event.fromCondition} → ${event.toCondition}; ${event.fromMoisture} → ${event.toMoisture}; ${event.reason}`).join('\n')
    : '- No condition changes recorded yet';

  return `# Garden Stall Prototype 0.1 Debug Report\n\n` +
    `Generated: ${new Date().toISOString()}\n\n` +
    `## Current State\n\n` +
    `- Day: ${state.currentDay}\n` +
    `- Phase: ${PHASE_LABELS[state.phase] ?? state.phase}\n` +
    `- Cash: £${state.cash.toFixed(2)}\n` +
    `- Location: ${locationName}\n\n` +
    `## Pending Orders\n\n${orderLines}\n\n` +
    `## Stock Batches\n\n${stockLines}\n\n` +
    `## Special Requests\n\n${requestLines}\n\n` +
    `## Condition Changes\n\n${conditionLines}\n\n` +
    `## Debug Log\n\n${state.debugLog.map((entry) => `- ${entry}`).join('\n') || '- No debug actions yet'}\n`;
}
