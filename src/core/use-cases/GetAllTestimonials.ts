import type { Testimonial } from "@/core/entities/Testimonial"
import type { TestimonialRepository } from "../ports/TestimonialRepository"

export class GetAllTestimonials {
  constructor(private testimonialRepository: TestimonialRepository) {}

  async execute(): Promise<Testimonial[]> {
    return this.testimonialRepository.getAll()
  }
}
