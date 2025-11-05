import type { ThemeRepository } from '@/core/ports/ThemeRepository'
import { ThemeMode } from '@/core/value-objects/ThemeMode'

/**
 * LocalStorageThemeRepository
 * Browser-based implementation of ThemeRepository using localStorage and matchMedia
 */
export class LocalStorageThemeRepository implements ThemeRepository {
  private readonly STORAGE_KEY = process.env.NEXT_PUBLIC_THEME_STORAGE_KEY || 'theme'

  getThemeMode(): ThemeMode | null {
    if (typeof window === 'undefined') {
      return null
    }

    const stored = localStorage.getItem(this.STORAGE_KEY)
    if (!stored) {
      return null
    }

    return ThemeMode.fromString(stored)
  }

  setThemeMode(mode: ThemeMode): void {
    if (typeof window === 'undefined') {
      return
    }

    localStorage.setItem(this.STORAGE_KEY, mode.toString())
    
    // Dispatch storage event for cross-tab synchronization
    window.dispatchEvent(new StorageEvent('storage', {
      key: this.STORAGE_KEY,
      newValue: mode.toString(),
      storageArea: localStorage,
    }))
  }

  getSystemPrefersDark(): boolean {
    if (typeof window === 'undefined') {
      return false
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches
  }

  observeSystemPreferenceChanges(callback: (prefersDark: boolean) => void): () => void {
    if (typeof window === 'undefined') {
      return () => {}
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      callback(e.matches)
    }

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    } 
    // Legacy browsers
    else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleChange)
      return () => mediaQuery.removeListener(handleChange)
    }

    return () => {}
  }
}
