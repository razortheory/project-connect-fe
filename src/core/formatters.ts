/* eslint-disable @typescript-eslint/unbound-method */

const numberLocale = 'en-US';

export const formatPercent = new Intl.NumberFormat(numberLocale, {
  style: 'percent',
  maximumFractionDigits: 2,
  useGrouping: false,
}).format;

export const formatNumber = new Intl.NumberFormat('en-US').format;
