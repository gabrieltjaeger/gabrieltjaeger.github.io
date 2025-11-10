/**
 * YearMonth Value Object
 * Ensures YYYY-MM formatting and provides helpers for comparisons.
 */
export class YearMonth {
  private static readonly YEAR_MONTH_REGEX = /^\d{4}-(0[1-9]|1[0-2])$/
  private readonly value: string

  private constructor(value: string) {
    this.value = value
  }

  static create(value: string): YearMonth {
    if (!this.YEAR_MONTH_REGEX.test(value)) {
      throw new Error(`YearMonth must follow YYYY-MM format, got "${value}"`)
    }

    return new YearMonth(value)
  }

  static fromDate(date: Date): YearMonth {
    const year = date.getUTCFullYear()
    const month = String(date.getUTCMonth() + 1).padStart(2, "0")
    return new YearMonth(`${year}-${month}`)
  }

  toString(): string {
    return this.value
  }

  toJSON(): string {
    return this.toString()
  }

  equals(other: YearMonth | null): boolean {
    if (!other) return false
    return this.value === other.value
  }

  toDate(): Date {
    const [year, month] = this.value.split("-").map(Number)
    return new Date(Date.UTC(year, month - 1))
  }
}
