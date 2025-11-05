"use client"

import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import { SkillProgressBar } from "./SkillProgressBar"

interface Skill {
  name: string
  category: string
  level: "beginner" | "intermediate" | "advanced" | "expert"
  yearsOfExperience?: number
}

interface SkillsProps {
  skills: Skill[]
}

export function Skills({ skills }: SkillsProps) {
  const groupedSkills = skills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = []
      }
      acc[skill.category].push(skill)
      return acc
    },
    {} as Record<string, Skill[]>,
  )
  const t = useTranslations("Skills")

  return (
    <section className="py-24 bg-muted/20 mesh-bg relative overflow-hidden">
      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 glass-texture pointer-events-none opacity-50" />
      
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t("title")}</h2>
          <p className="text-muted-foreground mb-12">{t("subtitle")}</p>

          <div className="grid md:grid-cols-2 gap-12">
            {Object.entries(groupedSkills).map(([category, categorySkills]) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="space-y-6 liquid-glass p-6 depth-3d overflow-hidden"
                style={{ transform: 'translateZ(0)' }}
              >
                {/* Organic distortion overlay - simulating liquid glass */}
                <div className="absolute inset-0 pointer-events-none opacity-60" style={{
                  background: `
                    radial-gradient(circle at 30% 40%, rgba(255, 255, 255, 0.15) 0%, transparent 30%),
                    radial-gradient(circle at 70% 60%, rgba(0, 0, 0, 0.08) 0%, transparent 25%),
                    radial-gradient(circle at 50% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 35%)
                  `,
                  filter: 'blur(8px)',
                  borderRadius: 'inherit'
                }} />
                
                <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                  <span className="h-1 w-8 bg-success rounded-full" />
                  {category}
                </h3>
                <div className="space-y-4">
                  {categorySkills.map((skill) => (
                    <SkillProgressBar
                      key={skill.name}
                      name={skill.name}
                      level={skill.level}
                      yearsOfExperience={skill.yearsOfExperience}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
