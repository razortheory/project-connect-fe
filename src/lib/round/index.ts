export const round = (number: number, fractionDigits = 0): number => {
  const digits = 10 ** fractionDigits;
  const value = number * digits * (1 + Number.EPSILON);
  return Math.round(value) / digits;
};
