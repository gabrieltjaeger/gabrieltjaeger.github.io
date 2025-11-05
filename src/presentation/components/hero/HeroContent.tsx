"use client"

import { Button } from "@/components/ui/button"
import { Link } from "@/infra/adapters/i18n/routing"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { useTranslations } from "next-intl"
import { SocialLinks } from "./SocialLinks"
import { TaglineCarousel } from "./TaglineCarousel"

interface HeroContentProps {
  name: string
  title: string
  taglines: string[]
  email: string
  github: string | null
  linkedin: string | null
  twitter: string | null
}

export function HeroContent({
  name,
  title,
  taglines,
  email,
  github,
  linkedin,
  twitter,
}: HeroContentProps) {
  const t = useTranslations("Hero")

  return (
    <motion.div className="relative mx-auto max-w-4xl space-y-8 z-10">
      <p className="animate-fade-in text-sm font-bold tracking-wide uppercase text-accent drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
        {t("intro")}
      </p>

      <h1 className="animate-slide-up text-balance text-6xl font-black tracking-tight text-foreground sm:text-7xl lg:text-8xl drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
        {name}
      </h1>

      <p className="animate-slide-up text-balance text-3xl font-semibold text-muted-foreground drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)] sm:text-4xl lg:text-5xl" style={{ animationDelay: "0.1s" }}>
        {title}
      </p>

      <motion.div style={{ animationDelay: "0.2s" }}>
        <TaglineCarousel taglines={taglines} />
      </motion.div>

      <div className="flex flex-wrap items-center gap-6 pt-6 animate-slide-up" style={{ animationDelay: "0.3s" }}>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            asChild
            size="lg"
            className="group relative overflow-hidden !rounded-full !border-primary/40 !text-primary-foreground !bg-primary hover:!bg-primary/90"
            style={{
              backdropFilter: "blur(20px) saturate(150%)",
              boxShadow:
                "0 4px 20px 0 color-mix(in srgb, var(--primary) 30%, transparent), 0 2px 8px 0 rgba(0, 0, 0, 0.15), inset 0 2px 3px 0 rgba(255, 255, 255, 0.15), inset 0 -2px 3px 0 rgba(0, 0, 0, 0.15)",
            }}
          >
            <Link href="/projects" className="flex items-center gap-2 !text-primary-foreground">
              <div
                className="absolute top-0 left-0 right-0 h-[55%] pointer-events-none z-[1] rounded-full"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0.15) 50%, transparent 100%)",
                  filter: "blur(0.5px)",
                }}
              />
              <div
                className="absolute inset-0 pointer-events-none opacity-40 z-[2] rounded-full"
                style={{
                  background: `
                    radial-gradient(circle at 35% 30%, rgba(255, 255, 255, 0.15) 0%, transparent 30%),
                    radial-gradient(circle at 70% 75%, rgba(0, 0, 0, 0.08) 0%, transparent 25%)
                  `,
                }}
              />
              <span className="relative z-10">View My Work</span>
              <ArrowRight className="h-4 w-4 relative z-10 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </motion.div>

        <SocialLinks email={email} github={github} linkedin={linkedin} twitter={twitter} />
      </div>
    </motion.div>
  )
}
