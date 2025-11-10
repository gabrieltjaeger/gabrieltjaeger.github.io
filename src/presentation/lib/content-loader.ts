import type { Locale } from "@/infra/adapters/i18n/config"

export async function loadProfileContent(locale: Locale) {
  switch (locale) {
    case "pt":
      return (await import("@/content/pt/profile.json")).default
    case "en":
      return (await import("@/content/en/profile.json")).default
    default:
      return (await import("@/content/en/profile.json")).default
  }
}

export async function loadProjectsContent(locale: Locale) {
  switch (locale) {
    case "pt":
      return (await import("@/content/pt/projects.json")).default
    case "en":
      return (await import("@/content/en/projects.json")).default
    default:
      return (await import("@/content/en/projects.json")).default
  }
}
