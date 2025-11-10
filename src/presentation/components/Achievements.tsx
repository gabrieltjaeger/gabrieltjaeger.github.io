"use client"

import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import { AchievementBadge } from "./AchievementBadge"

export function Achievements() {
  const t = useTranslations("Achievements")

  const achievementDefinitions: Array<{
    key: "earlyAdopter" | "openSourceHero" | "speedDemon" | "teamPlayer" | "problemSolver" | "fullStackMaster"
    icon: "rocket" | "star" | "zap" | "trophy" | "target" | "award"
  }> = [
    { key: "earlyAdopter", icon: "rocket" },
    { key: "openSourceHero", icon: "star" },
    { key: "speedDemon", icon: "zap" },
    { key: "teamPlayer", icon: "trophy" },
    { key: "problemSolver", icon: "target" },
    { key: "fullStackMaster", icon: "award" },
  ]

  const achievements = achievementDefinitions.map(({ key, icon }) => ({
    title: t(`items.${key}.title`),
    description: t(`items.${key}.description`),
    icon,
    unlocked: true,
  }))

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t("title")}</h2>
          <p className="text-muted-foreground mb-12">{t("subtitle")}</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <AchievementBadge {...achievement} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
