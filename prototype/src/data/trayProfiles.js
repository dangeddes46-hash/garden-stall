export const TRAY_PROFILES = {
  sixPack: {
    id: 'six-pack',
    label: '2x3 tray',
    rows: 2,
    columns: 3,
    quantity: 6,
    loadType: 'tray'
  },
  beddingTray24: {
    id: 'bedding-tray-24',
    label: '4x6 tray',
    rows: 4,
    columns: 6,
    quantity: 24,
    loadType: 'tray'
  },
  beddingTray15: {
    id: 'bedding-tray-15',
    label: '3x5 tray',
    rows: 3,
    columns: 5,
    quantity: 15,
    loadType: 'tray'
  },
  pottray: {
    id: 'pottray',
    label: 'pottray',
    rows: 1,
    columns: 1,
    quantity: 1,
    loadType: 'pottray'
  },
  sundrytray: {
    id: 'sundrytray',
    label: 'sundrytray',
    rows: 1,
    columns: 1,
    quantity: 1,
    loadType: 'sundrytray'
  }
};

const plantTrayProfiles = {
  'plant-tomato': 'beddingTray24',
  'plant-strawberry': 'beddingTray24',
  'plant-chilli': 'beddingTray15',
  'plant-lettuce': 'beddingTray24',
  'plant-basil': 'beddingTray15',
  'plant-mint': 'beddingTray15',
  'plant-parsley': 'beddingTray15',
  'plant-rosemary': 'sixPack',
  'plant-pansy': 'beddingTray24',
  'plant-viola': 'beddingTray24',
  'plant-primrose': 'beddingTray15',
  'plant-bellis': 'beddingTray15',
  'plant-wallflower': 'beddingTray15',
  'plant-marigold': 'beddingTray15',
  'plant-petunia': 'beddingTray24',
  'plant-busy-lizzie': 'beddingTray24',
  'plant-begonia': 'beddingTray15',
  'plant-lobelia': 'beddingTray24',
  'plant-pelargonium': 'sixPack',
  'plant-fuchsia': 'sixPack',
  'plant-potted-lily': 'pottray',
  'plant-daffodil-pot': 'pottray',
  'plant-hyacinth-pot': 'pottray',
  'sundry-compost': 'sundrytray',
  'sundry-terracotta-pot': 'sundrytray'
};

export function getTrayProfileForPlant(plantId) {
  const key = plantTrayProfiles[plantId];
  return TRAY_PROFILES[key] ?? TRAY_PROFILES.sixPack;
}
