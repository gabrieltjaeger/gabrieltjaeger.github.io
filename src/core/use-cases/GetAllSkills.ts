import type { Skill } from "@/core/entities/Skill"
import type { SkillRepository } from "../ports/SkillRepository"

export class GetAllSkills {
  constructor(private skillRepository: SkillRepository) {}

  async execute(): Promise<Skill[]> {
    return this.skillRepository.getAll()
  }
}
