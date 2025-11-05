"use client"

import { motion } from "framer-motion"
import { useTranslations } from "next-intl"

interface BlogHeaderProps {
  title: string
  description: string
  label?: string
}

export function BlogHeader({ title, description, label }: BlogHeaderProps) {
  const t = useTranslations("Blog")

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mb-16 space-y-4"
    >
      {label && (
        <p className="text-sm font-medium tracking-wide text-accent">{label}</p>
      )}
      <h1 className="text-balance text-5xl font-bold tracking-tight sm:text-6xl">{title}</h1>
      <p className="max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">{description}</p>
    </motion.div>
  )
}
