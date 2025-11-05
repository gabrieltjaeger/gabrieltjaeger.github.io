import type { Testimonial } from "@/core/entities/Testimonial"

export interface TestimonialRepository {
  getAll(): Promise<Testimonial[]>
}
