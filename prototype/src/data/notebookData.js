export const notebookDiscoveries = [
  {
    id: 'tomato-basil-pairing',
    title: 'Tomato + Basil',
    section: 'Pairings',
    text: 'Tomato buyers often like basil as a useful kitchen add-on.'
  },
  {
    id: 'strawberry-terracotta-pairing',
    title: 'Strawberry + Terracotta Pot',
    section: 'Pairings',
    text: 'Strawberries feel more giftable and child-friendly when paired with a simple pot.'
  },
  {
    id: 'gift-buyers-dislike-tired-stock',
    title: 'Gift Buyers Want Fresh Stock',
    section: 'Customers',
    text: 'Gift buyers strongly dislike tired or reduced-looking plants.'
  },
  {
    id: 'station-compact-giftable',
    title: 'Station Corner: Compact Gifts',
    section: 'Locations',
    text: 'Station Corner suits compact, giftable, fresh-looking stock for quick buyers.'
  },
  {
    id: 'village-green-outdoor-colour',
    title: 'Village Green: Outdoor Colour',
    section: 'Locations',
    text: 'Village Green likes familiar outdoor colour, bedding plants, and practical grow-your-own support.'
  },
  {
    id: 'reduced-helps-bargain-hunters',
    title: 'Reduced Area Helps Bargain Hunters',
    section: 'Customers',
    text: 'A tidy reduced section can rescue tired stock and attract bargain hunters.'
  },
  {
    id: 'ask-follow-up-unlock',
    title: 'Skill Unlock: Ask a Follow-Up',
    section: 'Skills',
    text: 'You can ask one extra question during vague special requests to reveal a hidden clue.'
  }
];

export const notebookDiscoveryById = Object.fromEntries(notebookDiscoveries.map((entry) => [entry.id, entry]));
