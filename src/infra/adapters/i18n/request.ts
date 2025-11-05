import { getRequestConfig } from "next-intl/server"
import { defaultLocale, locales, type Locale } from "./config"

const messagesLoaders: Record<Locale, () => Promise<Record<string, unknown>>> = {
  en: () => import("./content/messages/en.json").then((mod) => mod.default as Record<string, unknown>),
  pt: () => import("./content/messages/pt.json").then((mod) => mod.default as Record<string, unknown>),
}

export default getRequestConfig(async ({ locale }) => {
  const normalizedLocale = (locales.includes(locale as Locale) ? locale : defaultLocale) as Locale
  const messages = await messagesLoaders[normalizedLocale]()

  return {
    locale: normalizedLocale,
    defaultLocale,
    messages,
  }
})
