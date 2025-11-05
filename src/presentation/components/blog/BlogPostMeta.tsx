"use client"

import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { Calendar, Clock } from "lucide-react"
import { useLocale } from "next-intl"

interface BlogPostMetaProps {
  publishedAt: string
  readingTime: number
  tags: string[]
}

export function BlogPostMeta({ publishedAt, readingTime, tags }: BlogPostMetaProps) {
  const locale = useLocale()

  const dateFormatter = new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      {/* Date and reading time */}
      <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
        <div className="flex items-center gap-1.5">
          <Calendar className="h-4 w-4" />
          <span>{dateFormatter.format(new Date(publishedAt))}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="h-4 w-4" />
          <span>{readingTime} min read</span>
        </div>
      </div>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <motion.div
              key={tag}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <Badge variant="secondary">{tag}</Badge>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  )
}
