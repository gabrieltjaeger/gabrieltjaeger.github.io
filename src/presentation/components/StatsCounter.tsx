"use client"

import { motion, useInView } from "framer-motion"
import { useLocale } from "next-intl"
import type React from "react"
import { useEffect, useRef, useState } from "react"

interface StatsCounterProps {
  end: number
  duration?: number
  suffix?: string
  prefix?: string
  label: string
  icon?: React.ReactNode
}

export function StatsCounter({ end, duration = 2, suffix = "", prefix = "", label, icon }: StatsCounterProps) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const locale = useLocale()

  useEffect(() => {
    if (!isInView) return

    let startTime: number | null = null
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1)

      setCount(Math.floor(progress * end))

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [isInView, end, duration])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10"
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

      <div className="relative space-y-2">
        {icon && <div className="text-primary mb-3">{icon}</div>}
        <div className="text-4xl font-bold text-foreground">
          {prefix}
          {new Intl.NumberFormat(locale).format(count)}
          {suffix}
        </div>
        <div className="text-sm text-muted-foreground">{label}</div>
      </div>
    </motion.div>
  )
}
