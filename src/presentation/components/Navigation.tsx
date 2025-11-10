"use client"

import { LanguageSwitcher } from "@/components/LanguageSwitcher"
import { useTheme } from "@/components/ThemeManagerProvider"
import { Button } from "@/components/ui/button"
import { Link, usePathname } from "@/infra/adapters/i18n/routing"
import { cn } from "@/lib/utils"
import { Monitor, Moon, Sun } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"
import { useMemo } from "react"

interface NavItem {
  href: string
  label: string
}

export function Navigation() {
  const pathname = usePathname()
  const { theme, toggleTheme, mounted } = useTheme()
  const t = useTranslations("Navigation")
  const common = useTranslations("Common")
  const locale = useLocale()

  const navItems = useMemo<NavItem[]>(
    () => [
      { href: "/", label: t("home") },
      { href: "/projects", label: t("projects") },
      { href: "/blog", label: t("blog") },
      { href: "/contact", label: t("contact") },
    ],
    [t],
  )

  // Get the appropriate icon based on current theme mode
  const getThemeIcon = () => {
    if (!theme) return <Monitor className="h-4 w-4" />
    
    if (theme.mode.isLight()) return <Sun className="h-4 w-4" />
    if (theme.mode.isDark()) return <Moon className="h-4 w-4" />
    return <Monitor className="h-4 w-4" />
  }

  const getThemeLabel = () => {
    if (!theme) return "system"
    return theme.mode.toString()
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-bold tracking-tight transition-colors hover:text-primary">
          {t("brand")}
        </Link>
        <div className="flex items-center gap-6">
          <ul className="flex items-center gap-6">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  locale={locale}
                  className={cn(
                    "relative text-sm font-medium transition-colors hover:text-primary",
                    pathname === item.href ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {item.label}
                  {pathname === item.href && (
                    <span className="absolute -bottom-[17px] left-0 h-[2px] w-full bg-primary" />
                  )}
                </Link>
              </li>
            ))}
          </ul>
          <LanguageSwitcher />
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="h-9 w-9"
              aria-label={common("themeToggle")}
              title={`Theme: ${getThemeLabel()}`}
              data-testid="theme-toggle"
            >
              {getThemeIcon()}
            </Button>
          )}
        </div>
      </div>
    </nav>
  )
}
