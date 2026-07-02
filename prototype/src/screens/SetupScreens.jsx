import { VAN_LOAD_LIMITS } from '../data/vanCapacity.js';
import { getSupplierListingsForDay } from '../data/supplierListings.js';
import { plantById } from '../data/plants.js';
import { locations, locationById } from '../data/locations.js';
import { weekDayByNumber } from '../data/weekScript.js';
import { calculateCart } from '../systems/orderSystem.js';
import { getStockByLocation, getVanLoadStatus, getVanLoadSummary } from '../systems/stockSystem.js';
import { getDisplayZoneSummary } from '../systems/displaySystem.js';
import { buildEveningOrderFeedback } from '../systems/eveningFeedbackSystem.js';
import { Card, money } from '../components/ui.jsx';
import { ExpandableStockList, ReducedStockList, ZonePlacementButtons, ZoneUsagePanel } from '../components/StockLists.jsx';

function EveningOrderFeedback({ state }) {
  const feedback = buildEveningOrderFeedback(state);
  return (
    <div className="row-card column-card">
      <p className="eyebrow">Stall notebook</p>
      <h3>{feedback.title}</h3>
      {feedback.lines.map((line) => <p className="fine-print" key={line}>• {line}</p>)}
      {feedback.warnings.map((line) => <p className="fine-print capacity-warning" key={line}>• {line}</p>)}
      {feedback.guidance.length > 0 && (
        <div className="stack nested-stack">
          {feedback.guidance.map((entry) => (
            <article className="notebook-mini" key={`${entry.type}-${entry.summary}`}>
              <strong>{entry.summary}</strong>
              <p className="fine-print">{entry.reason}</p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export function WholesalerScreen({ state, dispatch }) {
  const listings = getSupplierListingsForDay(state.currentDay);
  const totals = calculateCart(state.cart);
  const availableCount = listings.filter((listing) => listing.availability === 'available').length;

  return (
    <div className="screen-grid wide-left">
      <Card>
        <p className="eyebrow">County Plant Wholesale</p>
        <h2>{state.currentDay === 0 ? 'Opening Evening Order' : 'Evening Order'}</h2>
        <p className="muted">Choose stock for collection tomorrow morning. For the first run, try mixing colour, edible stock, and one giftable or showy item instead of buying only one kind of tray.</p>
        <EveningOrderFeedback state={state} />
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
                <p className="fine-print">Batch: {listing.batchLabel} · {listing.quantity} units · Trade cost: {money(listing.wholesaleCost)} · Suggested retail: {money(listing.suggestedRetail)} each</p>
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
                  <p className="fine-print">{item.count} x {item.batchLabel} ({item.quantity} units)</p>
                </div>
                <div className="row-actions">
                  <span>{money(item.wholesaleCost * item.count)}</span>
                  <button onClick={() => dispatch({ type: 'REMOVE_FROM_CART', listingId: item.id })}>-</button>
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

export function CollectionScreen({ state, dispatch }) {
  const collectible = state.pendingOrders.filter((order) => order.dayArrives <= state.currentDay && !order.collected);
  return (
    <Card>
      <p className="eyebrow">Morning Collection</p>
      <h2>Collect yesterday's wholesale order</h2>
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

export function WeatherScreen({ state, dispatch }) {
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
      <button onClick={() => dispatch({ type: 'ADVANCE_PHASE' })}>Choose today's location</button>
    </Card>
  );
}

export function LocationScreen({ state, dispatch }) {
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

export function VanLoadoutScreen({ state, dispatch }) {
  const homeStock = getStockByLocation(state.stockBatches, 'home');
  const vanStock = getStockByLocation(state.stockBatches, 'van');
  const vanLoad = getVanLoadSummary(state.stockBatches);
  const trayFull = vanLoad.traySlots >= VAN_LOAD_LIMITS.traySlots;
  const featureFull = vanLoad.featurePots >= VAN_LOAD_LIMITS.featurePots;
  return (
    <div className="screen-grid">
      <Card>
        <p className="eyebrow">Home Stock</p>
        <h2>Load the van</h2>
        <p className="muted">Capacity is {VAN_LOAD_LIMITS.traySlots} tray spaces plus {VAN_LOAD_LIMITS.featurePots} loose/feature potted plants. Trays and feature pots use different spaces, so a full tray bay may still leave room for loose pots.</p>
        <div className="button-row wrap-actions">
          <button className="secondary" disabled={homeStock.length === 0 || (trayFull && featureFull)} onClick={() => dispatch({ type: 'AUTOLOAD_VAN' })}>Autoload varied van</button>
        </div>
        <p className="fine-print">Autoload prefers variety first, then older home stock. It respects tray and feature-pot capacity.</p>
        {(trayFull || featureFull) && <p className="fine-print capacity-warning">Capacity warning: {trayFull ? 'tray space full' : null}{trayFull && featureFull ? '; ' : ''}{featureFull ? 'feature-pot space full' : null}.</p>}
        <ExpandableStockList
          title="Home stock"
          batches={homeStock}
          emptyText="No stock at home."
          actionLabel="Load"
          actionType="LOAD_TO_VAN"
          getActionState={(batch) => {
            const status = getVanLoadStatus(state.stockBatches, batch.id);
            return status.canLoad ? null : { disabled: true, label: 'No van space', reason: status.reason };
          }}
          dispatch={dispatch}
        />
      </Card>
      <Card>
        <h2>Van</h2>
        <p className="fine-print">Load a balanced day rather than everything you own. You can leave stock at home for tomorrow.</p>
        <div className="totals">
          <div><span>Tray spaces</span><strong>{vanLoad.traySlots} / {VAN_LOAD_LIMITS.traySlots}</strong></div>
          <div><span>Feature pots</span><strong>{vanLoad.featurePots} / {VAN_LOAD_LIMITS.featurePots}</strong></div>
          <div><span>Batches</span><strong>{vanLoad.batchCount}</strong></div>
        </div>
        <ExpandableStockList title="Van stock" batches={vanStock} emptyText="The van is empty." actionLabel="Unload" actionType="UNLOAD_TO_HOME" dispatch={dispatch} />
        <button disabled={vanStock.length === 0} onClick={() => dispatch({ type: 'ADVANCE_PHASE' })}>Confirm loadout</button>
      </Card>
    </div>
  );
}

export function RouteConfirmScreen({ state, dispatch }) {
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
      <p className="fine-print">Cost deduction is deliberately left as a placeholder until trading balance is less fragile.</p>
      <button onClick={() => dispatch({ type: 'CONFIRM_ROUTE' })}>Confirm route and set up stall</button>
    </Card>
  );
}

export function DisplaySetupScreen({ state, dispatch }) {
  const vanStock = getStockByLocation(state.stockBatches, 'van');
  const displayStock = getStockByLocation(state.stockBatches, 'display');
  const reducedStock = getStockByLocation(state.stockBatches, 'reduced-area');
  const displaySummary = getDisplayZoneSummary(state.stockBatches);
  return (
    <div className="screen-grid">
      <Card>
        <p className="eyebrow">Display Setup</p>
        <h2>Zone placement and pricing</h2>
        <p className="muted">Front Table suits colourful or giftable stock. Floor / Crates works for useful grow-your-own trays. Feature Spot is limited; save it for showier pots.</p>
        <div className="button-row wrap-actions">
          <button className="secondary" disabled={vanStock.length === 0} onClick={() => dispatch({ type: 'AUTODISPLAY_STOCK' })}>Autodisplay varied stall</button>
        </div>
        <p className="fine-print">Autodisplay prefers variety first, then newer van stock. It puts higher potential value into premium spots where possible.</p>
        <ZoneUsagePanel displaySummary={displaySummary} />
        <ExpandableStockList
          title="Van stock"
          batches={vanStock}
          emptyText="No stock left in van."
          dispatch={dispatch}
          renderExtraActions={(batch) => <ZonePlacementButtons batch={batch} dispatch={dispatch} stockBatches={state.stockBatches} includeReduced />}
        />
      </Card>
      <Card>
        <h2>Visible Stall</h2>
        <div className="totals">
          <div><span>Display slots</span><strong>{displaySummary.usedSlots} / {displaySummary.zoneCapacity}</strong></div>
          <div><span>Rating</span><strong>{displaySummary.rating}</strong></div>
          <div><span>Score</span><strong>{displaySummary.score}</strong></div>
        </div>
        {displaySummary.notes.map((note) => <p key={note} className="fine-print">• {note}</p>)}
        <p className="fine-print">Watering helps dry stock, but repeated watering can overdo it.</p>
        <ExpandableStockList
          title="Display"
          batches={displayStock}
          emptyText="Nothing displayed yet."
          allowWater
          dispatch={dispatch}
          renderExtraActions={(batch) => (
            <>
              <ZonePlacementButtons batch={batch} dispatch={dispatch} stockBatches={state.stockBatches} includeReduced />
              <button className="secondary" onClick={() => dispatch({ type: 'UNLOAD_TO_HOME', batchId: batch.id })}>Home</button>
            </>
          )}
        />
        <ReducedStockList batches={reducedStock} emptyText="No reduced stock." stockBatches={state.stockBatches} dispatch={dispatch} />
        <div className="button-row">
          <button onClick={() => dispatch({ type: 'ADVANCE_PHASE' })}>Open trading</button>
          <button className="secondary" onClick={() => dispatch({ type: 'RETURN_DISPLAY_TO_VAN' })}>Return display to van</button>
        </div>
      </Card>
    </div>
  );
}
