import { calculateOrderFee } from '../data/supplierListings.js';
import { FEATURE_POT_UNITS_PER_SLOT } from '../data/vanCapacity.js';
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
    wholesaleCost: item.wholesaleCost,
    wholesaleCostPerUnit: item.quantity ? item.wholesaleCost / item.quantity : item.wholesaleCost,
    notes: [item.supplierNote].filter(Boolean)
  };
}

function createFeaturePotBatches({ order, item, plant, itemIndex }) {
  const unitsPerBatch = FEATURE_POT_UNITS_PER_SLOT[item.plantId] ?? 1;
  const totalUnits = item.count * item.quantity;
  const batchCount = Math.ceil(totalUnits / unitsPerBatch);

  return Array.from({ length: batchCount }, (_, potIndex) => {
    const remaining = totalUnits - (potIndex * unitsPerBatch);
    const quantity = Math.min(unitsPerBatch, remaining);
    const grouped = unitsPerBatch > 1;
    return createStockBatch({
      order,
      item,
      plant,
      itemIndex,
      batchIndex: potIndex,
      quantity,
      batchLabel: grouped ? `${quantity} grouped feature pots` : 'single feature pot',
      batchType: grouped ? 'feature-pot-grouped' : 'feature-pot',
      loadType: 'feature-pots'
    });
  });
}

export function createStockBatchesFromOrder(order) {
  return order.items.flatMap((item, itemIndex) => {
    const plant = plantById[item.plantId];
    if (!plant) return [];

    if (item.loadType === 'feature-pots') {
      return createFeaturePotBatches({ order, item, plant, itemIndex });
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
