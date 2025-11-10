import { getRequestConfig } from "next-intl/server"
import { defaultLocale, locales, type Locale } from "./config"

const messagesLoaders: Record<Locale, () => Promise<Record<string, unknown>>> = {
  en: async () => {
    const [messages, home] = await Promise.all([
      import("./content/messages/en.json"),
      import("./content/en/home.json"),
    ])

    return {
      ...(messages.default as Record<string, unknown>),
      home: home.default,
    }
  },
  pt: async () => {
    const [messages, home] = await Promise.all([
      import("./content/messages/pt.json"),
      import("./content/pt/home.json"),
    ])

    return {
      ...(messages.default as Record<string, unknown>),
      home: home.default,
    }
  },
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
