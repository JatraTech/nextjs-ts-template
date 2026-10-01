"use client";

import FieldErrorMessage from "@/components/shared/a11y/FieldErrorMessage";
import FieldLabel from "@/components/shared/a11y/FieldLabel";
import type { PasswordInputProps } from "@/types/components/antd-types/rhf-field.types";
import {
  fieldControlId,
  fieldErrorId,
  isFieldRequired,
  mergeDescribedBy,
} from "@/utils/a11y/fieldA11y";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Input } from "antd";
import { useState } from "react";
import type { FieldValues } from "react-hook-form";
import { Controller } from "react-hook-form";

function PasswordInput<T extends FieldValues = FieldValues>({
  name,
  control = null,
  value = "",
  onChange = () => {},
  disabled = false,
  placeholder = "Enter your password",
  validation = false,
  rules = {},
  containerClassName = "",
  inputContainerClassName = "",
  inputClassName = "",
  label = "",
  labelClassName = "",
  ariaLabel,
  bordered = true,
}: PasswordInputProps<T>) {
  const controlId = fieldControlId(String(name));
  const errorId = fieldErrorId(String(name));

  const defaultInputShell = bordered
    ? "border border-shark-750 rounded-[10px] pt-[9px] pb-[9px] pl-[9px] pr-[15px]"
    : "border-b border-b-shark-750 pt-[4px] pb-[4px] pl-[5px] pr-[8px]";
  const inputWrapperClass = inputContainerClassName
    ? `${inputContainerClassName} input-container w-full`
    : `input-container w-full ${defaultInputShell}`;

  const [password, setPassword] = useState(value);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setPassword(newValue);
    onChange(newValue);
  };

  const renderPassword = (
    fieldValue: string,
    onValueChange: (value: string) => void,
    onBlur: () => void,
    errorMessage?: string,
  ) => (
    <div
      className={`${containerClassName} custom-password-input-container flex flex-col items-start gap-[10px] font-inter`}
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
      <div className="flex w-full flex-col gap-1">
        <div className={inputWrapperClass}>
          <Input.Password
            id={controlId}
            variant="borderless"
            value={fieldValue}
            onChange={(e) => {
              onValueChange(e.target.value);
              handlePasswordChange(e);
            }}
            onBlur={onBlur}
            disabled={disabled}
            placeholder={placeholder}
            aria-label={!label ? ariaLabel : undefined}
            aria-invalid={errorMessage ? true : undefined}
            aria-describedby={errorMessage ? errorId : undefined}
            aria-required={isFieldRequired(rules, validation) || undefined}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            className={`${inputClassName} password-input-field`}
          />
        </div>
        <FieldErrorMessage id={errorId} message={errorMessage} />
      </div>
    </div>
  );

  if (control) {
    return (
      <Controller
        name={name}
        control={control}
        rules={validation ? rules : {}}
        render={({ field: { onChange: formOnChange, value: formValue, onBlur }, fieldState }) =>
          renderPassword(
            formValue ?? "",
            (next) => formOnChange(next),
            onBlur,
            validation ? fieldState.error?.message : undefined,
          )
        }
      />
    );
  }

  return renderPassword(password, setPassword, () => undefined);
}

export default PasswordInput;
