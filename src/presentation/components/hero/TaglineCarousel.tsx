"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface TaglineCarouselProps {
  taglines: string[]
  interval?: number
}

export function TaglineCarousel({ taglines, interval = 3000 }: TaglineCarouselProps) {
  const [currentTagline, setCurrentTagline] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTagline((prev) => (prev + 1) % taglines.length)
    }, interval)
    return () => clearInterval(timer)
  }, [taglines.length, interval])

  return (
    <div className="h-12 border-l-2 border-accent pl-4 relative">
      {/* Glow effect behind border */}
      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-accent blur-sm" />
      <motion.p
        key={currentTagline}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="animate-fade-in text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl"
      >
        {taglines[currentTagline]}
      </motion.p>
    </div>
  )
}
