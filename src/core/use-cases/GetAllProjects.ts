import type { Project } from "@/core/entities/Project"
import type { ProjectRepository } from "../ports/ProjectRepository"

export class GetAllProjects {
  constructor(private readonly projectRepository: ProjectRepository) {}

  async execute(): Promise<Project[]> {
    return await this.projectRepository.findAll()
  }
}
