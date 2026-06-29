import { useMemo, useReducer, useState } from 'react';
import { PHASES, PHASE_LABELS, VAN_CAPACITY, DISPLAY_ZONES } from './data/constants.js';
import { getSupplierListingsForDay } from './data/supplierListings.js';
import { plantById } from './data/plants.js';
import { locations, locationById } from './data/locations.js';
import { weekDayByNumber } from './data/weekScript.js';
import { calculateCart } from './systems/orderSystem.js';
import { getStockByLocation, getVanCount } from './systems/stockSystem.js';
import { createDebugExport, createMarkdownReport } from './systems/reportSystem.js';
import { initialState } from './state/initialState.js';
import { reducer } from './state/reducer.js';

function money(value) {
  return `£${Number(value || 0).toFixed(2)}`;
}

function Card({ children, className = '' }) {
  return <section className={`card ${className}`}>{children}</section>;
}

function HeaderStatus({ state }) {
  return (
    <header className="top-bar">
      <div>
        <p className="eyebrow">The Garden Stall</p>
        <h1>Prototype 0.1</h1>
      </div>
      <div className="status-grid">
        <div><span>Day</span><strong>{state.currentDay}</strong></div>
        <div><span>Phase</span><strong>{PHASE_LABELS[state.phase]}</strong></div>
        <div><span>Cash</span><strong>{money(state.cash)}</strong></div>
        <div><span>Stock Batches</span><strong>{state.stockBatches.length}</strong></div>
      </div>
    </header>
  );
}

