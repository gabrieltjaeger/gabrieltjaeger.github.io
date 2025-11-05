"use client"

import { motion } from "framer-motion"
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

interface ExperienceProps {
  experiences: ExperienceItem[]
}

export function Experience({ experiences }: ExperienceProps) {
  const locale = useLocale()
  const t = useTranslations("Experience")
  const common = useTranslations("Common")

  const dateFormatter = new Intl.DateTimeFormat(locale, {
    month: "short",
    year: "numeric",
  })

  return (
    <section className="py-24 bg-background relative mesh-bg overflow-hidden">
      {/* Sharp dots texture overlay */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1.5px 1.5px, rgba(163, 169, 183, 0.2) 1.5px, transparent 0)',
          backgroundSize: '28px 28px'
        }} />
      </div>
      
      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12">{t("title")}</h2>

          <div className="relative space-y-12">
            {/* Vertical line with gradient */}
            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent via-border to-transparent" />
            
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative pl-8"
              >
                {/* Timeline dot with pulse effect */}
                <motion.div 
                  className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-accent border-4 border-background shadow-[0_0_12px_rgba(233,154,142,0.4)]"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                >
                  {/* Pulse ring for current experience */}
                  {!exp.endDate && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-accent"
                      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </motion.div>

                <motion.div 
                  className="space-y-4 p-6 liquid-glass bg-card transition-all duration-300 shadow-[0_4px_12px_-2px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_20px_-4px_rgba(0,0,0,0.3)] depth-3d overflow-hidden"
                  whileHover={{ x: 4, y: -2 }}
                  style={{ transform: 'translateZ(0)' }}
                >
                  {/* Organic distortion - liquid glass refraction */}
                  <div className="absolute inset-0 pointer-events-none opacity-50" style={{
                    background: `
                      radial-gradient(circle at 35% 30%, rgba(255, 255, 255, 0.12) 0%, transparent 28%),
                      radial-gradient(circle at 70% 75%, rgba(0, 0, 0, 0.06) 0%, transparent 22%)
                    `,
                    filter: 'blur(6px)',
                    borderRadius: 'inherit'
                  }} />
                  
                  {/* Header */}
                  <div>
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div>
                        <h3 className="text-xl font-semibold text-foreground">{exp.role}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          {exp.companyUrl ? (
                            <a
                              href={exp.companyUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-accent hover:underline flex items-center gap-1"
                            >
                              {exp.company}
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          ) : (
                            <span className="text-accent">{exp.company}</span>
                          )}
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {dateFormatter.format(new Date(`${exp.startDate}-01`))} -
                        {" "}
                        {exp.endDate ? dateFormatter.format(new Date(`${exp.endDate}-01`)) : common("present")}
                      </div>
                    </div>
                    <p className="text-muted-foreground mt-3">{exp.description}</p>
                  </div>

                  {/* Achievements */}
                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-2">{t("achievements")}</h4>
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="text-accent mt-1">•</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <motion.span 
                        key={tech} 
                        className="liquid-pill text-xs font-medium text-accent"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
