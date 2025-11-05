'use client'

import type { Theme } from '@/core/entities/Theme'
import type { ThemeMode } from '@/core/value-objects/ThemeMode'
import { useThemeManager } from '@/hooks/useThemeManager'
import { LocalStorageThemeRepository } from '@/infra/repositories/LocalStorageThemeRepository'
import { createContext, useContext, useMemo, type ReactNode } from 'react'

interface ThemeContextValue {
  theme: Theme | null
  setMode: (mode: ThemeMode) => void
  toggleTheme: () => void
  mounted: boolean
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export function ThemeManagerProvider({ children }: { children: ReactNode }) {
  const themeRepository = useMemo(() => new LocalStorageThemeRepository(), [])
  const themeManager = useThemeManager(themeRepository)

  return (
    <ThemeContext.Provider value={themeManager}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeManagerProvider')
  }
  return context
}
