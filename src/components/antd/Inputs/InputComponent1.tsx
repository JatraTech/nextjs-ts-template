"use client";

import FieldErrorMessage from "@/components/shared/a11y/FieldErrorMessage";
import FieldHint from "@/components/shared/a11y/FieldHint";
import FieldLabel from "@/components/shared/a11y/FieldLabel";
import type { InputComponent1Props } from "@/types/components/antd-types/rhf-field.types";
import {
  fieldControlId,
  fieldErrorId,
  fieldHintId,
  isFieldRequired,
  mergeDescribedBy,
} from "@/utils/a11y/fieldA11y";
import {
  preventNumberInputWheel,
  resolveInputAffixes,
} from "@/utils/formatValue";
import { Input } from "antd";
import { useEffect, useState } from "react";
import type { FieldValues } from "react-hook-form";
import { Controller } from "react-hook-form";

function InputComponent1<T extends FieldValues = FieldValues>({
  name,
  type = "text",
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
  onKeyDown = () => {},
  onFocus = () => {},
  onBlur = () => {},
  containerClassName = "",
  inputContainerClassName = "",
  inputClassName = "",
  labelClassName = "",
  size,
  style = {},
  prefix = "",
  suffix = "",
  bordered = true,
  numberFormat,
}: InputComponent1Props<T>) {
  const controlId = fieldControlId(String(name));
  const errorId = fieldErrorId(String(name));
  const hintId = fieldHintId(String(name));

  const defaultInputShell = bordered
    ? "border border-shark-700 rounded-md pt-[14px] pb-[14px] pl-[20px] pr-[15px]"
    : "border-b border-b-shark-700 pt-[4px] pb-[4px] pl-[5px] pr-[8px]";
  const inputWrapperClass = inputContainerClassName
    ? `${inputContainerClassName} input-container w-full`
    : `input-container w-full ${defaultInputShell}`;

  const { prefix: resolvedPrefix, suffix: resolvedSuffix } = resolveInputAffixes({
    type,
    numberFormat,
    prefix,
    suffix,
  });
  const handleNumberWheel = preventNumberInputWheel(type);

  const [inputValue, setInputValue] = useState(propValue);

  useEffect(() => {
    setInputValue(propValue);
  }, [propValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onChange(e);
  };

  const renderField = (
    value: string,
    onFieldChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onFieldBlur: () => void,
    errorMessage?: string,
  ) => {
    const describedBy = mergeDescribedBy(
      hint ? hintId : undefined,
      errorMessage ? errorId : undefined,
    );

    return (
      <div
        className={`${containerClassName} flex flex-col gap-[10px] items-start font-inter custom-input-container`}
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
          <div className={inputWrapperClass}>
            <Input
              id={controlId}
              name={String(name)}
              type={type}
              value={value}
              placeholder={placeholder}
              variant="borderless"
              className={`${inputClassName} ${
                disabled ? "cursor-not-allowed opacity-60" : ""
              }`}
              disabled={disabled}
              size={size}
              style={style}
              prefix={resolvedPrefix}
              suffix={resolvedSuffix}
              aria-label={!label ? ariaLabel : undefined}
              aria-invalid={errorMessage ? true : undefined}
              aria-describedby={describedBy}
              aria-required={isFieldRequired(rules, validation) || undefined}
              onWheel={handleNumberWheel}
              onChange={onFieldChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") onKeyDown(e);
              }}
              onFocus={onFocus}
              onBlur={() => {
                onFieldBlur();
              }}
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
              handleChange(e);
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
    handleChange,
    () => {},
  );
}

export default InputComponent1;
