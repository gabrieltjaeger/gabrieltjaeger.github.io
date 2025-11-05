import type { BlogPost } from "@/core/entities/BlogPost"
import type { BlogRepository } from "../ports/BlogRepository"

export class GetBlogPostById {
  constructor(private blogRepository: BlogRepository) {}

  async execute(id: string): Promise<BlogPost | null> {
    return this.blogRepository.getById(id)
  }
}
