import type { UserRole } from "../auth";

export interface Me {
  id: number;
  name: string;
  role: UserRole | null;
}
