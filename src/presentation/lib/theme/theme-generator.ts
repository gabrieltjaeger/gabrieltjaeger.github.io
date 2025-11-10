/**
 * Theme Generator
 * Single Responsibility: Generate complete theme from base palette
 * Open/Closed Principle: Open for extension through strategy pattern
 * Dependency Inversion: Depends on abstractions (interfaces)
 */

import type { IColorAdjuster } from './color-adjuster';
import type { IColorConverter } from './color-converter';
import type { IContrastChecker } from './contrast-checker';
import type {
  BasePalette,
  ChartColors,
  GeneratedTheme,
  OklchColor,
  SemanticColors,
  SidebarColors,
  ThemeColor,
} from './types';

export interface IThemeGenerator {
  generate(basePalette: BasePalette): GeneratedTheme;
}

export class ThemeGenerator implements IThemeGenerator {
  constructor(
    private colorConverter: IColorConverter,
    private colorAdjuster: IColorAdjuster,
    private contrastChecker: IContrastChecker
  ) {}

  /**
   * Generate complete theme from base palette
   */
  generate(basePalette: BasePalette): GeneratedTheme {
    // Convert base colors to OKLCH
    const primaryOklch = this.colorConverter.hexToOklch(basePalette.primary.hex);
    const secondaryOklch = this.colorConverter.hexToOklch(basePalette.secondary.hex);
    const accent1Oklch = this.colorConverter.hexToOklch(basePalette.accent1.hex);
    const accent2Oklch = this.colorConverter.hexToOklch(basePalette.accent2.hex);
    const accent3Oklch = this.colorConverter.hexToOklch(basePalette.accent3.hex);

    return {
      light: this.generateLightTheme(
        primaryOklch,
        secondaryOklch,
        accent1Oklch,
        accent2Oklch,
        accent3Oklch
      ),
      dark: this.generateDarkTheme(
        primaryOklch,
        secondaryOklch,
        accent1Oklch,
        accent2Oklch,
        accent3Oklch
      ),
    };
  }

