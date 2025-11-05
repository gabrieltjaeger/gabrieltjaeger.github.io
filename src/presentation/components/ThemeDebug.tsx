'use client'

import { useEffect, useState } from 'react'
import { useTheme } from './ThemeManagerProvider'

/**
 * ThemeDebug Component
 * Displays current theme state for debugging purposes
 * Remove this component once theme issues are resolved
 */
export function ThemeDebug() {
  const { theme, mounted, setMode } = useTheme()
  const [systemPrefersDark, setSystemPrefersDark] = useState<boolean | null>(null)
  const [localStorageTheme, setLocalStorageTheme] = useState<string | null>(null)
  const [hasDarkClass, setHasDarkClass] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Check system preference
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    setSystemPrefersDark(mediaQuery.matches)

    // Check localStorage
    setLocalStorageTheme(localStorage.getItem('theme'))

    // Check dark class
    setHasDarkClass(document.documentElement.classList.contains('dark'))

    // Listen for changes
    const interval = setInterval(() => {
      setLocalStorageTheme(localStorage.getItem('theme'))
      setHasDarkClass(document.documentElement.classList.contains('dark'))
      setSystemPrefersDark(window.matchMedia('(prefers-color-scheme: dark)').matches)
    }, 500)

    return () => clearInterval(interval)
  }, [])

  const handleClearAndReset = () => {
    localStorage.removeItem('theme')
    window.location.reload()
  }

  const handleSetLight = () => {
    localStorage.setItem('theme', 'light')
    window.location.reload()
  }

  const handleSetDark = () => {
    localStorage.setItem('theme', 'dark')
    window.location.reload()
  }

  const handleSetSystem = () => {
    localStorage.setItem('theme', 'system')
    window.location.reload()
  }

  if (!mounted) {
    return null
  }

  // Only show debug panel if NEXT_PUBLIC_DEBUG_MODE is enabled
  if (process.env.NEXT_PUBLIC_DEBUG_MODE !== 'true') {
    return null
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '10px',
        right: '10px',
        background: 'rgba(0, 0, 0, 0.8)',
        color: 'white',
        padding: '15px',
        borderRadius: '8px',
        fontSize: '12px',
        fontFamily: 'monospace',
        zIndex: 9999,
        maxWidth: '300px',
      }}
    >
      <div style={{ fontWeight: 'bold', marginBottom: '10px', color: '#4ade80' }}>
        Theme Debug Panel
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
        <div>
          <span style={{ color: '#fbbf24' }}>Theme Mode:</span>{' '}
          <span style={{ color: '#60a5fa' }}>{theme?.mode.toString() || 'null'}</span>
        </div>
        <div>
          <span style={{ color: '#fbbf24' }}>Resolved Dark:</span>{' '}
          <span style={{ color: theme?.shouldApplyDarkClass() ? '#f87171' : '#4ade80' }}>
            {theme?.shouldApplyDarkClass() ? 'YES' : 'NO'}
          </span>
        </div>
        <div>
          <span style={{ color: '#fbbf24' }}>localStorage:</span>{' '}
          <span style={{ color: '#60a5fa' }}>{localStorageTheme || 'null'}</span>
        </div>
        <div>
          <span style={{ color: '#fbbf24' }}>System Prefers Dark:</span>{' '}
          <span style={{ color: systemPrefersDark ? '#f87171' : '#4ade80' }}>
            {systemPrefersDark === null ? 'unknown' : systemPrefersDark ? 'YES' : 'NO'}
          </span>
        </div>
        <div>
          <span style={{ color: '#fbbf24' }}>DOM .dark class:</span>{' '}
          <span style={{ color: hasDarkClass ? '#f87171' : '#4ade80' }}>
            {hasDarkClass ? 'YES' : 'NO'}
          </span>
        </div>
      </div>
      <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
        <button
          onClick={handleClearAndReset}
          style={{
            background: '#ef4444',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            padding: '5px 10px',
            cursor: 'pointer',
            fontSize: '11px',
          }}
        >
          Clear & Reset to System
        </button>
        <div style={{ display: 'flex', gap: '5px' }}>
          <button
            onClick={handleSetLight}
            style={{
              background: '#60a5fa',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              padding: '5px 10px',
              cursor: 'pointer',
              fontSize: '11px',
              flex: 1,
            }}
          >
            Light
          </button>
          <button
            onClick={handleSetDark}
            style={{
              background: '#1f2937',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              padding: '5px 10px',
              cursor: 'pointer',
              fontSize: '11px',
              flex: 1,
            }}
          >
            Dark
          </button>
          <button
            onClick={handleSetSystem}
            style={{
              background: '#8b5cf6',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              padding: '5px 10px',
              cursor: 'pointer',
              fontSize: '11px',
              flex: 1,
            }}
          >
            System
          </button>
        </div>
      </div>
    </div>
  )
}
