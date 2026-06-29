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
    dailyReports: state.dailyReports,
    notebook: state.notebook,
    debugLog: state.debugLog
  };
}

export function createMarkdownReport(state) {
  const locationName = state.selectedLocationId ? locationById[state.selectedLocationId]?.displayName : 'No location selected';
  const stockLines = state.stockBatches.length
    ? state.stockBatches.map((batch) => `- ${batch.plantName}: ${batch.quantity} units, ${batch.location}, ${batch.condition}`).join('\n')
    : '- No stock batches yet';

  const orderLines = state.pendingOrders.length
    ? state.pendingOrders.map((order) => `- ${order.id}: £${order.total.toFixed(2)}, arrives Day ${order.dayArrives}, collected: ${order.collected ? 'yes' : 'no'}`).join('\n')
    : '- No pending orders';

  return `# Garden Stall Prototype 0.1 Debug Report\n\n` +
    `Generated: ${new Date().toISOString()}\n\n` +
    `## Current State\n\n` +
    `- Day: ${state.currentDay}\n` +
    `- Phase: ${PHASE_LABELS[state.phase] ?? state.phase}\n` +
    `- Cash: £${state.cash.toFixed(2)}\n` +
    `- Location: ${locationName}\n\n` +
    `## Pending Orders\n\n${orderLines}\n\n` +
    `## Stock Batches\n\n${stockLines}\n\n` +
    `## Debug Log\n\n${state.debugLog.map((entry) => `- ${entry}`).join('\n') || '- No debug actions yet'}\n`;
}