  /**
   * Generate light theme colors - AUTHORIAL PRESENCE
   * Philosophy: Editorial paper + Navy weight + Amber legacy + Living green + Human terra
   * This is not a template. This is a manifesto.
   */
  private generateLightTheme(
    primary: OklchColor,     // Navy - Abyssal philosopher
    secondary: OklchColor,   // Steel - Graphite machinery  
    accent1: OklchColor,     // Amber - Ancient gold, not neon
    accent2: OklchColor,     // Moss - Wet earth, living
    accent3: OklchColor      // Salmon - Clay, human hands
  ): SemanticColors & ChartColors & SidebarColors {
    
    // BACKGROUND - Editorial paper (off-white with terra-rosada whisper)
    // Not pure white. Paper has memory.
    const background = this.createThemeColor({ 
      l: 0.97, 
      c: accent3.c * 0.35, // Visible warmth (2-3%)
      h: accent3.h // Terra-rosada base
    });
    
    // CARD - Graphite with presence (not pastel neutrality)
    // Structural weight, metallic echo
    const card = this.createThemeColor({ 
      l: 0.70, // Darker - visible hierarchy
      c: secondary.c * 1.2, // More saturated - graphite character
      h: secondary.h
    });
    const popover = card;

    // PRIMARY - Petroleum abyss (L=20%, S=55%)
    // Philosophical weight. Not corporate blue.
    const primaryColor = this.createThemeColor({
      l: 0.20,
      c: primary.c * 1.8, // Dense, saturated
      h: primary.h
    });
    
    // Primary Foreground - Warm paper over abyss
    const primaryForeground = this.createThemeColor({ 
      l: 0.96, 
      c: accent3.c * 0.2, // Slight terra warmth
      h: accent3.h
    });

    // SECONDARY - Graphite machinery (L=44%, S=10%)
    // Dense metal, not soft gray
    const secondaryColor = this.createThemeColor({
      l: 0.44,
      c: secondary.c * 1.2, // Metallic presence
      h: secondary.h
    });
    const secondaryForeground = this.createThemeColor({
      l: 0.15,
      c: primary.c * 0.8, // Navy-tinted with weight
      h: primary.h
    });

    // MUTED - Structural graphite (visible, not invisible)
    const muted = this.createThemeColor({
      l: 0.64,
      c: secondary.c * 0.9, // Present borders
      h: secondary.h
    });
    
    // Muted Foreground - Technical gray with character
    const mutedForeground = this.createThemeColor({
      l: 0.42,
      c: secondary.c * 1.0,
      h: secondary.h
    });

    // ACCENT - Ancient Gold with patina (L=56%, S=75%)
    // NOT CTA yellow. This is legacy, weight, history.
    // Used in: title underlines, key highlights, philosophical markers
    const accent = this.createThemeColor({
      l: 0.56,
      c: accent1.c * 2.0, // Dense saturation
      h: accent1.h
    });
    
    // Accent Foreground - Abyss over gold
    const accentForeground = this.createThemeColor({
      l: 0.12,
      c: primary.c * 1.0,
      h: primary.h
    });

    // FOREGROUND - Petroleum ink for typography
    // Heavy, present, philosophical
    const foreground = primaryColor;
    const cardForeground = foreground;
    const popoverForeground = foreground;

    // DESTRUCTIVE - Blood with weight (not alarm red)
    const destructive = this.createThemeColor({ 
      l: 0.48, 
      c: 0.24,
      h: 25
    });
    const destructiveForeground = this.createThemeColor({ 
      l: 0.97, 
      c: accent3.c * 0.15, // Warm white
      h: accent3.h
    });

    // SUCCESS - Wet moss after rain (L=38%, S=45%)
    // Living, organic, not corporate green
    const success = this.createThemeColor({
      l: 0.38,
      c: accent2.c * 1.8, // Saturated earth
      h: accent2.h
    });
    
    // Success Foreground - Paper over moss
    const successForeground = this.createThemeColor({
      l: 0.94,
      c: accent2.c * 0.25,
      h: accent2.h
    });

    // WARNING - Ancient gold (legacy warning)
    const warning = accent;
    const warningForeground = accentForeground;

    // INFO - Deep petroleum blue (technical clarity)
    const info = this.createThemeColor({
      l: 0.48,
      c: primary.c * 1.6,
      h: 220
    });
    const infoForeground = this.createThemeColor({
      l: 0.96,
      c: accent3.c * 0.15,
      h: accent3.h
    });

    // BORDER - Graphite with presence (visible structure)
    const border = this.createThemeColor({
      l: 0.60,
      c: secondary.c * 1.0,
      h: secondary.h
    });
    const input = border;
    
    // RING - Ancient gold halo
    const ring = accent;

    // CHART COLORS - Narrative palette
    const chart1 = primaryColor;        // Petroleum - Depth
    const chart2 = accent;              // Ancient gold - Legacy
    const chart3 = success;             // Wet moss - Life
    const chart4 = this.createThemeColor({ // Terra-rosada (L=66%, S=42%)
      l: 0.66,
      c: accent3.c * 1.65, // Clay, hands, human
      h: accent3.h
    });
    const chart5 = info;                // Deep blue - Technical

    // SIDEBAR - Graphite scaffold (structural presence)
    const sidebar = this.createThemeColor({
      l: 0.68,
      c: secondary.c * 1.1, // Metallic character
      h: secondary.h
    });
    const sidebarForeground = foreground;
    const sidebarPrimary = primaryColor;
    const sidebarPrimaryForeground = primaryForeground;
    
    // Sidebar Accent - Gold markers in structure
    const sidebarAccent = this.createThemeColor({
      l: 0.82,
      c: accent1.c * 1.4, // Visible gold
      h: accent1.h
    });
    const sidebarAccentForeground = foreground;
    const sidebarBorder = border;
    const sidebarRing = ring;

    return {
      background,
      foreground,
      card,
      cardForeground,
      popover,
      popoverForeground,
      primary: primaryColor,
      primaryForeground,
      secondary: secondaryColor,
      secondaryForeground,
      muted,
      mutedForeground,
      accent,
      accentForeground,
      destructive,
      destructiveForeground,
      success,
      successForeground,
      warning,
      warningForeground,
      info,
      infoForeground,
      border,
      input,
      ring,
      chart1,
      chart2,
      chart3,
      chart4,
      chart5,
      sidebar,
      sidebarForeground,
      sidebarPrimary,
      sidebarPrimaryForeground,
      sidebarAccent,
      sidebarAccentForeground,
      sidebarBorder,
      sidebarRing,
    };
  }

