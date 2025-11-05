import type { ColorPair } from '../entities/ColorPair'

/**
 * ColorExtractor Port
 * Interface for extracting color combinations from a page/element
 */
export interface ColorExtractor {
  /**
   * Extract all color pairs from the current page
   */
  extractColorPairs(): Promise<ColorPair[]>

  /**
   * Extract color pairs from a specific element
   */
  extractFromElement(selector: string): Promise<ColorPair[]>

  /**
   * Get computed styles for an element
   */
  getComputedColor(selector: string, property: 'color' | 'background-color'): Promise<string>
}
