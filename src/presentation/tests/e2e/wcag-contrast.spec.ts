import { expect, test } from '@playwright/test'
import { CheckColorContrast } from '../../../core/use-cases/CheckColorContrast'
import { PlaywrightColorExtractor } from '../../../infra/adapters/PlaywrightColorExtractor'

/**
 * WCAG Color Contrast Tests
 * 
 * Tests all color combinations on the page to ensure they meet
 * WCAG 2.1 accessibility standards for contrast ratios.
 * 
 * Standards:
 * - Level A: 3.0:1 minimum for all content
 * - Level AA: 4.5:1 for normal text, 3.0:1 for large text and UI components
 * - Level AAA: 7.0:1 for normal text, 4.5:1 for large text and UI components
 * 
 * Large text is defined as 18pt+ (24px+) or 14pt+ (18.66px+) bold
 */

test.describe('WCAG Color Contrast Compliance', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
  })

  test('should meet WCAG Level AA for all text elements', async ({ page }) => {
    const extractor = new PlaywrightColorExtractor(page)
    const useCase = new CheckColorContrast(extractor)
    
    const results = await useCase.execute()
    
    const failures: string[] = []
    
    results.forEach((result) => {
      if (!result.passes.AA.normalText) {
        failures.push(
          `❌ ${result.element}: ${result.ratio} (needs 4.5:1)\n` +
          `   Foreground: ${result.foreground}, Background: ${result.background}\n` +
          `   ${result.description || ''}`
        )
      }
    })
    
    if (failures.length > 0) {
      console.log('\n📊 WCAG AA Failures:')
      console.log('='.repeat(80))
      failures.forEach((failure, index) => {
        console.log(`\n${index + 1}. ${failure}`)
      })
      console.log('='.repeat(80))
    }
    
    expect(failures, `Found ${failures.length} elements failing WCAG AA (4.5:1 for normal text)`).toHaveLength(0)
  })

  test('should meet WCAG Level AA for large text', async ({ page }) => {
    const extractor = new PlaywrightColorExtractor(page)
    const useCase = new CheckColorContrast(extractor)
    
    const results = await useCase.execute()
    
    const failures: string[] = []
    
    results.forEach((result) => {
      if (!result.passes.AA.largeText) {
        failures.push(
          `❌ ${result.element}: ${result.ratio} (needs 3.0:1 for large text)\n` +
          `   Foreground: ${result.foreground}, Background: ${result.background}\n` +
          `   ${result.description || ''}`
        )
      }
    })
    
    if (failures.length > 0) {
      console.log('\n📊 WCAG AA Large Text Failures:')
      console.log('='.repeat(80))
      failures.forEach((failure, index) => {
        console.log(`\n${index + 1}. ${failure}`)
      })
      console.log('='.repeat(80))
    }
    
    expect(failures, `Found ${failures.length} elements failing WCAG AA for large text (3.0:1)`).toHaveLength(0)
  })

  test('should meet WCAG Level AA for UI components', async ({ page }) => {
    const extractor = new PlaywrightColorExtractor(page)
    const useCase = new CheckColorContrast(extractor)
    
    const results = await useCase.execute()
    
    const failures: string[] = []
    
    results.forEach((result) => {
      if (!result.passes.AA.uiComponents) {
        failures.push(
          `❌ ${result.element}: ${result.ratio} (needs 3.0:1 for UI components)\n` +
          `   Foreground: ${result.foreground}, Background: ${result.background}\n` +
          `   ${result.description || ''}`
        )
      }
    })
    
    if (failures.length > 0) {
      console.log('\n📊 WCAG AA UI Component Failures:')
      console.log('='.repeat(80))
      failures.forEach((failure, index) => {
        console.log(`\n${index + 1}. ${failure}`)
      })
      console.log('='.repeat(80))
    }
    
    expect(failures, `Found ${failures.length} UI components failing WCAG AA (3.0:1)`).toHaveLength(0)
  })

  test('should report WCAG Level AAA compliance (enhanced)', async ({ page }) => {
    const extractor = new PlaywrightColorExtractor(page)
    const useCase = new CheckColorContrast(extractor)
    
    const results = await useCase.execute()
    
    const aaaPassCount = results.filter(r => r.passes.AAA.normalText).length
    const totalCount = results.length
    const aaaPercentage = totalCount > 0 ? ((aaaPassCount / totalCount) * 100).toFixed(1) : '0'
    
    console.log('\n📊 WCAG AAA Compliance Report (Enhanced Standard):')
    console.log('='.repeat(80))
    console.log(`Total elements checked: ${totalCount}`)
    console.log(`AAA compliant (7.0:1): ${aaaPassCount} (${aaaPercentage}%)`)
    console.log('='.repeat(80))
    
    if (aaaPassCount < totalCount) {
      console.log('\n💡 Note: AAA is an enhanced standard and not required for most sites.')
      console.log('   Current AA compliance is the legal requirement.')
    }
    
    // This is informational only - we don't fail on AAA
    expect(totalCount).toBeGreaterThan(0)
  })

  test('should generate detailed contrast report', async ({ page }) => {
    const extractor = new PlaywrightColorExtractor(page)
    const useCase = new CheckColorContrast(extractor)
    
    const results = await useCase.execute()
    
    console.log('\n📊 Complete WCAG Contrast Report:')
    console.log('='.repeat(80))
    console.log(`Total elements analyzed: ${results.length}`)
    console.log('')
    
    const byLevel = {
      A: { pass: 0, fail: 0 },
      AA: { pass: 0, fail: 0 },
      AAA: { pass: 0, fail: 0 },
    }
    
    results.forEach((result) => {
      if (result.passes.A.normalText) byLevel.A.pass++
      else byLevel.A.fail++
      
      if (result.passes.AA.normalText) byLevel.AA.pass++
      else byLevel.AA.fail++
      
      if (result.passes.AAA.normalText) byLevel.AAA.pass++
      else byLevel.AAA.fail++
    })
    
    console.log('Level A (3.0:1):')
    console.log(`  ✅ Pass: ${byLevel.A.pass}`)
    console.log(`  ❌ Fail: ${byLevel.A.fail}`)
    console.log('')
    
    console.log('Level AA (4.5:1) - REQUIRED:')
    console.log(`  ✅ Pass: ${byLevel.AA.pass}`)
    console.log(`  ❌ Fail: ${byLevel.AA.fail}`)
    console.log('')
    
    console.log('Level AAA (7.0:1) - Enhanced:')
    console.log(`  ✅ Pass: ${byLevel.AAA.pass}`)
    console.log(`  ❌ Fail: ${byLevel.AAA.fail}`)
    console.log('='.repeat(80))
    
    // Show top 5 best and worst ratios
    const sorted = [...results].sort((a, b) => {
      const ratioA = parseFloat(a.ratio.split(':')[0])
      const ratioB = parseFloat(b.ratio.split(':')[0])
      return ratioB - ratioA
    })
    
    console.log('\n🏆 Top 5 Best Contrast Ratios:')
    sorted.slice(0, 5).forEach((r, i) => {
      console.log(`  ${i + 1}. ${r.ratio} - ${r.description || r.element}`)
    })
    
    console.log('\n⚠️  Top 5 Worst Contrast Ratios:')
    sorted.slice(-5).reverse().forEach((r, i) => {
      const passes = r.passes.AA.normalText ? '✅' : '❌'
      console.log(`  ${i + 1}. ${r.ratio} ${passes} - ${r.description || r.element}`)
    })
    console.log('')
    
    expect(results.length).toBeGreaterThan(0)
  })

  test.describe('Specific Element Checks', () => {
    
    test('should check navigation links contrast', async ({ page }) => {
      const extractor = new PlaywrightColorExtractor(page)
      const useCase = new CheckColorContrast(extractor)
      
      // Check if navigation exists
      const navExists = await page.locator('nav').count() > 0
      test.skip(!navExists, 'No navigation element found')
      
      const results = await useCase.executeForElement('nav')
      
      const failures = results.filter(r => !r.passes.AA.normalText)
      
      if (failures.length > 0) {
        console.log('\n❌ Navigation contrast failures:')
        failures.forEach(f => {
          console.log(`   ${f.element}: ${f.ratio}`)
        })
      }
      
      expect(failures).toHaveLength(0)
    })

    test('should check button contrast', async ({ page }) => {
      const buttons = await page.locator('button').all()
      
      if (buttons.length === 0) {
        test.skip(true, 'No buttons found on page')
      }
      
      const extractor = new PlaywrightColorExtractor(page)
      const failures: string[] = []
      
      for (let i = 0; i < Math.min(buttons.length, 10); i++) {
        const selector = `button:nth-of-type(${i + 1})`
        const useCase = new CheckColorContrast(extractor)
        
        try {
          const results = await useCase.executeForElement(selector)
          results.forEach(r => {
            if (!r.passes.AA.uiComponents) {
              failures.push(`${selector}: ${r.ratio}`)
            }
          })
        } catch (error) {
          // Skip buttons that can't be analyzed
          console.log(`Skipping ${selector}:`, error)
        }
      }
      
      if (failures.length > 0) {
        console.log('\n❌ Button contrast failures:')
        failures.forEach(f => console.log(`   ${f}`))
      }
      
      expect(failures).toHaveLength(0)
    })
  })
})
