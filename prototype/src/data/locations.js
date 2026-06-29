export const locations = [
  {
    id: 'location-market-square',
    displayName: 'Market Square',
    description: 'A reliable mixed trading spot with steady footfall, casual browsers, gift buyers, and practical shoppers.',
    pitchFee: 5,
    fuelCost: 8,
    footfall: 'medium',
    pace: 'normal',
    customerWeights: {
      'new-gardener': 3,
      'flat-balcony-grower': 1,
      'gift-buyer': 3,
      'traditional-gardener': 2,
      'herb-kitchen-buyer': 2,
      'bargain-hunter': 2
    },
    demandTags: ['bedding', 'cheerful', 'giftable', 'herb', 'edible', 'beginner-friendly', 'reduced-friendly'],
    weakDemandTags: ['specialist', 'high-price'],
    priceTolerance: 'medium',
    displayPreferences: ['full-trays', 'cheerful-colour', 'clear-prices'],
    exposure: 'mixed',
    feedbackLines: ['Market Square rewards broad, cheerful stock and fair prices.']
  },
  {
    id: 'location-village-green',
    displayName: 'Village Green',
    description: 'A slower outdoor pitch for traditional gardeners, families, bedding colour, grow-your-own stock, and practical sundries.',
    pitchFee: 2,
    fuelCost: 14,
    footfall: 'medium',
    pace: 'relaxed',
    customerWeights: {
      'new-gardener': 2,
      'flat-balcony-grower': 1,
      'gift-buyer': 1,
      'traditional-gardener': 4,
      'herb-kitchen-buyer': 2,
      'bargain-hunter': 2
    },
    demandTags: ['bedding', 'front-door', 'traditional', 'edible', 'herb', 'container-suitable', 'compost', 'pot'],
    weakDemandTags: ['urban-gift', 'office-desk'],
    priceTolerance: 'low-medium',
    displayPreferences: ['rustic', 'traditional-layout', 'seasonal-colour', 'tidy-reduced-area'],
    exposure: 'open',
    feedbackLines: ['Village Green likes familiar outdoor colour, grow-your-own stock, and practical add-ons.']
  },
  {
    id: 'location-station-corner',
    displayName: 'Station Corner',
    description: 'A brisk urban pitch for quick gifts, compact colour, small pots, balcony growers, and impulse purchases.',
    pitchFee: 8,
    fuelCost: 10,
    footfall: 'high',
    pace: 'brisk',
    customerWeights: {
      'new-gardener': 2,
      'flat-balcony-grower': 4,
      'gift-buyer': 4,
      'traditional-gardener': 1,
      'herb-kitchen-buyer': 2,
      'bargain-hunter': 1
    },
    demandTags: ['giftable', 'compact', 'small-space', 'balcony', 'cheerful', 'high-impact', 'pot'],
    weakDemandTags: ['bulky', 'compost', 'large-bedding-tray', 'traditional-only'],
    priceTolerance: 'medium-high',
    displayPreferences: ['compact-display', 'gift-focused', 'fresh-condition', 'clear-prices'],
    exposure: 'urban',
    feedbackLines: ['Station Corner rewards compact, giftable, fresh-looking stock and quick visual appeal.']
  }
];

export const locationById = Object.fromEntries(locations.map((location) => [location.id, location]));
