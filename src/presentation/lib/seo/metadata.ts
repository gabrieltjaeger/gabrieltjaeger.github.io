import type { Metadata } from "next"
import { siteConfig } from "@/infra/config/site-config"
import { defaultLocale, locales, type Locale } from "@/infra/adapters/i18n/config"

export const siteTagline =
  "Full-Stack Developer & Network Security Researcher — production software, distributed systems, and security across the stack."

interface MetadataOptions {
  locale?: Locale
  title?: string
  description?: string
  keywords?: string[]
  image?: string
  path?: string
  robots?: Metadata["robots"]
}

function ensureAbsoluteUrl(pathOrUrl?: string): string | undefined {
  if (!pathOrUrl) return undefined
  if (pathOrUrl.startsWith("http")) return pathOrUrl
  return `${siteConfig.siteUrl}${pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`}`
}

export function buildMetadata(options: MetadataOptions = {}): Metadata {
  const locale = options.locale ?? defaultLocale
  const pageTitle = options.title || siteConfig.title
  const baseDescription = siteConfig.description || siteTagline
  const description = options.description || baseDescription
  const keywords = Array.from(new Set([...(siteConfig.keywords || []), ...(options.keywords || [])])).filter(Boolean)
  const ogImage = ensureAbsoluteUrl(options.image || siteConfig.defaultOgImage)
  const normalizedPath =
    options.path === undefined
      ? undefined
      : options.path === ""
      ? ""
      : options.path.startsWith("/")
      ? options.path
      : `/${options.path}`
  const localizedPath =
    normalizedPath === undefined ? undefined : `/${locale}${normalizedPath}`
  const canonical = ensureAbsoluteUrl(localizedPath)

  const alternates: Metadata["alternates"] = {
    canonical: canonical || siteConfig.siteUrl,
    languages: locales.reduce<Record<string, string>>((acc, currentLocale) => {
      const localeUrl = siteConfig.localeDomainMap?.[currentLocale] || siteConfig.siteUrl
      if (normalizedPath === undefined) {
        acc[currentLocale] = `${localeUrl}/${currentLocale}`
      } else {
        acc[currentLocale] = `${localeUrl}/${currentLocale}${normalizedPath}`
      }
      return acc
    }, {}),
  }

  const robots =
    options.robots ||
    ({
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    } satisfies Metadata["robots"])

  return {
    metadataBase: new URL(siteConfig.siteUrl),
    title: pageTitle,
    description,
    keywords: keywords.length > 0 ? keywords : undefined,
    alternates,
    openGraph: {
      type: "website",
      locale,
      siteName: siteConfig.name,
      title: pageTitle,
      description,
      url: canonical || siteConfig.siteUrl,
      images: ogImage
        ? [
            {
              url: ogImage,
              width: 1200,
              height: 630,
              alt: `${siteConfig.name} open graph image`,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: ogImage ? [ogImage] : undefined,
      creator: siteConfig.social.twitter ? `@${siteConfig.social.twitter.replace("@", "")}` : undefined,
    },
    robots,
    themeColor: [
      { media: "(prefers-color-scheme: light)", color: "#ffffff" },
      { media: "(prefers-color-scheme: dark)", color: "#121212" },
    ],
    authors: [{ name: siteConfig.name, url: siteConfig.siteUrl }],
    publisher: siteConfig.name,
  }
}
