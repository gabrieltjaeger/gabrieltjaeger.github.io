import type { Profile } from "@/core/entities/Profile"

export interface ProfileRepository {
  get(): Promise<Profile>
}
