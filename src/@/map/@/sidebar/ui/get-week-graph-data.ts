import { DailyStats, WeekDay } from '~/api/types';
import { humanFormat } from '~/lib/human-format';

// types
type Days =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday';

export type WeekGraphData = { [day in Days]: DayGraphData };

type DayGraphData = {
  date: string;
  speed: string;
  latency: number;
  speedPercent: string;
  fillColor: string;
};

// constants
const weekDayNames: Map<WeekDay, Days> = new Map([
  [1, 'monday'],
  [2, 'tuesday'],
  [3, 'wednesday'],
  [4, 'thursday'],
  [5, 'friday'],
  [6, 'saturday'],
  [7, 'sunday'],
]);

const MEGABYTES_PER_SEC = 1000000;
const LOW_SPEED_MAX = MEGABYTES_PER_SEC; // 1Mb/s
const MED_SPEED_MAX = 2 * MEGABYTES_PER_SEC; // 2Mb/s
const HIGH_SPEED_MAX = 3 * MEGABYTES_PER_SEC; // 3Mb/s

// helpers
const getDayName = (weekday: WeekDay): Days => {
  return weekDayNames.get(weekday) as Days;
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
  if (!dailyStats) {
    return null;
  }
  // eslint-disable-next-line unicorn/no-reduce
  return dailyStats.reduce<WeekGraphData>((result, dayStats) => {
    // eslint-disable-next-line no-param-reassign
    result[getDayName(dayStats.weekday)] = {
      date: dayStats.date,
      speed: humanFormat(dayStats.connectivity_speed, {
        unit: 'b/s',
        separator: ' ',
      }),
      latency: dayStats.connectivity_latency,
      speedPercent: getPercent(dayStats.connectivity_speed),
      fillColor: getFillColor(dayStats.connectivity_speed),
    };
    return result;
    // eslint-disable-next-line @typescript-eslint/prefer-reduce-type-parameter
  }, {} as WeekGraphData);
};
