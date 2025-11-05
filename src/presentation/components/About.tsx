"use client"

import { motion } from "framer-motion"
import { BookOpen, Code, Lightbulb, Sparkles } from "lucide-react"
import { useTranslations } from "next-intl"

interface AboutProps {
  story: string
  interests: string[]
  currently: {
    learning: string
    reading: string
    building: string
  }
}

export function About({ story, interests, currently }: AboutProps) {
  const paragraphs = story.split("\n\n")
  const t = useTranslations("About")

  return (
    <section className="py-24 relative mesh-bg overflow-hidden">
      {/* Subtle dots texture overlay */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(233, 154, 142, 0.15) 1.5px, transparent 0)',
          backgroundSize: '32px 32px'
        }} />
      </div>
      
      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">{t("title")}</h2>

          <div className="space-y-6 text-muted-foreground leading-relaxed">
            {paragraphs.map((paragraph, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                {paragraph}
              </motion.p>
            ))}
          </div>

          <div className="mt-12 grid md:grid-cols-2 gap-8">
            {/* Interests with moss green */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-success" />
                {t("whatILove")}
              </h3>
              <ul className="space-y-3">
                {interests.map((interest, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    whileHover={{ x: 5 }}
                    className="flex items-start gap-2 text-muted-foreground group cursor-default"
                  >
                    <span className="text-success mt-1 transition-transform group-hover:scale-110">→</span>
                    <span className="group-hover:text-foreground transition-colors">{interest}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Currently - liquid glass card with depth and layers */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -2 }}
              className="relative liquid-glass p-6 transition-all duration-300 shadow-[0_8px_16px_-4px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_24px_-6px_rgba(0,0,0,0.4)] depth-3d overflow-hidden"
              style={{ transform: 'translateZ(0)' }}
            >
              {/* Organic distortion overlay - liquid glass effect */}
              <div className="absolute inset-0 pointer-events-none opacity-60" style={{
                background: `
                  radial-gradient(circle at 25% 35%, rgba(255, 255, 255, 0.18) 0%, transparent 32%),
                  radial-gradient(circle at 75% 65%, rgba(0, 0, 0, 0.1) 0%, transparent 28%),
                  radial-gradient(circle at 50% 85%, rgba(255, 255, 255, 0.12) 0%, transparent 38%)
                `,
                filter: 'blur(10px)',
                borderRadius: 'inherit'
              }} />
              
              {/* Inner border glow */}
              <div className="absolute inset-0 rounded-xl border border-accent/5 pointer-events-none" />
              
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <h3 className="relative text-xl font-semibold text-foreground mb-6 flex items-center gap-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  <Sparkles className="h-5 w-5 text-accent" />
                </motion.div>
                {t("currently")}
              </h3>

              <div className="relative space-y-5">
                <motion.div 
                  className="group/item"
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex items-center gap-2 text-sm text-primary font-medium mb-1.5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)]">
                    <Code className="h-4 w-4" />
                    {t("learning")}
                  </div>
                  <div className="text-muted-foreground group-hover/item:text-foreground transition-colors pl-6 border-l-2 border-primary/30 group-hover/item:border-primary/50">
                    {currently.learning}
                  </div>
                </motion.div>

                <motion.div 
                  className="group/item"
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex items-center gap-2 text-sm text-accent font-medium mb-1.5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)]">
                    <BookOpen className="h-4 w-4" />
                    {t("reading")}
                  </div>
                  <div className="text-muted-foreground group-hover/item:text-foreground transition-colors pl-6 border-l-2 border-accent/30 group-hover/item:border-accent/50">
                    {currently.reading}
                  </div>
                </motion.div>

                <motion.div 
                  className="group/item"
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex items-center gap-2 text-sm text-success font-medium mb-1.5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)]">
                    <Lightbulb className="h-4 w-4" />
                    {t("building")}
                  </div>
                  <div className="text-muted-foreground group-hover/item:text-foreground transition-colors pl-6 border-l-2 border-success/30 group-hover/item:border-success/50">
                    {currently.building}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
