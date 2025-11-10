"use client"

import { useTranslations } from "next-intl"

export function Footer() {
  const currentYear = new Date().getFullYear()
  const t = useTranslations("Footer")

  return (
    <footer className="border-t border-border/40 bg-card/30 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-muted-foreground">{t("copyright", { year: currentYear })}</p>
          <p className="text-sm text-muted-foreground">
            {t.rich("builtWith", {
              Highlight: (chunks) => <span className="text-primary">{chunks}</span>,
            })}
          </p>
        </div>
      </div>
    </footer>
  )
}
