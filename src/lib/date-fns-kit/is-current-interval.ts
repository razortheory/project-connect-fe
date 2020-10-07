import { Interval, isThisMonth, isThisWeek, isToday } from 'date-fns';

import { intervalOptions } from './defaults';
import { IntervalOptions, IntervalUnit } from './types';

export const isCurrentInterval = (
  { start }: Interval,
  intervalUnit: IntervalUnit,
  options: IntervalOptions = intervalOptions
): boolean => {
  switch (intervalUnit) {
    case 'day':
      return isToday(start);
    case 'week':
      return isThisWeek(start, options);
    case 'month':
      return isThisMonth(start);
    default:
      throw new Error('Unknown interval unit!');
  }
};
