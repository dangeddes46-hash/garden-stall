export const PRICE_BAND_DETAILS = {
  bargain: {
    label: 'Bargain',
    multiplier: 0.85,
    customerModifier: 1,
    note: 'A tempting lower price. Helps value buyers without making good stock feel too cheap.'
  },
  normal: {
    label: 'Normal',
    multiplier: 1,
    customerModifier: 0,
    note: 'The supplier suggested retail price.'
  },
  premium: {
    label: 'Premium',
    multiplier: 1.15,
    customerModifier: -1,
    note: 'A confident higher price. Best for excellent, well-placed, giftable stock.'
  },
  reduced: {
    label: 'Reduced',
    multiplier: 0.65,
    customerModifier: 2,
    note: 'Clearance pricing. Useful for bargain hunters, weaker for gift/premium appeal.'
  }
};

const priceBandOrder = ['bargain', 'normal', 'premium'];

export function calculateUnitPrice(baseRetailPrice, priceBand) {
  const detail = PRICE_BAND_DETAILS[priceBand] ?? PRICE_BAND_DETAILS.normal;
  return Number((baseRetailPrice * detail.multiplier).toFixed(2));
}

export function getBaseRetailPrice(batch) {
  return batch.baseRetailPrice ?? batch.unitRetailPrice ?? 0;
}

export function applyPriceBand(batch, priceBand) {
  const baseRetailPrice = getBaseRetailPrice(batch);
  return {
    ...batch,
    baseRetailPrice,
    priceBand,
    unitRetailPrice: calculateUnitPrice(baseRetailPrice, priceBand),
    reduced: priceBand === 'reduced'
  };
}

export function getNextPriceBand(currentBand, direction) {
  const currentIndex = priceBandOrder.indexOf(currentBand);
  const safeIndex = currentIndex >= 0 ? currentIndex : priceBandOrder.indexOf('normal');
  const nextIndex = direction === 'up'
    ? Math.min(priceBandOrder.length - 1, safeIndex + 1)
    : Math.max(0, safeIndex - 1);
  return priceBandOrder[nextIndex];
}

export function getPriceCustomerModifier(batch, archetype) {
  if (batch.priceBand === 'reduced') return archetype?.reducedInterest === 'high' ? 2 : -0.5;
  if (batch.priceBand === 'bargain') return archetype?.priceSensitivity === 'high' ? 1.5 : 0.5;
  if (batch.priceBand === 'premium') return archetype?.priceSensitivity === 'high' ? -2 : -0.75;
  return 0;
}

export function describePriceBand(priceBand) {
  return PRICE_BAND_DETAILS[priceBand]?.label ?? priceBand;
}

export function summarizePricingFromTradingLog(tradingLog = []) {
  const sold = { bargain: 0, normal: 0, premium: 0, reduced: 0 };
  const revenue = { bargain: 0, normal: 0, premium: 0, reduced: 0 };
  const missed = [];

  tradingLog.forEach((wave) => {
    wave.sales?.forEach((sale) => {
      const band = sale.priceBand ?? 'normal';
      sold[band] = (sold[band] ?? 0) + sale.quantity;
      revenue[band] = (revenue[band] ?? 0) + (sale.revenue ?? ((sale.quantity ?? 0) * (sale.unitPrice ?? 0)));
    });
    wave.priceNotes?.forEach((note) => missed.push(note));
  });

  const notes = [];
  if (sold.premium > 0) notes.push(`Premium pricing sold ${sold.premium} plants/items for £${revenue.premium.toFixed(2)}.`);
  if (sold.bargain > 0) notes.push(`Bargain pricing moved ${sold.bargain} plants/items for £${revenue.bargain.toFixed(2)}.`);
  if (sold.reduced > 0) notes.push(`Reduced pricing cleared ${sold.reduced} plants/items for £${revenue.reduced.toFixed(2)}.`);
  if (missed.length > 0) notes.push(...missed.slice(0, 3));
  if (notes.length === 0) notes.push('Pricing did not create a clear story today.');

  return { sold, soldByBand: sold, revenue, notes };
}
