import createMiddleware from "next-intl/middleware"
import { defaultLocale, localePrefix, locales } from "../infra/adapters/i18n/config"

export default createMiddleware({
  locales: locales as unknown as string[],
  defaultLocale,
  localePrefix,
  localeDetection: true,
})

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
}
