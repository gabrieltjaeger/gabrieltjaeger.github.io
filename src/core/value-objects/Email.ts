export class Email {
  constructor(public readonly value: string) {
    if (!this.isValidEmail(value)) {
      throw new Error(`Invalid email: ${value}`)
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }
}
