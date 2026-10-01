"use client";

import { useAuth } from "@/context/AuthContext";
import type { ProtectedRouteProps } from "@/types/components/shared-types/layout.types";
import { ToastMessage } from "@/utils/ToastMessage";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SmallLoader from "./Loaders/SmallLoader";

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, isInitialized, user, token, setRedirectPath } = useAuth();
  const [hasCheckedAuth, setHasCheckedAuth] = useState(false);

  useEffect(() => {
    if (!isInitialized) return;

    if (token && !isAuthenticated) {
      const timer = setTimeout(() => {
        setHasCheckedAuth(true);
      }, 500);
      return () => clearTimeout(timer);
    }

    setHasCheckedAuth(true);
  }, [isInitialized, token, isAuthenticated]);

  useEffect(() => {
    if (hasCheckedAuth && isInitialized && !isAuthenticated) {
      const isFromLogout = sessionStorage.getItem("justLoggedOut");

      if (!isFromLogout) {
        setRedirectPath(pathname);
        ToastMessage.notifyError("Please login first to access this page");
        router.push("/login");
      }

      sessionStorage.removeItem("justLoggedOut");
    }
  }, [isAuthenticated, hasCheckedAuth, isInitialized, pathname, setRedirectPath, router]);

  if (!isInitialized || !hasCheckedAuth || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <SmallLoader />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <SmallLoader />
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
