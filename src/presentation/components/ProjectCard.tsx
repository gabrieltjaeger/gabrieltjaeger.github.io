"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Clock, ExternalLink, Github, TrendingUp, Users } from "lucide-react"
import { useState } from "react"

interface ProjectCardProps {
  title: string
  description: string
  technologies: string[]
  githubUrl: string | null
  liveUrl: string | null
  stats?: {
    impact?: string
    users?: string
    duration?: string
  }
}

export function ProjectCard({ title, description, technologies, githubUrl, liveUrl, stats }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -4 }}
      style={{ transform: 'translateZ(0)' }}
    >
      <Card className="group relative flex h-full flex-col overflow-hidden transition-all hover:border-accent/50 hover:shadow-[0_16px_32px_-8px_rgba(0,0,0,0.4)] liquid-glass depth-3d">
        {/* Organic distortion overlay - liquid glass caustics */}
        <div className="absolute inset-0 pointer-events-none opacity-55 z-0" style={{
          background: `
            radial-gradient(circle at 40% 35%, rgba(255, 255, 255, 0.14) 0%, transparent 30%),
            radial-gradient(circle at 65% 70%, rgba(0, 0, 0, 0.07) 0%, transparent 26%)
          `,
          filter: 'blur(7px)',
          borderRadius: 'inherit'
        }} />
        
        {/* Accent line that grows on hover */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent via-salmon to-success origin-left z-10"
        />
        
        <CardHeader className="relative">
          <CardTitle className="text-balance text-xl font-bold transition-colors group-hover:text-accent flex items-center gap-2">
            {title}
            <motion.span 
              animate={{ x: isHovered ? 5 : 0, scale: isHovered ? 1.1 : 1 }} 
              transition={{ duration: 0.2, type: "spring", stiffness: 300 }} 
              className="text-accent"
            >
              →
            </motion.span>
          </CardTitle>
        </CardHeader>

        <CardContent className="relative flex flex-1 flex-col gap-4">
          <p className="text-pretty leading-relaxed text-muted-foreground">{description}</p>

          {/* Project stats - professional */}
          {stats && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: isHovered ? 1 : 0,
                height: isHovered ? "auto" : 0,
              }}
              transition={{ duration: 0.3 }}
              className="flex flex-wrap gap-2 text-xs overflow-hidden"
            >
              {stats.impact && (
                <div className="flex items-center gap-1.5 bg-success/10 text-success px-2.5 py-1 rounded-md border border-success/20">
                  <TrendingUp className="h-3 w-3" />
                  <span>{stats.impact}</span>
                </div>
              )}
              {stats.users && (
                <div className="flex items-center gap-1.5 bg-primary/10 text-primary px-2.5 py-1 rounded-md border border-primary/20">
                  <Users className="h-3 w-3" />
                  <span>{stats.users}</span>
                </div>
              )}
              {stats.duration && (
                <div className="flex items-center gap-1.5 bg-muted text-muted-foreground px-2.5 py-1 rounded-md border border-border">
                  <Clock className="h-3 w-3" />
                  <span>{stats.duration}</span>
                </div>
              )}
            </motion.div>
          )}

          <div className="flex flex-wrap gap-2">
            {technologies.map((tech, index) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="liquid-pill text-xs font-medium text-foreground cursor-default"
                >
                  {tech}
                </motion.span>
              )
            )}
          </div>

          <div className="mt-auto flex gap-2 pt-4">
            {githubUrl && (
              <Button
                asChild
                variant="outline"
                size="sm"
              >
                <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <Github className="h-4 w-4" />
                  Code
                </a>
              </Button>
            )}
            {liveUrl && (
              <Button asChild size="sm">
                <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <ExternalLink className="h-4 w-4" />
                  Live Demo
                </a>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
