export class Url {
  constructor(public readonly value: string) {
    if (!this.isValidUrl(value)) {
      throw new Error(`Invalid URL: ${value}`)
    }
  }

  private isValidUrl(url: string): boolean {
    try {
      if (url.startsWith("/")) {
        // Allow root-relative paths for local assets
        new URL(url, "http://localhost")
        return true
      }

      new URL(url)
      return true
    } catch {
      return false
    }
  }
}
