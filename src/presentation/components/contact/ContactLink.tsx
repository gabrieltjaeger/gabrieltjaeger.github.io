"use client"

import { motion } from "framer-motion"

interface ContactLinkProps {
  icon: React.ReactNode
  label: string
  href: string
  value: string
}

export function ContactLink({ icon, label, href, value }: ContactLinkProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      whileHover={{ x: 4 }}
      className="flex items-center gap-3"
    >
      <div className="text-muted-foreground">{icon}</div>
      <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
        {value}
      </a>
    </motion.div>
  )
}
