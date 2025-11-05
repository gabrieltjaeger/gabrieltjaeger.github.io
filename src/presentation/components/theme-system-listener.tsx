'use client'

import { useEffect, useRef } from 'react'

/**
 * Component that listens to system theme changes and applies them when in system mode
 * This ensures real-time theme switching based on OS preferences
 */
export function ThemeSystemListener() {
  const listenerRef = useRef<MediaQueryList | null>(null)

  useEffect(() => {
    try {
      // Create a listener for system preference changes
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      listenerRef.current = mediaQuery

      const handleChange = () => {
        // Check current theme setting
        const theme = localStorage.getItem('theme')
        
        // Only respond if in system mode or no theme set
        if (!theme || theme === 'system') {
          const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
          if (isDark) {
            document.documentElement.classList.add('dark')
            console.log('[Theme] System mode: Applied dark theme')
          } else {
            document.documentElement.classList.remove('dark')
            console.log('[Theme] System mode: Applied light theme')
          }
        }
      }

      // Add listener with both modern and legacy support
      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', handleChange)
      } else if (mediaQuery.addListener) {
        // Fallback for older browsers
        mediaQuery.addListener(handleChange)
      }

      return () => {
        if (mediaQuery.removeEventListener) {
          mediaQuery.removeEventListener('change', handleChange)
        } else if (mediaQuery.removeListener) {
          // Fallback for older browsers
          mediaQuery.removeListener(handleChange)
        }
      }
    } catch (error) {
      console.error('[Theme] Error setting up system listener:', error)
    }
  }, [])

  return null
}
