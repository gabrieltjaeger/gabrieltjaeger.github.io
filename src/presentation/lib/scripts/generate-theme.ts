#!/usr/bin/env node
/**
 * Generate Theme Script
 * 
 * This script generates CSS variables from the base palette and can be used to:
 * 1. Preview the generated theme colors
 * 2. Update the globals.css file
 * 3. Generate themes for different palettes
 * 
 * Usage:
 *   pnpm tsx scripts/generate-theme.ts
 */

import { generateCssVariables, generateTheme, getDefaultPalette } from '../theme/color-utils';
import type { BasePalette, GeneratedTheme } from '../theme/types';

function printThemePreview(theme: GeneratedTheme) {
  console.log('\n🎨 Generated Theme Preview\n');
  console.log('='.repeat(80));
  
  const printColorSection = (title: string, colors: Record<string, any>) => {
    console.log(`\n${title}:`);
    console.log('-'.repeat(80));
    
    Object.entries(colors).forEach(([key, value]) => {
      if (value && typeof value === 'object' && 'hex' in value && 'cssValue' in value) {
        console.log(`  ${key.padEnd(25)} ${value.hex.padEnd(10)} ${value.cssValue}`);
      }
    });
  };

  console.log('\n🌞 LIGHT THEME');
  printColorSection('Core Colors', {
    background: theme.light.background,
    foreground: theme.light.foreground,
    primary: theme.light.primary,
    primaryForeground: theme.light.primaryForeground,
    secondary: theme.light.secondary,
    secondaryForeground: theme.light.secondaryForeground,
  });

  printColorSection('Accent & Muted', {
    accent: theme.light.accent,
    accentForeground: theme.light.accentForeground,
    muted: theme.light.muted,
    mutedForeground: theme.light.mutedForeground,
  });

  printColorSection('Semantic Colors', {
    success: theme.light.success,
    successForeground: theme.light.successForeground,
    warning: theme.light.warning,
    warningForeground: theme.light.warningForeground,
    destructive: theme.light.destructive,
    destructiveForeground: theme.light.destructiveForeground,
    info: theme.light.info,
    infoForeground: theme.light.infoForeground,
  });

  console.log('\n🌙 DARK THEME');
  printColorSection('Core Colors', {
    background: theme.dark.background,
    foreground: theme.dark.foreground,
    primary: theme.dark.primary,
    primaryForeground: theme.dark.primaryForeground,
    secondary: theme.dark.secondary,
    secondaryForeground: theme.dark.secondaryForeground,
  });

  printColorSection('Accent & Muted', {
    accent: theme.dark.accent,
    accentForeground: theme.dark.accentForeground,
    muted: theme.dark.muted,
    mutedForeground: theme.dark.mutedForeground,
  });

  printColorSection('Semantic Colors', {
    success: theme.dark.success,
    successForeground: theme.dark.successForeground,
    warning: theme.dark.warning,
    warningForeground: theme.dark.warningForeground,
    destructive: theme.dark.destructive,
    destructiveForeground: theme.dark.destructiveForeground,
    info: theme.dark.info,
    infoForeground: theme.dark.infoForeground,
  });

  console.log('\n' + '='.repeat(80) + '\n');
}

function printCssOutput(cssVars: { light: string; dark: string }) {
  console.log('\n📝 Generated CSS Variables\n');
  console.log('='.repeat(80));
  console.log('\n/* Light Theme */');
  console.log(cssVars.light);
  console.log('\n/* Dark Theme */');
  console.log(cssVars.dark);
  console.log('\n' + '='.repeat(80) + '\n');
}

function printPalette(palette: BasePalette) {
  console.log('\n🎨 Base Palette: "Lógica & Vida"\n');
  console.log('='.repeat(80));
  console.log(`\n${'Role'.padEnd(15)} ${'Color'.padEnd(20)} ${'Hex'.padEnd(10)} Symbolism`);
  console.log('-'.repeat(80));
  
  const entries = [
    { role: 'Primary', color: palette.primary },
    { role: 'Secondary', color: palette.secondary },
    { role: 'Accent 1', color: palette.accent1 },
    { role: 'Accent 2', color: palette.accent2 },
    { role: 'Accent 3', color: palette.accent3 },
  ];

  entries.forEach(({ role, color }) => {
    console.log(
      `${role.padEnd(15)} ${color.name.padEnd(20)} ${color.hex.padEnd(10)} ${color.symbolism}`
    );
  });
  
  console.log('='.repeat(80));
}

// Main execution
function main() {
  console.log('\n✨ Theme Generator\n');
  
  // Get default palette
  const palette = getDefaultPalette();
  printPalette(palette);

  // Generate theme
  console.log('\n⚙️  Generating theme...\n');
  const theme = generateTheme(palette);

  // Print preview
  printThemePreview(theme);

  // Generate CSS
  const cssVars = generateCssVariables(theme);
  printCssOutput(cssVars);

  console.log('✅ Theme generation complete!\n');
  console.log('💡 To apply this theme, update your app/globals.css file with the generated CSS.\n');
}

main();
