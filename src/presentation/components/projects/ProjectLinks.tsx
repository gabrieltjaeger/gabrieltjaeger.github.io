"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ExternalLink, Github } from "lucide-react"

interface ProjectLinksProps {
  githubUrl: string | null
  liveUrl: string | null
}

export function ProjectLinks({ githubUrl, liveUrl }: ProjectLinksProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 1 }}
      className="flex gap-3 pt-4"
    >
      {githubUrl && (
        <Button
          asChild
          variant="outline"
          size="lg"
          className="group/btn border-border hover:border-primary/50 bg-transparent hover:bg-primary/5"
        >
          <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
            <Github className="w-4 h-4 transition-transform group-hover/btn:rotate-12" />
            View Code
          </a>
        </Button>
      )}
      {liveUrl && (
        <Button asChild size="lg" className="group/btn relative overflow-hidden">
          <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
            {/* Shimmer effect */}
            <motion.div
              animate={{
                x: ["-100%", "200%"],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            />
            <ExternalLink className="w-4 h-4 transition-transform group-hover/btn:rotate-12 relative z-10" />
            <span className="relative z-10">Live Demo</span>
          </a>
        </Button>
      )}
    </motion.div>
  )
}
