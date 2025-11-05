"use client"

import { motion } from "framer-motion"

interface ProjectTechnologiesProps {
  technologies: string[]
}

export function ProjectTechnologies({ technologies }: ProjectTechnologiesProps) {
  return (
    <div>
      <h4 className="text-sm font-semibold text-muted-foreground mb-3">Technologies Used</h4>
      <div className="flex flex-wrap gap-2">
        {technologies.map((tech, index) => {
          const colors = [
            "bg-cyan-500/10 text-cyan-400 border-cyan-500/30 hover:bg-cyan-500/20",
            "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20",
            "bg-blue-500/10 text-blue-400 border-blue-500/30 hover:bg-blue-500/20",
          ]
          const colorClass = colors[index % colors.length]

          return (
            <motion.span
              key={tech}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.9 + index * 0.05 }}
              whileHover={{ scale: 1.1, y: -2 }}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg border ${colorClass} transition-all cursor-default`}
            >
              {tech}
            </motion.span>
          )
        })}
      </div>
    </div>
  )
}
