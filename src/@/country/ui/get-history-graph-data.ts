import { add, format, Interval, isBefore } from 'date-fns';

import { DailyStats } from '~/api/types';
import { formatConnectionSpeed } from '~/core/formatters';

// TODO: Fix import from the internals of the feature
// eslint-disable-next-line no-restricted-imports
import {
  formatDate,
  getFillColor,
  megabytesPerSecond,
} from '@/sidebar/ui/get-week-graph-data';

const getDatesArray = (interval: Interval) => {
  let day = interval.start;
  const datesArray = [];

  while (isBefore(day, interval.end)) {
    datesArray.push(format(day, 'yyyy-MM-dd'));
    day = add(day, { days: 1 });
  }

  return datesArray;
};

export type HistoryGraphData = {
  daysData: HistoryGraphItem[];
  speedSum: number;
  itemsCount: number;
  maxSpeed: number;
};

type HistoryGraphItem = {
  date: string;
  speedFormatted?: string;
  speed?: number;
  fillColor?: string;
};

const MULTIPLE_SCALE_UNIT = 5 * megabytesPerSecond;

export const getHistoryGraphData = (
  historyData: DailyStats[] | null,
  historyInterval: Interval
): HistoryGraphData => {
  const datesArray = getDatesArray(historyInterval);

  // eslint-disable-next-line unicorn/no-reduce
  return datesArray.reduce<HistoryGraphData>(
    (accumulator, date) => {
      const dayStats = historyData?.find(
        (historyDataItem) => historyDataItem.date === date
      );

      if (!dayStats) {
        accumulator.daysData.push({
          date: formatDate(date),
        });
        return accumulator;
      }

      const dayData = {
        date: formatDate(dayStats.date),
        speedFormatted: formatConnectionSpeed(dayStats.connectivity_speed),
        speed: dayStats.connectivity_speed,
        fillColor: getFillColor(dayStats.connectivity_speed),
      };
      accumulator.daysData.push(dayData);
      accumulator.itemsCount += 1;
      accumulator.speedSum += dayStats.connectivity_speed;
      accumulator.maxSpeed = Math.max(
        accumulator.maxSpeed,
        Math.ceil(dayStats.connectivity_speed / MULTIPLE_SCALE_UNIT) *
          MULTIPLE_SCALE_UNIT
      );
      return accumulator;
    },
    {
      daysData: [],
      speedSum: 0,
      itemsCount: 0,
      maxSpeed: 0,
    }
  );
};
