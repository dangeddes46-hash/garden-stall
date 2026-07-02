export const TRADING_DAY_SCHEDULE = [
  {
    index: 0,
    timeLabel: '09:00',
    title: 'Opening check',
    description: 'The stall opens. Check the display, water obvious thirsty stock, and prepare for the first browsers.'
  },
  {
    index: 1,
    timeLabel: '10:00',
    title: 'Morning browsers',
    description: 'First proper customer checkpoint. Colour, giftability, and a clear front table matter most here.'
  },
  {
    index: 2,
    timeLabel: '11:30',
    title: 'Late-morning trade',
    description: 'The stall has warmed up. Useful grow-your-own stock and well-placed trays get a fairer test.'
  },
  {
    index: 3,
    timeLabel: '13:00',
    title: 'Lunch lull / requests',
    description: 'A natural pause for requests, watering, repricing, or moving awkward leftovers.'
  },
  {
    index: 4,
    timeLabel: '14:30',
    title: 'Afternoon push',
    description: 'Last main selling checkpoint before packdown pressure. Reduced stock can help, but should not dominate.'
  },
  {
    index: 5,
    timeLabel: '16:00',
    title: 'Packdown ready',
    description: 'Trading is effectively done. Review the stall and end the day when ready.'
  }
];

export function createTradingClock() {
  return {
    currentIndex: 0,
    currentTime: TRADING_DAY_SCHEDULE[0].timeLabel,
    nextCheckpointIndex: 1,
    isComplete: false
  };
}

export function getTradingClockEntry(clock) {
  const index = clock?.currentIndex ?? 0;
  return TRADING_DAY_SCHEDULE[index] ?? TRADING_DAY_SCHEDULE[0];
}

export function getNextTradingCheckpoint(clock) {
  const index = clock?.nextCheckpointIndex ?? 1;
  return TRADING_DAY_SCHEDULE[index] ?? TRADING_DAY_SCHEDULE[TRADING_DAY_SCHEDULE.length - 1];
}

export function advanceTradingClock(clock) {
  const current = clock ?? createTradingClock();
  const nextIndex = Math.min(current.nextCheckpointIndex ?? 1, TRADING_DAY_SCHEDULE.length - 1);
  const nextEntry = TRADING_DAY_SCHEDULE[nextIndex];
  const followingIndex = Math.min(nextIndex + 1, TRADING_DAY_SCHEDULE.length - 1);
  return {
    currentIndex: nextIndex,
    currentTime: nextEntry.timeLabel,
    nextCheckpointIndex: followingIndex,
    isComplete: nextIndex >= TRADING_DAY_SCHEDULE.length - 1
  };
}
