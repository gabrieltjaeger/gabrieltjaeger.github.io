/**
 * WCAG Contrast Ratio Value Object
 * Represents a color contrast ratio with validation against WCAG standards
 */

export type WCAGLevel = 'A' | 'AA' | 'AAA'

export interface WCAGRequirement {
  level: WCAGLevel
  normalText: number
  largeText: number
  uiComponents: number
}

export const WCAG_REQUIREMENTS: Record<WCAGLevel, WCAGRequirement> = {
  A: {
    level: 'A',
    normalText: 3.0, // Minimum for basic readability
    largeText: 3.0,
    uiComponents: 3.0,
  },
  AA: {
    level: 'AA',
    normalText: 4.5, // Standard requirement
    largeText: 3.0,
    uiComponents: 3.0,
  },
  AAA: {
    level: 'AAA',
    normalText: 7.0, // Enhanced requirement
    largeText: 4.5,
    uiComponents: 4.5,
  },
}

export class ContrastRatio {
  private constructor(private readonly ratio: number) {
    if (ratio < 1 || ratio > 21) {
      throw new Error(`Contrast ratio must be between 1:1 and 21:1, got ${ratio}:1`)
    }
  }

  static create(ratio: number): ContrastRatio {
    return new ContrastRatio(ratio)
  }

  getValue(): number {
    return this.ratio
  }

  /**
   * Check if this contrast ratio meets WCAG requirements for normal text
   */
  meetsNormalText(level: WCAGLevel): boolean {
    return this.ratio >= WCAG_REQUIREMENTS[level].normalText
  }

  /**
   * Check if this contrast ratio meets WCAG requirements for large text (18pt+ or 14pt+ bold)
   */
  meetsLargeText(level: WCAGLevel): boolean {
    return this.ratio >= WCAG_REQUIREMENTS[level].largeText
  }

  /**
   * Check if this contrast ratio meets WCAG requirements for UI components
   */
  meetsUIComponents(level: WCAGLevel): boolean {
    return this.ratio >= WCAG_REQUIREMENTS[level].uiComponents
  }

  /**
   * Get all WCAG levels this contrast ratio meets for normal text
   */
  getPassingLevels(textType: 'normal' | 'large' | 'ui'): WCAGLevel[] {
    const levels: WCAGLevel[] = []
    const checkMethod =
      textType === 'normal'
        ? this.meetsNormalText.bind(this)
        : textType === 'large'
        ? this.meetsLargeText.bind(this)
        : this.meetsUIComponents.bind(this)

    if (checkMethod('A')) levels.push('A')
    if (checkMethod('AA')) levels.push('AA')
    if (checkMethod('AAA')) levels.push('AAA')

    return levels
  }

  toString(): string {
    return `${this.ratio.toFixed(2)}:1`
  }
}
