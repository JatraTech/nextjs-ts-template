"use client";

import DatePickerComponent1 from "@/components/antd/Inputs/DatePickerComponent1";
import InputComponent1 from "@/components/antd/Inputs/InputComponent1";
import PasswordInput from "@/components/antd/Inputs/PasswordInput";
import SelectComponent1 from "@/components/antd/Selects/SelectComponent1";
import ButtonFilled from "@/components/shared/Buttons/ButtonFilled";
import BackIcon from "@/components/shared/Common/BackIcon";
import { useAuth } from "@/context/AuthContext";
import { useRegisterMutation } from "@/features/auth/hooks";
import type { RegisterFormValues } from "@/types/auth";
import { handleApiError, handleApiSuccess } from "@/utils/errorHandler";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { FIELD_LABEL_CLASS, INPUT_SHELL } from "@/constants/inputShell";
import { BRAND_LINK_CLASS } from "@/constants/theme";

const roleOptions = [
  { id: "user", display_name: "User" },
  { id: "admin", display_name: "Admin" },
];

export default function RegisterPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { mutateAsync: register, isPending: isLoading } = useRegisterMutation();
  const { control, handleSubmit } = useForm<RegisterFormValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: undefined,
      dateOfBirth: null,
    },
  });

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/dashboard");
    }
  }, [isAuthenticated, router]);

  const onSubmit = async (values: RegisterFormValues) => {
    const { dateOfBirth: _dateOfBirth, ...payload } = values;
    try {
      await register({
        name: payload.name,
        email: payload.email,
        password: payload.password,
        role: payload.role ?? "user",
      });
      handleApiSuccess(null, "Registration successful. Please sign in.");
      router.push("/login");
    } catch (err) {
      handleApiError(err);
    }
  };

  return (
    <div className="auth-shell">
      <div className="auth-card max-w-lg">
        <div className="flex items-center gap-3 mb-6">
          <BackIcon />
          <h1 className="text-2xl font-bold text-grey-950 dark:text-slate-100 font-inter">Create account</h1>
        </div>
        <p className="text-slate-500 dark:text-slate-400 mb-6">
          Already have an account?{" "}
          <Link href="/login" className={BRAND_LINK_CLASS}>
            Sign in
          </Link>
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <InputComponent1
            name="name"
            label="Full name"
            labelClassName={FIELD_LABEL_CLASS}
            placeholder="Your name"
            control={control}
            validation
            rules={{ required: "Name is required" }}
            inputContainerClassName={INPUT_SHELL}
          />
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
            rules={{
              required: "Password is required",
              minLength: { value: 6, message: "Password must be at least 6 characters" },
            }}
            containerClassName="flex-col gap-[10px] !items-start"
            inputContainerClassName={INPUT_SHELL}
          />
          <SelectComponent1
            name="role"
            control={control}
            label="Role"
            labelClassName={FIELD_LABEL_CLASS}
            placeholder="Select role"
            options={roleOptions}
            validation
            rules={{ required: "Role is required" }}
            bordered={false}
            selectClassName={`custom-select-container w-full ${INPUT_SHELL}`}
          />
          <DatePickerComponent1
            name="dateOfBirth"
            label="Date of birth"
            labelClassName={FIELD_LABEL_CLASS}
            placeholder="Select date"
            control={control}
            bordered={false}
            inputContainerClassName={INPUT_SHELL}
          />
          <ButtonFilled type="submit" text="Register" loading={isLoading} disabled={isLoading} />
        </form>
      </div>
    </div>
  );
}
