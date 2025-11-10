import { createPortfolioServices } from "@/application/portfolioServices"
import { BlogCard } from "@/components/BlogCard"
import { locales, type Locale } from "@/infra/adapters/i18n/config"
import { buildMetadata } from "@/lib/seo/metadata"
import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"

interface BlogPageProps {
  params: { locale: string }
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale as Locale
  if (!locales.includes(locale)) {
    return buildMetadata({
      title: "Blog",
      description: "Articles and notes",
      path: "/blog",
    })
  }

  const t = await getTranslations({ locale, namespace: "Blog" })

  const keywords = t("keywords", { defaultValue: "" })
    .split(",")
    .map((keyword) => keyword.trim())
    .filter(Boolean)

  return buildMetadata({
    locale,
    title: t("title"),
    description: t("description"),
    path: "/blog",
    keywords,
  })
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { locale: rawLocale } = params
  const locale = rawLocale as Locale

  if (!locales.includes(locale)) {
    notFound()
  }

  const t = await getTranslations({ locale, namespace: "Blog" })

  const services = createPortfolioServices(locale)
  const posts = await services.blog.getAll()

  return (
    <div className="mx-auto max-w-4xl px-6 py-20">
      <div className="mb-16 space-y-4">
        <p className="text-sm font-medium tracking-wide text-accent">{t("intro")}</p>
        <h1 className="text-balance text-5xl font-bold tracking-tight sm:text-6xl">{t("title")}</h1>
        <p className="max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">{t("description")}</p>
      </div>

      <div className="space-y-8">
        {posts.map((post) => {
          const postData = post.toJSON()
          return (
            <BlogCard
              key={postData.id}
              id={postData.id}
              title={postData.title}
              excerpt={postData.excerpt}
              publishedAt={postData.publishedAt}
              tags={postData.tags}
              readingTime={postData.readingTime}
            />
          )
        })}
      </div>
    </div>
  )
}
