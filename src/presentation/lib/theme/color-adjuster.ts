/**
 * Color Adjuster
 * Single Responsibility: Adjust colors (lighten, darken, adjust contrast)
 */

import type { IColorConverter } from './color-converter';
import type { IContrastChecker } from './contrast-checker';
import type { OklchColor } from './types';

export interface IColorAdjuster {
  lighten(color: OklchColor, amount: number): OklchColor;
  darken(color: OklchColor, amount: number): OklchColor;
  adjustChroma(color: OklchColor, amount: number): OklchColor;
  ensureContrast(
    foreground: OklchColor,
    background: OklchColor,
    targetRatio: number
  ): OklchColor;
  createForeground(background: OklchColor, targetRatio?: number): OklchColor;
}

export class ColorAdjuster implements IColorAdjuster {
  constructor(
    private colorConverter: IColorConverter,
    private contrastChecker: IContrastChecker
  ) {}

  /**
   * Lighten a color by increasing its lightness
   */
  lighten(color: OklchColor, amount: number): OklchColor {
    return {
      ...color,
      l: Math.min(1, color.l + amount),
    };
  }

  /**
   * Darken a color by decreasing its lightness
   */
  darken(color: OklchColor, amount: number): OklchColor {
    return {
      ...color,
      l: Math.max(0, color.l - amount),
    };
  }

  /**
   * Adjust the chroma (saturation) of a color
   */
  adjustChroma(color: OklchColor, amount: number): OklchColor {
    return {
      ...color,
      c: Math.max(0, Math.min(0.4, color.c + amount)),
    };
  }

  /**
   * Adjust a foreground color to meet target contrast ratio with background
   * Uses binary search for efficiency
   */
  ensureContrast(
    foreground: OklchColor,
    background: OklchColor,
    targetRatio: number
  ): OklchColor {
    const currentContrast = this.contrastChecker.checkContrast(foreground, background);
    
    if (currentContrast.ratio >= targetRatio) {
      return foreground;
    }

    // Determine if we need to lighten or darken
    const shouldLighten = foreground.l < background.l;
    
    let adjusted = { ...foreground };
    let step = 0.05;
    let iterations = 0;
    const maxIterations = 20;

    while (iterations < maxIterations) {
      const testColor = shouldLighten 
        ? this.lighten(adjusted, step)
        : this.darken(adjusted, step);

      const testContrast = this.contrastChecker.checkContrast(testColor, background);

      if (testContrast.ratio >= targetRatio) {
        return testColor;
      }

      adjusted = testColor;
      
      // Prevent going out of bounds
      if (adjusted.l >= 0.98 || adjusted.l <= 0.02) {
        break;
      }

      iterations++;
    }

    return adjusted;
  }

  /**
   * Create a contrasting foreground color for a background
   */
  createForeground(background: OklchColor, targetRatio: number = 4.5): OklchColor {
    // Start with either very light or very dark based on background
    const foreground: OklchColor = {
      l: background.l > 0.5 ? 0.15 : 0.97,
      c: 0.01,
      h: background.h,
    };

    return this.ensureContrast(foreground, background, targetRatio);
  }
}
