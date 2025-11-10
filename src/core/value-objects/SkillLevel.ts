const ALLOWED_LEVELS = ["beginner", "intermediate", "advanced", "expert"] as const
export type SkillLevelValue = (typeof ALLOWED_LEVELS)[number]

export class SkillLevel {
  private constructor(public readonly value: SkillLevelValue) {}

  static fromString(level: string): SkillLevel {
    if (ALLOWED_LEVELS.includes(level as SkillLevelValue)) {
      return new SkillLevel(level as SkillLevelValue)
    }

    throw new Error(
      `Invalid skill level "${level}". Expected one of: ${ALLOWED_LEVELS.join(", ")}`,
    )
  }

  toString(): SkillLevelValue {
    return this.value
  }

  equals(other: SkillLevel): boolean {
    return this.value === other.value
  }
}
