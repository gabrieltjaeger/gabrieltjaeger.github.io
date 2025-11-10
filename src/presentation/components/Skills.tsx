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
    <section className="relative py-24 overflow-hidden">
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, var(--surface-section) 0%, var(--surface-section-deep) 100%)" }}
        />
        <div
          className="absolute inset-0 opacity-80"
          style={{
            background:
              "radial-gradient(circle at 18% 22%, var(--surface-glow-cyan) 0%, transparent 55%)," +
              "radial-gradient(circle at 82% 28%, var(--surface-glow-amber) 0%, transparent 60%)," +
              "radial-gradient(circle at 50% 100%, var(--surface-glow-mint) 0%, transparent 55%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              "linear-gradient(var(--surface-grid-color) 1px, transparent 1px)," +
              "linear-gradient(90deg, var(--surface-grid-color) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        <div
          className="absolute inset-x-0 top-0 h-36"
          style={{
            background: "linear-gradient(to bottom, var(--surface-section) 0%, color-mix(in srgb, var(--surface-section) 55%, transparent) 55%, transparent 100%)",
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t("title")}</h2>
          <p className="mb-12 max-w-2xl" style={{ color: "var(--surface-text-muted)" }}>
            {t("subtitle")}
          </p>

          <div className="grid md:grid-cols-2 gap-12">
            {Object.entries(groupedSkills).map(([category, categorySkills]) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative space-y-6 liquid-glass p-6 depth-3d overflow-hidden border"
                style={{
                  transform: 'translateZ(0)',
                  background: 'var(--surface-card-glass)',
                  borderColor: 'var(--surface-card-border)'
                }}
              >
                {/* Organic distortion overlay - simulating liquid glass */}
                <div className="absolute inset-0 pointer-events-none opacity-60" style={{
                  background: `
                    radial-gradient(circle at 30% 40%, rgba(77, 226, 248, 0.2) 0%, transparent 35%),
                    radial-gradient(circle at 70% 60%, rgba(246, 185, 91, 0.14) 0%, transparent 30%),
                    radial-gradient(circle at 50% 90%, rgba(61, 217, 163, 0.12) 0%, transparent 40%)
                  `,
                  filter: 'blur(10px)',
                  borderRadius: 'inherit'
                }} />

                <h3 className="text-xl font-semibold text-foreground flex items-center gap-3">
                  <span className="h-1.5 w-10 rounded-full" style={{ background: 'linear-gradient(90deg, rgba(77,226,248,0.85), rgba(246,185,91,0.75))' }} />
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
