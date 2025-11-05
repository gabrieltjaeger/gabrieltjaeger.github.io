/**
 * Color Utilities - Main Export
 * 
 * This module provides a comprehensive theming system with:
 * - Dynamic color generation from a base palette
 * - WCAG color contrast checking
 * - Automatic foreground/background pairing
 * - SOLID principles architecture
 * 
 * @example
 * ```typescript
 * import { generateTheme, getDefaultPalette } from '@/lib/theme/color-utils';
 * 
 * // Use default palette
 * const theme = generateTheme(getDefaultPalette());
 * 
 * // Or create custom palette
 * const customTheme = generateTheme({
 *   primary: { name: 'Blue', hex: '#1E2A44', symbolism: 'Trust' },
 *   secondary: { name: 'Gray', hex: '#A3A9B7', symbolism: 'Clarity' },
 *   // ... other colors
 * });
 * ```
 */

export * from './color-adjuster';
export * from './color-converter';
export * from './contrast-checker';
export * from './theme-generator';
export * from './theme-service';
export * from './types';

import { ThemeService } from './theme-service';
import type { BasePalette, GeneratedTheme } from './types';

// Convenience functions for easy usage
let themeServiceInstance: ThemeService | null = null;

function getThemeService(): ThemeService {
  if (!themeServiceInstance) {
    themeServiceInstance = new ThemeService();
  }
  return themeServiceInstance;
}

/**
 * Generate a complete theme from a base palette
 */
export function generateTheme(basePalette: BasePalette): GeneratedTheme {
  return getThemeService().generateTheme(basePalette);
}

/**
 * Generate CSS variables from a theme
 */
export function generateCssVariables(theme: GeneratedTheme): { light: string; dark: string } {
  return getThemeService().generateCssVariables(theme);
}

/**
 * Get the default "Lógica & Vida" palette
 */
export function getDefaultPalette(): BasePalette {
  return ThemeService.getDefaultPalette();
}

/**
 * Generate and get CSS for default palette
 */
export function getDefaultThemeCss(): { light: string; dark: string } {
  const palette = getDefaultPalette();
  const theme = generateTheme(palette);
  return generateCssVariables(theme);
}
