export class ProjectDescription {
  constructor(public readonly value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error("ProjectDescription cannot be empty")
    }
    if (value.length > 500) {
      throw new Error("ProjectDescription cannot exceed 500 characters")
    }
  }
}
