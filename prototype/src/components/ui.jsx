import { DISPLAY_ZONES } from '../data/constants.js';

export function money(value) {
  return `£${Number(value || 0).toFixed(2)}`;
}

export function zoneLabel(zoneId) {
  return DISPLAY_ZONES.find((zone) => zone.id === zoneId)?.label ?? zoneId ?? 'No zone';
}

export function Card({ children, className = '' }) {
  return <section className={`card ${className}`}>{children}</section>;
}
