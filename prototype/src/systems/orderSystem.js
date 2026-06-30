import { calculateOrderFee } from '../data/supplierListings.js';
import { plantById } from '../data/plants.js';

export function calculateCart(cart) {
  const subtotal = cart.reduce((sum, item) => sum + item.wholesaleCost * item.count, 0);
  const fee = calculateOrderFee(subtotal);
  return {
    subtotal,
    fee,
    total: subtotal + fee
  };
}

export function createPendingOrder({ dayPlaced, cart }) {
  const totals = calculateCart(cart);
  return {
    id: `order-${dayPlaced}-${Date.now()}`,
    dayPlaced,
    dayArrives: dayPlaced + 1,
    items: cart.map((item) => ({ ...item })),
    subtotal: totals.subtotal,
    fee: totals.fee,
    total: totals.total,
    collected: false
  };
}

export function createStockBatchesFromOrder(order) {
  return order.items.flatMap((item, index) => {
    const plant = plantById[item.plantId];
    if (!plant) return [];

    return {
      id: `${order.id}-batch-${index}-${item.plantId}`,
      sourceOrderId: order.id,
      plantId: item.plantId,
      plantName: plant.displayName,
      quantity: item.quantity * item.count,
      quantitySold: 0,
      unitRetailPrice: item.suggestedRetail,
      priceBand: 'normal',
      condition: item.condition ?? 'excellent',
      moisture: plant.moistureProfile === 'none' ? 'watered' : 'damp',
      location: 'home',
      zoneId: null,
      reduced: false,
      batchType: item.batchType,
      batchLabel: item.batchLabel,
      loadType: item.loadType,
      notes: [item.supplierNote].filter(Boolean)
    };
  });
}
