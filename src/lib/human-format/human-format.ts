type ReadableConfig = {
  separator?: string;
  unit?: string;
};

const million = 1_000_000;
const thousand = 1_000;

export const humanFormat = (
  value: number,
  { unit = '', separator = '' }: ReadableConfig = {}
): string => {
  if (value > million) {
    return `${(value / million).toFixed(1)}${separator}M${unit}`;
  }

  if (value > thousand) {
    return `${(value / thousand).toFixed(2)}${separator}k${unit}`;
  }

  return value.toFixed(0);
};
