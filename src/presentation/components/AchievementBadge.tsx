"use client"

import { motion } from "framer-motion"
import { Award, Star, Zap, Trophy, Target, Rocket } from "lucide-react"

interface AchievementBadgeProps {
  title: string
  description: string
  icon?: "award" | "star" | "zap" | "trophy" | "target" | "rocket"
  unlocked?: boolean
}

export function AchievementBadge({ title, description, icon = "award", unlocked = true }: AchievementBadgeProps) {
  const icons = {
    award: Award,
    star: Star,
    zap: Zap,
    trophy: Trophy,
    target: Target,
    rocket: Rocket,
  }

  const Icon = icons[icon]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05, rotate: [0, -5, 5, 0] }}
      transition={{ duration: 0.3 }}
      className={`relative overflow-hidden rounded-xl border p-4 transition-all ${
        unlocked
          ? "border-primary/30 bg-gradient-to-br from-primary/10 to-primary/5 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20"
          : "border-border bg-card opacity-50 grayscale"
      }`}
    >
      <div className="flex items-start gap-3">
        <div className={`rounded-lg p-2 ${unlocked ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"}`}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-sm text-foreground mb-1">{title}</h4>
          <p className="text-xs text-muted-foreground line-clamp-2">{description}</p>
        </div>
      </div>

      {/* Sparkle effect for unlocked badges */}
      {unlocked && (
        <motion.div
          animate={{
            opacity: [0, 1, 0],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary"
        />
      )}
    </motion.div>
  )
}
