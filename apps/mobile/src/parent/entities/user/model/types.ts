export interface UserProfile {
  name: string;
  age: string;
  phone: string;
}

export interface ChildUser {
  id: string;
  name: string;
  phone: string;
  isOnline?: boolean;
}
