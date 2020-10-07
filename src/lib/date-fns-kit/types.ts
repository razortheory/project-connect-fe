import { Locale } from 'date-fns';

export type IntervalOptions = {
  locale?: Locale;
  weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6;
};

export type IntervalUnit = 'day' | 'week' | 'month';
