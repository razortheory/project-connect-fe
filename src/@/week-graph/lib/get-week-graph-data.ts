import { format } from 'date-fns';

import { DailyStats, WeekDay } from '~/api/types';
import { formatConnectionSpeed } from '~/core/formatters';

import {
  HIGH_SPEED_MAX,
  LOW_SPEED_MAX,
  MED_SPEED_MAX,
  weekDayNames,
} from '@/week-graph/constants';
import { Days, WeekGraphData } from '@/week-graph/types';

// Helpers
const getDayName = (weekday: WeekDay): Days => {
  return weekDayNames.get(weekday) as Days;
};

export const formatDate = (date: string): string => {
  return format(new Date(date), 'dd MMM yyyy');
};

export const getPercent = (
  speed: number,
  maxSpeed = HIGH_SPEED_MAX
): string => {
  if (speed > maxSpeed) {
    return '100%';
  }
  return `${((speed / maxSpeed) * 100).toFixed(2)}%`;
};

export const getFillColor = (speed: number): string => {
  if (speed >= MED_SPEED_MAX) {
    return '#8bd432';
  }
  if (speed >= LOW_SPEED_MAX) {
    return '#ffc93d';
  }
  return '#ff615b';
};

// TODO: Refactor getWeekGraphData

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
