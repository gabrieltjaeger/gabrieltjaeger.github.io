"use client"

import { motion } from "framer-motion"
import Image from "next/image"

interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  content: string
  avatarUrl?: string
}

interface TestimonialsProps {
  testimonials: Testimonial[]
}

export function Testimonials({ testimonials }: TestimonialsProps) {
  return (
    <section className="relative py-24 overflow-hidden">
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, var(--surface-section) 0%, var(--surface-section-deep) 100%)" }}
        />
        <div
          className="absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(circle at 12% 25%, var(--surface-glow-cyan) 0%, transparent 55%)," +
              "radial-gradient(circle at 88% 20%, var(--surface-glow-amber) 0%, transparent 60%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              "linear-gradient(var(--surface-grid-color) 1px, transparent 1px)," +
              "linear-gradient(90deg, var(--surface-grid-color) 1px, transparent 1px)",
            backgroundSize: "90px 90px",
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">What People Say</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="border rounded-2xl p-6 backdrop-blur-md shadow-[0_24px_46px_-20px_rgba(0,0,0,0.45)] hover:border-accent/60 transition-colors"
                style={{
                  background: "var(--surface-card-glass)",
                  borderColor: "var(--surface-card-border)",
                }}
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
                    <div className="text-sm" style={{ color: "var(--surface-text-subtle)" }}>
                      {testimonial.role}
                    </div>
                    <div
                      className="text-xs uppercase tracking-[0.18em]"
                      style={{ color: "var(--surface-text-subtle)" }}
                    >
                      {testimonial.company}
                    </div>
                  </div>
                </div>
                <p className="leading-relaxed text-sm" style={{ color: "var(--surface-text-muted)" }}>
                  "{testimonial.content}"
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
