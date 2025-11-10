"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

interface SkillProgressBarProps {
  name: string
  level: "beginner" | "intermediate" | "advanced" | "expert"
  yearsOfExperience?: number
}

export function SkillProgressBar({ name, level, yearsOfExperience }: SkillProgressBarProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const levelToPercentage = {
    beginner: 25,
    intermediate: 50,
    advanced: 75,
    expert: 95,
  }

  const levelToColor = {
    beginner: "bg-muted",
    intermediate: "bg-secondary",
    advanced: "bg-success",
    expert: "bg-success",
  }

  const percentage = levelToPercentage[level]
  const colorClass = levelToColor[level]

  return (
    <div ref={ref} className="group space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors drop-shadow-[0_1px_3px_rgba(0,0,0,0.2)]">
          {name}
        </span>
        <div className="flex items-center gap-2">
          {yearsOfExperience && <span className="text-xs text-muted-foreground">{yearsOfExperience}y</span>}
          <motion.span 
            className="text-xs font-medium text-primary drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]"
            animate={isInView ? { scale: [1, 1.1, 1] } : { scale: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            {percentage}%
          </motion.span>
        </div>
      </div>
      <div className="h-2.5 bg-muted/30 rounded-full overflow-hidden shadow-inner shadow-black/20 relative">
        {/* Inner highlight for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
        
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${percentage}%` } : { width: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className={`h-full ${colorClass} rounded-full relative shadow-[0_2px_8px_-2px_rgba(0,0,0,0.3)] group-hover:shadow-[0_2px_12px_-2px_rgba(0,0,0,0.4)] transition-shadow`}
        >
          {/* Shimmer effect */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            initial={{ x: '-100%' }}
            animate={isInView ? { x: '200%' } : { x: '-100%' }}
            transition={{ duration: 1.5, delay: 1, ease: "easeInOut" }}
          />
          {/* Top highlight */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent h-1/2 rounded-full" />
        </motion.div>
      </div>
    </div>
  )
}
