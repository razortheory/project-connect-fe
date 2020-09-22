import { endOfWeek, Interval, Locale, startOfWeek } from 'date-fns';

const defaultOptions = {
  weekStartsOn: 1 as const,
};

type Options = {
  locale?: Locale;
  weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6;
};

export const getWeekInterval = (
  date: Date | number,
  options: Options = defaultOptions
): Interval => ({
  start: startOfWeek(date, options),
  end: endOfWeek(date, options),
});
