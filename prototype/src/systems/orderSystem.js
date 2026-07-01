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

function initialMoistureForPlant(plant) {
  return plant.moistureProfile === 'none' ? 'watered' : 'damp';
}

function createPlantHealthProfiles({ item, plant, batchId, quantity }) {
  const initialCondition = item.condition ?? 'excellent';
  const initialMoisture = initialMoistureForPlant(plant);
  return Array.from({ length: quantity }, (_, plantIndex) => ({
    id: `${batchId}-plant-${plantIndex}`,
    condition: initialCondition,
    moisture: initialMoisture,
    sold: false
  }));
}

function createStockBatch({ order, item, plant, itemIndex, batchIndex, quantity, batchLabel, batchType, loadType }) {
  const batchId = `${order.id}-batch-${itemIndex}-${batchIndex}-${item.plantId}`;
  return {
    id: batchId,
    sourceOrderId: order.id,
    plantId: item.plantId,
    plantName: plant.displayName,
    quantity,
    quantitySold: 0,
    unitHealth: createPlantHealthProfiles({ item, plant, batchId, quantity }),
    unitHealthModel: 'per-plant-average',
    baseRetailPrice: item.suggestedRetail,
    unitRetailPrice: item.suggestedRetail,
    priceBand: 'normal',
    condition: item.condition ?? 'excellent',
    moisture: initialMoistureForPlant(plant),
    location: 'home',
    zoneId: null,
    reduced: false,
    batchType,
    batchLabel,
    loadType,
    notes: [item.supplierNote].filter(Boolean)
  };
}

export function createStockBatchesFromOrder(order) {
  return order.items.flatMap((item, itemIndex) => {
    const plant = plantById[item.plantId];
    if (!plant) return [];

    if (item.loadType === 'feature-pots') {
      return Array.from({ length: item.count * item.quantity }, (_, potIndex) => createStockBatch({
        order,
        item,
        plant,
        itemIndex,
        batchIndex: potIndex,
        quantity: 1,
        batchLabel: 'single feature pot',
        batchType: 'feature-pot',
        loadType: 'feature-pots'
      }));
    }

    return Array.from({ length: item.count }, (_, trayIndex) => createStockBatch({
      order,
      item,
      plant,
      itemIndex,
      batchIndex: trayIndex,
      quantity: item.quantity,
      batchLabel: item.batchLabel,
      batchType: item.batchType,
      loadType: item.loadType
    }));
  });
}
