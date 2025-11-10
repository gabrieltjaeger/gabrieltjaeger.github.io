import { Testimonial } from "@/core/entities/Testimonial"
import type { TestimonialRepository } from "@/core/ports/TestimonialRepository"
import type { Locale } from "@/infra/adapters/i18n/config"

async function loadTestimonials(locale: Locale) {
  switch (locale) {
    case "pt":
      return (await import("@/content/pt/testimonials.json")).default
    case "en":
      return (await import("@/content/en/testimonials.json")).default
    default:
      return (await import("@/content/en/testimonials.json")).default
  }
}

export class JsonTestimonialRepository implements TestimonialRepository {
  constructor(private readonly locale: Locale) {}

  async getAll(): Promise<Testimonial[]> {
    const testimonialsData = await loadTestimonials(this.locale)

    return testimonialsData.testimonials.map((testimonial) =>
      Testimonial.create({
        id: testimonial.id,
        name: testimonial.name,
        role: testimonial.role,
        company: testimonial.company,
        content: testimonial.content,
        avatarUrl: testimonial.avatarUrl,
      }),
    )
  }
}
