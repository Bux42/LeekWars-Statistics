/**
 * Normalizes a value to a 0-1 range using linear scaling
 */
export function normalize(value: number, min: number, max: number): number {
  if (max === min) return 0;
  return (value - min) / (max - min);
}

/**
 * Normalizes a value to a 0-1 range using logarithmic scaling
 * Handles values <= 0 by using a small offset
 */
export function normalizeLog(value: number, min: number, max: number): number {
  if (max === min) return 0;

  // Add small offset to handle zero/negative values
  const offset = 1;
  const logValue = Math.log(value + offset);
  const logMin = Math.log(min + offset);
  const logMax = Math.log(max + offset);

  return (logValue - logMin) / (logMax - logMin);
}

/**
 * Clamps a value between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Finds the minimum value in an array
 */
export function findMin(values: number[]): number {
  return Math.min(...values);
}

/**
 * Finds the maximum value in an array
 */
export function findMax(values: number[]): number {
  return Math.max(...values);
}
