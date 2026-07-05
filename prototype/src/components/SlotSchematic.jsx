import { DISPLAY_ZONES } from '../data/constants.js';
import { VAN_LOAD_LIMITS } from '../data/vanCapacity.js';
import { getBatchVanLoad } from '../systems/stockSystem.js';
import { zoneLabel } from './ui.jsx';

function shortName(name = '') {
  return name.split(/\s+/).filter(Boolean).map((word) => word[0]).join('').slice(0, 3).toUpperCase();
}

function isPottray(batch) { return batch?.loadType === 'pottray'; }
function isSundrytray(batch) { return batch?.loadType === 'sundrytray'; }

function expandByLoadSlots(batches, slotKey) {
  return batches.flatMap((batch) => {
    const load = getBatchVanLoad(batch);
    const slots = Math.max(1, load[slotKey] ?? 1);
    return Array.from({ length: slots }, (_, index) => ({ ...batch, slotPart: slots > 1 ? `${index + 1}/${slots}` : null }));
  });
}

function Slot({ index, batch, labelPrefix = 'Slot' }) {
  const count = batch?.quantity ?? null;
  const part = batch?.slotPart ? ` slot ${batch.slotPart}` : '';
  return (
    <div className={`slot-cell ${batch ? 'slot-filled' : 'slot-empty'}`} title={batch ? `${batch.plantName}: ${count} units left${part}` : `${labelPrefix} ${index + 1}: empty`}>
      <span className="slot-index">{index + 1}</span>
      {batch ? (
        <>
          <span className="slot-plant">{shortName(batch.plantName)}</span>
          {isPottray(batch) ? <strong className="slot-count">{count}{batch.slotPart ? ` ${batch.slotPart}` : ''}</strong> : <span className="slot-count">{count}{isSundrytray(batch) ? ' sundry' : ''}{batch.slotPart ? ` ${batch.slotPart}` : ''}</span>}
        </>
      ) : <span className="slot-empty-mark">-</span>}
    </div>
  );
}

function ZoneBlock({ title, capacity, batches, labelPrefix }) {
  const slots = Array.from({ length: capacity }, (_, index) => batches[index] ?? null);
  return (
    <div className="slot-zone">
      <h4>{title}</h4>
      <div className="slot-grid">
        {slots.map((batch, index) => <Slot key={`${title}-${index}`} index={index} batch={batch} labelPrefix={labelPrefix} />)}
      </div>
    </div>
  );
}

export function VanSlotSchematic({ stockBatches }) {
  const vanStock = stockBatches.filter((batch) => batch.location === 'van' && batch.quantity > 0);
  const trayBatches = expandByLoadSlots(vanStock.filter((batch) => batch.loadType === 'tray'), 'traySlots');
  const pottrayBatches = expandByLoadSlots(vanStock.filter((batch) => batch.loadType === 'pottray'), 'pottraySlots');
  const sundrytrayBatches = expandByLoadSlots(vanStock.filter((batch) => batch.loadType === 'sundrytray'), 'sundrytraySlots');
  return (
    <div className="slot-schematic">
      <p className="eyebrow">Van schematic</p>
      <ZoneBlock title="Tray bay" capacity={VAN_LOAD_LIMITS.traySlots} batches={trayBatches} labelPrefix="Tray bay" />
      <ZoneBlock title="Pottray bay" capacity={VAN_LOAD_LIMITS.pottraySlots} batches={pottrayBatches} labelPrefix="Pottray bay" />
      <ZoneBlock title="Sundrytray bay" capacity={VAN_LOAD_LIMITS.sundrytraySlots} batches={sundrytrayBatches} labelPrefix="Sundrytray bay" />
      <p className="fine-print">Numbers show units left. Display slots remain generic; only the van uses tray, pottray, and sundrytray buckets.</p>
    </div>
  );
}

export function DisplaySlotSchematic({ stockBatches }) {
  return (
    <div className="slot-schematic">
      <p className="eyebrow">Display schematic</p>
      {DISPLAY_ZONES.map((zone) => {
        const batches = stockBatches.filter((batch) => {
          if (batch.quantity <= 0) return false;
          if (zone.id === 'reduced-area') return batch.location === 'reduced-area';
          return batch.location === 'display' && (batch.zoneId ?? 'front-table') === zone.id;
        });
        return <ZoneBlock key={zone.id} title={`${zoneLabel(zone.id)} (${zone.capacity})`} capacity={zone.capacity} batches={batches} labelPrefix={zone.label} />;
      })}
      <p className="fine-print">Display slots are generic. A slot can hold one tray, pottray, or sundrytray.</p>
    </div>
  );
}
