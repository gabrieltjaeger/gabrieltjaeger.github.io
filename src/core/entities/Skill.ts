import { SkillLevel, type SkillLevelValue } from "../value-objects/SkillLevel"

export class Skill {
  constructor(
    public readonly name: string,
    public readonly category: string,
    public readonly level: SkillLevel,
    public readonly yearsOfExperience?: number,
  ) {}

  static create(props: {
    name: string
    category: string
    level: SkillLevelValue | string
    yearsOfExperience?: number
  }): Skill {
    if (!props.name.trim()) {
      throw new Error("Skill name cannot be empty")
    }

    if (!props.category.trim()) {
      throw new Error("Skill category cannot be empty")
    }

    if (props.yearsOfExperience !== undefined && props.yearsOfExperience < 0) {
      throw new Error("Skill yearsOfExperience cannot be negative")
    }

    return new Skill(
      props.name.trim(),
      props.category.trim(),
      SkillLevel.fromString(props.level),
      props.yearsOfExperience,
    )
  }

  toJSON() {
    return {
      name: this.name,
      category: this.category,
      level: this.level.toString(),
      yearsOfExperience: this.yearsOfExperience,
    }
  }

  get levelValue(): SkillLevelValue {
    return this.level.toString()
  }
}
