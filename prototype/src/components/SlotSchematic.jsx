import { DISPLAY_ZONES } from '../data/constants.js';
import { VAN_LOAD_LIMITS } from '../data/vanCapacity.js';
import { zoneLabel } from './ui.jsx';

function shortName(name = '') {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word[0])
    .join('')
    .slice(0, 3)
    .toUpperCase();
}

function isPotted(batch) {
  return batch?.loadType === 'feature-pots';
}

function Slot({ index, batch, labelPrefix = 'Slot' }) {
  const count = batch?.quantity ?? null;
  return (
    <div className={`slot-cell ${batch ? 'slot-filled' : 'slot-empty'}`} title={batch ? `${batch.plantName}: ${count} plant${count === 1 ? '' : 's'} left` : `${labelPrefix} ${index + 1}: empty`}>
      <span className="slot-index">{index + 1}</span>
      {batch ? (
        <>
          <span className="slot-plant">{shortName(batch.plantName)}</span>
          {isPotted(batch) ? <strong className="slot-count">{count}</strong> : <span className="slot-count">{count}</span>}
        </>
      ) : <span className="slot-empty-mark">—</span>}
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
  const trayBatches = vanStock.filter((batch) => batch.loadType !== 'feature-pots');
  const featureBatches = vanStock.filter((batch) => batch.loadType === 'feature-pots');
  return (
    <div className="slot-schematic">
      <p className="eyebrow">Van schematic</p>
      <ZoneBlock title="Tray bay" capacity={VAN_LOAD_LIMITS.traySlots} batches={trayBatches} labelPrefix="Tray bay" />
      <ZoneBlock title="Potted plant bay" capacity={VAN_LOAD_LIMITS.featurePots} batches={featureBatches} labelPrefix="Potted plant bay" />
      <p className="fine-print">Numbers show plants left in that tray or potted batch. Bold numbers mean individual potted plants rather than a tray.</p>
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
      <p className="fine-print">15 display slots total. Numbers show plants left in each tray or potted batch. Bold numbers mean individual potted plants rather than a tray.</p>
    </div>
  );
}
