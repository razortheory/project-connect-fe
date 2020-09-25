import { Interval, isThisWeek } from 'date-fns';

import { weekOptions } from './defaults';
import { WeekOptions } from './types';

export const isThisWeekInterval = (
  { start }: Interval,
  options: WeekOptions = weekOptions
): boolean => isThisWeek(start, options);
