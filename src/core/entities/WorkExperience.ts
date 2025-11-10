import { Url } from "../value-objects/Url"
import { YearMonth } from "../value-objects/YearMonth"

export class WorkExperience {
  constructor(
    public readonly id: string,
    public readonly company: string,
    public readonly role: string,
    public readonly startDate: YearMonth,
    public readonly endDate: YearMonth | null,
    public readonly description: string,
    public readonly achievements: string[],
    public readonly technologies: string[],
    public readonly companyUrl: Url | null,
  ) {}

  static create(props: {
    id: string
    company: string
    role: string
    startDate: string
    endDate?: string | null
    description: string
    achievements: string[]
    technologies: string[]
    companyUrl?: string
  }): WorkExperience {
    if (!props.id.trim()) {
      throw new Error("WorkExperience id cannot be empty")
    }

    if (!props.company.trim()) {
      throw new Error("WorkExperience company cannot be empty")
    }

    if (!props.role.trim()) {
      throw new Error("WorkExperience role cannot be empty")
    }

    if (!props.description.trim()) {
      throw new Error("WorkExperience description cannot be empty")
    }

    if (props.achievements.length === 0) {
      throw new Error("WorkExperience must have at least one achievement")
    }

    const achievements = props.achievements.map((achievement) => {
      const trimmed = achievement.trim()
      if (!trimmed) {
        throw new Error("WorkExperience achievements cannot contain empty entries")
      }
      return trimmed
    })

    const technologies = props.technologies
      .map((technology) => technology.trim())
      .filter((technology) => technology.length > 0)

    if (technologies.length === 0) {
      throw new Error("WorkExperience must list at least one technology")
    }

    return new WorkExperience(
      props.id,
      props.company,
      props.role,
      YearMonth.create(props.startDate),
      props.endDate ? YearMonth.create(props.endDate) : null,
      props.description,
      achievements,
      technologies,
      props.companyUrl ? new Url(props.companyUrl) : null,
    )
  }

  get isCurrent(): boolean {
    return this.endDate === null
  }

  toJSON() {
    return {
      id: this.id,
      company: this.company,
      role: this.role,
      startDate: this.startDate.toString(),
      endDate: this.endDate ? this.endDate.toString() : null,
      description: this.description,
      achievements: this.achievements,
      technologies: this.technologies,
      companyUrl: this.companyUrl?.value ?? null,
    }
  }
}
