import { analyticsConfig } from "@/infra/config/site-config"
import Script from "next/script"

export function GoogleAnalytics() {
  if (!analyticsConfig.googleAnalyticsId) {
    return null
  }

  const measurementId = analyticsConfig.googleAnalyticsId

  return (
    <>
      <Script
        id="google-analytics"
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics-inline" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}');
        `}
      </Script>
    </>
  )
}

