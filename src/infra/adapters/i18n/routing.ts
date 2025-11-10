import { createNavigation } from "next-intl/navigation"
import { defaultLocale, localePrefix, locales } from "./config"

export const { Link, redirect, usePathname, useRouter } = createNavigation({
  locales: locales as unknown as string[],
  defaultLocale,
  localePrefix,
})
