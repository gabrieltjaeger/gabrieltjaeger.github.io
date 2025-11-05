"use client"

import { Briefcase, Code2, Coffee, Users, Zap } from "lucide-react"
import { useTranslations } from "next-intl"
import { StatsCounter } from "./StatsCounter"

export function StatsDashboard() {
  const t = useTranslations("Stats")

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t("title")}</h2>
          <p className="text-muted-foreground">{t("subtitle")}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <StatsCounter end={8} suffix="+" label={t("yearsExperience")} icon={<Briefcase className="h-6 w-6" />} />
          <StatsCounter end={42} suffix="+" label={t("projectsShipped")} icon={<Code2 className="h-6 w-6" />} />
          <StatsCounter end={15} suffix="+" label={t("technologies")} icon={<Zap className="h-6 w-6" />} />
          <StatsCounter end={100} suffix="K+" label={t("linesOfCode")} icon={<Code2 className="h-6 w-6" />} />
          <StatsCounter end={25} suffix="+" label={t("happyClients")} icon={<Users className="h-6 w-6" />} />
          <StatsCounter end={3500} suffix="+" label={t("cupsOfCoffee")} icon={<Coffee className="h-6 w-6" />} />
        </div>
      </div>
    </section>
  )
}
