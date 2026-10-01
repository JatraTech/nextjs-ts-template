"use client";

import InputComponent1 from "@/components/antd/Inputs/InputComponent1";
import PasswordInput from "@/components/antd/Inputs/PasswordInput";
import ButtonFilled from "@/components/shared/Buttons/ButtonFilled";
import BackIcon from "@/components/shared/Common/BackIcon";
import { useAuth } from "@/context/AuthContext";
import { useLoginMutation } from "@/features/auth/hooks";
import type { LoginFormValues } from "@/types/auth";
import { handleApiError, handleApiSuccess } from "@/utils/errorHandler";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { FIELD_LABEL_CLASS, INPUT_SHELL } from "@/constants/inputShell";
import { BRAND_LINK_CLASS } from "@/constants/theme";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState("");

  const { control, handleSubmit } = useForm<LoginFormValues>({
    defaultValues: { email: "", password: "" },
  });

  const { mutateAsync: login, isPending: isLoading } = useLoginMutation();
  const { isAuthenticated, redirectPath, clearRedirectPath } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      const targetPath = redirectPath || "/dashboard";
      clearRedirectPath();
      router.replace(targetPath);
    }
  }, [isAuthenticated, redirectPath, router, clearRedirectPath]);

  useEffect(() => {
    const errorParam = searchParams.get("error");
    if (errorParam) {
      setError(errorParam.replace(/_/g, " "));
    }
  }, [searchParams]);

  const onSubmit = async (values: LoginFormValues) => {
    setError("");
    try {
      const { response } = await login(values);
      handleApiSuccess(response, "Login successful");
      router.replace(redirectPath || "/dashboard");
    } catch (err) {
      handleApiError(err);
      setError(
        (err as { data?: { message?: string }; message?: string })?.data?.message ||
          (err as Error)?.message ||
          "Login failed",
      );
    }
  };

  return (
    <div className="auth-shell">
      <div className="auth-card max-w-lg">
        <div className="flex items-center gap-3 mb-6">
          <BackIcon />
          <h1 className="text-2xl font-bold text-grey-950 dark:text-slate-100 font-inter">Sign in</h1>
        </div>
        <p className="text-slate-500 dark:text-slate-400 mb-6">
          Use your API credentials.{" "}
          <Link href="/register" className={BRAND_LINK_CLASS}>
            Create an account
          </Link>
        </p>

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 dark:bg-red-950/50 text-red-700 dark:text-red-300 px-4 py-3 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <InputComponent1
            name="email"
            label="Email"
            labelClassName={FIELD_LABEL_CLASS}
            type="email"
            placeholder="Email"
            control={control}
            validation
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email address",
              },
            }}
            inputContainerClassName={INPUT_SHELL}
          />
          <PasswordInput
            name="password"
            label="Password"
            labelClassName={FIELD_LABEL_CLASS}
            control={control}
            validation
            placeholder="Password"
            rules={{ required: "Password is required" }}
            containerClassName="flex-col gap-[10px] !items-start"
            inputContainerClassName={INPUT_SHELL}
          />
          <ButtonFilled type="submit" text="Sign in" loading={isLoading} disabled={isLoading} />
        </form>
      </div>
    </div>
  );
}
