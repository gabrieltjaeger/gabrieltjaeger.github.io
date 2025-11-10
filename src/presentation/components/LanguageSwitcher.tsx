"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { locales, type Locale } from "@/infra/adapters/i18n/config"
import { usePathname, useRouter } from "@/infra/adapters/i18n/routing"
import { useLocale, useTranslations } from "next-intl"
import { useMemo, useTransition } from "react"

export function LanguageSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  const currentLocale = useLocale() as Locale
  const t = useTranslations("Common")
  const [isPending, startTransition] = useTransition()

  const sanitizedPathname = useMemo(() => {
    const localePattern = new RegExp(`^/(?:${locales.join("|")})(?=/|$)`, "i")
    let nextPath = pathname || "/"

    // Strip any leading locale prefixes so reapplying the new locale doesn't duplicate segments.
    while (localePattern.test(nextPath)) {
      nextPath = nextPath.replace(localePattern, "") || "/"
    }

    return nextPath.startsWith("/") ? nextPath : `/${nextPath}`
  }, [pathname])

  const handleChange = (value: string) => {
    const nextLocale = value as Locale
    if (nextLocale === currentLocale) {
      return
    }

    startTransition(() => {
      router.replace(sanitizedPathname, { locale: nextLocale })
    })
  }

  const getLanguageLabel = (locale: Locale) => {
    return locale === "en" ? t("english") : t("portuguese")
  }

  return (
    <Select onValueChange={handleChange} value={currentLocale} disabled={isPending}>
      <SelectTrigger className="w-[130px]" aria-label={t("language")}>
        <SelectValue>{getLanguageLabel(currentLocale)}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        {locales.map((locale) => (
          <SelectItem key={locale} value={locale}>
            {getLanguageLabel(locale as Locale)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
