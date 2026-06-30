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
  return order.items.flatMap((item, itemIndex) => {
    const plant = plantById[item.plantId];
    if (!plant) return [];

    return Array.from({ length: item.count }, (_, trayIndex) => ({
      id: `${order.id}-tray-${itemIndex}-${trayIndex}-${item.plantId}`,
      sourceOrderId: order.id,
      plantId: item.plantId,
      plantName: plant.displayName,
      quantity: item.quantity,
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
      trayNumber: trayIndex + 1,
      trayCountFromOrderLine: item.count,
      notes: [item.supplierNote].filter(Boolean)
    }));
  });
}
