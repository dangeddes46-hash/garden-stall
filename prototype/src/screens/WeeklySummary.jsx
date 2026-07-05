import { STARTING_CASH } from '../data/constants.js';
import { locationById } from '../data/locations.js';
import { Card, money } from '../components/ui.jsx';
import { buildWeekStrategyNote, buildWeeklyLesson } from '../systems/weekStatsSystem.js';

function conditionPhrase(entry) {
  if (entry?.mixedCondition) return `, mixed condition${entry.dominantCondition ? `, mostly ${entry.dominantCondition}` : ''}`;
  return entry?.dominantCondition ? ` ${entry.dominantCondition}` : '';
}

function weeklyAccounting(state) {
  const reports = state.dailyReports ?? [];
  const totalOrderSpend = reports.reduce((sum, report) => sum + (report.orderSpend ?? 0), 0);
  const totalRevenue = reports.reduce((sum, report) => sum + (report.revenue ?? 0), 0);
  const remainingStock = (state.stockBatches ?? []).filter((batch) => batch.quantity > 0 && batch.location !== 'sold');
  const remainingUnits = remainingStock.reduce((sum, batch) => sum + (batch.quantity ?? 0), 0);
  const remainingWholesaleValue = remainingStock.reduce((sum, batch) => sum + ((batch.wholesaleCostPerUnit ?? 0) * (batch.quantity ?? 0)), 0);
  const unsellable = remainingStock.filter((batch) => batch.condition === 'unsellable');
  const unsellableUnits = unsellable.reduce((sum, batch) => sum + (batch.quantity ?? 0), 0);
  const premiumRevenue = reports.reduce((sum, report) => sum + (report.pricingSummary?.revenue?.premium ?? 0), 0);
  const premiumShare = totalRevenue > 0 ? Math.round((premiumRevenue / totalRevenue) * 100) : 0;
  return { totalOrderSpend, totalRevenue, remainingUnits, remainingWholesaleValue, unsellableUnits, premiumRevenue, premiumShare };
}

export default function WeeklySummary({ state }) {
  const stats = state.weekStats;
  const lessons = buildWeeklyLesson(stats);
  const bestDay = stats?.bestRevenueDay;
  const bestLocationName = bestDay?.locationId ? locationById[bestDay.locationId]?.displayName : null;
  const accounting = weeklyAccounting(state);

  return (
    <Card>
      <p className="eyebrow">Weekly Summary</p>
      <h2>Week one review</h2>
      <p className="muted">A light end-of-week readout. No upgrades, scoring, or rewards are attached yet.</p>

      <div className="totals">
        <div><span>Days completed</span><strong>{stats?.daysCompleted ?? 0}</strong></div>
        <div><span>Total revenue</span><strong>{money(stats?.totalRevenue ?? 0)}</strong></div>
        <div><span>Order spend</span><strong>{money(accounting.totalOrderSpend)}</strong></div>
        <div><span>Final cash</span><strong>{money(state.cash)}</strong></div>
        <div><span>Cash vs start</span><strong>{money((state.cash ?? 0) - STARTING_CASH)}</strong></div>
        <div><span>Remaining stock</span><strong>{accounting.remainingUnits}</strong></div>
        <div><span>Unsellable</span><strong>{accounting.unsellableUnits}</strong></div>
        <div><span>Premium share</span><strong>{accounting.premiumShare}%</strong></div>
      </div>

      <section className="stack">
        <h3>Best day</h3>
        {bestDay ? <p className="fine-print">Day {bestDay.day} brought in {money(bestDay.revenue)}{bestLocationName ? ` at ${bestLocationName}` : ''}.</p> : <p className="muted">No best day yet.</p>}

        <h3>Daily breakdown</h3>
        {(state.dailyReports ?? []).map((report) => {
          const location = report.locationId ? locationById[report.locationId]?.displayName ?? report.locationId : 'No location';
          const topUnsold = (report.packedStockSummary ?? [])[0];
          return (
            <p className="fine-print" key={report.day}>• Day {report.day}: {location}; revenue {money(report.revenue)}; order spend {money(report.orderSpend)}; sales {report.salesCount}; requests {money(report.requestRevenue)} / {report.requestCount}; missed {report.missedCount}; packed home {report.packedCount ?? 0}; condition notes {(report.conditionSummary ?? []).length}; top unsold {topUnsold ? `${topUnsold.units}${conditionPhrase(topUnsold)} ${topUnsold.plantName}` : 'none'}.</p>
          );
        })}

        <h3>Broad lessons</h3>
        <p className="fine-print">• {lessons.strongest}</p>
        <p className="fine-print">• {lessons.weakest}</p>
        <p className="fine-print">• Notebook entries discovered: {stats?.notebookDiscoveriesCount ?? 0}</p>
        <p className="fine-print">• Unsold batches packed home: {stats?.totalPackedHome ?? 0}</p>
        <p className="fine-print">• Condition notes recorded: {stats?.totalConditionNotes ?? 0}</p>
        <p className="fine-print">• Rough remaining wholesale value: {money(accounting.remainingWholesaleValue)}</p>
        <p className="fine-print">• Premium revenue/share: {money(accounting.premiumRevenue)} / {accounting.premiumShare}%</p>

        <h3>Recommended next strategy</h3>
        <p>{buildWeekStrategyNote(stats)}</p>
        <p className="fine-print">Next implementation can decide what, if anything, the weekly review unlocks. For now it is a readable checkpoint.</p>
      </section>
    </Card>
  );
}
