"use client"

import { motion } from "framer-motion"

interface ExperienceAchievementsProps {
  achievements: string[]
}

export function ExperienceAchievements({ achievements }: ExperienceAchievementsProps) {
  return (
    <div className="space-y-2">
      <h4 className="text-sm font-semibold text-foreground">Achievements</h4>
      <ul className="space-y-1">
        {achievements.map((achievement, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="flex items-start gap-2 text-sm text-muted-foreground"
          >
            <span className="text-accent mt-0.5 flex-shrink-0">•</span>
            <span>{achievement}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  )
}
