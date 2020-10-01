/* eslint-disable @typescript-eslint/unbound-method */
import { format, Interval } from 'date-fns';

import { humanFormat } from '~/lib/human-format';

const numberLocale = 'en-US';

export const formatPercent = new Intl.NumberFormat(numberLocale, {
  style: 'percent',
  maximumFractionDigits: 2,
  useGrouping: false,
}).format;

export const formatNumber = new Intl.NumberFormat(numberLocale).format;

export const formatDateInterval = ({ start, end }: Interval): string =>
  `${format(start, 'd')}-${format(end, 'd LLL u')}`;

export const formatConnectionSpeed = (speed: number): string =>
  humanFormat(speed, {
    unit: 'b/s',
    separator: ' ',
  });
