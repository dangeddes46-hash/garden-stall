import { useEffect } from 'react';
import { getStockByLocation } from '../systems/stockSystem.js';
import { getDisplayZoneSummary } from '../systems/displaySystem.js';
import { describePriceBand } from '../systems/pricingSystem.js';
import { getAutoAdvanceMs, getNextTradingCheckpoint, getTradingClockEntry, getTradingClockMode, shouldAutoAdvanceClock, TRADING_CLOCK_MODES, TRADING_DAY_SCHEDULE } from '../systems/tradingClockSystem.js';
import { Card, money, zoneLabel } from '../components/ui.jsx';
import { ExpandableStockList, ReducedStockList, ZonePlacementButtons, ZoneUsagePanel } from '../components/StockLists.jsx';

function SpecialRequestPanel({ state, dispatch }) {
  const visibleStock = state.stockBatches.filter((batch) => ['display', 'reduced-area'].includes(batch.location) && batch.quantity > 0);
  const request = state.activeRequest;
  return (
    <Card>
      <p className="eyebrow">Special Request</p>
      {!request ? (
        <>
          <h2>No active request</h2>
          <p className="muted">Generate one customer request, then recommend one visible plant or item.</p>
          <button onClick={() => dispatch({ type: 'GENERATE_SPECIAL_REQUEST' })}>Generate request</button>
        </>
      ) : (
        <>
          <h2>{request.displayName}</h2>
          <p>“{request.customerLine}”</p>
          {request.requiredWarnings?.length > 0 && <p className="fine-print">Warning context: {request.requiredWarnings[0]}</p>}
          <ExpandableStockList title="Visible recommendations" batches={visibleStock} emptyText="No visible stock is available to recommend." actionLabel="Recommend" actionType="ANSWER_SPECIAL_REQUEST" allowPricing={false} dispatch={dispatch} />
          <button className="secondary" onClick={() => dispatch({ type: 'CANCEL_SPECIAL_REQUEST' })}>Dismiss request</button>
        </>
      )}
      {state.requestLog.length > 0 && (
        <div className="stack request-log">
          <h3>Request log</h3>
          {state.requestLog.map((entry, index) => (
            <article key={`${entry.requestId}-${index}`} className="row-card column-card">
              <strong>{entry.requestName}: {entry.outcome} · {money(entry.revenue)}</strong>
              <p className="fine-print">Recommended {entry.plantName} at {describePriceBand(entry.priceBand ?? 'normal')} price. {entry.reason}</p>
              {entry.notebookRewards?.length > 0 && <p className="fine-print">Notebook reward queued: {entry.notebookRewards.join(', ')}</p>}
            </article>
          ))}
        </div>
      )}
    </Card>
  );
}

function TradingClockControls({ state, dispatch, packdownReady, checkpointButton }) {
  const currentMode = getTradingClockMode(state.tradingClock);
  const waveCount = state.tradingWaveIndex ?? 0;
  const canRunRest = !packdownReady && waveCount < 4;
  const autoAdvanceMs = getAutoAdvanceMs(state.tradingClock);
  const autoActive = shouldAutoAdvanceClock(state.tradingClock) && !state.activeRequest;

  return (
    <div className="stack">
      <h3>Clock controls</h3>
      <div className="button-row wrap-actions">
        {Object.values(TRADING_CLOCK_MODES).map((mode) => (
          <button
            key={mode.id}
            className={currentMode.id === mode.id ? 'secondary' : undefined}
            title={mode.note}
            onClick={() => dispatch({ type: 'SET_TRADING_CLOCK_MODE', mode: mode.id })}
          >
            {mode.label}
          </button>
        ))}
      </div>
      <p className="fine-print">Current mode: <strong>{currentMode.label}</strong>. {state.tradingClock?.controlsNote ?? currentMode.note}</p>
      {autoAdvanceMs && <p className="fine-print capacity-warning">Auto timer {autoActive ? 'active' : 'waiting'}: next checkpoint in about {(autoAdvanceMs / 1000).toFixed(1)} seconds unless paused, complete, or waiting on a special request.</p>}
      <div className="button-row wrap-actions">
        <button disabled={packdownReady} onClick={() => dispatch({ type: 'RUN_TRADING_CHECKPOINT' })}>{checkpointButton}</button>
        <button className="secondary" disabled={!canRunRest} onClick={() => dispatch({ type: 'RUN_REST_TRADING_DAY' })}>Run rest of day</button>
        <button className="secondary" onClick={() => dispatch({ type: 'END_TRADING_DAY' })}>End trading day</button>
      </div>
      <p className="fine-print">Paused and Step are manual. Fast and Debug instant auto-run checkpoints, while still allowing manual/debug controls.</p>
    </div>
  );
}

