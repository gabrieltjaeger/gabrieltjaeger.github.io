import type { ColorExtractor } from '../ports/ColorExtractor'

export interface ContrastCheckResult {
  element: string
  foreground: string
  background: string
  ratio: string
  passes: {
    A: {
      normalText: boolean
      largeText: boolean
      uiComponents: boolean
    }
    AA: {
      normalText: boolean
      largeText: boolean
      uiComponents: boolean
    }
    AAA: {
      normalText: boolean
      largeText: boolean
      uiComponents: boolean
    }
  }
  description?: string
}

/**
 * CheckColorContrast Use Case
 * Validates color contrast ratios against WCAG standards
 */
export class CheckColorContrast {
  constructor(private readonly colorExtractor: ColorExtractor) {}

  async execute(): Promise<ContrastCheckResult[]> {
    const colorPairs = await this.colorExtractor.extractColorPairs()

    return colorPairs.map((pair) => {
      const contrast = pair.calculateContrast()

      return {
        element: pair.element,
        foreground: pair.foreground.toString(),
        background: pair.background.toString(),
        ratio: contrast.toString(),
        passes: {
          A: {
            normalText: contrast.meetsNormalText('A'),
            largeText: contrast.meetsLargeText('A'),
            uiComponents: contrast.meetsUIComponents('A'),
          },
          AA: {
            normalText: contrast.meetsNormalText('AA'),
            largeText: contrast.meetsLargeText('AA'),
            uiComponents: contrast.meetsUIComponents('AA'),
          },
          AAA: {
            normalText: contrast.meetsNormalText('AAA'),
            largeText: contrast.meetsLargeText('AAA'),
            uiComponents: contrast.meetsUIComponents('AAA'),
          },
        },
        description: pair.description,
      }
    })
  }

  async executeForElement(selector: string): Promise<ContrastCheckResult[]> {
    const colorPairs = await this.colorExtractor.extractFromElement(selector)

    return colorPairs.map((pair) => {
      const contrast = pair.calculateContrast()

      return {
        element: pair.element,
        foreground: pair.foreground.toString(),
        background: pair.background.toString(),
        ratio: contrast.toString(),
        passes: {
          A: {
            normalText: contrast.meetsNormalText('A'),
            largeText: contrast.meetsLargeText('A'),
            uiComponents: contrast.meetsUIComponents('A'),
          },
          AA: {
            normalText: contrast.meetsNormalText('AA'),
            largeText: contrast.meetsLargeText('AA'),
            uiComponents: contrast.meetsUIComponents('AA'),
          },
          AAA: {
            normalText: contrast.meetsNormalText('AAA'),
            largeText: contrast.meetsLargeText('AAA'),
            uiComponents: contrast.meetsUIComponents('AAA'),
          },
        },
        description: pair.description,
      }
    })
  }
}
