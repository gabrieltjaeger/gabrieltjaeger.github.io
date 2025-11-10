import { WorkExperience } from "@/core/entities/WorkExperience"
import type { ExperienceRepository } from "@/core/ports/ExperienceRepository"
import type { Locale } from "@/infra/adapters/i18n/config"

async function loadExperiences(locale: Locale) {
  switch (locale) {
    case "pt":
      return (await import("@/content/pt/experience.json")).default
    case "en":
      return (await import("@/content/en/experience.json")).default
    default:
      return (await import("@/content/en/experience.json")).default
  }
}

export class JsonExperienceRepository implements ExperienceRepository {
  constructor(private readonly locale: Locale) {}

  async getAll(): Promise<WorkExperience[]> {
    const experienceData = await loadExperiences(this.locale)

    return experienceData.experiences.map((exp) =>
      WorkExperience.create({
        id: exp.id,
        company: exp.company,
        role: exp.role,
        startDate: exp.startDate,
        endDate: exp.endDate,
        description: exp.description,
        achievements: exp.achievements,
        technologies: exp.technologies,
        companyUrl: exp.companyUrl ?? undefined,
      }),
    )
  }
}
