export class BlogPost {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly excerpt: string,
    public readonly content: string,
    public readonly publishedAt: string,
    public readonly tags: string[],
    public readonly readingTime: number,
  ) {}

  static create(props: {
    id: string
    title: string
    excerpt: string
    content: string
    publishedAt: string
    tags: string[]
    readingTime: number
  }): BlogPost {
    return new BlogPost(
      props.id,
      props.title,
      props.excerpt,
      props.content,
      props.publishedAt,
      props.tags,
      props.readingTime,
    )
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      excerpt: this.excerpt,
      content: this.content,
      publishedAt: this.publishedAt,
      tags: this.tags,
      readingTime: this.readingTime,
    }
  }
}
