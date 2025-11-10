import type { MetadataRoute } from "next"
import { siteConfig } from "@/infra/config/site-config"
import { locales } from "@/infra/adapters/i18n/config"

const staticRoutes = ["", "/projects", "/blog", "/contact"]

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  const entries: MetadataRoute.Sitemap = []

  locales.forEach((locale) => {
    const localeBase = siteConfig.localeDomainMap?.[locale] || siteConfig.siteUrl
    staticRoutes.forEach((path) => {
      const normalizedPath = path === "" ? "" : path
      entries.push({
        url: `${localeBase}/${locale}${normalizedPath}`,
        lastModified,
        changeFrequency: path === "/blog" || path === "/projects" ? "weekly" : "monthly",
        priority: path === "" ? 1 : path === "/projects" ? 0.8 : path === "/blog" ? 0.7 : 0.6,
      })
    })
  })

  return entries
}
