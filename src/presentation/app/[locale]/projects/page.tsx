import { createPortfolioServices } from "@/application/portfolioServices"
import { ProjectCardDetailed } from "@/components/ProjectCardDetailed"
import { locales, type Locale } from "@/infra/adapters/i18n/config"
import { buildMetadata } from "@/lib/seo/metadata"
import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"

interface ProjectsPageProps {
  params: { locale: string }
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale as Locale
  if (!locales.includes(locale)) {
    return buildMetadata({
      title: "Projects",
      description: "Featured and recent projects",
      path: "/projects",
    })
  }

  const t = await getTranslations({ locale, namespace: "Projects" })

  return buildMetadata({
    locale,
    title: t("title"),
    description: t("description"),
    path: "/projects",
    keywords: t("keywords", { defaultValue: "" })
      .split(",")
      .map((keyword) => keyword.trim())
      .filter(Boolean),
  })
}

export default async function ProjectsPage({ params }: ProjectsPageProps) {
  const { locale: rawLocale } = params
  const locale = rawLocale as Locale

  if (!locales.includes(locale)) {
    notFound()
  }

  const t = await getTranslations({ locale, namespace: "Projects" })

  const services = createPortfolioServices(locale)
  const [projects, projectsContent] = await Promise.all([
    services.projects.getAll(),
    services.projects.loadContent(),
  ])

  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <div className="mb-16 space-y-4">
        <p className="text-sm font-medium tracking-wide text-accent">{t("sectionLabel")}</p>
        <h1 className="text-balance text-5xl font-bold tracking-tight sm:text-6xl">{t("title")}</h1>
        <p className="max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">{t("description")}</p>
      </div>

      <div className="space-y-12">
        {projects.map((project) => {
          const projectData = project.toJSON()
          const fullProjectData = projectsContent.projects.find((p) => p.id === projectData.id)

          return (
            <ProjectCardDetailed
              key={projectData.id}
              title={projectData.title}
              description={projectData.description}
              longDescription={fullProjectData?.longDescription}
              challenge={fullProjectData?.challenge}
              solution={fullProjectData?.solution}
              results={fullProjectData?.results}
              technologies={projectData.technologies}
              githubUrl={projectData.githubUrl}
              liveUrl={projectData.liveUrl}
              imageUrl={fullProjectData?.imageUrl}
            />
          )
        })}
      </div>
    </div>
  )
}
