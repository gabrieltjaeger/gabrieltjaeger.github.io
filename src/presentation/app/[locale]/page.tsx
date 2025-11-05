import { About } from "@/components/About"
import { Achievements } from "@/components/Achievements"
import { ActivityHeatmap } from "@/components/ActivityHeatmap"
import { Experience } from "@/components/Experience"
import { Hero } from "@/components/Hero"
import { Skills } from "@/components/Skills"
import { StatsDashboard } from "@/components/StatsDashboard"
import { Testimonials } from "@/components/Testimonials"
import { createPortfolioServices } from "@/application/portfolioServices"
import { locales, type Locale } from "@/infra/adapters/i18n/config"
import { notFound } from "next/navigation"

interface HomePageProps {
  params: { locale: string }
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale: rawLocale } = params
  const locale = rawLocale as Locale

  if (!locales.includes(locale)) {
    notFound()
  }

  const services = createPortfolioServices(locale)

  const [profile, skills, experiences, testimonials, profileContent] = await Promise.all([
    services.profile.getProfile(),
    services.skills.getAll(),
    services.experiences.getAll(),
    services.testimonials.getAll(),
    services.profile.loadContent(),
  ])

  const profileJson = profile.toJSON()
  const skillsJson = skills.map((s) => s.toJSON())
  const experiencesJson = experiences.map((e) => e.toJSON())
  const testimonialsJson = testimonials.map((t) => t.toJSON())

  return (
    <>
      <Hero
        name={profileJson.name}
        title={profileJson.title}
        taglines={profileJson.taglines}
        email={profileJson.email}
        github={profileJson.github}
        linkedin={profileJson.linkedin}
        twitter={profileJson.twitter}
      />
      <StatsDashboard />
      <About
        story={profileContent.about.story}
        interests={profileContent.about.interests}
        currently={profileContent.about.currently}
      />
      <Skills skills={skillsJson} />
      <Achievements />
      <Experience experiences={experiencesJson} />
      <ActivityHeatmap />
      <Testimonials testimonials={testimonialsJson} />
    </>
  )
}
