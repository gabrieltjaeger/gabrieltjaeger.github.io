import { GoogleAnalytics } from "@/components/GoogleAnalytics"
import { ThemeDebug } from "@/components/ThemeDebug"
import { ThemeManagerProvider } from "@/components/ThemeManagerProvider"
import { defaultLocale, locales, type Locale } from "@/infra/adapters/i18n/config"
import { buildMetadata } from "@/lib/seo/metadata"
import { Analytics } from "@vercel/analytics/next"
import { body as bodyFont, heading, mono } from "@/lib/theme/fonts"
import { cookies } from "next/headers"
import Script from "next/script"
import type React from "react"
import "./globals.css"

export const metadata = buildMetadata()

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const store = await cookies()
  const cookieLocale = store.get("NEXT_LOCALE")?.value as Locale | undefined
  const lang = cookieLocale && locales.includes(cookieLocale) ? cookieLocale : defaultLocale

  return (
    <html
      lang={lang}
      suppressHydrationWarning
      className={`${heading.variable} ${bodyFont.variable} ${mono.variable}`}
    >
      <head>
        <Script id="theme-preload" strategy="beforeInteractive">
          {`
            (function() {
              try {
                const theme = localStorage.getItem('theme');
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                let isDark = false;

                if (theme === 'dark') {
                  isDark = true;
                } else if (theme === 'light') {
                  isDark = false;
                } else {
                  isDark = prefersDark;
                }

                if (isDark) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (error) {
                console.warn('Failed to preload theme preference', error);
              }
            })();
          `}
        </Script>
      </head>
      <body className="bg-background text-foreground antialiased font-[var(--font-body)]">
        <ThemeManagerProvider>
          {children}
          {process.env.NEXT_PUBLIC_DEBUG_MODE === "true" ? <ThemeDebug /> : null}
        </ThemeManagerProvider>
        <Analytics />
        <GoogleAnalytics />
      </body>
    </html>
  )
}
