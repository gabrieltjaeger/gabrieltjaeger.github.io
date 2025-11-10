'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

/**
 * Debug component to show current theme state
 * Add this to see real-time theme information
 */
export function ThemeDebug() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [prefersDark, setPrefersDark] = useState<boolean | null>(null)
  const [htmlHasDark, setHtmlHasDark] = useState(false)

  useEffect(() => {
    setMounted(true)
    setPrefersDark(window.matchMedia('(prefers-color-scheme: dark)').matches)
    setHtmlHasDark(document.documentElement.classList.contains('dark'))

    // Watch for class changes
    const observer = new MutationObserver(() => {
      setHtmlHasDark(document.documentElement.classList.contains('dark'))
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    return () => observer.disconnect()
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 p-3 bg-muted rounded-lg border text-xs font-mono max-w-xs space-y-1">
      <div>Theme: <strong>{theme}</strong></div>
      <div>Resolved: <strong>{resolvedTheme}</strong></div>
      <div>Prefers Dark: <strong>{prefersDark ? 'yes' : 'no'}</strong></div>
      <div>HTML dark class: <strong>{htmlHasDark ? 'yes' : 'no'}</strong></div>
      <div className="text-muted-foreground">localStorage: {localStorage.getItem('theme')}</div>
    </div>
  )
}
