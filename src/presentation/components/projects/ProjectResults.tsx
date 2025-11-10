"use client"

import { motion } from "framer-motion"
import { CheckCircle2 } from "lucide-react"

interface ProjectResultsProps {
  results: string[]
}

export function ProjectResults({ results }: ProjectResultsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.7 }}
      className="bg-gradient-to-br from-primary/5 to-transparent border border-primary/20 rounded-xl p-6"
    >
      <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
        <CheckCircle2 className="h-4 w-4 text-primary" />
        Impact & Results
      </h4>
      <ul className="grid sm:grid-cols-2 gap-3">
        {results.map((result, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 + index * 0.1 }}
            className="flex items-start gap-2 text-sm text-muted-foreground group/item"
          >
            <motion.span
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 + index * 0.1, type: "spring" }}
              className="text-primary mt-0.5 group-hover/item:scale-125 transition-transform"
            >
              ✓
            </motion.span>
            <span className="group-hover/item:text-foreground transition-colors">{result}</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  )
}
