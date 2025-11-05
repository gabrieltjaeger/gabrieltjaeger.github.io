"use client"

import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"
import { useTranslations } from "next-intl"

interface InterestsListProps {
  interests: string[]
}

export function InterestsList({ interests }: InterestsListProps) {
  const t = useTranslations("About")

  return (
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
  )
}
