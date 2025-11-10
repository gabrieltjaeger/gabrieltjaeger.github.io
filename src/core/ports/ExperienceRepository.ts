import type { WorkExperience } from "@/core/entities/WorkExperience"

export interface ExperienceRepository {
  getAll(): Promise<WorkExperience[]>
}
