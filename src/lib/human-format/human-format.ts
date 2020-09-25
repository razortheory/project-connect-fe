type ReadableConfig = {
  separator?: string;
  unit?: string;
  formatFn?: (value: number) => string;
  fractional?: boolean;
};

// Sorted from big to small
// See: https://www.bipm.org/en/measurement-units
const si = [
  {
    factor: 10 ** 9,
    prefix: 'G',
  },
  {
    factor: 10 ** 6,
    prefix: 'M',
  },
  {
    factor: 10 ** 3,
    prefix: 'k',
  },
];

// eslint-disable-next-line @typescript-eslint/unbound-method
export const formatDefault = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 1,
  useGrouping: false,
}).format;

export const humanFormat = (
  value: number,
  {
    unit = '',
    separator = '',
    formatFn = formatDefault,
    fractional = false,
  }: ReadableConfig = {}
): string => {
  for (const { factor, prefix } of si) {
    if (Math.trunc((value / factor) * 10 ** Number(fractional))) {
      return `${formatFn(value / factor)}${separator}${prefix}${unit}`;
    }
  }

  return String(Math.trunc(value));
};
