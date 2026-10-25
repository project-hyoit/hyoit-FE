import type { Me } from "@hyoit/types";

export interface ProfileViewModel {
  name: string;
  age: string;
  phone: string;
  avatarUri?: string;
}

export function toProfileViewModel(profile: Me): ProfileViewModel {
  return {
    name: profile.nickname,
    age: profile.age == null ? "" : String(profile.age),
    phone: profile.phoneNumber ?? "",
    avatarUri: profile.profileImageUrl ?? undefined,
  };
}
