import type { ThemeMode } from '../value-objects/ThemeMode'

/**
 * ThemeRepository Port
 * Interface for persisting and retrieving theme preferences
 */
export interface ThemeRepository {
  /**
   * Get the current theme mode from storage
   * Returns null if no theme has been set
   */
  getThemeMode(): ThemeMode | null

  /**
   * Save the theme mode to storage
   */
  setThemeMode(mode: ThemeMode): void

  /**
   * Check if the system prefers dark mode
   */
  getSystemPrefersDark(): boolean

  /**
   * Subscribe to system theme preference changes
   * Returns unsubscribe function
   */
  observeSystemPreferenceChanges(callback: (prefersDark: boolean) => void): () => void
}
