"use client";

import ProtectedRoute from "@/components/shared/ProtectedRoute";
import ButtonFilled from "@/components/shared/Buttons/ButtonFilled";
import ButtonOutlined from "@/components/shared/Buttons/ButtonOutlined";
import TitleHeader from "@/components/shared/Common/TitleHeader";
import { useAuth } from "@/context/AuthContext";
import { useLogoutMutation } from "@/features/auth/hooks";
import { ToastMessage } from "@/utils/ToastMessage";
import { BRAND_LINK_CLASS } from "@/constants/theme";
import Link from "next/link";
import { useRouter } from "next/navigation";

function DashboardContent() {
  const { user, logout: clearSession } = useAuth();
  const router = useRouter();
  const { mutateAsync: logoutMutation, isPending: isLoading } = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutMutation();
    } catch (error) {
      console.warn("Logout API failed:", error);
      clearSession();
    }

    sessionStorage.setItem("justLoggedOut", "1");
    ToastMessage.notifySuccess("Logged out");
    router.push("/login");
  };

  return (
    <div className="container-x px-4 py-12">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center justify-between gap-4">
          <TitleHeader title="Dashboard" back className="!text-3xl" />
          <Link href="/" className={`text-sm ${BRAND_LINK_CLASS}`}>
            Home
          </Link>
        </div>
        <p className="text-slate-500 dark:text-slate-400">
          Wrapped with <code className="text-sm">ProtectedRoute</code>. Replace with your app screens.
        </p>
        {user && (
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 transition-colors">
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Signed in as</p>
            <p className="font-medium text-slate-800 dark:text-slate-100">{user.email}</p>
          </div>
        )}
        <div className="flex gap-3">
          <ButtonOutlined
            text={isLoading ? "Signing out..." : "Sign out"}
            onClick={() => void handleLogout()}
            disabled={isLoading}
            className="!text-base"
          />
          <Link href="/login">
            <ButtonFilled text="Login again" className="!text-base" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
