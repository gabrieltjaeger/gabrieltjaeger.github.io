import { defaultLocale, localePrefix, locales } from "../infra/adapters/i18n/config"

export default {
  defaultLocale,
  locales,
  localePrefix,
  requestConfig: {
    request: "../infra/adapters/i18n/request",
  },
}
