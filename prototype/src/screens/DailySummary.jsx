import { Card, money } from '../components/ui.jsx';
import { buildWeekStrategyNote } from '../systems/weekStatsSystem.js';

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

  const lines = Object.values(groups)
    .sort((a, b) => b.revenue - a.revenue)
    .map((entry) => `${entry.quantity} x ${entry.plantName} through passive trade (${money(entry.revenue)}).`);

  const requestLines = (report?.requestLog ?? [])
    .filter((request) => (request.revenue ?? 0) > 0)
    .map((request) => `${request.plantName} answered ${request.requestName} (${money(request.revenue)}).`);

  return [...lines, ...requestLines];
}

function buildUnsoldLines(report) {
  const packed = report?.packedStockSummary ?? [];
  if (packed.length === 0) return ['No unsold visible/van stock was packed home.'];
  return packed.slice(0, 6).map((entry) => {
    const notes = [];
    if (entry.tiredBatches > 0) notes.push(`${entry.tiredBatches} tired/past-peak`);
    if (entry.reducedBatches > 0) notes.push(`${entry.reducedBatches} reduced`);
    const suffix = notes.length ? ` (${notes.join(', ')}).` : '.';
    return `${entry.units} ${entry.plantName} left across ${entry.batches} batch${entry.batches === 1 ? '' : 'es'}${suffix}`;
  });
}

function usefulDisplayNotes(report) {
  const soldUnits = (report?.tradingLog ?? []).reduce((sum, wave) => sum + (wave.sales ?? []).reduce((waveSum, sale) => waveSum + (sale.quantity ?? 0), 0), 0);
  return (report?.displayNotes ?? []).filter((note) => {
    const emptyDisplayNote = note.toLowerCase().includes('nothing is visible');
    return !(emptyDisplayNote && soldUnits > 0);
  });
}

function buildPressureLines(report) {
  const lines = [];
  const missedCount = report?.missedCount ?? 0;
  const soldLines = new Set((report?.tradingLog ?? []).flatMap((wave) => wave.sales ?? []).map((sale) => sale.plantName));
  const unsoldNames = (report?.packedStockSummary ?? []).map((entry) => entry.plantName).filter((name) => !soldLines.has(name));

  if (unsoldNames.length > 0) lines.push(`${unsoldNames.slice(0, 3).join(', ')} never really got a selling test; they were packed home unsold.`);
  if (missedCount > 0) lines.push(`${missedCount} missed demand note${missedCount === 1 ? '' : 's'} showed stock, placement, or price gaps.`);
  usefulDisplayNotes(report).forEach((note) => lines.push(note));
  (report?.pricingSummary?.notes ?? []).forEach((note) => lines.push(note));
  if ((report?.conditionSummary ?? []).length > 0) lines.push('Some visible stock lost freshness; check condition notes before ordering tomorrow.');
  if (lines.length === 0) lines.push('No obvious sales blockers were recorded today.');
  return [...new Set(lines)].slice(0, 5);
}

function buildOrderGuidanceLines(report) {
  const guidance = report?.orderGuidance ?? [];
  if (guidance.length === 0) return ['No next-order guidance was generated.'];
  return guidance.map((entry) => `${entry.summary} ${entry.reason}`);
}

function buildTomorrowLines(report) {
  const lines = [];
  const soldLines = buildSalesLines(report);
  const missedCount = report?.missedCount ?? 0;
  const reducedSold = report?.pricingSummary?.soldByBand?.reduced ?? 0;
  const premiumSold = report?.pricingSummary?.soldByBand?.premium ?? 0;
  const topUnsold = (report?.packedStockSummary ?? [])[0];

  if (topUnsold) lines.push(`Decide what to do with leftover ${topUnsold.plantName}: reduce it, move it, or avoid reordering too much.`);
  if (soldLines.length === 0) lines.push('Start tomorrow with a clearer front display: colour or giftable stock should be easy to spot.');
  if (missedCount > 0) lines.push('Use the missed demand notes as a shopping list before the next order.');
  if (reducedSold > 0) lines.push('Reduced stock can clear awkward leftovers, but keep it from taking over the stall mood.');
  if (premiumSold === 0) lines.push('Try premium pricing only on good-condition stock in a strong zone.');
  if ((report?.conditionSummary ?? []).length > 0) lines.push('Water thirsty trays before later waves, but avoid repeated watering on the same batch.');

  lines.push('Keep testing a simple mix: one colourful draw, one useful edible tray, and one giftable/showy item.');
  return [...new Set(lines)].slice(0, 5);
}

