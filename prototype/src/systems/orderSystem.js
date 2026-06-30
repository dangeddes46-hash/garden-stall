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

function createPlantHealthProfiles({ item, plant, trayId }) {
  const initialCondition = item.condition ?? 'excellent';
  const initialMoisture = plant.moistureProfile === 'none' ? 'watered' : 'damp';
  return Array.from({ length: item.quantity }, (_, plantIndex) => ({
    id: `${trayId}-plant-${plantIndex}`,
    condition: initialCondition,
    moisture: initialMoisture,
    sold: false
  }));
}

export function createStockBatchesFromOrder(order) {
  return order.items.flatMap((item, itemIndex) => {
    const plant = plantById[item.plantId];
    if (!plant) return [];

    return Array.from({ length: item.count }, (_, trayIndex) => {
      const trayId = `${order.id}-tray-${itemIndex}-${trayIndex}-${item.plantId}`;
      const unitHealth = createPlantHealthProfiles({ item, plant, trayId });
      return {
        id: trayId,
        sourceOrderId: order.id,
        plantId: item.plantId,
        plantName: plant.displayName,
        quantity: item.quantity,
        quantitySold: 0,
        unitHealth,
        unitHealthModel: 'per-plant-average',
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
      };
    });
  });
}
