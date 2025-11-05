import { Theme } from '../entities/Theme'
import { ThemeMode } from '../value-objects/ThemeMode'
import type { ThemeRepository } from '../ports/ThemeRepository'

/**
 * GetTheme Use Case
 * Retrieves the current theme state
 */
export class GetTheme {
  constructor(private readonly themeRepository: ThemeRepository) {}

  execute(): Theme {
    const mode = this.themeRepository.getThemeMode()
    const systemPrefersDark = this.themeRepository.getSystemPrefersDark()

    if (!mode) {
      // Default to system if no preference is set
      return Theme.create(ThemeMode.system(), systemPrefersDark)
    }

    return Theme.create(mode, systemPrefersDark)
  }
}
