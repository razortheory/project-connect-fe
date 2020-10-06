import { add, format, Interval, isBefore } from 'date-fns';

import { DailyStats } from '~/api/types';
import { formatConnectionSpeed } from '~/core/formatters';

import {
  formatDate,
  getFillColor,
  getPercent,
  megabytesPerSecond,
} from '@/map/@/sidebar/ui/get-week-graph-data';

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

export type HistoryGraphItem = {
  date: string;
  speed?: string;
  speedPercent?: string;
  fillColor?: string;
};

const HIGH_SPEED_MAX = 50 * megabytesPerSecond;

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
        speed: formatConnectionSpeed(dayStats.connectivity_speed),
        speedPercent: getPercent(dayStats.connectivity_speed, HIGH_SPEED_MAX),
        fillColor: getFillColor(dayStats.connectivity_speed),
      };
      accumulator.daysData.push(dayData);
      accumulator.itemsCount += 1;
      accumulator.speedSum += dayStats.connectivity_speed;
      return accumulator;
    },
    {
      daysData: [],
      speedSum: 0,
      itemsCount: 0,
      maxSpeed: HIGH_SPEED_MAX,
    }
  );
};
