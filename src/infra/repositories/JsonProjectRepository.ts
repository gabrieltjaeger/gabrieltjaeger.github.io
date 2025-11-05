import { Project } from "@/core/entities/Project"
import type { ProjectRepository } from "@/core/ports/ProjectRepository"
import type { Locale } from "@/infra/adapters/i18n/config"

async function loadProjects(locale: Locale) {
  switch (locale) {
    case "pt":
      return (await import("@/content/pt/projects.json")).default
    case "en":
      return (await import("@/content/en/projects.json")).default
    default:
      return (await import("@/content/en/projects.json")).default
  }
}

export class JsonProjectRepository implements ProjectRepository {
  constructor(private readonly locale: Locale) {}

  private async getProjects(): Promise<Project[]> {
    const projectsData = await loadProjects(this.locale)
    return projectsData.projects.map((project) => Project.create(project))
  }

  async findAll(): Promise<Project[]> {
    return this.getProjects()
  }

  async findFeatured(): Promise<Project[]> {
    const projects = await this.getProjects()
    return projects.filter((project) => project.featured)
  }

  async findById(id: string): Promise<Project | null> {
    const projects = await this.getProjects()
    return projects.find((project) => project.id.value === id) ?? null
  }
}
