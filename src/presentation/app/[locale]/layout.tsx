import { Footer } from "@/components/Footer"
import { Navigation } from "@/components/Navigation"
import { SeoStructuredData } from "@/components/SeoStructuredData"
import { defaultLocale, locales, type Locale } from "@/infra/adapters/i18n/config"
import { buildMetadata } from "@/lib/seo/metadata"
import type { Metadata } from "next"
import { NextIntlClientProvider } from "next-intl"
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server"
import { notFound } from "next/navigation"
import type { ReactNode } from "react"
import { Suspense } from "react"

interface LocaleLayoutProps {
  children: ReactNode
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params
  const locale = (rawLocale ?? defaultLocale) as Locale
  if (!locales.includes(locale)) {
    return buildMetadata({
      title: "Portfolio",
      description: "Personal portfolio website",
    })
  }

  const t = await getTranslations({ locale, namespace: "Metadata" })

  return buildMetadata({
    locale,
    title: t("title"),
    description: t("description"),
    path: "",
  })
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale: rawLocale } = await params
  const locale = (rawLocale ?? defaultLocale) as Locale

  if (!locales.includes(locale)) {
    notFound()
  }

  setRequestLocale(locale)

  const [messages, commonTranslations] = await Promise.all([
    getMessages(),
    getTranslations({ locale, namespace: "Common" }),
  ])

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Suspense fallback={<div>{commonTranslations("loading")}</div>}>
        <Navigation />
        <main className="min-h-screen bg-gradient-moss-navy">
          {children}
        </main>
        <Footer />
        <SeoStructuredData locale={locale} />
      </Suspense>
    </NextIntlClientProvider>
  )
}
