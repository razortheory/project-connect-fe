// eslint-disable-next-line @typescript-eslint/unbound-method
export const formatPercent = new Intl.NumberFormat('en-US', {
  style: 'percent',
  maximumFractionDigits: 2,
  useGrouping: false,
}).format;
