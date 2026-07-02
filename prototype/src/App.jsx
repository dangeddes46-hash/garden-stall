import { useMemo, useReducer } from 'react';
import { locationById } from './data/locations.js';
import { initialState } from './state/initialState.js';
import { reducer } from './state/reducer.js';
import { money } from './components/ui.jsx';
import DebugOverlay from './components/DebugOverlay.jsx';
import PhaseRenderer from './screens/PhaseRenderer.jsx';
import { PHASE_LABELS } from './data/constants.js';

function HeaderStatus({ state }) {
  return (
    <header className="top-bar">
      <div>
        <p className="eyebrow">The Garden Stall</p>
        <h1>Prototype 0.1 <span className="pill">{state.prototypeVersion}</span></h1>
      </div>
      <div className="status-grid">
        <div><span>Day</span><strong>{state.currentDay}</strong></div>
        <div><span>Phase</span><strong>{PHASE_LABELS[state.phase]}</strong></div>
        <div><span>Cash</span><strong>{money(state.cash)}</strong></div>
        <div><span>Notebook</span><strong>{state.notebook?.discoveries?.length ?? 0}</strong></div>
      </div>
    </header>
  );
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const location = useMemo(() => locationById[state.selectedLocationId], [state.selectedLocationId]);
  return (
    <div className="app-shell">
      <HeaderStatus state={state} />
      {location && <div className="location-banner">Selected location: <strong>{location.displayName}</strong> — {location.feedbackLines[0]}</div>}
      <main className="main-layout">
        <div className="main-content">
          <PhaseRenderer state={state} dispatch={dispatch} />
        </div>
        <DebugOverlay state={state} dispatch={dispatch} />
      </main>
    </div>
  );
}
