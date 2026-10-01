export interface ApiErrorData {
  message?: string;
  error?: string;
  errors?: string[];
  details?: string;
}

export interface FetchBaseQueryErrorLike {
  status?: number;
  data?: ApiErrorData;
  message?: string;
}

export type SetFormError = (message: string) => void;

export interface HandleAsyncOperationOptions {
  setError?: SetFormError | null;
  showToast?: boolean;
  successMessage?: string | null;
  fallbackMessage?: string;
}

export interface AsyncOperationResult<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