function WeekSoFar({ weekStats }) {
  if (!weekStats || weekStats.daysCompleted === 0) return null;
  const best = weekStats.bestRevenueDay;
  const bestText = best ? `Day ${best.day} at ${money(best.revenue)}` : 'not established yet';
  return (
    <section className="row-card column-card">
      <p className="eyebrow">Week so far</p>
      <div className="totals">
        <div><span>Days complete</span><strong>{weekStats.daysCompleted}</strong></div>
        <div><span>Total revenue</span><strong>{money(weekStats.totalRevenue)}</strong></div>
        <div><span>Best day</span><strong>{bestText}</strong></div>
        <div><span>Missed demand</span><strong>{weekStats.totalMissedDemand}</strong></div>
        <div><span>Notebook entries</span><strong>{weekStats.notebookDiscoveriesCount}</strong></div>
      </div>
      <p className="fine-print">{buildWeekStrategyNote(weekStats)}</p>
    </section>
  );
}

export default function DailySummary({ state, dispatch }) {
  const latest = state.dailyReports[state.dailyReports.length - 1];
  const conditionSummary = latest?.conditionSummary ?? [];
  const wateredSummary = latest?.wateredSummary ?? [];
  const pricingNotes = latest?.pricingSummary?.notes ?? [];
  const notebookNotes = latest?.notebookNotes ?? [];
  const notebookDiscoveries = latest?.notebookDiscoveries ?? [];
  const salesLines = buildSalesLines(latest);
  const unsoldLines = buildUnsoldLines(latest);
  const pressureLines = buildPressureLines(latest);
  const orderGuidanceLines = buildOrderGuidanceLines(latest);
  const tomorrowLines = buildTomorrowLines(latest);
  const passiveUnits = (latest?.tradingLog ?? []).reduce((sum, wave) => sum + (wave.sales ?? []).reduce((waveSum, sale) => waveSum + (sale.quantity ?? 0), 0), 0);
  const weekComplete = (state.currentDay ?? 0) >= 7;

  return (
    <Card>
      <p className="eyebrow">Daily Summary</p>
      <h2>Day {state.currentDay} report</h2>
      <p>{latest?.note ?? 'No report generated yet.'}</p>
      {latest && (
        <div className="totals">
          <div><span>Revenue</span><strong>{money(latest.revenue)}</strong></div>
          <div><span>Units sold</span><strong>{passiveUnits}</strong></div>
          <div><span>Requests</span><strong>{latest.requestCount ?? 0}</strong></div>
        </div>
      )}

      <WeekSoFar weekStats={state.weekStats} />

      <h3>What sold</h3>
      {salesLines.length === 0 ? <p className="muted">No stock sold today.</p> : salesLines.slice(0, 5).map((line) => <p className="fine-print" key={line}>• {line}</p>)}

      <h3>What did not sell</h3>
      {unsoldLines.map((line) => <p className="fine-print" key={line}>• {line}</p>)}

      <h3>Money</h3>
      {latest ? (
        <div className="totals">
          <div><span>Passive trade</span><strong>{money(latest.passiveRevenue)}</strong></div>
          <div><span>Requests</span><strong>{money(latest.requestRevenue)}</strong></div>
          <div><span>Packed home</span><strong>{latest.packedCount ?? 0}</strong></div>
        </div>
      ) : <p className="muted">No money summary yet.</p>}

      <h3>What held sales back</h3>
      {pressureLines.map((line) => <p className="fine-print" key={line}>• {line}</p>)}

      <h3>Next order guidance</h3>
      {orderGuidanceLines.map((line) => <p className="fine-print" key={line}>• {line}</p>)}

      <h3>Condition notes</h3>
      {wateredSummary.map((note) => <p className="fine-print capacity-warning" key={note}>• {note}</p>)}
      {conditionSummary.length === 0 ? <p className="muted">No stock condition changes today.</p> : (
        <div className="stack">
          {conditionSummary.map((entry, index) => (
            <article className="row-card column-card" key={`${entry.plantName}-${entry.timing}-${index}`}>
              <strong>{entry.count} x {entry.plantName} {entry.timing}</strong>
              <p className="fine-print">{entry.summary}</p>
            </article>
          ))}
        </div>
      )}
      <p className="fine-print">Full per-batch condition events remain available in the JSON/debug export.</p>

      <h3>Notebook feedback</h3>
      {notebookNotes.length === 0 ? <p className="muted">No notebook feedback today.</p> : notebookNotes.map((note) => <p className="fine-print" key={note}>• {note}</p>)}
      {notebookDiscoveries.length > 0 && (
        <div className="stack">
          {notebookDiscoveries.map((entry) => (
            <article className="row-card column-card notebook-entry" key={entry.id}>
              <strong>{entry.title}</strong>
              <p className="fine-print">{entry.category}: {entry.text}</p>
              <p className="fine-print">Unlocked because: {entry.reason}</p>
            </article>
          ))}
        </div>
      )}

      <h3>Try tomorrow</h3>
      {tomorrowLines.map((line) => <p className="fine-print" key={line}>• {line}</p>)}

      <h3>Pricing notes</h3>
      {pricingNotes.length === 0 ? <p className="muted">No pricing notes today.</p> : pricingNotes.map((note) => <p className="fine-print" key={note}>• {note}</p>)}

      <button onClick={() => dispatch({ type: 'START_EVENING_ORDER' })}>{weekComplete ? 'Review the week' : 'Plan tonight\'s order'}</button>
    </Card>
  );
}