function WholesalerScreen({ state, dispatch }) {
  const listings = getSupplierListingsForDay(state.currentDay);
  const totals = calculateCart(state.cart);
  const availableCount = listings.filter((listing) => listing.availability === 'available').length;

  return (
    <div className="screen-grid wide-left">
      <Card>
        <p className="eyebrow">County Plant Wholesale</p>
        <h2>{state.currentDay === 0 ? 'Opening Evening Order' : 'Evening Order'}</h2>
        <p className="muted">
          Choose stock for collection tomorrow morning. Sold-out lines stay visible so the trade site already feels like a supplier catalogue.
        </p>
        <div className="listing-grid">
          {listings.map((listing) => {
            const plant = plantById[listing.plantId];
            const disabled = listing.availability !== 'available';
            return (
              <article key={listing.id} className={`listing ${disabled ? 'muted-card' : ''}`}>
                <div className="listing-title">
                  <h3>{plant.displayName}</h3>
                  <span className={`pill ${disabled ? 'danger' : 'ok'}`}>{listing.availability}</span>
                </div>
                <p>{plant.retailNote}</p>
                <p className="fine-print">Batch: {listing.quantity} · Trade cost: {money(listing.wholesaleCost)} · Suggested retail: {money(listing.suggestedRetail)} each</p>
                <p className="fine-print">{listing.supplierNote}</p>
                <button disabled={disabled} onClick={() => dispatch({ type: 'ADD_TO_CART', listing })}>Add batch</button>
              </article>
            );
          })}
        </div>
      </Card>

      <Card>
        <h2>Order Cart</h2>
        <p className="muted">{availableCount} trade lines available today.</p>
        {state.cart.length === 0 ? (
          <p>No stock selected yet.</p>
        ) : (
          <div className="stack">
            {state.cart.map((item) => (
              <div key={item.id} className="row-card">
                <div>
                  <strong>{plantById[item.plantId]?.displayName}</strong>
                  <p className="fine-print">{item.count} × batch of {item.quantity}</p>
                </div>
                <div className="row-actions">
                  <span>{money(item.wholesaleCost * item.count)}</span>
                  <button onClick={() => dispatch({ type: 'REMOVE_FROM_CART', listingId: item.id })}>−</button>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="totals">
          <div><span>Subtotal</span><strong>{money(totals.subtotal)}</strong></div>
          <div><span>Order fee</span><strong>{money(totals.fee)}</strong></div>
          <div><span>Total</span><strong>{money(totals.total)}</strong></div>
        </div>
        <p className="fine-print">Fee-free threshold: £100. This can be tuned later.</p>
        <div className="button-row">
          <button disabled={state.cart.length === 0 || totals.total > state.cash} onClick={() => dispatch({ type: 'PLACE_ORDER' })}>Place order for tomorrow</button>
          <button className="secondary" onClick={() => dispatch({ type: 'CLEAR_CART' })}>Clear cart</button>
        </div>
      </Card>
    </div>
  );
}

function CollectionScreen({ state, dispatch }) {
  const collectible = state.pendingOrders.filter((order) => order.dayArrives <= state.currentDay && !order.collected);

  return (
    <Card>
      <p className="eyebrow">Morning Collection</p>
      <h2>Collect yesterday’s wholesale order</h2>
      {collectible.length === 0 ? (
        <p>No orders are ready yet. Use debug controls if you jumped here manually.</p>
      ) : (
        <div className="stack">
          {collectible.map((order) => (
            <div className="row-card" key={order.id}>
              <div>
                <strong>{order.items.length} order lines</strong>
                <p className="fine-print">Total paid: {money(order.total)} · Arrives Day {order.dayArrives}</p>
              </div>
              <span className="pill ok">ready</span>
            </div>
          ))}
        </div>
      )}
      <button disabled={collectible.length === 0} onClick={() => dispatch({ type: 'COLLECT_ORDERS' })}>Collect into home stock</button>
    </Card>
  );
}

function WeatherScreen({ state, dispatch }) {
  const script = weekDayByNumber[state.currentDay];
  const weather = state.selectedWeather ?? script?.weather;

  return (
    <Card>
      <p className="eyebrow">Day Conditions</p>
      <h2>{weather?.label ?? 'No weather set'}</h2>
      <p>{script?.focus}</p>
      <ul>
        <li>Footfall modifier: {weather?.footfallModifier ?? 'n/a'}</li>
        <li>Drying modifier: {weather?.dryingModifier ?? 'n/a'}</li>
        <li>Display stress: {weather?.displayStress ?? 'n/a'}</li>
      </ul>
      <button onClick={() => dispatch({ type: 'ADVANCE_PHASE' })}>Choose today’s location</button>
    </Card>
  );
}

function LocationScreen({ state, dispatch }) {
  return (
    <Card>
      <p className="eyebrow">Trading Location</p>
      <h2>Where will the stall trade today?</h2>
      <div className="location-grid">
        {locations.map((location) => (
          <article key={location.id} className={`location-card ${state.selectedLocationId === location.id ? 'selected' : ''}`}>
            <h3>{location.displayName}</h3>
            <p>{location.description}</p>
            <p className="fine-print">Pitch fee {money(location.pitchFee)} · Fuel {money(location.fuelCost)} · Footfall {location.footfall}</p>
            <p className="fine-print">Demand: {location.demandTags.slice(0, 6).join(', ')}</p>
            <button onClick={() => dispatch({ type: 'SELECT_LOCATION', locationId: location.id })}>Select</button>
          </article>
        ))}
      </div>
      <button disabled={!state.selectedLocationId} onClick={() => dispatch({ type: 'ADVANCE_PHASE' })}>Continue to van loadout</button>
    </Card>
  );
}

function StockList({ title, batches, emptyText, actionLabel, actionType, dispatch }) {
  return (
    <div>
      <h3>{title}</h3>
      {batches.length === 0 ? <p className="muted">{emptyText}</p> : (
        <div className="stack">
          {batches.map((batch) => (
            <div key={batch.id} className="row-card">
              <div>
                <strong>{batch.plantName}</strong>
                <p className="fine-print">{batch.quantity} units · {batch.condition} · {batch.moisture} · {batch.priceBand}</p>
              </div>
              {actionType && <button onClick={() => dispatch({ type: actionType, batchId: batch.id })}>{actionLabel}</button>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function VanLoadoutScreen({ state, dispatch }) {
  const homeStock = getStockByLocation(state.stockBatches, 'home');
  const vanStock = getStockByLocation(state.stockBatches, 'van');
  const vanCount = getVanCount(state.stockBatches);

  return (
    <div className="screen-grid">
      <Card>
        <p className="eyebrow">Home Stock</p>
        <h2>Load the van</h2>
        <p className="muted">Van capacity is {VAN_CAPACITY} units for this first pass.</p>
        <StockList title="Home stock" batches={homeStock} emptyText="No stock at home." actionLabel="Load" actionType="LOAD_TO_VAN" dispatch={dispatch} />
      </Card>
      <Card>
        <h2>Van</h2>
        <p className="muted">Loaded: {vanCount} / {VAN_CAPACITY} units</p>
        <StockList title="Van stock" batches={vanStock} emptyText="The van is empty." actionLabel="Unload" actionType="UNLOAD_TO_HOME" dispatch={dispatch} />
        <button disabled={vanStock.length === 0} onClick={() => dispatch({ type: 'ADVANCE_PHASE' })}>Confirm loadout</button>
      </Card>
    </div>
  );
}

function RouteConfirmScreen({ state, dispatch }) {
  const location = locationById[state.selectedLocationId];
  return (
    <Card>
      <p className="eyebrow">Route / Operating Costs</p>
      <h2>{location?.displayName ?? 'No location selected'}</h2>
      <p>{location?.description}</p>
      <div className="totals">
        <div><span>Fuel</span><strong>{money(location?.fuelCost)}</strong></div>
        <div><span>Pitch fee</span><strong>{money(location?.pitchFee)}</strong></div>
        <div><span>Status</span><strong>shown only</strong></div>
      </div>
      <p className="fine-print">Cost deduction is deliberately left as a placeholder in this first target so Day 0 order and Day 1 collection can be tested first.</p>
      <button onClick={() => dispatch({ type: 'CONFIRM_ROUTE' })}>Confirm route and set up stall</button>
    </Card>
  );
}

function DisplaySetupScreen({ state, dispatch }) {
  const vanStock = getStockByLocation(state.stockBatches, 'van');
  const displayStock = getStockByLocation(state.stockBatches, 'display');
  const reducedStock = getStockByLocation(state.stockBatches, 'reduced-area');

  return (
    <div className="screen-grid">
      <Card>
        <p className="eyebrow">Display Setup</p>
        <h2>Tray-slot placeholder</h2>
        <p className="muted">No drag-and-drop. Buttons only. Zone capacity scoring comes in the next implementation step.</p>
        <div className="display-zones">
          {DISPLAY_ZONES.map((zone) => (
            <div className="zone" key={zone.id}>
              <strong>{zone.label}</strong>
              <span>{zone.capacity} tray slots</span>
              <p>{zone.note}</p>
            </div>
          ))}
        </div>
        <StockList title="Van stock" batches={vanStock} emptyText="No stock left in van." actionLabel="Display" actionType="PLACE_ON_DISPLAY" dispatch={dispatch} />
      </Card>
      <Card>
        <h2>Visible Stall</h2>
        <StockList title="Display" batches={displayStock} emptyText="Nothing displayed yet." actionLabel="Reduce" actionType="MOVE_TO_REDUCED" dispatch={dispatch} />
        <StockList title="Reduced area" batches={reducedStock} emptyText="No reduced stock." actionLabel="Return to van" actionType="UNLOAD_TO_HOME" dispatch={dispatch} />
        <div className="button-row">
          <button onClick={() => dispatch({ type: 'ADVANCE_PHASE' })}>Open trading placeholder</button>
          <button className="secondary" onClick={() => dispatch({ type: 'RETURN_DISPLAY_TO_VAN' })}>Return display to van</button>
        </div>
      </Card>
    </div>
  );
}

function TradingScreen({ dispatch }) {
  return (
    <Card>
      <p className="eyebrow">Trading Day</p>
      <h2>Customer simulation placeholder</h2>
      <p>This first implementation target stops short of passive sales and special request scoring. The phase exists so the day can complete and exports can be tested.</p>
      <ul>
        <li>Passive customers: placeholder</li>
        <li>Special requests: data exists, scoring not wired yet</li>
        <li>Condition pressure: placeholder</li>
        <li>Display score: placeholder</li>
      </ul>
      <button onClick={() => dispatch({ type: 'END_TRADING_DAY' })}>End trading day</button>
    </Card>
  );
}

function DailySummary({ state, dispatch }) {
  const latest = state.dailyReports[state.dailyReports.length - 1];
  return (
    <Card>
      <p className="eyebrow">Daily Summary</p>
      <h2>Day {state.currentDay} report placeholder</h2>
      <p>{latest?.note ?? 'No report generated yet.'}</p>
      <p className="muted">Sales, missed demand, request outcomes, condition changes, and notebook updates are placeholders for the next pass.</p>
      <button onClick={() => dispatch({ type: 'START_EVENING_ORDER' })}>Open evening order</button>
    </Card>
  );
}

function DebugOverlay({ state, dispatch }) {
  const [exportText, setExportText] = useState('');

  function exportJson() {
    setExportText(JSON.stringify(createDebugExport(state), null, 2));
  }

  function exportMarkdown() {
    setExportText(createMarkdownReport(state));
  }

  return (
    <aside className="debug-panel">
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

function PhaseRenderer({ state, dispatch }) {
  switch (state.phase) {
    case PHASES.DAY0_ORDER:
    case PHASES.EVENING_ORDER:
      return <WholesalerScreen state={state} dispatch={dispatch} />;
    case PHASES.MORNING_COLLECTION:
      return <CollectionScreen state={state} dispatch={dispatch} />;
    case PHASES.WEATHER:
      return <WeatherScreen state={state} dispatch={dispatch} />;
    case PHASES.LOCATION_SELECTION:
      return <LocationScreen state={state} dispatch={dispatch} />;
    case PHASES.VAN_LOADOUT:
      return <VanLoadoutScreen state={state} dispatch={dispatch} />;
    case PHASES.ROUTE_CONFIRMATION:
      return <RouteConfirmScreen state={state} dispatch={dispatch} />;
    case PHASES.DISPLAY_SETUP:
      return <DisplaySetupScreen state={state} dispatch={dispatch} />;
    case PHASES.TRADING:
      return <TradingScreen dispatch={dispatch} />;
    case PHASES.DAILY_SUMMARY:
      return <DailySummary state={state} dispatch={dispatch} />;
    case PHASES.WEEKLY_SUMMARY:
      return <Card><h2>Weekly Summary Placeholder</h2><p>This is scaffolded for the next implementation stage.</p></Card>;
    default:
      return <Card><h2>Unknown phase</h2><p>{state.phase}</p></Card>;
  }
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
