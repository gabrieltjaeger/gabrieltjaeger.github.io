"use client"

import { useTranslations } from "next-intl"
import { TestimonialCard } from "./TestimonialCard"

interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  content: string
  avatarUrl?: string
}

interface TestimonialsGridProps {
  testimonials: Testimonial[]
}

export function TestimonialsGrid({ testimonials }: TestimonialsGridProps) {
  const t = useTranslations("Testimonials")

  return (
    <div className="grid md:grid-cols-3 gap-8">
      {testimonials.map((testimonial) => (
        <TestimonialCard key={testimonial.id} testimonial={testimonial} index={0} />
      ))}
    </div>
  )
}
