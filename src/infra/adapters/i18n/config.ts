const fallbackLocales = ["en", "pt"] as const

const parsedLocales = (process.env.NEXT_PUBLIC_AVAILABLE_LOCALES ?? "")
  .split(",")
  .map((locale) => locale.trim())
  .filter((locale) => locale.length > 0)

const uniqueLocales = Array.from(new Set(parsedLocales.length > 0 ? parsedLocales : fallbackLocales))

export const locales = uniqueLocales as readonly string[]

const rawDefaultLocale = (process.env.NEXT_PUBLIC_DEFAULT_LOCALE ?? "").trim()
const resolvedDefaultLocale =
  rawDefaultLocale && uniqueLocales.includes(rawDefaultLocale)
    ? rawDefaultLocale
    : uniqueLocales[0] ?? fallbackLocales[0]

export const defaultLocale = resolvedDefaultLocale satisfies (typeof locales)[number]

export type Locale = (typeof locales)[number]

export const localePrefix = "always" as const
