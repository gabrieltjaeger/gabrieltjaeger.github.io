"use client"

import { ExternalLink } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"

interface ExperienceItem {
  id: string
  company: string
  role: string
  startDate: string
  endDate: string | null
  description: string
  achievements: string[]
  technologies: string[]
  companyUrl: string | null
}

interface ExperienceHeaderProps {
  experience: ExperienceItem
}

export function ExperienceHeader({ experience }: ExperienceHeaderProps) {
  const locale = useLocale()
  const common = useTranslations("Common")

  const dateFormatter = new Intl.DateTimeFormat(locale, {
    month: "short",
    year: "numeric",
  })

  return (
    <div>
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-xl font-bold text-foreground">{experience.role}</h3>
            {experience.companyUrl && (
              <a
                href={experience.companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-accent hover:text-accent/80 transition-colors"
              >
                {experience.company}
                <ExternalLink className="h-3 w-3" />
              </a>
            )}
            {!experience.companyUrl && (
              <span className="text-sm text-accent">{experience.company}</span>
            )}
          </div>
          <p className="text-sm text-muted-foreground mt-2">{experience.description}</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-foreground">
            {dateFormatter.format(new Date(experience.startDate))} -{" "}
            {experience.endDate ? dateFormatter.format(new Date(experience.endDate)) : common("present")}
          </p>
        </div>
      </div>
    </div>
  )
}
