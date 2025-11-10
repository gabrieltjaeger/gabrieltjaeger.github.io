import { createPortfolioServices } from "@/application/portfolioServices"
import { About } from "@/components/About"
import { Achievements } from "@/components/Achievements"
import { ActivityHeatmap } from "@/components/ActivityHeatmap"
import { Experience } from "@/components/Experience"
import { SectionDivider } from "@/components/SectionDivider"
import Hero from "@/components/sections/Hero"
import { Skills } from "@/components/Skills"
import { StatsDashboard } from "@/components/StatsDashboard"
import { Testimonials } from "@/components/Testimonials"
import { locales, type Locale } from "@/infra/adapters/i18n/config"
import { getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"

interface HomePageProps {
  params: Promise<{ locale: string }>
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale: rawLocale } = await params
  const locale = rawLocale as Locale

  if (!locales.includes(locale)) {
    notFound()
  }

  const services = createPortfolioServices(locale)

  const [profile, skills, experiences, testimonials, profileContent, heroTranslations, aboutTranslations, commonTranslations] =
    await Promise.all([
      services.profile.getProfile(),
      services.skills.getAll(),
      services.experiences.getAll(),
      services.testimonials.getAll(),
      services.profile.loadContent(),
      getTranslations({ locale, namespace: "home" }),
      getTranslations({ locale, namespace: "about" }),
      getTranslations({ locale, namespace: "Common" }),
    ])

  const profileJson = profile.toJSON()
  const skillsJson = skills.map((s) => s.toJSON())
  const experiencesJson = experiences.map((e) => e.toJSON())
  const testimonialsJson = testimonials.map((t) => t.toJSON())

  console.log(heroTranslations('hero.title'))

  return (
    <>
      <Hero
        title={heroTranslations("hero.title")}
        role={heroTranslations("hero.role")}
        kicker={heroTranslations("hero.kicker")}
        ctaLabel={heroTranslations("hero.ctaLabel")}
        ctaHref={heroTranslations("hero.ctaHref")}
        secondaryLinks={[
          profileJson.github
            ? { label: commonTranslations("github"), href: profileJson.github }
            : null,
          profileJson.linkedin
            ? { label: commonTranslations("linkedin"), href: profileJson.linkedin }
            : null,
          profileJson.email
            ? { label: commonTranslations("email"), href: `mailto:${profileJson.email}` }
            : null,
        ].filter((link): link is { label: string; href: string } => Boolean(link))}
      />
      <SectionDivider from="#05080A" to="var(--background)" />
      <StatsDashboard />
      <SectionDivider from="var(--background)" to="var(--surface-section)" flip />
      <About
        story={profileContent.about.story}
        interests={profileContent.about.interests}
        currently={profileContent.about.currently}
        translations={aboutTranslations}
      />
      <SectionDivider from="var(--surface-section-deep)" to="var(--background)"/>
      <Skills skills={skillsJson} />
      <SectionDivider from="var(--surface-section-deep)" to="var(--background)" />
      <Achievements />
      <SectionDivider from="var(--surface-section-deep)" to="var(--background)" />
      <Experience experiences={experiencesJson} />
      <SectionDivider from="var(--surface-section-deep)" to="var(--background)" />
      <ActivityHeatmap />
      <Testimonials testimonials={testimonialsJson} />
    </>
  )
}
