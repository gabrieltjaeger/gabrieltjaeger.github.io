export class Technology {
  constructor(public readonly value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error("Technology cannot be empty")
    }
  }
}
