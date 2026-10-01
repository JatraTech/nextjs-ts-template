"use client";

import FieldErrorMessage from "@/components/shared/a11y/FieldErrorMessage";
import FieldHint from "@/components/shared/a11y/FieldHint";
import FieldLabel from "@/components/shared/a11y/FieldLabel";
import type { OTPInputProps } from "@/types/components/antd-types/rhf-field.types";
import {
  fieldControlId,
  fieldErrorId,
  fieldHintId,
  isFieldRequired,
  mergeDescribedBy,
} from "@/utils/a11y/fieldA11y";
import { Input } from "antd";
import type { FieldValues } from "react-hook-form";
import { Controller } from "react-hook-form";

function OTPInput<T extends FieldValues = FieldValues>({
  name,
  control,
  label = "",
  hint = "",
  ariaLabel = "One-time passcode",
  length = 6,
  validation = false,
  rules = {},
  containerClassName = "",
  labelClassName = "",
}: OTPInputProps<T>) {
  const controlId = fieldControlId(String(name));
  const errorId = fieldErrorId(String(name));
  const hintId = fieldHintId(String(name));

  if (!control) {
    return null;
  }

  return (
    <Controller
      name={name}
      control={control}
      rules={validation ? rules : {}}
      render={({ field, fieldState }) => {
        const errorMessage = validation ? fieldState.error?.message : undefined;
        const describedBy = mergeDescribedBy(
          hint ? hintId : undefined,
          errorMessage ? errorId : undefined,
        );

        return (
          <div
            className={`${containerClassName} otp-input flex flex-col gap-2 font-inter`}
          >
            {label ? (
              <FieldLabel
                htmlFor={controlId}
                label={label}
                className={
                  labelClassName ||
                  "text-base font-medium text-grey-950 dark:text-slate-100 font-inter"
                }
                rules={rules}
                validation={validation}
              />
            ) : null}
            <FieldHint id={hintId} hint={hint} />
            <Input.OTP
              {...field}
              id={controlId}
              length={length}
              aria-label={!label ? ariaLabel : undefined}
              aria-invalid={errorMessage ? true : undefined}
              aria-describedby={describedBy}
              aria-required={isFieldRequired(rules, validation) || undefined}
              onKeyDown={(e) => {
                if (e.key.length === 1 && !/[0-9]/.test(e.key)) {
                  e.preventDefault();
                }
              }}
            />
            <FieldErrorMessage id={errorId} message={errorMessage} />
          </div>
        );
      }}
    />
  );
}

export default OTPInput;
