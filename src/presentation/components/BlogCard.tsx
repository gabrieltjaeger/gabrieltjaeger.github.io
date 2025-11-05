"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Clock } from "lucide-react"

interface BlogCardProps {
  id: string
  title: string
  excerpt: string
  publishedAt: string
  tags: string[]
  readingTime: number
}

export function BlogCard({ id, title, excerpt, publishedAt, tags, readingTime }: BlogCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group"
    >
      <Link href={`/blog/${id}`}>
        <div className="bg-card border border-border rounded-lg p-6 hover:border-accent/50 transition-all">
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
            <time dateTime={publishedAt}>{formatDate(publishedAt)}</time>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {readingTime} min read
            </span>
          </div>

          <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors">{title}</h3>

          <p className="text-muted-foreground leading-relaxed mb-4">{excerpt}</p>

          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span key={tag} className="px-3 py-1 text-xs font-medium bg-accent/10 text-accent rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
