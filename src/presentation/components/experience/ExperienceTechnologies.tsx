"use client"

import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

interface ExperienceTechnologiesProps {
  technologies: string[]
}

export function ExperienceTechnologies({ technologies }: ExperienceTechnologiesProps) {
  return (
    <div className="space-y-3">
      <h4 className="text-sm font-semibold text-foreground">Technologies</h4>
      <motion.div className="flex flex-wrap gap-2">
        {technologies.map((tech, index) => (
          <motion.div
            key={tech}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
          >
            <Badge variant="secondary" className="text-xs">
              {tech}
            </Badge>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
