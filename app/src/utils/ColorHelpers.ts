import { ScrappedLeek } from "@/types/ScrappedLeek.types";
import { normalizeLog, findMin, findMax, clamp } from "./MathHelpers";

/**
 * Converts HSL color to RGB hex string
 */
function hslToHex(h: number, s: number, l: number): string {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

/**
 * Generates colors for data points based on three keys using log scale
 * Each key is mapped to one of the RGB/HSL components
 */
export function generatePointColors(
  leeks: ScrappedLeek[],
  key1: keyof ScrappedLeek,
  key2: keyof ScrappedLeek,
  key3: keyof ScrappedLeek
): string[] {
  // Extract values for each key
  const values1 = leeks.map((leek) => leek[key1] as number);
  const values2 = leeks.map((leek) => leek[key2] as number);
  const values3 = leeks.map((leek) => leek[key3] as number);

  // Find min/max for each dimension
  const min1 = findMin(values1);
  const max1 = findMax(values1);
  const min2 = findMin(values2);
  const max2 = findMax(values2);
  const min3 = findMin(values3);
  const max3 = findMax(values3);

  // Generate colors using HSL color space for better distribution
  return leeks.map((leek, index) => {
    // Normalize each value using log scale (0-1 range)
    const norm1 = normalizeLog(values1[index], min1, max1);
    const norm2 = normalizeLog(values2[index], min2, max2);
    const norm3 = normalizeLog(values3[index], min3, max3);

    // Map to HSL color space
    // Hue: 0-360 (represents color spectrum)
    const hue = clamp(norm1 * 360, 0, 360);
    // Saturation: 50-100% (avoid washed out colors)
    const saturation = clamp(50 + norm2 * 50, 50, 100);
    // Lightness: 30-70% (avoid too dark or too light)
    const lightness = clamp(30 + norm3 * 40, 30, 70);

    return hslToHex(hue, saturation, lightness);
  });
}

/**
 * Alternative color generation using RGB directly
 */
export function generatePointColorsRGB(
  leeks: ScrappedLeek[],
  key1: keyof ScrappedLeek,
  key2: keyof ScrappedLeek,
  key3: keyof ScrappedLeek
): string[] {
  const values1 = leeks.map((leek) => leek[key1] as number);
  const values2 = leeks.map((leek) => leek[key2] as number);
  const values3 = leeks.map((leek) => leek[key3] as number);

  const min1 = findMin(values1);
  const max1 = findMax(values1);
  const min2 = findMin(values2);
  const max2 = findMax(values2);
  const min3 = findMin(values3);
  const max3 = findMax(values3);

  return leeks.map((leek, index) => {
    // Normalize using log scale
    const r = Math.round(normalizeLog(values1[index], min1, max1) * 255);
    const g = Math.round(normalizeLog(values2[index], min2, max2) * 255);
    const b = Math.round(normalizeLog(values3[index], min3, max3) * 255);

    return `rgb(${r}, ${g}, ${b})`;
  });
}
