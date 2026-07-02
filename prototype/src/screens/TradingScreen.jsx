import { getStockByLocation } from '../systems/stockSystem.js';
import { getDisplayZoneSummary } from '../systems/displaySystem.js';
import { describePriceBand } from '../systems/pricingSystem.js';
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

export default function TradingScreen({ state, dispatch }) {
  const displaySummary = getDisplayZoneSummary(state.stockBatches);
  const displayStock = getStockByLocation(state.stockBatches, 'display');
  const reducedStock = getStockByLocation(state.stockBatches, 'reduced-area');
  return (
    <div className="screen-grid">
      <div className="stack">
        <Card>
          <p className="eyebrow">Trading Day</p>
          <h2>Passive customer waves</h2>
          <p>Run each wave, then glance at the Current Stall before the next one. Thirsty trays can slip during the day, and watering helps if you catch them early.</p>
          <div className="totals">
            <div><span>Next wave</span><strong>{(state.tradingWaveIndex ?? 0) + 1}</strong></div>
            <div><span>Display</span><strong>{displaySummary.rating}</strong></div>
            <div><span>Visible batches</span><strong>{displaySummary.usedSlots}</strong></div>
          </div>
          <ZoneUsagePanel displaySummary={displaySummary} />
          <div className="button-row">
            <button disabled={(state.tradingWaveIndex ?? 0) >= 4} onClick={() => dispatch({ type: 'RUN_CUSTOMER_WAVE' })}>Simulate customer wave</button>
            <button className="secondary" onClick={() => dispatch({ type: 'END_TRADING_DAY' })}>End trading day</button>
          </div>
        </Card>
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
          {state.tradingLog.length === 0 ? <p className="muted">No waves simulated yet.</p> : (
            <div className="stack">
              {state.tradingLog.map((wave, index) => (
                <article className="row-card column-card" key={`${wave.wave}-${index}`}>
                  <div>
                    <strong>{wave.wave} · {money(wave.revenue)} revenue · Display {wave.displayRating}</strong>
                    {wave.sales.map((sale, saleIndex) => <p className="fine-print" key={`${sale.customerName}-${saleIndex}`}>{sale.customerName} bought {sale.quantity} × {sale.plantName}{sale.zoneId ? ` from ${zoneLabel(sale.zoneId)}` : ''} at {describePriceBand(sale.priceBand ?? 'normal')} price ({money(sale.unitPrice)} each): {sale.reason}</p>)}
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
