export class ProjectTitle {
  constructor(public readonly value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error("ProjectTitle cannot be empty")
    }
    if (value.length > 100) {
      throw new Error("ProjectTitle cannot exceed 100 characters")
    }
  }
}
