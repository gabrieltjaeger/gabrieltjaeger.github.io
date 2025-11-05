import type { Color } from '../value-objects/Color'
import { ContrastRatio } from '../value-objects/ContrastRatio'

/**
 * Color Pair Entity
 * Represents a foreground/background color combination
 */
export interface ColorPairData {
  foreground: Color
  background: Color
  element: string
  description?: string
}

export class ColorPair {
  constructor(
    public readonly foreground: Color,
    public readonly background: Color,
    public readonly element: string,
    public readonly description?: string
  ) {}

  static create(data: ColorPairData): ColorPair {
    return new ColorPair(data.foreground, data.background, data.element, data.description)
  }

  /**
   * Calculate contrast ratio between foreground and background
   * According to WCAG 2.1: https://www.w3.org/TR/WCAG21/#dfn-contrast-ratio
   */
  calculateContrast(): ContrastRatio {
    const l1 = this.foreground.getRelativeLuminance()
    const l2 = this.background.getRelativeLuminance()

    // Ensure lighter color is L1
    const lighter = Math.max(l1, l2)
    const darker = Math.min(l1, l2)

    const ratio = (lighter + 0.05) / (darker + 0.05)

    return ContrastRatio.create(ratio)
  }

  getId(): string {
    return `${this.element}-${this.foreground.toString()}-${this.background.toString()}`
  }
}
