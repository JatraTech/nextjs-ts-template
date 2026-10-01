export interface User {
  id: string | number;
  email: string;
  name?: string;
  role?: string;
  createdAt?: string;
  updatedAt?: string;
  created_at?: string;
  updated_at?: string;
  [key: string]: unknown;
}
