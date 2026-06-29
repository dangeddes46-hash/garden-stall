export const customerArchetypes = [
  {
    id: 'new-gardener',
    displayName: 'New Gardener',
    preferredTags: ['beginner-friendly', 'container-suitable', 'low-maintenance', 'cheerful'],
    dislikedTags: ['specialist', 'short-window', 'high-risk'],
    priceSensitivity: 'medium',
    reducedInterest: 'low',
    patience: 'medium',
    requestChanceModifier: 1,
    commonLocations: ['location-market-square', 'location-village-green']
  },
  {
    id: 'flat-balcony-grower',
    displayName: 'Flat / Balcony Grower',
    preferredTags: ['small-space', 'compact', 'container-suitable', 'patio', 'herb', 'edible'],
    dislikedTags: ['bulky', 'floor-only', 'large-bedding-tray'],
    priceSensitivity: 'medium',
    reducedInterest: 'medium',
    patience: 'low',
    requestChanceModifier: 1,
    commonLocations: ['location-station-corner', 'location-market-square']
  },
  {
    id: 'gift-buyer',
    displayName: 'Gift Buyer',
    preferredTags: ['giftable', 'cheerful', 'flowering', 'high-impact', 'fresh-condition'],
    dislikedTags: ['tired', 'reduced', 'plain-practical'],
    priceSensitivity: 'low-medium',
    reducedInterest: 'low',
    patience: 'low',
    requestChanceModifier: 2,
    commonLocations: ['location-station-corner', 'location-market-square']
  },
  {
    id: 'traditional-gardener',
    displayName: 'Traditional Gardener',
    preferredTags: ['bedding', 'front-door', 'nostalgic', 'herb', 'grow-your-own', 'compost'],
    dislikedTags: ['overpriced', 'novelty-only'],
    priceSensitivity: 'medium-high',
    reducedInterest: 'medium',
    patience: 'high',
    requestChanceModifier: 1,
    commonLocations: ['location-village-green', 'location-market-square']
  },
  {
    id: 'herb-kitchen-buyer',
    displayName: 'Herb / Kitchen Buyer',
    preferredTags: ['herb', 'edible', 'kitchen-use', 'container-suitable', 'scented'],
    dislikedTags: ['non-edible', 'bulky'],
    priceSensitivity: 'medium',
    reducedInterest: 'medium',
    patience: 'medium',
    requestChanceModifier: 1,
    commonLocations: ['location-market-square', 'location-station-corner', 'location-village-green']
  },
  {
    id: 'bargain-hunter',
    displayName: 'Bargain Hunter',
    preferredTags: ['reduced-friendly', 'low-price', 'bedding', 'practical'],
    dislikedTags: ['premium-only', 'high-price'],
    priceSensitivity: 'high',
    reducedInterest: 'high',
    patience: 'high',
    requestChanceModifier: 0.75,
    commonLocations: ['location-market-square', 'location-village-green']
  }
];

export const archetypeById = Object.fromEntries(customerArchetypes.map((archetype) => [archetype.id, archetype]));
