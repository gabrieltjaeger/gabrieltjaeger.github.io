'use client'

import GridLayer from "@/components/brand/GridLayer"
import OrbitalNetwork from "@/components/brand/OrbitalNetwork"
import { colors, type as typeScale } from "@/lib/theme/tokens"
import Link from "next/link"

type HeroLink = {
  label: string
  href: string
}

type HeroProps = {
  title: string
  role: string
  kicker: string
  ctaLabel: string
  ctaHref: string
  secondaryLinks: HeroLink[]
}

export default function Hero({
  title,
  role,
  kicker,
  ctaLabel,
  ctaHref,
  secondaryLinks,
}: HeroProps) {
  return (
    <section
      className="relative min-h-[78vh] flex items-center py-16 md:py-24"
      style={{ color: colors.text }}
    >
      <div aria-hidden className="absolute inset-0">
        <div className="absolute inset-0 bg-[#05080A]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(77,226,248,0.18),rgba(5,8,10,0)_62%)] opacity-70" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_35%,rgba(246,185,91,0.12),rgba(5,8,10,0)_70%)] opacity-60" />
      </div>

      <GridLayer />
      <OrbitalNetwork config={{
        offsetX: 1.3,
        scale: 2,
        nodePrimaryColor: 'darkcyan',
        nodeSecondaryColor: 'darkorange',
        nodeAmberRatio: 0.5,
      }} />

      <div className="relative z-10 w-full max-w-[1100px] mx-auto px-6 md:px-10">
        <div className="max-w-[820px]">
          <p
            className="font-[var(--font-mono)] text-sm tracking-[0.12em] uppercase text-white/90 mb-3"
            style={{ color: colors.accentAmber }}
          >
            {role}
          </p>

          <h1
            className="font-[var(--font-heading)] leading-[0.95] mb-6"
            style={{
              fontSize: typeScale.display.sizeClamp,
              letterSpacing: `${typeScale.display.track}em`,
              fontWeight: typeScale.display.weight,
            }}
          >
            {title}
          </h1>

          <p className="font-[var(--font-body)] text-[18px] text-white/85 max-w-[56ch] mb-8">
            {kicker}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-sm">
            <Link
              href={ctaHref}
              className="inline-flex items-center px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/25 transition font-[var(--font-body)] text-[15px] text-white"
              style={{ fontWeight: 500 }}
            >
              {ctaLabel}
            </Link>

            <nav className="flex flex-wrap items-center gap-3 font-[var(--font-mono)] text-white/80">
              {secondaryLinks.map((link, index) => (
                <span key={link.href} className="flex items-center gap-3 text-white/80">
                  {index > 0 ? <span>·</span> : null}
                  <Link className="hover:text-white transition-colors" href={link.href}>
                    {link.label}
                  </Link>
                </span>
              ))}
            </nav>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent via-[#05080a]/70 to-[#05080a]" />
    </section>
  )
}
