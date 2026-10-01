export interface LoginFormValues {
  email: string;
  password: string;
}

import type { Dayjs } from "dayjs";

export interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
  role?: string;
  dateOfBirth?: Dayjs | null;
}

export interface AuthCallbackSearchParams {
  token: string | null;
  error: string | null;
}
