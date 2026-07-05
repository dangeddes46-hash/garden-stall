import { useState } from 'react';
import { DISPLAY_ZONES } from '../data/constants.js';
import { groupStockByPlant } from '../systems/stockGroupingSystem.js';
import { getBatchDisplayZoneId, getDisplayZoneSummary } from '../systems/displaySystem.js';
import { describeMoistureForPlayer } from '../systems/conditionSystem.js';
import { PRICE_BAND_DETAILS, describePriceBand } from '../systems/pricingSystem.js';
import { money, zoneLabel } from './ui.jsx';

const activeDisplayZones = DISPLAY_ZONES.filter((zone) => zone.id !== 'reduced-area');
const visiblePriceBands = ['bargain', 'normal', 'premium', 'reduced'];

function canWaterBatch(batch) {
  return ['display', 'reduced-area'].includes(batch.location) && (batch.quantity ?? 0) > 0 && !['sold', 'discarded'].includes(batch.location) && batch.loadType !== 'sundrytray';
}

export function PriceButtons({ batch, dispatch }) {
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

export function ZonePlacementButtons({ batch, dispatch, stockBatches, includeReduced = false, returnFromReduced = false }) {
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
            title={isFull ? `${zone.label} is full (${zoneUsage?.usedSlots ?? 0}/${zone.capacity}). Move something out before placing more here.` : zone.note}
            onClick={() => dispatch({
              type: returnFromReduced ? 'RETURN_REDUCED_TO_DISPLAY' : 'PLACE_ON_DISPLAY',
              batchId: batch.id,
              zoneId: zone.id
            })}
          >
            {isFull ? `${zone.label}: full` : returnFromReduced ? `Return ${zone.label}` : zone.label}
          </button>
        );
      })}
      {includeReduced && (
        <button
          className="secondary"
          disabled={(reducedUsage?.remainingSlots ?? 0) <= 0 && batch.location !== 'reduced-area'}
          title={(reducedUsage?.remainingSlots ?? 0) <= 0 ? `Reduced area is full (${reducedUsage?.usedSlots ?? 0}/${reducedUsage?.capacity ?? 0}). Move stock out before reducing more.` : 'Move to the reduced area and apply reduced pricing.'}
          onClick={() => dispatch({ type: 'MOVE_TO_REDUCED', batchId: batch.id })}
        >
          {(reducedUsage?.remainingSlots ?? 0) <= 0 && batch.location !== 'reduced-area' ? 'Reduced: full' : 'Reduced area'}
        </button>
      )}
    </>
  );
}

export function TrayRow({ batch, actionLabel, actionType, actionState = null, allowWater = false, allowPricing = true, dispatch, extraActions = null }) {
  const plantCount = batch.unitHealth?.filter((unit) => !unit.sold).length ?? batch.quantity;
  const zoneId = ['display', 'reduced-area'].includes(batch.location) ? getBatchDisplayZoneId(batch) : null;
  const disabled = actionState?.disabled ?? false;
  const actionTitle = actionState?.reason ?? actionLabel;
  const showWater = allowWater && canWaterBatch(batch);
  return (
    <div className="row-card tray-card">
      <div className="tray-details">
        <strong>{batch.batchLabel ?? 'batch'} · {batch.quantity} left · {money(batch.unitRetailPrice)} each</strong>
        <p className="fine-print">Average batch health: {batch.condition} · {describeMoistureForPlayer(batch.moisture)} · {describePriceBand(batch.priceBand)}</p>
        <p className="fine-print">Unit records: {plantCount} active · {batch.quantitySold ?? 0} sold{zoneId ? ` · ${zoneLabel(zoneId)}` : ''}</p>
        {actionState?.reason && disabled && <p className="fine-print capacity-warning">{actionState.reason}</p>}
        {allowPricing && <PriceButtons batch={batch} dispatch={dispatch} />}
      </div>
      <div className="row-actions wrap-actions tray-actions">
        {showWater && <button className="secondary" title="Watering helps dry stock. Repeated watering on the same batch can overdo it." onClick={() => dispatch({ type: 'WATER_STOCK_BATCH', batchId: batch.id })}>Water batch</button>}
        {actionType && <button disabled={disabled} title={actionTitle} onClick={() => dispatch({ type: actionType, batchId: batch.id })}>{disabled ? actionState?.label ?? actionLabel : actionLabel}</button>}
        {extraActions}
      </div>
    </div>
  );
}

export function ExpandableStockList({ title, batches, emptyText, actionLabel, actionType, getActionState, allowWater = false, allowPricing = true, dispatch, renderExtraActions }) {
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
                {isOpen(group) ? 'v' : '>'} {group.plantName} - {group.trayCount} {group.trayCount === 1 ? 'batch' : 'batches'}, {group.totalUnits} {group.totalUnits === 1 ? 'unit' : 'units'}
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

export function ReducedStockList({ batches, emptyText, stockBatches, dispatch }) {
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
          <button className="secondary" onClick={() => dispatch({ type: 'RETURN_REDUCED_TO_VAN', batchId: batch.id })}>Van</button>
        </>
      )}
    />
  );
}
