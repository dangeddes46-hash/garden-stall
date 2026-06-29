export const weekScript = [
  {
    day: 0,
    label: 'Opening evening order',
    weather: null,
    focus: 'Choose first wholesale stock for tomorrow.',
    maxRequests: 0,
    notes: ['Only four starter lines are available. Others are visible but sold out.']
  },
  {
    day: 1,
    label: 'First trading day',
    weather: { label: 'Mild Spring Day', footfallModifier: 1, dryingModifier: 1, displayStress: 'low' },
    focus: 'Collect first order and set up a basic stall.',
    maxRequests: 1,
    notes: ['Low degradation. The goal is to understand order, collection, stock movement, and setup.']
  },
  {
    day: 2,
    label: 'Sundries and spring colour',
    weather: { label: 'Grey and Cool', footfallModifier: 0.9, dryingModifier: 0.8, displayStress: 'low' },
    focus: 'Introduce pansies, primroses, compost, and terracotta pots.',
    maxRequests: 1,
    notes: ['Sundries begin supporting plant sales.']
  },
  {
    day: 3,
    label: 'Special offers appear',
    weather: { label: 'Sunny', footfallModifier: 1.1, dryingModifier: 1.2, displayStress: 'medium' },
    focus: 'Introduce tempting and risky trade offers.',
    maxRequests: 1,
    notes: ['Moisture pressure begins to matter.']
  },
  {
    day: 4,
    label: 'Pairing lesson',
    weather: { label: 'Light Rain', footfallModifier: 0.85, dryingModifier: 0.6, displayStress: 'low' },
    focus: 'Encourage pairings and possible vague-customer learning.',
    maxRequests: 2,
    notes: ['Ask a Follow-Up can be unlocked by a perfect vague request outcome.']
  },
  {
    day: 5,
    label: 'Pressure rises',
    weather: { label: 'Windy', footfallModifier: 0.95, dryingModifier: 1.1, displayStress: 'medium' },
    focus: 'Gappy trays, condition, and location fit become more visible.',
    maxRequests: 2,
    notes: ['The stall should now start revealing missed demand.']
  },
  {
    day: 6,
    label: 'Reputation pressure',
    weather: { label: 'Sunny Intervals', footfallModifier: 1.05, dryingModifier: 1.1, displayStress: 'medium' },
    focus: 'Customer and request feedback becomes more meaningful.',
    maxRequests: 2,
    notes: ['A bad offer or awkward recommendation should teach rather than punish.']
  },
  {
    day: 7,
    label: 'Final test day',
    weather: { label: 'Mild Spring Day', footfallModifier: 1, dryingModifier: 1, displayStress: 'medium' },
    focus: 'End the first week and produce a readable weekly summary.',
    maxRequests: 2,
    notes: ['Weekly summary should explain what worked, what failed, and what to try next.']
  }
];

export const weekDayByNumber = Object.fromEntries(weekScript.map((day) => [day.day, day]));
