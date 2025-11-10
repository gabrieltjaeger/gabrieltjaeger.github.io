import { locales, type Locale } from "@/infra/adapters/i18n/config"

export interface SocialLinks {
  github?: string
  linkedin?: string
  twitter?: string
  youtube?: string
  instagram?: string
}

export interface SiteConfig {
  name: string
  title: string
  description: string
  siteUrl: string
  defaultOgImage: string
  keywords: string[]
  contactEmail: string
  social: SocialLinks
  localeDomainMap?: Record<Locale, string>
}

const fallbackUrl = "https://gabrieltjaeger.github.io"
const fallbackImage = `${fallbackUrl}/placeholder.jpg`

export const siteConfig: SiteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || "Gabriel Trugillo Jaeger",
  title: process.env.NEXT_PUBLIC_SITE_TITLE || "Gabriel Jaeger | Architect of Systems",
  description:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
    "Full-Stack Developer & Network Security Researcher — production software, distributed systems, and security across the stack.",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || fallbackUrl,
  defaultOgImage: process.env.NEXT_PUBLIC_OG_IMAGE || fallbackImage,
  keywords: (process.env.NEXT_PUBLIC_SITE_KEYWORDS || "")
    .split(",")
    .map((keyword) => keyword.trim())
    .filter(Boolean),
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@gabrieltjaeger.dev",
  social: {
    github: process.env.NEXT_PUBLIC_SOCIAL_GITHUB,
    linkedin: process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN,
    twitter: process.env.NEXT_PUBLIC_SOCIAL_TWITTER,
    youtube: process.env.NEXT_PUBLIC_SOCIAL_YOUTUBE,
    instagram: process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM,
  },
  localeDomainMap: locales.reduce<Record<Locale, string>>((acc, locale) => {
    const envKey = `NEXT_PUBLIC_SITE_URL_${locale.toUpperCase()}`
    const localeUrl = process.env[envKey]
    if (localeUrl) {
      acc[locale] = localeUrl
    }
    return acc
  }, {}),
}

export const analyticsConfig = {
  googleAnalyticsId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || null,
}
