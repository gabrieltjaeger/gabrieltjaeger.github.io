import type { Page } from '@playwright/test'
import { ColorPair } from '../../core/entities/ColorPair'
import type { ColorExtractor } from '../../core/ports/ColorExtractor'
import { Color } from '../../core/value-objects/Color'

/**
 * PlaywrightColorExtractor
 * Adapter that extracts colors from a page using Playwright
 */
export class PlaywrightColorExtractor implements ColorExtractor {
  constructor(private readonly page: Page) {}

  async extractColorPairs(): Promise<ColorPair[]> {
    // Get all visible text elements and interactive elements
    const elements = await this.page.$$eval('body *', (elements) => {
      const results: Array<{
        selector: string
        color: string
        backgroundColor: string
        text: string
        tagName: string
      }> = []

      elements.forEach((el, index) => {
        const element = el as HTMLElement
        const styles = window.getComputedStyle(element)

        // Skip if element is not visible
        if (styles.display === 'none' || styles.visibility === 'hidden' || styles.opacity === '0') {
          return
        }

        const hasText = element.textContent && element.textContent.trim().length > 0
        const isInteractive = ['A', 'BUTTON', 'INPUT', 'SELECT', 'TEXTAREA'].includes(
          element.tagName
        )

        // Only check elements with text or interactive elements
        if (!hasText && !isInteractive) {
          return
        }

        const color = styles.color
        const backgroundColor = styles.backgroundColor

        // Skip if no color or background
        if (!color || !backgroundColor) {
          return
        }

        // Generate a unique selector
        const id = element.id ? `#${element.id}` : ''
        const classes = element.className
          ? `.${Array.from(element.classList).slice(0, 2).join('.')}`
          : ''
        const selector = `${element.tagName.toLowerCase()}${id}${classes}[${index}]`

        results.push({
          selector,
          color,
          backgroundColor,
          text: element.textContent?.slice(0, 50) || '',
          tagName: element.tagName,
        })
      })

      return results
    })

    const colorPairs: ColorPair[] = []

    for (const elem of elements) {
      try {
        // Parse colors
        const fg = this.parseColor(elem.color)
        const bg = this.parseColor(elem.backgroundColor)

        // Get background from parent if current background is transparent
        let finalBg = bg
        if (bg.a < 1) {
          const parentBg = await this.getOpaqueBackground(elem.selector)
          if (parentBg) {
            finalBg = parentBg
          }
        }

        const description = `${elem.tagName}: ${elem.text.trim().slice(0, 30)}`

        colorPairs.push(ColorPair.create({
          foreground: fg,
          background: finalBg,
          element: elem.selector,
          description,
        }))
      } catch (error) {
        // Skip elements with invalid colors
        console.warn(`Failed to parse colors for ${elem.selector}:`, error)
      }
    }

    return colorPairs
  }

  async extractFromElement(selector: string): Promise<ColorPair[]> {
    const element = await this.page.$(selector)
    if (!element) {
      throw new Error(`Element not found: ${selector}`)
    }

    const colorData = await element.evaluate((el) => {
      const styles = window.getComputedStyle(el as HTMLElement)
      return {
        color: styles.color,
        backgroundColor: styles.backgroundColor,
        text: (el as HTMLElement).textContent?.slice(0, 50) || '',
        tagName: el.tagName,
      }
    })

    const fg = this.parseColor(colorData.color)
    const bg = this.parseColor(colorData.backgroundColor)

    // Get opaque background if needed
    let finalBg = bg
    if (bg.a < 1) {
      const parentBg = await this.getOpaqueBackground(selector)
      if (parentBg) {
        finalBg = parentBg
      }
    }

    const description = `${colorData.tagName}: ${colorData.text.trim()}`

    return [
      ColorPair.create({
        foreground: fg,
        background: finalBg,
        element: selector,
        description,
      }),
    ]
  }

  async getComputedColor(selector: string, property: 'color' | 'background-color'): Promise<string> {
    const element = await this.page.$(selector)
    if (!element) {
      throw new Error(`Element not found: ${selector}`)
    }

    return await element.evaluate((el, prop) => {
      return window.getComputedStyle(el as HTMLElement).getPropertyValue(prop)
    }, property)
  }

  /**
   * Get the first opaque background color by traversing up the DOM tree
   */
  private async getOpaqueBackground(selector: string): Promise<Color | null> {
    try {
      const result = await this.page.$eval(selector, (el) => {
        let current = el.parentElement

        while (current) {
          const styles = window.getComputedStyle(current)
          const bgColor = styles.backgroundColor

          // Check if background is opaque
          const rgbaMatch = bgColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/)
          if (rgbaMatch) {
            const alpha = rgbaMatch[4] ? parseFloat(rgbaMatch[4]) : 1
            if (alpha === 1) {
              return bgColor
            }
          }

          current = current.parentElement
        }

        // Default to white if no opaque background found
        return 'rgb(255, 255, 255)'
      })

      return this.parseColor(result)
    } catch {
      // Default to white
      return Color.fromRGB(255, 255, 255)
    }
  }

  private parseColor(colorString: string): Color {
    // Handle rgb/rgba
    if (colorString.startsWith('rgb')) {
      return Color.fromRGBString(colorString)
    }

    // Handle hex
    if (colorString.startsWith('#')) {
      return Color.fromHex(colorString)
    }

    // Handle CSS Color Level 4: color(srgb r g b [/ alpha])
    if (colorString.startsWith('color(srgb')) {
      const match = colorString.match(/color\(srgb\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+))?\)/)
      if (match) {
        // Convert from 0-1 range to 0-255 range
        const r = Math.round(parseFloat(match[1]) * 255)
        const g = Math.round(parseFloat(match[2]) * 255)
        const b = Math.round(parseFloat(match[3]) * 255)
        const a = match[4] ? parseFloat(match[4]) : 1
        return Color.fromRGB(r, g, b, a)
      }
    }

    // Handle oklab() format - Convert to RGB approximation
    // Note: This is a simplified conversion. For perfect accuracy, use a proper color conversion library
    if (colorString.startsWith('oklab')) {
      const match = colorString.match(/oklab\(([\d.]+)\s+([-\d.]+)\s+([-\d.]+)(?:\s*\/\s*([\d.]+))?\)/)
      if (match) {
        const L = parseFloat(match[1])
        // For WCAG purposes, we can approximate: high L = light color, low L = dark color
        // This is a rough approximation - oklab requires complex matrix transformations for exact conversion
        const lightness = Math.round(L * 255)
        const a = match[4] ? parseFloat(match[4]) : 1
        // Use grayscale approximation based on lightness
        return Color.fromRGB(lightness, lightness, lightness, a)
      }
    }

    // Handle named colors by creating a temporary element
    throw new Error(`Unsupported color format: ${colorString}`)
  }
}
