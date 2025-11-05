import type { WorkExperience } from "@/core/entities/WorkExperience"
import type { ExperienceRepository } from "../ports/ExperienceRepository"

export class GetAllExperiences {
  constructor(private experienceRepository: ExperienceRepository) {}

  async execute(): Promise<WorkExperience[]> {
    return this.experienceRepository.getAll()
  }
}
