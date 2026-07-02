import { useState } from 'react';
import { PHASE_LABELS } from '../data/constants.js';
import { createDebugExport, createMarkdownReport } from '../systems/reportSystemPatched.js';

function NotebookPanel({ notebook, latestReport }) {
  const discoveries = notebook?.discoveries ?? [];
  const latestIds = new Set((latestReport?.notebookDiscoveries ?? []).map((entry) => entry.id));
  const byCategory = discoveries.reduce((groups, entry) => {
    const category = entry.category ?? 'General';
    return {
      ...groups,
      [category]: [...(groups[category] ?? []), entry]
    };
  }, {});

  return (
    <section className="notebook-panel">
      <h2>Notebook</h2>
      <p className="fine-print">Entries unlock from observed outcomes. They are not permanent bonuses yet; for now they are readable feedback.</p>
      {discoveries.length === 0 ? <p className="muted">No discoveries yet. Trade a day and end it to review what was learned.</p> : (
        <div className="stack">
          {Object.entries(byCategory).map(([category, entries]) => (
            <div className="notebook-category" key={category}>
              <h3>{category}</h3>
              {entries.map((entry) => (
                <article className={`notebook-mini ${latestIds.has(entry.id) ? 'new-entry' : ''}`} key={entry.id}>
                  <strong>{entry.title}</strong>
                  {latestIds.has(entry.id) && <span className="pill ok">new</span>}
                  <p>{entry.text}</p>
                  <p className="fine-print">Day {entry.discoveredDay}: {entry.reason}</p>
                </article>
              ))}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default function DebugOverlay({ state, dispatch }) {
  const [exportText, setExportText] = useState('');
  const latestReport = state.dailyReports[state.dailyReports.length - 1];
  function exportJson() { setExportText(JSON.stringify(createDebugExport(state), null, 2)); }
  function exportMarkdown() { setExportText(createMarkdownReport(state)); }
  return (
    <aside className="debug-panel">
      <NotebookPanel notebook={state.notebook} latestReport={latestReport} />
      <h2>Debug / Admin</h2>
      <div className="button-grid">
        <button onClick={() => dispatch({ type: 'DEBUG_ADD_CASH', amount: 10 })}>+£10</button>
        <button onClick={() => dispatch({ type: 'DEBUG_ADD_CASH', amount: 50 })}>+£50</button>
        <button onClick={() => dispatch({ type: 'DEBUG_NEXT_DAY' })}>Next day</button>
        <button onClick={() => dispatch({ type: 'RESET_PROTOTYPE' })}>Reset</button>
        <button onClick={exportJson}>Export JSON</button>
        <button onClick={exportMarkdown}>Export report</button>
      </div>
      <label>
        Jump phase
        <select value={state.phase} onChange={(event) => dispatch({ type: 'DEBUG_JUMP_PHASE', phase: event.target.value })}>
          {Object.entries(PHASE_LABELS).map(([phase, label]) => <option key={phase} value={phase}>{label}</option>)}
        </select>
      </label>
      {exportText && <textarea readOnly value={exportText} aria-label="Export output" />}
      <h3>Recent log</h3>
      <ol className="debug-log">
        {state.debugLog.slice(0, 10).map((entry, index) => <li key={`${entry}-${index}`}>{entry}</li>)}
      </ol>
    </aside>
  );
}
