export class ProjectId {
  constructor(public readonly value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error("ProjectId cannot be empty")
    }
  }
}
