import type { ChildUser, UserProfile } from "./types";

export const mockUserProfile: UserProfile = {
  name: "김유찬",
  age: "60",
  phone: "010-4610-3405",
};

export const mockChildUsers: ChildUser[] = [
  {
    id: "1",
    name: "김유찬",
    phone: "010-4610-3404",
    isOnline: true,
  },
];
