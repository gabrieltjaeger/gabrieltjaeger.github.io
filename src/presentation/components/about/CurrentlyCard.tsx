"use client"

import { motion } from "framer-motion"
import { BookOpen, Code, Lightbulb, Sparkles } from "lucide-react"
import { useTranslations } from "next-intl"

interface CurrentlyItem {
  learning: string
  reading: string
  building: string
}

interface CurrentlyCardProps {
  currently: CurrentlyItem
}

export function CurrentlyCard({ currently }: CurrentlyCardProps) {
  const t = useTranslations("About")

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 }}
      whileHover={{ y: -2 }}
      className="relative liquid-glass p-6 transition-all duration-300 shadow-[0_8px_16px_-4px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_24px_-6px_rgba(0,0,0,0.4)] depth-3d overflow-hidden"
      style={{ transform: "translateZ(0)" }}
    >
      {/* Organic distortion overlay - liquid glass effect */}
      <div
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          background: `
            radial-gradient(circle at 25% 35%, rgba(255, 255, 255, 0.18) 0%, transparent 32%),
            radial-gradient(circle at 75% 65%, rgba(0, 0, 0, 0.1) 0%, transparent 28%),
            radial-gradient(circle at 50% 85%, rgba(255, 255, 255, 0.12) 0%, transparent 38%)
          `,
          filter: "blur(10px)",
          borderRadius: "inherit",
        }}
      />

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
        <motion.div className="group/item" whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 300 }}>
          <div className="flex items-center gap-2 text-sm text-primary font-medium mb-1.5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)]">
            <Code className="h-4 w-4" />
            {t("learning")}
          </div>
          <div className="text-muted-foreground group-hover/item:text-foreground transition-colors pl-6 border-l-2 border-primary/30 group-hover/item:border-primary/50">
            {currently.learning}
          </div>
        </motion.div>

        <motion.div className="group/item" whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 300 }}>
          <div className="flex items-center gap-2 text-sm text-accent font-medium mb-1.5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)]">
            <BookOpen className="h-4 w-4" />
            {t("reading")}
          </div>
          <div className="text-muted-foreground group-hover/item:text-foreground transition-colors pl-6 border-l-2 border-accent/30 group-hover/item:border-accent/50">
            {currently.reading}
          </div>
        </motion.div>

        <motion.div className="group/item" whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 300 }}>
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
  )
}
