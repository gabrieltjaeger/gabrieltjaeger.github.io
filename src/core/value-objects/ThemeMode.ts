/**
 * ThemeMode Value Object
 * Represents the theme mode setting for the application
 */
export class ThemeMode {
  private readonly value: 'light' | 'dark' | 'system'

  private constructor(value: 'light' | 'dark' | 'system') {
    this.value = value
  }

  static light(): ThemeMode {
    return new ThemeMode('light')
  }

  static dark(): ThemeMode {
    return new ThemeMode('dark')
  }

  static system(): ThemeMode {
    return new ThemeMode('system')
  }

  static fromString(value: string): ThemeMode {
    switch (value) {
      case 'light':
        return ThemeMode.light()
      case 'dark':
        return ThemeMode.dark()
      case 'system':
        return ThemeMode.system()
      default:
        return ThemeMode.system()
    }
  }

  getValue(): 'light' | 'dark' | 'system' {
    return this.value
  }

  isLight(): boolean {
    return this.value === 'light'
  }

  isDark(): boolean {
    return this.value === 'dark'
  }

  isSystem(): boolean {
    return this.value === 'system'
  }

  toString(): string {
    return this.value
  }

  equals(other: ThemeMode): boolean {
    return this.value === other.value
  }
}
