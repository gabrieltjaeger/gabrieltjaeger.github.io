import type { BlogPost } from "@/core/entities/BlogPost"

export interface BlogRepository {
  getAll(): Promise<BlogPost[]>
  getById(id: string): Promise<BlogPost | null>
}
