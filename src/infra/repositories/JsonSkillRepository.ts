import { Skill } from "@/core/entities/Skill"
import type { SkillRepository } from "@/core/ports/SkillRepository"
import type { Locale } from "@/infra/adapters/i18n/config"

async function loadSkills(locale: Locale) {
  switch (locale) {
    case "pt":
      return (await import("@/content/pt/skills.json")).default
    case "en":
      return (await import("@/content/en/skills.json")).default
    default:
      return (await import("@/content/en/skills.json")).default
  }
}

export class JsonSkillRepository implements SkillRepository {
  constructor(private readonly locale: Locale) {}

  async getAll(): Promise<Skill[]> {
    const skillsData = await loadSkills(this.locale)

    return skillsData.skills.map((skill) =>
      Skill.create({
        name: skill.name,
        category: skill.category,
        level: skill.level,
        yearsOfExperience: skill.yearsOfExperience,
      }),
    )
  }
}
