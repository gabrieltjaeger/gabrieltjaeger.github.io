import { BlogPost } from "@/core/entities/BlogPost"
import type { BlogRepository } from "@/core/ports/BlogRepository"
import type { Locale } from "@/infra/adapters/i18n/config"

async function loadBlog(locale: Locale) {
  switch (locale) {
    case "pt":
      return (await import("@/content/pt/blog.json")).default
    case "en":
      return (await import("@/content/en/blog.json")).default
    default:
      return (await import("@/content/en/blog.json")).default
  }
}

export class JsonBlogRepository implements BlogRepository {
  constructor(private readonly locale: Locale) {}

  private async getData() {
    return loadBlog(this.locale)
  }

  async getAll(): Promise<BlogPost[]> {
    const blogData = await this.getData()

    return blogData.posts.map((post) =>
      BlogPost.create({
        id: post.id,
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        publishedAt: post.publishedAt,
        tags: post.tags,
        readingTime: post.readingTime,
      }),
    )
  }

  async getById(id: string): Promise<BlogPost | null> {
    const blogData = await this.getData()
    const post = blogData.posts.find((p) => p.id === id)
    if (!post) return null

    return BlogPost.create({
      id: post.id,
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      publishedAt: post.publishedAt,
      tags: post.tags,
      readingTime: post.readingTime,
    })
  }
}