  /**
   * Generate dark theme colors - OCEANIC ABYSS
   * Philosophy: Not inversion. This is immersion.
   * Petroleum depths + ember glow + silent life + rare human touch
   */
  private generateDarkTheme(
    primary: OklchColor,     // Navy - Now the ocean itself
    secondary: OklchColor,   // Steel - Underwater machinery
    accent1: OklchColor,     // Amber - Embers, not neon
    accent2: OklchColor,     // Moss - Bioluminescence
    accent3: OklchColor      // Salmon - Heartbeat in darkness
  ): SemanticColors & ChartColors & SidebarColors {
    
    // BACKGROUND - Oceanic abyss (L=12%, S=45%)
    // Not black. Water has color in depth.
    const background = this.createThemeColor({
      l: 0.12,
      c: primary.c * 1.5, // Rich petroleum
      h: primary.h
    });

    // CARD - Slightly surfaced (L=16%, S=50%)
    // Floating panels in deep water
    const card = this.createThemeColor({
      l: 0.16,
      c: primary.c * 1.6,
      h: primary.h
    });
    const popover = card;

    // PRIMARY - Cyan light from above (L=68%, S=75%)
    // Sky remembered in abyss
    const primaryColor = this.createThemeColor({
      l: 0.68,
      c: primary.c * 1.8,
      h: primary.h
    });
    
    const primaryForeground = this.createThemeColor({
      l: 0.08,
      c: primary.c * 0.8,
      h: primary.h
    });

    // SECONDARY - Underwater steel (L=48%, S=12%)
    const secondaryColor = this.createThemeColor({
      l: 0.48,
      c: secondary.c * 1.1,
      h: secondary.h
    });
    const secondaryForeground = this.createThemeColor({
      l: 0.94,
      c: accent3.c * 0.15, // Warm light
      h: accent3.h
    });

    // MUTED - Deep structure (L=22%, S=40%)
    const muted = this.createThemeColor({
      l: 0.22,
      c: primary.c * 1.3,
      h: primary.h
    });
    const mutedForeground = this.createThemeColor({
      l: 0.68,
      c: secondary.c * 0.8,
      h: secondary.h
    });

    // ACCENT - Ember glow (L=58%, S=68%)
    // Ancient gold becomes warm ember in darkness
    // Add box-shadow: 0 0 20px amber for aura effect
    const accent = this.createThemeColor({
      l: 0.58,
      c: accent1.c * 1.8, // Glowing saturation
      h: accent1.h
    });
    const accentForeground = this.createThemeColor({
      l: 0.08,
      c: primary.c * 0.8,
      h: primary.h
    });

    // FOREGROUND - Warm moonlight (L=93%, S with terra hint)
    const foreground = this.createThemeColor({
      l: 0.93,
      c: accent3.c * 0.18, // Slight human warmth
      h: accent3.h
    });
    const cardForeground = foreground;
    const popoverForeground = foreground;

    // DESTRUCTIVE - Deep blood (not alarm)
    const destructive = this.createThemeColor({
      l: 0.52,
      c: 0.22,
      h: 25
    });
    const destructiveForeground = this.createThemeColor({
      l: 0.96,
      c: accent3.c * 0.15,
      h: accent3.h
    });

    // SUCCESS - Bioluminescent moss (L=45%, S=52%)
    // Living green glow in darkness
    const success = this.createThemeColor({
      l: 0.45,
      c: accent2.c * 2.0, // Luminescent
      h: accent2.h
    });
    const successForeground = this.createThemeColor({
      l: 0.94,
      c: accent2.c * 0.2,
      h: accent2.h
    });

    // WARNING - Ember (same as accent)
    const warning = accent;
    const warningForeground = accentForeground;

    // INFO - Deep water clarity
    const info = this.createThemeColor({
      l: 0.60,
      c: primary.c * 1.5,
      h: 220
    });
    const infoForeground = this.createThemeColor({
      l: 0.08,
      c: primary.c * 0.5,
      h: 220
    });

    // BORDER - Visible underwater structure (L=26%, S=38%)
    const border = this.createThemeColor({
      l: 0.26,
      c: primary.c * 1.2,
      h: primary.h
    });
    const input = border;
    const ring = accent; // Ember halo for focus

    // CHART COLORS - Narrative in darkness
    const chart1 = primaryColor;        // Cyan light
    const chart2 = accent;              // Ember glow
    const chart3 = success;             // Bioluminescence
    const chart4 = this.createThemeColor({ // Heartbeat (L=62%, S=38%)
      l: 0.62,
      c: accent3.c * 1.5, // Terra-rosada pulse
      h: accent3.h
    });
    const chart5 = info;                // Deep clarity

    // SIDEBAR - Deeper abyss (L=10%, S=48%)
    const sidebar = this.createThemeColor({
      l: 0.10,
      c: primary.c * 1.6,
      h: primary.h
    });
    const sidebarForeground = foreground;
    const sidebarPrimary = primaryColor;
    const sidebarPrimaryForeground = primaryForeground;
    const sidebarAccent = this.createThemeColor({
      l: 0.22,
      c: accent1.c * 1.6, // Ember markers
      h: accent1.h
    });
    const sidebarAccentForeground = foreground;
    const sidebarBorder = border;
    const sidebarRing = ring;

    return {
      background,
      foreground,
      card,
      cardForeground,
      popover,
      popoverForeground,
      primary: primaryColor,
      primaryForeground,
      secondary: secondaryColor,
      secondaryForeground,
      muted,
      mutedForeground,
      accent,
      accentForeground,
      destructive,
      destructiveForeground,
      success,
      successForeground,
      warning,
      warningForeground,
      info,
      infoForeground,
      border,
      input,
      ring,
      chart1,
      chart2,
      chart3,
      chart4,
      chart5,
      sidebar,
      sidebarForeground,
      sidebarPrimary,
      sidebarPrimaryForeground,
      sidebarAccent,
      sidebarAccentForeground,
      sidebarBorder,
      sidebarRing,
    };
  }

  /**
   * Helper to create ThemeColor from OklchColor
   */
  private createThemeColor(oklch: OklchColor): ThemeColor {
    const hex = this.colorConverter.oklchToHex(oklch);
    return {
      oklch,
      hex,
      cssValue: this.colorConverter.formatOklchCss(oklch),
    };
  }
}
