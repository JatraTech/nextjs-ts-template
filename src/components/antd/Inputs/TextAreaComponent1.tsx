"use client";

import FieldErrorMessage from "@/components/shared/a11y/FieldErrorMessage";
import FieldHint from "@/components/shared/a11y/FieldHint";
import FieldLabel from "@/components/shared/a11y/FieldLabel";
import type { TextAreaComponent1Props } from "@/types/components/antd-types/rhf-field.types";
import {
  fieldControlId,
  fieldErrorId,
  fieldHintId,
  isFieldRequired,
  mergeDescribedBy,
} from "@/utils/a11y/fieldA11y";
import { Input } from "antd";
import { useEffect, useState } from "react";
import type { FieldValues } from "react-hook-form";
import { Controller } from "react-hook-form";

const { TextArea } = Input;

function TextAreaComponent1<T extends FieldValues = FieldValues>({
  name,
  control = null,
  label = "",
  hint = "",
  ariaLabel,
  placeholder = "",
  defaultValue = "",
  validation = false,
  rules = {},
  disabled = false,
  value: propValue = "",
  onChange = () => {},
  containerClassName = "",
  inputContainerClassName = "",
  inputClassName = "",
  labelClassName = "",
  size,
  style = {},
  bordered = true,
  rows = 4,
}: TextAreaComponent1Props<T>) {
  const controlId = fieldControlId(String(name));
  const errorId = fieldErrorId(String(name));
  const hintId = fieldHintId(String(name));

  const [inputValue, setInputValue] = useState(propValue);

  useEffect(() => {
    setInputValue(propValue);
  }, [propValue]);

  const shellClass = bordered
    ? "border border-shark-700 rounded-md pt-[14px] pb-[14px] pl-[20px] pr-[15px] dark:border-slate-600"
    : "border-b border-b-shark-700 pt-[4px] pb-[4px] pl-[5px] pr-[8px]";

  const renderField = (
    value: string,
    onFieldChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void,
    onFieldBlur: () => void,
    errorMessage?: string,
  ) => {
    const describedBy = mergeDescribedBy(
      hint ? hintId : undefined,
      errorMessage ? errorId : undefined,
    );

    return (
      <div
        className={`${containerClassName} custom-input-container flex flex-col items-start gap-[10px] font-inter`}
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
          <div className={`${inputContainerClassName} input-container w-full ${shellClass}`}>
            <TextArea
              id={controlId}
              name={String(name)}
              value={value}
              placeholder={placeholder}
              variant="borderless"
              disabled={disabled}
              size={size}
              rows={rows}
              aria-label={!label ? ariaLabel : undefined}
              aria-invalid={errorMessage ? true : undefined}
              aria-describedby={describedBy}
              aria-required={isFieldRequired(rules, validation) || undefined}
              className={`${inputClassName} ${disabled ? "cursor-not-allowed opacity-60" : ""}`}
              style={{ ...style, resize: "none" }}
              onChange={onFieldChange}
              onBlur={onFieldBlur}
            />
          </div>
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
        render={({ field, fieldState }) =>
          renderField(
            field.value ?? "",
            (e) => {
              field.onChange(e);
              setInputValue(e.target.value);
              onChange(e);
            },
            () => field.onBlur(),
            validation ? fieldState.error?.message : undefined,
          )
        }
      />
    );
  }

  return renderField(
    inputValue,
    (e) => {
      setInputValue(e.target.value);
      onChange(e);
    },
    () => {},
  );
}

export default TextAreaComponent1;
