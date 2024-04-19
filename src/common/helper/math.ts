export const clamp = (num: number, min: number, max: number) =>
  Math.min(Math.max(num, min), max);

export const isNegative = (num: number) => num < 0;
