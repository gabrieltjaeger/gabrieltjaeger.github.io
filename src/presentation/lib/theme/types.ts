/**
 * Theme Types and Interfaces
 * Defines the structure of the theme system
 */

export interface BaseColor {
  name: string;
  hex: string;
  symbolism: string;
}

export interface BasePalette {
  primary: BaseColor;
  secondary: BaseColor;
  accent1: BaseColor;
  accent2: BaseColor;
  accent3: BaseColor;
}

export interface OklchColor {
  l: number; // Lightness (0-1)
  c: number; // Chroma (0-0.4)
  h: number; // Hue (0-360)
}

export interface ThemeColor {
  oklch: OklchColor;
  hex: string;
  cssValue: string; // Format: oklch(l c h)
}

export interface SemanticColors {
  background: ThemeColor;
  foreground: ThemeColor;
  card: ThemeColor;
  cardForeground: ThemeColor;
  popover: ThemeColor;
  popoverForeground: ThemeColor;
  primary: ThemeColor;
  primaryForeground: ThemeColor;
  secondary: ThemeColor;
  secondaryForeground: ThemeColor;
  muted: ThemeColor;
  mutedForeground: ThemeColor;
  accent: ThemeColor;
  accentForeground: ThemeColor;
  destructive: ThemeColor;
  destructiveForeground: ThemeColor;
  success: ThemeColor;
  successForeground: ThemeColor;
  warning: ThemeColor;
  warningForeground: ThemeColor;
  info: ThemeColor;
  infoForeground: ThemeColor;
  border: ThemeColor;
  input: ThemeColor;
  ring: ThemeColor;
}

export interface ChartColors {
  chart1: ThemeColor;
  chart2: ThemeColor;
  chart3: ThemeColor;
  chart4: ThemeColor;
  chart5: ThemeColor;
}

export interface SidebarColors {
  sidebar: ThemeColor;
  sidebarForeground: ThemeColor;
  sidebarPrimary: ThemeColor;
  sidebarPrimaryForeground: ThemeColor;
  sidebarAccent: ThemeColor;
  sidebarAccentForeground: ThemeColor;
  sidebarBorder: ThemeColor;
  sidebarRing: ThemeColor;
}

export interface GeneratedTheme {
  light: SemanticColors & ChartColors & SidebarColors;
  dark: SemanticColors & ChartColors & SidebarColors;
}

export interface ContrastCheckResult {
  ratio: number;
  passes: {
    aa: boolean;
    aaa: boolean;
    aaLarge: boolean;
    aaaLarge: boolean;
  };
}
