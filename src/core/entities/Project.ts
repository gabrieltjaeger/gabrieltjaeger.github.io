import { ProjectId } from "../value-objects/ProjectId"
import { ProjectTitle } from "../value-objects/ProjectTitle"
import { ProjectDescription } from "../value-objects/ProjectDescription"
import { Technology } from "../value-objects/Technology"
import { Url } from "../value-objects/Url"

export class Project {
  constructor(
    public readonly id: ProjectId,
    public readonly title: ProjectTitle,
    public readonly description: ProjectDescription,
    public readonly technologies: Technology[],
    public readonly githubUrl: Url | null,
    public readonly liveUrl: Url | null,
    public readonly featured: boolean,
  ) {}

  static create(props: {
    id: string
    title: string
    description: string
    technologies: string[]
    githubUrl?: string
    liveUrl?: string
    featured?: boolean
  }): Project {
    if (props.technologies.length === 0) {
      throw new Error("Project must define at least one technology")
    }

    return new Project(
      new ProjectId(props.id),
      new ProjectTitle(props.title),
      new ProjectDescription(props.description),
      props.technologies.map((tech) => new Technology(tech)),
      props.githubUrl ? new Url(props.githubUrl) : null,
      props.liveUrl ? new Url(props.liveUrl) : null,
      props.featured ?? false,
    )
  }

  toJSON() {
    return {
      id: this.id.value,
      title: this.title.value,
      description: this.description.value,
      technologies: this.technologies.map((tech) => tech.value),
      githubUrl: this.githubUrl?.value ?? null,
      liveUrl: this.liveUrl?.value ?? null,
      featured: this.featured,
    }
  }
}
