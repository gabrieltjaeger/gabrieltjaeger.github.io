import type { MetadataRoute } from "next"
import { siteConfig } from "@/infra/config/site-config"

export default function robots(): MetadataRoute.Robots {
  const policies: MetadataRoute.Robots["rules"] = [
    {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/_next/", "/static/"],
    },
  ]

  return {
    rules: policies,
    sitemap: `${siteConfig.siteUrl}/sitemap.xml`,
  }
}

