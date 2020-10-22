import { WeekDay } from '~/api/types';

import { Days } from '@/week-graph/types';

export const weekDayNames: Map<WeekDay, Days> = new Map([
  [1, 'monday'],
  [2, 'tuesday'],
  [3, 'wednesday'],
  [4, 'thursday'],
  [5, 'friday'],
  [6, 'saturday'],
  [7, 'sunday'],
]);

export const megabytesPerSecond = 10 ** 6;
export const LOW_SPEED_MAX = 2 * megabytesPerSecond; // 2Mb/s
export const MED_SPEED_MAX = 5 * megabytesPerSecond; // 5Mb/s
export const HIGH_SPEED_MAX = 10 * megabytesPerSecond; // 10Mb/s
