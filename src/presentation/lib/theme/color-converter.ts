/**
 * Color Converter
 * Single Responsibility: Convert colors between different formats
 */

import type { OklchColor, ThemeColor } from './types';

export interface IColorConverter {
  hexToOklch(hex: string): OklchColor;
  oklchToHex(oklch: OklchColor): string;
  createThemeColor(hex: string): ThemeColor;
  formatOklchCss(oklch: OklchColor): string;
}

export class ColorConverter implements IColorConverter {
  /**
   * Convert hex color to OKLCH color space
   * OKLCH is perceptually uniform and great for accessibility
   */
  hexToOklch(hex: string): OklchColor {
    // Remove # if present
    const cleanHex = hex.replace('#', '');
    
    // Convert hex to RGB
    const r = parseInt(cleanHex.substring(0, 2), 16) / 255;
    const g = parseInt(cleanHex.substring(2, 4), 16) / 255;
    const b = parseInt(cleanHex.substring(4, 6), 16) / 255;

    // Convert RGB to Linear RGB
    const toLinear = (c: number) => {
      return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    };

    const rl = toLinear(r);
    const gl = toLinear(g);
    const bl = toLinear(b);

    // Convert Linear RGB to XYZ (D65 illuminant)
    const x = 0.4124564 * rl + 0.3575761 * gl + 0.1804375 * bl;
    const y = 0.2126729 * rl + 0.7151522 * gl + 0.0721750 * bl;
    const z = 0.0193339 * rl + 0.1191920 * gl + 0.9503041 * bl;

    // Convert XYZ to OKLab
    const l_ = Math.cbrt(0.8189330101 * x + 0.3618667424 * y - 0.1288597137 * z);
    const m_ = Math.cbrt(0.0329845436 * x + 0.9293118715 * y + 0.0361456387 * z);
    const s_ = Math.cbrt(0.0482003018 * x + 0.2643662691 * y + 0.6338517070 * z);

    const l = 0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720468 * s_;
    const a = 1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_;
    const b_ = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_;

    // Convert OKLab to OKLCH
    const L = l;
    const C = Math.sqrt(a * a + b_ * b_);
    let H = Math.atan2(b_, a) * 180 / Math.PI;
    if (H < 0) H += 360;

    return {
      l: Math.round(L * 1000) / 1000,
      c: Math.round(C * 1000) / 1000,
      h: Math.round(H * 10) / 10,
    };
  }

  /**
   * Convert OKLCH back to hex (for verification/testing)
   */
  oklchToHex(oklch: OklchColor): string {
    const { l, c, h } = oklch;

    // Convert OKLCH to OKLab
    const a = c * Math.cos(h * Math.PI / 180);
    const b = c * Math.sin(h * Math.PI / 180);

    // Convert OKLab to XYZ
    const l_ = l + 0.3963377774 * a + 0.2158037573 * b;
    const m_ = l - 0.1055613458 * a - 0.0638541728 * b;
    const s_ = l - 0.0894841775 * a - 1.2914855480 * b;

    const l3 = l_ * l_ * l_;
    const m3 = m_ * m_ * m_;
    const s3 = s_ * s_ * s_;

    const x = +4.0767416621 * l3 - 3.3077115913 * m3 + 0.2309699292 * s3;
    const y = -1.2684380046 * l3 + 2.6097574011 * m3 - 0.3413193965 * s3;
    const z = -0.0041960863 * l3 - 0.7034186147 * m3 + 1.7076147010 * s3;

    // Convert XYZ to Linear RGB
    const rl = +3.2404542 * x - 1.5371385 * y - 0.4985314 * z;
    const gl = -0.9692660 * x + 1.8760108 * y + 0.0415560 * z;
    const bl = +0.0556434 * x - 0.2040259 * y + 1.0572252 * z;

    // Convert Linear RGB to sRGB
    const toSrgb = (c: number) => {
      return c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
    };

    const r = Math.max(0, Math.min(1, toSrgb(rl)));
    const g = Math.max(0, Math.min(1, toSrgb(gl)));
    const b_ = Math.max(0, Math.min(1, toSrgb(bl)));

    // Convert to hex
    const toHex = (n: number) => {
      const hex = Math.round(n * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b_)}`;
  }

  /**
   * Format OKLCH for CSS
   */
  formatOklchCss(oklch: OklchColor): string {
    return `oklch(${oklch.l} ${oklch.c} ${oklch.h})`;
  }

  /**
   * Create a complete ThemeColor object from hex
   */
  createThemeColor(hex: string): ThemeColor {
    const oklch = this.hexToOklch(hex);
    return {
      hex,
      oklch,
      cssValue: this.formatOklchCss(oklch),
    };
  }
}
