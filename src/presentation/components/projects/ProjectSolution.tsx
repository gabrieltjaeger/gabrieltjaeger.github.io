"use client"

import { motion } from "framer-motion"
import { Zap } from "lucide-react"

interface ProjectSolutionProps {
  solution: string
}

export function ProjectSolution({ solution }: ProjectSolutionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.6 }}
      className="bg-muted/30 border border-border/50 rounded-xl p-6 hover:border-primary/30 transition-colors"
    >
      <h4 className="text-sm font-semibold text-primary mb-3 flex items-center gap-2">
        <Zap className="h-4 w-4" />
        The Solution
      </h4>
      <p className="text-sm text-muted-foreground leading-relaxed">{solution}</p>
    </motion.div>
  )
}
