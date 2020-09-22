import { Locale } from 'date-fns';

export type WeekOptions = {
  locale?: Locale;
  weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6;
};
