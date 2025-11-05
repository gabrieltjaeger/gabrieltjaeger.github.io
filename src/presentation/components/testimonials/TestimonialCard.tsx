"use client"

import { motion } from "framer-motion"
import Image from "next/image"

interface TestimonialCardProps {
  testimonial: {
    id: string
    name: string
    role: string
    company: string
    content: string
    avatarUrl?: string
  }
  index: number
}

export function TestimonialCard({ testimonial, index }: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-card border border-border rounded-lg p-6 hover:border-accent/50 transition-colors"
    >
      <div className="flex items-start gap-4 mb-4">
        {testimonial.avatarUrl && (
          <Image
            src={testimonial.avatarUrl || "/placeholder.svg"}
            alt={testimonial.name}
            width={48}
            height={48}
            className="rounded-full"
          />
        )}
        <div>
          <div className="font-semibold text-foreground">{testimonial.name}</div>
          <div className="text-sm text-muted-foreground">{testimonial.role}</div>
          <div className="text-sm text-accent">{testimonial.company}</div>
        </div>
      </div>
      <p className="text-muted-foreground leading-relaxed text-sm">"{testimonial.content}"</p>
    </motion.div>
  )
}
