import type { Skill } from "@/core/entities/Skill"

export interface SkillRepository {
  getAll(): Promise<Skill[]>
}
