import type { ThemeMode } from '../value-objects/ThemeMode'

/**
 * Theme Entity
 * Represents the current theme state of the application
 */
export class Theme {
  constructor(
    public readonly mode: ThemeMode,
    public readonly resolvedMode: 'light' | 'dark',
  ) {}

  static create(mode: ThemeMode, systemPrefersDark: boolean): Theme {
    let resolvedMode: 'light' | 'dark'

    if (mode.isSystem()) {
      resolvedMode = systemPrefersDark ? 'dark' : 'light'
    } else {
      resolvedMode = mode.isDark() ? 'dark' : 'light'
    }

    return new Theme(mode, resolvedMode)
  }

  isDarkResolved(): boolean {
    return this.resolvedMode === 'dark'
  }

  isLightResolved(): boolean {
    return this.resolvedMode === 'light'
  }

  shouldApplyDarkClass(): boolean {
    return this.isDarkResolved()
  }
}
