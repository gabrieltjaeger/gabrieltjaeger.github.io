import type { ThemeRepository } from '../ports/ThemeRepository'
import type { ThemeMode } from '../value-objects/ThemeMode'

/**
 * SetTheme Use Case
 * Sets the theme mode preference
 */
export class SetTheme {
  constructor(private readonly themeRepository: ThemeRepository) {}

  execute(mode: ThemeMode): void {
    this.themeRepository.setThemeMode(mode)
  }
}
