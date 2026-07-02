function latestReport(state) {
  const reports = state.dailyReports ?? [];
  return reports[reports.length - 1] ?? null;
}

function unique(lines) {
  return [...new Set(lines.filter(Boolean))];
}

export function buildEveningOrderFeedback(state) {
  const report = latestReport(state);
  if (!report) {
    return {
      hasReport: false,
      title: 'First order: build a balanced basket',
      lines: [
        'Start with a simple mix: one colourful draw, one useful edible/grow-your-own tray, and one giftable/showy item.',
        'Avoid spending all your cash on one plant type before you have seen what this location wants.'
      ],
      warnings: [],
      guidance: []
    };
  }

  const unsold = report.packedStockSummary ?? [];
  const guidance = report.orderGuidance ?? [];
  const topUnsold = unsold[0];
  const missedCount = report.missedCount ?? 0;
  const conditionCount = report.conditionSummary?.length ?? 0;
  const soldPlantNames = new Set((report.tradingLog ?? []).flatMap((wave) => wave.sales ?? []).map((sale) => sale.plantName));
  const untestedNames = unsold.map((entry) => entry.plantName).filter((name) => !soldPlantNames.has(name));

  const lines = [];
  const warnings = [];

  if (topUnsold) {
    lines.push(`${topUnsold.plantName} was the largest leftover: ${topUnsold.units} packed home across ${topUnsold.batches} batch${topUnsold.batches === 1 ? '' : 'es'}.`);
  }

  if (untestedNames.length > 0) {
    lines.push(`${untestedNames.slice(0, 3).join(', ')} did not really get a selling test. Consider displaying leftovers before buying more.`);
  }

  if (missedCount > 0) {
    warnings.push(`${missedCount} missed demand note${missedCount === 1 ? '' : 's'} appeared yesterday. Check whether today needs different stock, price, or placement.`);
  }

  if (conditionCount > 0) {
    warnings.push(`${conditionCount} condition note${conditionCount === 1 ? '' : 's'} appeared. Be careful ordering more thirsty/high-risk stock unless you plan to check it during trading.`);
  }

  if ((report.pricingSummary?.soldByBand?.premium ?? 0) > 0) {
    lines.push('Premium pricing worked on at least some stock yesterday. Keep it for fresh, well-placed, obvious-value plants.');
  }

  if ((report.pricingSummary?.soldByBand?.reduced ?? 0) > 0) {
    lines.push('Reduced pricing helped clear stock. Treat it as a cleanup tool, not the main stall identity.');
  }

  return {
    hasReport: true,
    title: `Yesterday's buying clues — Day ${report.day}`,
    lines: unique(lines).slice(0, 5),
    warnings: unique(warnings).slice(0, 3),
    guidance: guidance.slice(0, 4)
  };
}
