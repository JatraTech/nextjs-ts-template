import { isApiError } from "@/lib/api/apiError";
import type {
  AsyncOperationResult,
  FetchBaseQueryErrorLike,
  HandleAsyncOperationOptions,
  SetFormError,
} from "@/types/api";
import { ToastMessage } from "./ToastMessage";

export const handleApiError = (
  error: FetchBaseQueryErrorLike | Error | string | unknown,
  setError: SetFormError | null = null,
  showToast = true,
  fallbackMessage = "Something went wrong. Please try again."
): string => {
  console.error("API Error:", error);

  let errorMessage = fallbackMessage;

  if (isApiError(error)) {
    errorMessage = error.message || fallbackMessage;
  } else {
  const err = error as FetchBaseQueryErrorLike;

  if (err?.data) {
    if (err.data.message) {
      errorMessage = err.data.message;
    } else if (err.data.error) {
      errorMessage = err.data.error;
    } else if (Array.isArray(err.data.errors)) {
      errorMessage = err.data.errors.join(", ");
    } else if (err.data.details) {
      errorMessage = err.data.details;
    }
  } else if (err?.message) {
    errorMessage = err.message;
  } else if (typeof error === "string") {
    errorMessage = error;
  }
  }

  if (setError) {
    setError(errorMessage);
  }

  if (showToast) {
    ToastMessage.notifyError(errorMessage);
  }

  return errorMessage;
};

export const handleApiSuccess = (
  response: unknown,
  successMessage: string,
  showToast = true
): void => {
  if (showToast) {
    ToastMessage.notifySuccess(successMessage);
  }
  console.log("API Success:", response);
};

export const handleAsyncOperation = async <T>(
  asyncOperation: () => Promise<T>,
  options: HandleAsyncOperationOptions = {}
): Promise<AsyncOperationResult<T>> => {
  const {
    setError = null,
    showToast = true,
    successMessage = null,
    fallbackMessage = "Something went wrong. Please try again.",
  } = options;

  try {
    const result = await asyncOperation();

    if (successMessage) {
      handleApiSuccess(result, successMessage, showToast);
    }

    return { success: true, data: result };
  } catch (error) {
    const errorMessage = handleApiError(error, setError, showToast, fallbackMessage);
    return { success: false, error: errorMessage };
  }
};
