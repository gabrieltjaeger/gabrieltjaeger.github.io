"use client"

import { motion } from "framer-motion"
import { SkillProgressBar } from "../SkillProgressBar"

interface Skill {
  name: string
  category: string
  level: "beginner" | "intermediate" | "advanced" | "expert"
  yearsOfExperience?: number
}

interface SkillCategoryCardProps {
  category: string
  skills: Skill[]
}

export function SkillCategoryCard({ category, skills }: SkillCategoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="space-y-6 liquid-glass p-6 depth-3d overflow-hidden"
      style={{ transform: "translateZ(0)" }}
    >
      {/* Organic distortion overlay - simulating liquid glass */}
      <div
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          background: `
            radial-gradient(circle at 30% 40%, rgba(255, 255, 255, 0.15) 0%, transparent 30%),
            radial-gradient(circle at 70% 60%, rgba(0, 0, 0, 0.08) 0%, transparent 25%),
            radial-gradient(circle at 50% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 35%)
          `,
          filter: "blur(8px)",
          borderRadius: "inherit",
        }}
      />

      <h3 className="text-xl font-semibold text-foreground flex items-center gap-2 relative z-10">
        <span className="h-1 w-8 bg-success rounded-full" />
        {category}
      </h3>
      <div className="space-y-4 relative z-10">
        {skills.map((skill) => (
          <SkillProgressBar
            key={skill.name}
            name={skill.name}
            level={skill.level}
            yearsOfExperience={skill.yearsOfExperience}
          />
        ))}
      </div>
    </motion.div>
  )
}
