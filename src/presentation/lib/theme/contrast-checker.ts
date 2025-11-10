/**
 * Contrast Checker
 * Single Responsibility: Check WCAG color contrast compliance
 */

import type { ContrastCheckResult, OklchColor } from './types';

export interface IContrastChecker {
  checkContrast(color1: OklchColor, color2: OklchColor): ContrastCheckResult;
  meetsWCAG(color1: OklchColor, color2: OklchColor, level: 'AA' | 'AAA', large?: boolean): boolean;
}

export class ContrastChecker implements IContrastChecker {
  /**
   * Calculate relative luminance from OKLCH
   * Converts OKLCH L to approximate relative luminance for WCAG calculations
   */
  private calculateRelativeLuminance(oklch: OklchColor): number {
    // OKLCH L is perceptually uniform but not the same as relative luminance
    // We need to convert it to approximate Y (relative luminance)
    // This is a simplified conversion: Y ≈ L^2.4 (gamma correction)
    const { l } = oklch;
    
    // Apply inverse gamma correction to approximate relative luminance
    // OKLCH L is roughly cube root of relative luminance
    return Math.pow(l, 3);
  }

  /**
   * Calculate contrast ratio between two colors
   * WCAG 2.1 formula: (L1 + 0.05) / (L2 + 0.05)
   * where L1 is the lighter color and L2 is the darker
   */
  private calculateContrastRatio(l1: number, l2: number): number {
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    return (lighter + 0.05) / (darker + 0.05);
  }

  /**
   * Check contrast between two colors and return detailed results
   */
  checkContrast(color1: OklchColor, color2: OklchColor): ContrastCheckResult {
    const l1 = this.calculateRelativeLuminance(color1);
    const l2 = this.calculateRelativeLuminance(color2);
    const ratio = this.calculateContrastRatio(l1, l2);

    return {
      ratio: Math.round(ratio * 100) / 100,
      passes: {
        aa: ratio >= 4.5,           // WCAG AA for normal text (4.5:1)
        aaa: ratio >= 7,             // WCAG AAA for normal text (7:1)
        aaLarge: ratio >= 3,         // WCAG AA for large text (3:1)
        aaaLarge: ratio >= 4.5,      // WCAG AAA for large text (4.5:1)
      },
    };
  }

  /**
   * Check if contrast meets specific WCAG level
   */
  meetsWCAG(
    color1: OklchColor,
    color2: OklchColor,
    level: 'AA' | 'AAA',
    large: boolean = false
  ): boolean {
    const result = this.checkContrast(color1, color2);
    
    if (level === 'AA') {
      return large ? result.passes.aaLarge : result.passes.aa;
    } else {
      return large ? result.passes.aaaLarge : result.passes.aaa;
    }
  }
}
