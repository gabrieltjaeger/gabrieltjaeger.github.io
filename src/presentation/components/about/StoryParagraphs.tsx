"use client"

import { motion } from "framer-motion"

interface StoryProps {
  story: string
}

export function StoryParagraphs({ story }: StoryProps) {
  const paragraphs = story.split("\n\n")

  return (
    <div className="space-y-6 text-muted-foreground leading-relaxed">
      {paragraphs.map((paragraph, index) => (
        <motion.p
          key={index}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
        >
          {paragraph}
        </motion.p>
      ))}
    </div>
  )
}
