import { Url } from "../value-objects/Url"

export class Testimonial {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly role: string,
    public readonly company: string,
    public readonly content: string,
    public readonly avatarUrl?: Url,
  ) {}

  static create(props: {
    id: string
    name: string
    role: string
    company: string
    content: string
    avatarUrl?: string
  }): Testimonial {
    if (!props.id.trim()) {
      throw new Error("Testimonial id cannot be empty")
    }

    if (!props.name.trim()) {
      throw new Error("Testimonial name cannot be empty")
    }

    if (!props.role.trim()) {
      throw new Error("Testimonial role cannot be empty")
    }

    if (!props.company.trim()) {
      throw new Error("Testimonial company cannot be empty")
    }

    if (!props.content.trim()) {
      throw new Error("Testimonial content cannot be empty")
    }

    return new Testimonial(
      props.id,
      props.name,
      props.role,
      props.company,
      props.content,
      props.avatarUrl ? new Url(props.avatarUrl) : undefined,
    )
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      role: this.role,
      company: this.company,
      content: this.content,
      avatarUrl: this.avatarUrl?.value,
    }
  }
}
