import { createPortfolioServices } from "@/application/portfolioServices"
import { locales, type Locale } from "@/infra/adapters/i18n/config"
import { Link } from "@/infra/adapters/i18n/routing"
import { buildMetadata } from "@/lib/seo/metadata"
import type { Metadata } from "next"
import { ArrowLeft, Clock } from "lucide-react"
import { getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"

interface BlogPostPageProps {
  params: { locale: string; id: string }
}

export async function generateStaticParams() {
  const params: { locale: string; id: string }[] = []

  for (const locale of locales) {
    const services = createPortfolioServices(locale as Locale)
    const posts = await services.blog.getAll()
    posts.forEach((post) => {
      params.push({ locale, id: post.toJSON().id })
    })
  }

  return params
}

export async function generateMetadata({ params }: { params: { locale: string; id: string } }): Promise<Metadata> {
  const locale = params.locale as Locale
  if (!locales.includes(locale)) {
    return buildMetadata({
      title: "Blog",
      description: "Article",
      path: `/blog/${params.id}`,
    })
  }

  const services = createPortfolioServices(locale)
  const post = await services.blog.getById(params.id)

  if (!post) {
    return buildMetadata({
      locale,
      title: "Post not found",
      description: "The requested article is not available.",
      path: `/blog/${params.id}`,
      robots: {
        index: false,
        follow: false,
      },
    })
  }

  const postData = post.toJSON()

  return buildMetadata({
    locale,
    title: postData.title,
    description: postData.excerpt,
    path: `/blog/${postData.id}`,
    keywords: postData.tags,
  })
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const locale = params.locale as Locale

  if (!locales.includes(locale)) {
    notFound()
  }

  const [blogTranslations, commonTranslations] = await Promise.all([
    getTranslations({ locale, namespace: "Blog" }),
    getTranslations({ locale, namespace: "Common" }),
  ])

  const services = createPortfolioServices(locale)
  const post = await services.blog.getById(params.id)

  if (!post) {
    notFound()
  }

  const postData = post.toJSON()

  const dateFormatter = new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors mb-8">
        <ArrowLeft className="w-4 h-4" />
        {blogTranslations("back")}
      </Link>

      <article className="prose prose-invert prose-lg max-w-none">
        <div className="mb-8">
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
            <time dateTime={postData.publishedAt}>{dateFormatter.format(new Date(postData.publishedAt))}</time>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {commonTranslations("minRead", { count: postData.readingTime })}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{postData.title}</h1>

          <div className="flex flex-wrap gap-2">
            {postData.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 text-xs font-medium bg-accent/10 text-accent rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="text-muted-foreground leading-relaxed whitespace-pre-line">{postData.content}</div>
      </article>
    </div>
  )
}
