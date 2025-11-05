import type { Profile } from "@/core/entities/Profile"
import type { ProfileRepository } from "../ports/ProfileRepository"

export class GetProfile {
  constructor(private readonly profileRepository: ProfileRepository) {}

  async execute(): Promise<Profile> {
    return await this.profileRepository.get()
  }
}
