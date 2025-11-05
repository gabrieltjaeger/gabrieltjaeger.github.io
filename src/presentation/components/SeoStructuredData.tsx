import { siteConfig } from "@/infra/config/site-config"
import Script from "next/script"

interface SeoStructuredDataProps {
  locale: string
}

export function SeoStructuredData({ locale }: SeoStructuredDataProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: siteConfig.siteUrl,
    email: siteConfig.contactEmail,
    jobTitle: "Software Architect",
    sameAs: Object.values(siteConfig.social || {}).filter(Boolean),
    knowsLanguage: locale,
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.title,
    url: siteConfig.siteUrl,
    inLanguage: locale,
  }

  return (
    <>
      <Script id="ld-json-person" type="application/ld+json">
        {JSON.stringify(schema)}
      </Script>
      <Script id="ld-json-website" type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </Script>
    </>
  )
}

