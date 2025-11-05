export class ProfileTitle {
  constructor(public readonly value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error("ProfileTitle cannot be empty")
    }
    if (value.length > 100) {
      throw new Error("ProfileTitle cannot exceed 100 characters")
    }
  }
}
