export type UserRole = "PARENT" | "CHILD";

export interface EntryUser {
  id: string;
  role: UserRole | null;
  name?: string;
}
