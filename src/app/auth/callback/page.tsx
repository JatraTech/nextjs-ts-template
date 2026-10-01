"use client";

import FullScreenLoader from "@/components/shared/Loader/FullScreenLoader";
import { useAuth } from "@/context/AuthContext";
import { fetchCurrentUser } from "@/features/auth/api/auth.api";
import { isApiError } from "@/lib/api/apiError";
import { setAuthToken, clearAuthStorage } from "@/lib/auth/tokenStorage";
import { ToastMessage } from "@/utils/ToastMessage";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function AuthCallbackContent() {
  const router = useRouter();
  const { setCredentials } = useAuth();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      const token = searchParams.get("token");
      const authError = searchParams.get("error");

      if (authError) {
        const message = `Authentication failed: ${authError.replace(/_/g, " ")}`;
        setError(message);
        ToastMessage.notifyError(message);
        setTimeout(() => router.push("/login"), 3000);
        return;
      }

      if (!token) {
        setError("Missing authentication token");
        ToastMessage.notifyError("Missing authentication token");
        setTimeout(() => router.push("/login"), 3000);
        return;
      }

      setAuthToken(token);

      try {
        const userData = await fetchCurrentUser();
        setCredentials({ user: userData, token });
        ToastMessage.notifySuccess("Login successful");
        router.replace("/dashboard");
      } catch (fetchError) {
        clearAuthStorage();
        const errorMsg = isApiError(fetchError) && fetchError.status === 401
          ? "Session expired. Please sign in again."
          : (fetchError as Error)?.message || "Failed to load user profile.";
        setError(errorMsg);
        ToastMessage.notifyError(errorMsg);
        setTimeout(() => router.push("/login"), 3000);
      }
    };

    void handleCallback();
  }, [router, searchParams, setCredentials]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-md text-center space-y-4">
          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">Authentication error</h2>
          <p className="text-slate-500 dark:text-slate-400">{error}</p>
          <button
            type="button"
            onClick={() => router.push("/login")}
            className="px-6 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
          >
            Go to login
          </button>
        </div>
      </div>
    );
  }

  return <FullScreenLoader />;
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={<FullScreenLoader />}>
      <AuthCallbackContent />
    </Suspense>
  );
}
