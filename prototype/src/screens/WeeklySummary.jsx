import { locationById } from '../data/locations.js';
import { Card, money } from '../components/ui.jsx';
import { buildWeekStrategyNote, buildWeeklyLesson } from '../systems/weekStatsSystem.js';

export default function WeeklySummary({ state }) {
  const stats = state.weekStats;
  const lessons = buildWeeklyLesson(stats);
  const bestDay = stats?.bestRevenueDay;
  const bestLocationName = bestDay?.locationId ? locationById[bestDay.locationId]?.displayName : null;

  return (
    <Card>
      <p className="eyebrow">Weekly Summary</p>
      <h2>Week one review</h2>
      <p className="muted">A light end-of-week readout. No upgrades, scoring, or rewards are attached yet.</p>

      <div className="totals">
        <div><span>Days completed</span><strong>{stats?.daysCompleted ?? 0}</strong></div>
        <div><span>Total revenue</span><strong>{money(stats?.totalRevenue ?? 0)}</strong></div>
        <div><span>Passive revenue</span><strong>{money(stats?.totalPassiveRevenue ?? 0)}</strong></div>
        <div><span>Request revenue</span><strong>{money(stats?.totalRequestRevenue ?? 0)}</strong></div>
        <div><span>Sales</span><strong>{stats?.totalSalesCount ?? 0}</strong></div>
        <div><span>Missed demand</span><strong>{stats?.totalMissedDemand ?? 0}</strong></div>
      </div>

      <section className="stack">
        <h3>Best day</h3>
        {bestDay ? (
          <p className="fine-print">Day {bestDay.day} brought in {money(bestDay.revenue)}{bestLocationName ? ` at ${bestLocationName}` : ''}.</p>
        ) : <p className="muted">No best day yet.</p>}

        <h3>Broad lessons</h3>
        <p className="fine-print">• {lessons.strongest}</p>
        <p className="fine-print">• {lessons.weakest}</p>
        <p className="fine-print">• Notebook entries discovered: {stats?.notebookDiscoveriesCount ?? 0}</p>
        <p className="fine-print">• Unsold batches packed home: {stats?.totalPackedHome ?? 0}</p>
        <p className="fine-print">• Condition notes recorded: {stats?.totalConditionNotes ?? 0}</p>

        <h3>Recommended next strategy</h3>
        <p>{buildWeekStrategyNote(stats)}</p>
        <p className="fine-print">Next implementation can decide what, if anything, the weekly review unlocks. For now it is a readable checkpoint.</p>
      </section>
    </Card>
  );
}
