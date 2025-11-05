import type { Project } from "@/core/entities/Project"

export interface ProjectRepository {
  findAll(): Promise<Project[]>
  findFeatured(): Promise<Project[]>
  findById(id: string): Promise<Project | null>
}
