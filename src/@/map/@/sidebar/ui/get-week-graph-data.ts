// TODO: Refactor getWeekGraphData

import { format } from 'date-fns';

import { DailyStats, WeekDay } from '~/api/types';
import { formatConnectionSpeed } from '~/core/formatters';

// Types
export type Days =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday';

export type WeekGraphData = { [day in Days]: WeekGraphItemData };

export type WeekGraphItemData = {
  date: string;
  speed: string;
  latency: number;
  speedPercent: string;
  fillColor: string;
};

// Constants
const weekDayNames: Map<WeekDay, Days> = new Map([
  [1, 'monday'],
  [2, 'tuesday'],
  [3, 'wednesday'],
  [4, 'thursday'],
  [5, 'friday'],
  [6, 'saturday'],
  [7, 'sunday'],
]);

const megabytesPerSecond = 10 ** 6;
const LOW_SPEED_MAX = 2 * megabytesPerSecond; // 2Mb/s
const MED_SPEED_MAX = 5 * megabytesPerSecond; // 5Mb/s
const HIGH_SPEED_MAX = 10 * megabytesPerSecond; // 10Mb/s

// Helpers
const getDayName = (weekday: WeekDay): Days => {
  return weekDayNames.get(weekday) as Days;
};

const formatDate = (date: string): string => {
  return format(new Date(date), 'dd MMM yyyy');
};

const getPercent = (speed: number): string => {
  if (speed > HIGH_SPEED_MAX) {
    return '100%';
  }
  return `${((speed / HIGH_SPEED_MAX) * 100).toFixed(2)}%`;
};

const getFillColor = (speed: number): string => {
  if (speed >= MED_SPEED_MAX) {
    return '#8bd432';
  }
  if (speed >= LOW_SPEED_MAX) {
    return '#ffc93d';
  }
  return '#ff615b';
};

export const getWeekGraphData = (
  dailyStats: DailyStats[] | null
): WeekGraphData | null => {
  if (!dailyStats || dailyStats.length === 0) {
    return null;
  }
  // eslint-disable-next-line unicorn/no-reduce
  return dailyStats.reduce<WeekGraphData>((result, dayStats) => {
    // eslint-disable-next-line no-param-reassign
    result[getDayName(dayStats.weekday)] = {
      date: formatDate(dayStats.date),
      speed: formatConnectionSpeed(dayStats.connectivity_speed),
      latency: dayStats.connectivity_latency,
      speedPercent: getPercent(dayStats.connectivity_speed),
      fillColor: getFillColor(dayStats.connectivity_speed),
    };
    return result;
    // eslint-disable-next-line @typescript-eslint/prefer-reduce-type-parameter
  }, {} as WeekGraphData);
};
