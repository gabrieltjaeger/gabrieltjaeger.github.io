/**
 * Theme Service
 * Facade pattern: Provides simple interface to complex theme generation system
 * Single Responsibility: Orchestrate theme generation and provide CSS output
 */

import { ColorAdjuster } from './color-adjuster';
import { ColorConverter } from './color-converter';
import { ContrastChecker } from './contrast-checker';
import { ThemeGenerator } from './theme-generator';
import type { BasePalette, GeneratedTheme } from './types';

export class ThemeService {
  private colorConverter: ColorConverter;
  private contrastChecker: ContrastChecker;
  private colorAdjuster: ColorAdjuster;
  private themeGenerator: ThemeGenerator;

  constructor() {
    // Dependency injection following SOLID principles
    this.colorConverter = new ColorConverter();
    this.contrastChecker = new ContrastChecker();
    this.colorAdjuster = new ColorAdjuster(this.colorConverter, this.contrastChecker);
    this.themeGenerator = new ThemeGenerator(
      this.colorConverter,
      this.colorAdjuster,
      this.contrastChecker
    );
  }

  /**
   * Generate theme from base palette
   */
  generateTheme(basePalette: BasePalette): GeneratedTheme {
    return this.themeGenerator.generate(basePalette);
  }

  /**
   * Generate CSS variables for the theme
   */
  generateCssVariables(theme: GeneratedTheme): { light: string; dark: string } {
    const lightVars = this.generateThemeCss(theme.light);
    const darkVars = this.generateThemeCss(theme.dark);

    return {
      light: `:root {
${lightVars}
}`,
      dark: `.dark {
${darkVars}
}`,
    };
  }

  /**
   * Generate CSS variable declarations
   */
  private generateThemeCss(colors: Record<string, any>): string {
    const entries: string[] = [];

    const addVar = (name: string, value: string) => {
      entries.push(`  --${this.camelToKebab(name)}: ${value};`);
    };

    // Process all colors
    Object.entries(colors).forEach(([key, value]) => {
      if (value && typeof value === 'object' && 'cssValue' in value) {
        const cssValue = value.cssValue as string;
        // Keep the full oklch() wrapper for Tailwind compatibility
        addVar(key, cssValue);
      }
    });

    return entries.join('\n');
  }

  /**
   * Convert camelCase to kebab-case
   */
  private camelToKebab(str: string): string {
    return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
  }

  /**
   * Get default "Lógica & Vida" palette
   */
  static getDefaultPalette(): BasePalette {
    return {
      primary: {
        name: 'Azul-marinho',
        hex: '#1E2A44',
        symbolism: 'Racionalidade, profundidade, confiança',
      },
      secondary: {
        name: 'Cinza-aço',
        hex: '#A3A9B7',
        symbolism: 'Clareza, estrutura, neutralidade',
      },
      accent1: {
        name: 'Âmbar-dourado',
        hex: '#D9A441',
        symbolism: 'Energia, visão e destaque',
      },
      accent2: {
        name: 'Verde-musgo',
        hex: '#6B7B58',
        symbolism: 'Organicidade, estabilidade, natureza',
      },
      accent3: {
        name: 'Rosa-salmão',
        hex: '#E89A8E',
        symbolism: 'Empatia, sensibilidade, humanidade',
      },
    };
  }
}
