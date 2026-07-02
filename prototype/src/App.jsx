import { useMemo, useReducer, useState } from 'react';
import { PHASES, PHASE_LABELS, DISPLAY_ZONES } from './data/constants.js';
import { VAN_LOAD_LIMITS } from './data/vanCapacity.js';
import { getSupplierListingsForDay } from './data/supplierListings.js';
import { plantById } from './data/plants.js';
import { locations, locationById } from './data/locations.js';
import { weekDayByNumber } from './data/weekScript.js';
import { calculateCart } from './systems/orderSystem.js';
import { getStockByLocation, getVanLoadStatus, getVanLoadSummary } from './systems/stockSystem.js';
import { groupStockByPlant } from './systems/stockGroupingSystem.js';
import { getBatchDisplayZoneId, getDisplayZoneSummary } from './systems/displaySystem.js';
import { describeMoistureForPlayer } from './systems/conditionSystem.js';
import { PRICE_BAND_DETAILS, describePriceBand } from './systems/pricingSystem.js';
import { createDebugExport, createMarkdownReport } from './systems/reportSystem.js';
import { initialState } from './state/initialState.js';
import { reducer } from './state/reducer.js';

const activeDisplayZones = DISPLAY_ZONES.filter((zone) => zone.id !== 'reduced-area');
const visiblePriceBands = ['bargain', 'normal', 'premium', 'reduced'];

function money(value) {
  return `£${Number(value || 0).toFixed(2)}`;
}

function zoneLabel(zoneId) {
  return DISPLAY_ZONES.find((zone) => zone.id === zoneId)?.label ?? zoneId ?? 'No zone';
}

function Card({ children, className = '' }) {
  return <section className={`card ${className}`}>{children}</section>;
}

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

