import type { BlogPost } from "@/core/entities/BlogPost"
import type { BlogRepository } from "../ports/BlogRepository"

export class GetAllBlogPosts {
  constructor(private blogRepository: BlogRepository) {}

  async execute(): Promise<BlogPost[]> {
    return this.blogRepository.getAll()
  }
}
