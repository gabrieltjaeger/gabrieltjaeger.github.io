import type { Theme } from '@/core/entities/Theme'
import type { ThemeRepository } from '@/core/ports/ThemeRepository'
import { GetTheme } from '@/core/use-cases/GetTheme'
import { ObserveSystemTheme } from '@/core/use-cases/ObserveSystemTheme'
import { SetTheme } from '@/core/use-cases/SetTheme'
import { ThemeMode } from '@/core/value-objects/ThemeMode'
import { useCallback, useEffect, useMemo, useState } from 'react'

/**
 * useThemeManager Hook
 * React hook that manages theme state using clean architecture use cases
 */
export function useThemeManager(themeRepository: ThemeRepository) {
  const [theme, setThemeState] = useState<Theme | null>(null)
  const [mounted, setMounted] = useState(false)

  // Initialize use cases once per repository instance
  const { getTheme, setTheme, observeSystemTheme } = useMemo(() => {
    return {
      getTheme: new GetTheme(themeRepository),
      setTheme: new SetTheme(themeRepository),
      observeSystemTheme: new ObserveSystemTheme(themeRepository),
    }
  }, [themeRepository])

  // Load initial theme
  useEffect(() => {
    const currentTheme = getTheme.execute()
    setThemeState(currentTheme)
    setMounted(true)
  }, [getTheme])

  // Apply theme to DOM
  useEffect(() => {
    if (!theme) return

    if (theme.shouldApplyDarkClass()) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  // Observe system preference changes
  useEffect(() => {
    if (!theme) return

    // Only observe if in system mode
    if (!theme.mode.isSystem()) return

    const unsubscribe = observeSystemTheme.execute((prefersDark) => {
      // Re-fetch theme to get updated resolved mode
      const updatedTheme = getTheme.execute()
      setThemeState(updatedTheme)
    })

    return unsubscribe
  }, [getTheme, observeSystemTheme, theme?.mode])

  // Set theme mode
  const setMode = useCallback((mode: ThemeMode) => {
    setTheme.execute(mode)
    const updatedTheme = getTheme.execute()
    setThemeState(updatedTheme)
  }, [getTheme, setTheme])

  // Toggle between light, dark, and system
  const toggleTheme = useCallback(() => {
    if (!theme) return

    if (theme.mode.isLight()) {
      setMode(ThemeMode.dark())
    } else if (theme.mode.isDark()) {
      setMode(ThemeMode.system())
    } else {
      setMode(ThemeMode.light())
    }
  }, [setMode, theme])

  return {
    theme,
    setMode,
    toggleTheme,
    mounted,
  }
}
