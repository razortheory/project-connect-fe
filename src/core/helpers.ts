export const getReadableCount = (amount: number): string => {
  if (amount > 1000000) {
    return `${(amount / 1000000).toFixed(1)}M`;
  }
  if (amount > 1000) {
    return `${(amount / 1000).toFixed(2)}K`;
  }

  return amount.toFixed(0);
};

export const getReadablePercent = (
  percent: number,
  precision?: number
): string => {
  return precision ? percent.toFixed(precision) : percent.toFixed();
};
