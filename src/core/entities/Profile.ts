import { ProfileName } from "../value-objects/ProfileName"
import { ProfileTitle } from "../value-objects/ProfileTitle"
import { Email } from "../value-objects/Email"
import { Url } from "../value-objects/Url"

export class Profile {
  constructor(
    public readonly name: ProfileName,
    public readonly title: ProfileTitle,
    public readonly taglines: string[],
    public readonly bio: string,
    public readonly email: Email,
    public readonly github: Url | null,
    public readonly linkedin: Url | null,
    public readonly twitter: Url | null,
  ) {}

  static create(props: {
    name: string
    title: string
    taglines: string[]
    bio: string
    email: string
    github?: string
    linkedin?: string
    twitter?: string
  }): Profile {
    if (!Array.isArray(props.taglines) || props.taglines.length === 0) {
      throw new Error("Profile must have at least one tagline")
    }

    const taglines = props.taglines
      .map((tagline) => tagline.trim())
      .filter((tagline) => tagline.length > 0)

    if (taglines.length === 0) {
      throw new Error("Profile taglines cannot be empty strings")
    }

    if (!props.bio.trim()) {
      throw new Error("Profile bio cannot be empty")
    }

    return new Profile(
      new ProfileName(props.name),
      new ProfileTitle(props.title),
      taglines,
      props.bio.trim(),
      new Email(props.email),
      props.github ? new Url(props.github) : null,
      props.linkedin ? new Url(props.linkedin) : null,
      props.twitter ? new Url(props.twitter) : null,
    )
  }

  toJSON() {
    return {
      name: this.name.value,
      title: this.title.value,
      taglines: this.taglines,
      bio: this.bio,
      email: this.email.value,
      github: this.github?.value ?? null,
      linkedin: this.linkedin?.value ?? null,
      twitter: this.twitter?.value ?? null,
    }
  }
}
