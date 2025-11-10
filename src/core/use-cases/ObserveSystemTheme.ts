import type { ThemeRepository } from '../ports/ThemeRepository'

/**
 * ObserveSystemTheme Use Case
 * Subscribes to system theme preference changes
 */
export class ObserveSystemTheme {
  constructor(private readonly themeRepository: ThemeRepository) {}

  execute(callback: (prefersDark: boolean) => void): () => void {
    return this.themeRepository.observeSystemPreferenceChanges(callback)
  }
}
