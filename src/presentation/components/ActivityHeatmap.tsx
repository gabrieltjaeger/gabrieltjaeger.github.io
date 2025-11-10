"use client"

import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import { useState } from "react"

export function ActivityHeatmap() {
  const t = useTranslations("ActivityHeatmap")
  const common = useTranslations("Common")
  // Generate mock activity data for the last 12 weeks
  const weeks = 12
  const daysPerWeek = 7
  const generateActivityData = () => {
    const data: number[][] = []
    for (let week = 0; week < weeks; week++) {
      const weekData: number[] = []
      for (let day = 0; day < daysPerWeek; day++) {
        // Random activity level (0-4)
        weekData.push(Math.floor(Math.random() * 5))
      }
      data.push(weekData)
    }
    return data
  }

  const [activityData] = useState(generateActivityData())
  const [hoveredCell, setHoveredCell] = useState<{ week: number; day: number } | null>(null)

  const HEATMAP_COLORS = [
    "var(--heatmap-0)",
    "var(--heatmap-1)",
    "var(--heatmap-2)",
    "var(--heatmap-3)",
    "var(--heatmap-4)",
  ] as const

  const getColor = (level: number) => {
    const index = Math.min(Math.max(level, 0), HEATMAP_COLORS.length - 1)
    return HEATMAP_COLORS[index]
  }

  const dayKeys = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"] as const

  return (
    <section className="relative py-24 bg-card/50 overflow-hidden" data-testid="activity-heatmap">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(180deg, color-mix(in srgb, var(--surface-section) 90%, transparent) 0%, color-mix(in srgb, var(--surface-section-deep) 96%, transparent) 100%)",
          }}
        />
        <div
          className="absolute inset-x-0 top-0 h-36"
          style={{
            background: "linear-gradient(to bottom, color-mix(in srgb, var(--surface-section) 92%, transparent) 0%, color-mix(in srgb, var(--surface-section) 60%, transparent) 55%, transparent 100%)",
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          suppressHydrationWarning
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t("title")}</h2>
          <p className="text-muted-foreground mb-8">{t("subtitle")}</p>

          <div className="overflow-x-auto" data-testid="activity-heatmap-grid">
            <div className="inline-flex gap-1">
              {/* Day labels */}
              <div className="flex flex-col gap-1 mr-2">
                <div className="h-3" /> {/* Spacer for alignment */}
                {dayKeys.map((day, i) => (
                  <div key={day} className="h-3 text-xs text-muted-foreground flex items-center">
                    {i % 2 === 1 ? t(`days.${day}`) : ""}
                  </div>
                ))}
              </div>

              {/* Heatmap grid */}
              {activityData.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-1">
                  {week.map((level, dayIndex) => (
                    <motion.div
                      key={`${weekIndex}-${dayIndex}`}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: (weekIndex * daysPerWeek + dayIndex) * 0.01 }}
                      whileHover={{ scale: 1.3 }}
                      onHoverStart={() => setHoveredCell({ week: weekIndex, day: dayIndex })}
                      onHoverEnd={() => setHoveredCell(null)}
                      className="h-3 w-3 rounded-sm bg-border transition-all cursor-pointer hover:ring-2 hover:ring-primary/50"
                      data-testid="activity-heatmap-cell"
                      style={{ backgroundColor: getColor(level) }}
                      title={common("contributions", { count: level })}
                      suppressHydrationWarning
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-2 mt-6 text-xs text-muted-foreground">
            <span>{common("less")}</span>
            {[0, 1, 2, 3, 4].map((level) => (
              <div
                key={level}
                className="h-3 w-3 rounded-sm bg-border"
                style={{ backgroundColor: getColor(level) }}
              />
            ))}
            <span>{common("more")}</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
