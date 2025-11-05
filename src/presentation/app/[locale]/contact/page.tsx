import { createPortfolioServices } from "@/application/portfolioServices"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { locales, type Locale } from "@/infra/adapters/i18n/config"
import { buildMetadata } from "@/lib/seo/metadata"
import type { Metadata } from "next"
import { Github, Linkedin, Mail, Twitter } from "lucide-react"
import { getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"

interface ContactPageProps {
  params: { locale: string }
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale as Locale
  if (!locales.includes(locale)) {
    return buildMetadata({
      title: "Contact",
      description: "Get in touch",
      path: "/contact",
    })
  }

  const contactTranslations = await getTranslations({ locale, namespace: "Contact" })

  return buildMetadata({
    locale,
    title: contactTranslations("title"),
    description: contactTranslations("description"),
    path: "/contact",
    keywords: contactTranslations("keywords", { defaultValue: "" })
      .split(",")
      .map((keyword) => keyword.trim())
      .filter(Boolean),
  })
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale: rawLocale } = params
  const locale = rawLocale as Locale

  if (!locales.includes(locale)) {
    notFound()
  }

  const [contactTranslations, commonTranslations] = await Promise.all([
    getTranslations({ locale, namespace: "Contact" }),
    getTranslations({ locale, namespace: "Common" }),
  ])

  const services = createPortfolioServices(locale)
  const profile = await services.profile.getProfile()
  const profileData = profile.toJSON()

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <div className="mb-12 text-center">
        <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">{contactTranslations("title")}</h1>
        <p className="mt-4 text-pretty text-lg text-muted-foreground">{contactTranslations("description")}</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>{contactTranslations("information")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-muted-foreground" />
            <a href={`mailto:${profileData.email}`} className="text-primary hover:underline">
              {profileData.email}
            </a>
          </div>
          {profileData.github && (
            <div className="flex items-center gap-3">
              <Github className="h-5 w-5 text-muted-foreground" />
              <a
                href={profileData.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                {commonTranslations("github")}
              </a>
            </div>
          )}
          {profileData.linkedin && (
            <div className="flex items-center gap-3">
              <Linkedin className="h-5 w-5 text-muted-foreground" />
              <a
                href={profileData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                {commonTranslations("linkedin")}
              </a>
            </div>
          )}
          {profileData.twitter && (
            <div className="flex items-center gap-3">
              <Twitter className="h-5 w-5 text-muted-foreground" />
              <a
                href={profileData.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                {commonTranslations("twitter")}
              </a>
            </div>
          )}
          <div className="pt-4">
            <Button asChild className="w-full">
              <a href={`mailto:${profileData.email}`}>{commonTranslations("sendEmail")}</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
