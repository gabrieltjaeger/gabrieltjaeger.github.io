import { Profile } from "@/core/entities/Profile"
import type { ProfileRepository } from "@/core/ports/ProfileRepository"
import type { Locale } from "@/infra/adapters/i18n/config"

async function loadProfile(locale: Locale) {
  switch (locale) {
    case "pt":
      return (await import("@/content/pt/profile.json")).default
    case "en":
      return (await import("@/content/en/profile.json")).default
    default:
      return (await import("@/content/en/profile.json")).default
  }
}

export class JsonProfileRepository implements ProfileRepository {
  constructor(private readonly locale: Locale) {}

  async get(): Promise<Profile> {
  const data = await loadProfile(this.locale)
    return Profile.create(data)
  }
}
