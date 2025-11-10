/**
 * Color Value Object
 * Represents a color in RGB format
 */

export class Color {
  private constructor(
    public readonly r: number,
    public readonly g: number,
    public readonly b: number,
    public readonly a: number = 1
  ) {
    if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) {
      throw new Error('RGB values must be between 0 and 255')
    }
    if (a < 0 || a > 1) {
      throw new Error('Alpha value must be between 0 and 1')
    }
  }

  static fromRGB(r: number, g: number, b: number, a: number = 1): Color {
    return new Color(r, g, b, a)
  }

  static fromHex(hex: string): Color {
    // Remove # if present
    hex = hex.replace(/^#/, '')

    // Handle shorthand hex (e.g., #fff)
    if (hex.length === 3) {
      hex = hex
        .split('')
        .map((c) => c + c)
        .join('')
    }

    // Handle 8-digit hex with alpha
    if (hex.length === 8) {
      const r = parseInt(hex.slice(0, 2), 16)
      const g = parseInt(hex.slice(2, 4), 16)
      const b = parseInt(hex.slice(4, 6), 16)
      const a = parseInt(hex.slice(6, 8), 16) / 255
      return new Color(r, g, b, a)
    }

    // Handle standard 6-digit hex
    const r = parseInt(hex.slice(0, 2), 16)
    const g = parseInt(hex.slice(2, 4), 16)
    const b = parseInt(hex.slice(4, 6), 16)
    return new Color(r, g, b)
  }

  static fromRGBString(rgb: string): Color {
    // Handle rgb(r, g, b) or rgba(r, g, b, a)
    const match = rgb.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/)
    if (!match) {
      throw new Error(`Invalid RGB string: ${rgb}`)
    }

    const r = parseInt(match[1], 10)
    const g = parseInt(match[2], 10)
    const b = parseInt(match[3], 10)
    const a = match[4] ? parseFloat(match[4]) : 1

    return new Color(r, g, b, a)
  }

  /**
   * Calculate relative luminance according to WCAG 2.1
   * https://www.w3.org/TR/WCAG21/#dfn-relative-luminance
   */
  getRelativeLuminance(): number {
    // Convert RGB to sRGB
    const rsRGB = this.r / 255
    const gsRGB = this.g / 255
    const bsRGB = this.b / 255

    // Apply gamma correction
    const rLinear = rsRGB <= 0.03928 ? rsRGB / 12.92 : Math.pow((rsRGB + 0.055) / 1.055, 2.4)
    const gLinear = gsRGB <= 0.03928 ? gsRGB / 12.92 : Math.pow((gsRGB + 0.055) / 1.055, 2.4)
    const bLinear = bsRGB <= 0.03928 ? bsRGB / 12.92 : Math.pow((bsRGB + 0.055) / 1.055, 2.4)

    // Calculate relative luminance
    return 0.2126 * rLinear + 0.7152 * gLinear + 0.0722 * bLinear
  }

  toHex(): string {
    const rHex = this.r.toString(16).padStart(2, '0')
    const gHex = this.g.toString(16).padStart(2, '0')
    const bHex = this.b.toString(16).padStart(2, '0')
    return `#${rHex}${gHex}${bHex}`
  }

  toRGB(): string {
    if (this.a < 1) {
      return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`
    }
    return `rgb(${this.r}, ${this.g}, ${this.b})`
  }

  toString(): string {
    return this.toHex()
  }
}
