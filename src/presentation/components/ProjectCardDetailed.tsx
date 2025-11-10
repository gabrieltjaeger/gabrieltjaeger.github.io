"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { CheckCircle2, ExternalLink, Github, TrendingUp, Zap } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

interface ProjectCardDetailedProps {
  title: string
  description: string
  longDescription?: string
  challenge?: string
  solution?: string
  results?: string[]
  technologies: string[]
  githubUrl: string | null
  liveUrl: string | null
  imageUrl?: string
}

export function ProjectCardDetailed({
  title,
  description,
  longDescription,
  challenge,
  solution,
  results,
  technologies,
  githubUrl,
  liveUrl,
  imageUrl,
}: ProjectCardDetailedProps) {
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative liquid-glass overflow-hidden hover:border-primary/50 transition-all group depth-3d"
      style={{ transform: 'translateZ(0)' }}
    >
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />

      {imageUrl && (
        <div className="relative h-80 overflow-hidden bg-muted">
          <motion.div
            initial={{ scale: 1.1 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative h-full"
          >
            <Image
              src={imageUrl || "/placeholder.svg"}
              alt={title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              onLoad={() => setImageLoaded(true)}
            />
          </motion.div>

          {/* Gradient overlay on image */}
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />

          {/* Floating badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="absolute top-4 right-4 bg-primary/90 backdrop-blur-sm text-primary-foreground px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5"
          >
            <Zap className="h-3 w-3" />
            Featured Project
          </motion.div>
        </div>
      )}

      <div className="relative p-8 space-y-8">
        <div>
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors"
          >
            {title}
          </motion.h3>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "4rem" }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="h-1 bg-gradient-to-r from-primary to-primary/50 rounded-full mb-4"
          />
          <p className="text-lg text-muted-foreground">{description}</p>
        </div>

        {/* Long Description */}
        {longDescription && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-muted-foreground leading-relaxed"
          >
            {longDescription}
          </motion.p>
        )}

        {challenge && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="bg-muted/30 border border-border/50 rounded-xl p-6 hover:border-primary/30 transition-colors"
          >
            <h4 className="text-sm font-semibold text-primary mb-3 flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              The Challenge
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">{challenge}</p>
          </motion.div>
        )}

        {solution && (
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
        )}

        {results && results.length > 0 && (
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
        )}

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
      </div>
    </motion.div>
  )
}
