import { endOfWeek, Interval, startOfWeek } from 'date-fns';

import { weekOptions } from './defaults';
import { WeekOptions } from './types';

export const getWeekInterval = (
  date: Date | number,
  options: WeekOptions = weekOptions
): Interval => ({
  start: startOfWeek(date, options),
  end: endOfWeek(date, options),
});
