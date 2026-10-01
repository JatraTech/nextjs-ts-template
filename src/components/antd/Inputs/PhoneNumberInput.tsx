"use client";

import FieldErrorMessage from "@/components/shared/a11y/FieldErrorMessage";
import FieldHint from "@/components/shared/a11y/FieldHint";
import FieldLabel from "@/components/shared/a11y/FieldLabel";
import type { PhoneNumberInputProps } from "@/types/components/antd-types/rhf-field.types";
import {
  fieldControlId,
  fieldErrorId,
  fieldHintId,
  isFieldRequired,
  mergeDescribedBy,
} from "@/utils/a11y/fieldA11y";
import { useState } from "react";
import type { FieldValues } from "react-hook-form";
import { Controller } from "react-hook-form";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

function PhoneNumberInput<T extends FieldValues = FieldValues>({
  name,
  control = null,
  value = "",
  label = "",
  hint = "",
  ariaLabel,
  onChange = () => {},
  disabled = false,
  defaultCountry = "bd",
  validation = false,
  rules = {},
  containerClassName = "",
  inputClassName = "",
  labelClassName = "",
}: PhoneNumberInputProps<T>) {
  const controlId = fieldControlId(String(name));
  const errorId = fieldErrorId(String(name));
  const hintId = fieldHintId(String(name));

  const [phoneNumber, setPhoneNumber] = useState(value);

  const renderPhone = (
    fieldValue: string,
    onValueChange: (phone: string) => void,
    errorMessage?: string,
  ) => {
    const describedBy = mergeDescribedBy(
      hint ? hintId : undefined,
      errorMessage ? errorId : undefined,
    );

    return (
      <div
        className={`${containerClassName} custom-phone-input-container flex flex-col items-start gap-[10px] font-inter`}
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
          <FieldHint id={hintId} hint={hint} />
          <PhoneInput
            defaultCountry={defaultCountry}
            value={fieldValue}
            onChange={onValueChange}
            disabled={disabled}
            inputClassName={`${inputClassName} custom-phone-input-field`}
            inputStyle={{ width: "100%" }}
            inputProps={{
              id: controlId,
              name: String(name),
              "aria-label": !label ? ariaLabel : undefined,
              "aria-invalid": errorMessage ? true : undefined,
              "aria-describedby": describedBy,
              "aria-required": isFieldRequired(rules, validation) || undefined,
            }}
          />
          <FieldErrorMessage id={errorId} message={errorMessage} />
        </div>
      </div>
    );
  };

  if (control) {
    return (
      <Controller
        name={name}
        control={control}
        rules={validation ? rules : {}}
        render={({ field: { onChange: formOnChange, value: formValue }, fieldState }) =>
          renderPhone(
            formValue ?? "",
            (phone) => {
              formOnChange(phone);
              setPhoneNumber(phone);
              onChange(phone);
            },
            validation ? fieldState.error?.message : undefined,
          )
        }
      />
    );
  }

  return renderPhone(phoneNumber, (phone) => {
    setPhoneNumber(phone);
    onChange(phone);
  });
}

export default PhoneNumberInput;
