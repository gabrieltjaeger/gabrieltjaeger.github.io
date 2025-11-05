export class ProfileName {
  constructor(public readonly value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error("ProfileName cannot be empty")
    }
    if (value.length > 100) {
      throw new Error("ProfileName cannot exceed 100 characters")
    }
  }
}