function TradingClockPanel({ state, dispatch, displaySummary }) {
  const current = getTradingClockEntry(state.tradingClock);
  const next = getNextTradingCheckpoint(state.tradingClock);
  const waveCount = state.tradingWaveIndex ?? 0;
  const packdownReady = state.tradingClock?.isComplete;
  const checkpointButton = waveCount >= 4 ? 'Advance to packdown' : `Run ${next.timeLabel} checkpoint`;

  return (
    <Card>
      <p className="eyebrow">Trading Day</p>
      <h2>{current.timeLabel} — {current.title}</h2>
      <p>{current.description}</p>
      <div className="totals">
        <div><span>Clock</span><strong>{current.timeLabel}</strong></div>
        <div><span>Checkpoints run</span><strong>{waveCount} / 4</strong></div>
        <div><span>Display</span><strong>{displaySummary.rating}</strong></div>
        <div><span>Visible batches</span><strong>{displaySummary.usedSlots}</strong></div>
      </div>
      <TradingClockControls state={state} dispatch={dispatch} packdownReady={packdownReady} checkpointButton={checkpointButton} />
      <div className="stack">
        <h3>Day schedule</h3>
        {TRADING_DAY_SCHEDULE.map((entry) => {
          const done = entry.index <= (state.tradingClock?.currentIndex ?? 0);
          const nextUp = entry.index === (state.tradingClock?.nextCheckpointIndex ?? 1);
          return (
            <p className="fine-print" key={entry.timeLabel}>
              {done ? '✓' : nextUp ? '→' : '•'} <strong>{entry.timeLabel}</strong> {entry.title} — {entry.description}
            </p>
          );
        })}
      </div>
      <ZoneUsagePanel displaySummary={displaySummary} />
    </Card>
  );
}

export default function TradingScreen({ state, dispatch }) {
  const displaySummary = getDisplayZoneSummary(state.stockBatches);
  const displayStock = getStockByLocation(state.stockBatches, 'display');
  const reducedStock = getStockByLocation(state.stockBatches, 'reduced-area');
  const autoAdvanceMs = getAutoAdvanceMs(state.tradingClock);
  const autoAdvance = shouldAutoAdvanceClock(state.tradingClock) && !state.activeRequest;

  useEffect(() => {
    if (!autoAdvance || !autoAdvanceMs) return undefined;
    const timer = window.setTimeout(() => {
      dispatch({ type: 'RUN_TRADING_CHECKPOINT' });
    }, autoAdvanceMs);
    return () => window.clearTimeout(timer);
  }, [autoAdvance, autoAdvanceMs, state.tradingClock?.currentIndex, state.tradingClock?.mode, state.activeRequest, dispatch]);

  return (
    <div className="screen-grid">
      <div className="stack">
        <TradingClockPanel state={state} dispatch={dispatch} displaySummary={displaySummary} />
        <SpecialRequestPanel state={state} dispatch={dispatch} />
      </div>
      <div className="stack">
        <Card>
          <h2>Current Stall</h2>
          <ExpandableStockList
            title="Display"
            batches={displayStock}
            emptyText="Nothing displayed."
            allowWater
            dispatch={dispatch}
            renderExtraActions={(batch) => (
              <>
                <ZonePlacementButtons batch={batch} dispatch={dispatch} stockBatches={state.stockBatches} includeReduced />
                <button className="secondary" onClick={() => dispatch({ type: 'RETURN_BATCH_TO_VAN', batchId: batch.id })}>Van</button>
              </>
            )}
          />
          <ReducedStockList batches={reducedStock} emptyText="No reduced stock." stockBatches={state.stockBatches} dispatch={dispatch} />
        </Card>
        <Card>
          <h2>Trading Log</h2>
          {state.tradingLog.length === 0 ? <p className="muted">No checkpoints run yet.</p> : (
            <div className="stack">
              {state.tradingLog.map((wave, index) => (
                <article className="row-card column-card" key={`${wave.wave}-${index}`}>
                  <div>
                    <strong>{wave.timeLabel ? `${wave.timeLabel} · ${wave.checkpointTitle} · ` : ''}{wave.wave} · {money(wave.revenue)} revenue · Display {wave.displayRating}</strong>
                    {wave.clockMode && <p className="fine-print">Clock mode: {wave.clockMode}</p>}
                    {wave.sales.map((sale, saleIndex) => <p className="fine-print" key={`${sale.customerName}-${saleIndex}`}>{sale.customerName} bought {sale.quantity} x {sale.plantName}{sale.zoneId ? ` from ${zoneLabel(sale.zoneId)}` : ''} at {describePriceBand(sale.priceBand ?? 'normal')} price ({money(sale.unitPrice)} each): {sale.reason}</p>)}
                    {wave.missedDemand.map((note) => <p className="fine-print" key={note}>Missed: {note}</p>)}
                    {wave.priceNotes?.map((note) => <p className="fine-print" key={note}>Price note: {note}</p>)}
                    {(wave.conditionSummary ?? []).map((entry) => <p className="fine-print" key={entry.summary}>Condition: {entry.summary}</p>)}
                  </div>
                </article>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