function WholesalerScreen({ state, dispatch }) {
  const listings = getSupplierListingsForDay(state.currentDay);
  const totals = calculateCart(state.cart);
  const availableCount = listings.filter((listing) => listing.availability === 'available').length;

  return (
    <div className="screen-grid wide-left">
      <Card>
        <p className="eyebrow">County Plant Wholesale</p>
        <h2>{state.currentDay === 0 ? 'Opening Evening Order' : 'Evening Order'}</h2>
        <p className="muted">Choose stock for collection tomorrow morning. Sold-out lines stay visible so the trade site already feels like a supplier catalogue.</p>
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
                  <p className="fine-print">{item.count} × {item.batchLabel} ({item.quantity} units)</p>
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
      <button onClick={() => dispatch({ type: 'ADVANCE_PHASE' })}>Choose today's location</button>
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

function PriceButtons({ batch, dispatch }) {
  return (
    <div className="price-actions">
      {visiblePriceBands.map((band) => (
        <button
          key={band}
          className={batch.priceBand === band ? 'secondary' : undefined}
          title={PRICE_BAND_DETAILS[band]?.note}
          onClick={() => dispatch({ type: 'SET_PRICE_BAND', batchId: batch.id, priceBand: band })}
        >
          {describePriceBand(band)}
        </button>
      ))}
    </div>
  );
}

function ZonePlacementButtons({ batch, dispatch, stockBatches, includeReduced = false, returnFromReduced = false }) {
  const usage = getDisplayZoneSummary(stockBatches).zoneUsage;
  const currentZoneId = getBatchDisplayZoneId(batch);
  const stockWithoutBatch = stockBatches.filter((item) => item.id !== batch.id);
  const reducedUsage = getDisplayZoneSummary(stockWithoutBatch).zoneUsage.find((zone) => zone.id === 'reduced-area');
  return (
    <>
      {activeDisplayZones.map((zone) => {
        const zoneUsage = usage.find((entry) => entry.id === zone.id);
        const isCurrentZone = ['display', 'reduced-area'].includes(batch.location) && currentZoneId === zone.id;
        const isFull = (zoneUsage?.remainingSlots ?? 0) <= 0 && !isCurrentZone;
        return (
          <button
            key={zone.id}
            className={isCurrentZone ? 'secondary' : undefined}
            disabled={isFull}
            title={isFull ? `${zone.label} is full (${zoneUsage?.usedSlots ?? 0}/${zone.capacity}).` : zone.note}
            onClick={() => dispatch({
              type: returnFromReduced ? 'RETURN_REDUCED_TO_DISPLAY' : 'PLACE_ON_DISPLAY',
              batchId: batch.id,
              zoneId: zone.id
            })}
          >
            {isFull ? `${zone.label} full` : returnFromReduced ? `Return ${zone.label}` : zone.label}
          </button>
        );
      })}
      {includeReduced && (
        <button
          className="secondary"
          disabled={(reducedUsage?.remainingSlots ?? 0) <= 0 && batch.location !== 'reduced-area'}
          title={(reducedUsage?.remainingSlots ?? 0) <= 0 ? `Reduced area is full (${reducedUsage?.usedSlots ?? 0}/${reducedUsage?.capacity ?? 0}).` : 'Move to the reduced area and apply reduced pricing.'}
          onClick={() => dispatch({ type: 'MOVE_TO_REDUCED', batchId: batch.id })}
        >
          {(reducedUsage?.remainingSlots ?? 0) <= 0 && batch.location !== 'reduced-area' ? 'Reduced full' : 'Reduced area'}
        </button>
      )}
    </>
  );
}

function TrayRow({ batch, actionLabel, actionType, actionState = null, allowWater = false, allowPricing = true, dispatch, extraActions = null }) {
  const plantCount = batch.unitHealth?.filter((unit) => !unit.sold).length ?? batch.quantity;
  const zoneId = ['display', 'reduced-area'].includes(batch.location) ? getBatchDisplayZoneId(batch) : null;
  const disabled = actionState?.disabled ?? false;
  const actionTitle = actionState?.reason ?? actionLabel;
  return (
    <div className="row-card">
      <div>
        <strong>{batch.batchLabel ?? 'tray'} · {batch.quantity} left · {money(batch.unitRetailPrice)} each</strong>
        <p className="fine-print">Average tray health: {batch.condition} · {describeMoistureForPlayer(batch.moisture)} · {describePriceBand(batch.priceBand)}</p>
        <p className="fine-print">Plant records: {plantCount} active · {batch.quantitySold ?? 0} sold{zoneId ? ` · ${zoneLabel(zoneId)}` : ''}</p>
        {actionState?.reason && disabled && <p className="fine-print capacity-warning">{actionState.reason}</p>}
        {allowPricing && <PriceButtons batch={batch} dispatch={dispatch} />}
      </div>
      <div className="row-actions wrap-actions">
        {allowWater && <button className="secondary" onClick={() => dispatch({ type: 'WATER_STOCK_BATCH', batchId: batch.id })}>Water tray</button>}
        {actionType && <button disabled={disabled} title={actionTitle} onClick={() => dispatch({ type: actionType, batchId: batch.id })}>{disabled ? actionState?.label ?? actionLabel : actionLabel}</button>}
        {extraActions}
      </div>
    </div>
  );
}

function ExpandableStockList({ title, batches, emptyText, actionLabel, actionType, getActionState, allowWater = false, allowPricing = true, dispatch, renderExtraActions }) {
  const groups = groupStockByPlant(batches);
  const [openOverrides, setOpenOverrides] = useState({});

  function isOpen(group) {
    return openOverrides[group.key] ?? group.defaultOpen;
  }

  function toggle(group) {
    setOpenOverrides((current) => ({ ...current, [group.key]: !isOpen(group) }));
  }

  return (
    <div>
      <h3>{title}</h3>
      {groups.length === 0 ? <p className="muted">{emptyText}</p> : (
        <div className="stack">
          {groups.map((group) => (
            <div key={group.key} className="column-card row-card">
              <button className="link-button" onClick={() => toggle(group)}>
                {isOpen(group) ? '▾' : '▸'} {group.plantName} — {group.trayCount} trays, {group.totalUnits} plants
              </button>
              {isOpen(group) && (
                <div className="stack nested-stack">
                  {group.batches.map((batch) => (
                    <TrayRow
                      key={batch.id}
                      batch={batch}
                      actionLabel={actionLabel}
                      actionType={actionType}
                      actionState={getActionState ? getActionState(batch) : null}
                      allowWater={allowWater}
                      allowPricing={allowPricing}
                      dispatch={dispatch}
                      extraActions={renderExtraActions ? renderExtraActions(batch) : null}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ReducedStockList({ batches, emptyText, stockBatches, dispatch }) {
  return (
    <ExpandableStockList
      title="Reduced area"
      batches={batches}
      emptyText={emptyText}
      allowWater
      dispatch={dispatch}
      renderExtraActions={(batch) => (
        <>
          <ZonePlacementButtons batch={batch} dispatch={dispatch} stockBatches={stockBatches} returnFromReduced />
          <button className="secondary" onClick={() => dispatch({ type: 'RETURN_REDUCED_TO_VAN', batchId: batch.id })}>Return van</button>
        </>
      )}
    />
  );
}

function VanLoadoutScreen({ state, dispatch }) {
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
        <p className="muted">Van capacity is {VAN_LOAD_LIMITS.traySlots} trays plus {VAN_LOAD_LIMITS.featurePots} loose/feature potted plants.</p>
        {(trayFull || featureFull) && <p className="fine-print capacity-warning">Capacity warning: {trayFull ? 'tray space full' : null}{trayFull && featureFull ? '; ' : ''}{featureFull ? 'feature-pot space full' : null}.</p>}
        <ExpandableStockList
          title="Home stock"
          batches={homeStock}
          emptyText="No stock at home."
          actionLabel="Load"
          actionType="LOAD_TO_VAN"
          getActionState={(batch) => {
            const status = getVanLoadStatus(state.stockBatches, batch.id);
            return status.canLoad ? null : { disabled: true, label: 'No space', reason: status.reason };
          }}
          dispatch={dispatch}
        />
      </Card>
      <Card>
        <h2>Van</h2>
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
      <p className="fine-print">Cost deduction is deliberately left as a placeholder until trading balance is less fragile.</p>
      <button onClick={() => dispatch({ type: 'CONFIRM_ROUTE' })}>Confirm route and set up stall</button>
    </Card>
  );
}

function ZoneUsagePanel({ displaySummary }) {
  return (
    <div className="display-zones">
      {displaySummary.zoneUsage.map((zone) => {
        const isFull = zone.remainingSlots <= 0;
        return (
          <div className={`zone ${isFull ? 'zone-full' : ''}`} key={zone.id}>
            <strong>{zone.label}</strong>
            <span>{zone.usedSlots} / {zone.capacity} slots{isFull ? ' · full' : ''}</span>
            <p>{zone.note}</p>
          </div>
        );
      })}
    </div>
  );
}

function DisplaySetupScreen({ state, dispatch }) {
  const vanStock = getStockByLocation(state.stockBatches, 'van');
  const displayStock = getStockByLocation(state.stockBatches, 'display');
  const reducedStock = getStockByLocation(state.stockBatches, 'reduced-area');
  const displaySummary = getDisplayZoneSummary(state.stockBatches);
  return (
    <div className="screen-grid">
      <Card>
        <p className="eyebrow">Display Setup</p>
        <h2>Zone placement and pricing</h2>
        <p className="muted">Choose where each tray/pot sits and set its price band. Bargain helps value buyers; premium needs good stock and placement.</p>
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

function TradingScreen({ state, dispatch }) {
  const displaySummary = getDisplayZoneSummary(state.stockBatches);
  const displayStock = getStockByLocation(state.stockBatches, 'display');
  const reducedStock = getStockByLocation(state.stockBatches, 'reduced-area');
  return (
    <div className="screen-grid">
      <div className="stack">
        <Card>
          <p className="eyebrow">Trading Day</p>
          <h2>Passive customer waves</h2>
          <p>Each wave generates location-weighted customers, reads display zones and prices, then visible stock takes a drying/condition tick.</p>
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

function DailySummary({ state, dispatch }) {
  const latest = state.dailyReports[state.dailyReports.length - 1];
  const conditionSummary = latest?.conditionSummary ?? [];
  const wateredSummary = latest?.wateredSummary ?? [];
  const pricingNotes = latest?.pricingSummary?.notes ?? [];
  const notebookNotes = latest?.notebookNotes ?? [];
  const notebookDiscoveries = latest?.notebookDiscoveries ?? [];
  return (
    <Card>
      <p className="eyebrow">Daily Summary</p>
      <h2>Day {state.currentDay} report</h2>
      <p>{latest?.note ?? 'No report generated yet.'}</p>
      {latest && (
        <div className="totals">
          <div><span>Revenue</span><strong>{money(latest.revenue)}</strong></div>
          <div><span>Passive sales</span><strong>{latest.salesCount}</strong></div>
          <div><span>Requests</span><strong>{latest.requestCount ?? 0}</strong></div>
        </div>
      )}
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
      <h3>Pricing notes</h3>
      {pricingNotes.length === 0 ? <p className="muted">No pricing notes today.</p> : pricingNotes.map((note) => <p className="fine-print" key={note}>• {note}</p>)}
      <h3>Condition notes</h3>
      {wateredSummary.map((note) => <p className="fine-print capacity-warning" key={note}>• {note}</p>)}
      {conditionSummary.length === 0 ? <p className="muted">No stock condition changes today.</p> : (
        <div className="stack">
          {conditionSummary.map((entry, index) => (
            <article className="row-card column-card" key={`${entry.plantName}-${entry.timing}-${index}`}>
              <strong>{entry.count} × {entry.plantName} {entry.timing}</strong>
              <p className="fine-print">{entry.summary}</p>
            </article>
          ))}
        </div>
      )}
      <p className="fine-print">Full per-batch condition events remain available in the JSON/debug export.</p>
      <button onClick={() => dispatch({ type: 'START_EVENING_ORDER' })}>Open evening order</button>
    </Card>
  );
}

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

function DebugOverlay({ state, dispatch }) {
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
      return <TradingScreen state={state} dispatch={dispatch} />;
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
