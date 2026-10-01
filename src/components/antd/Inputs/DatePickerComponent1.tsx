"use client";

import FieldErrorMessage from "@/components/shared/a11y/FieldErrorMessage";
import FieldHint from "@/components/shared/a11y/FieldHint";
import FieldLabel from "@/components/shared/a11y/FieldLabel";
import type { DatePickerComponent1Props } from "@/types/components/antd-types/rhf-field.types";
import { DATE_TIME_PICKER_FORMAT } from "@/constants/dateTime";
import {
  fieldControlId,
  fieldErrorId,
  fieldHintId,
  isFieldRequired,
  mergeDescribedBy,
} from "@/utils/a11y/fieldA11y";
import { DatePicker } from "antd";
import dayjs, { type Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import type { FieldValues } from "react-hook-form";
import { Controller } from "react-hook-form";

function toDayjs(value: unknown): Dayjs | null {
  if (value == null || value === "") return null;
  if (dayjs.isDayjs(value)) return value;
  return dayjs(value as string | Date);
}

function DatePickerComponent1<T extends FieldValues = FieldValues>({
  name,
  control = null,
  label = "",
  hint = "",
  ariaLabel,
  placeholder = "YYYY-MM-DD",
  validation = false,
  rules = {},
  disabled = false,
  value: propValue = null,
  onChange = () => {},
  containerClassName = "",
  inputContainerClassName = "",
  datePickerClassName = "",
  labelClassName = "",
  size = "middle",
  style = {},
  bordered = true,
  format = DATE_TIME_PICKER_FORMAT,
  suffixIcon,
}: DatePickerComponent1Props<T>) {
  const controlId = fieldControlId(String(name));
  const errorId = fieldErrorId(String(name));
  const hintId = fieldHintId(String(name));

  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(
    toDayjs(propValue),
  );

  useEffect(() => {
    setSelectedDate(toDayjs(propValue));
  }, [propValue]);

  const shellClass = bordered
    ? "border border-shark-700 rounded-sm pt-[5px] pb-[5px] pl-[5px] pr-[5px] dark:border-slate-600"
    : "";

  const renderPicker = (
    value: Dayjs | null,
    onValueChange: (date: Dayjs | null) => void,
    errorMessage?: string,
  ) => {
    const describedBy = mergeDescribedBy(
      hint ? hintId : undefined,
      errorMessage ? errorId : undefined,
    );

    return (
      <div
        className={`${containerClassName} custom-date-picker-container flex flex-col items-start gap-[10px] font-inter`}
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
          <div
            className={`${inputContainerClassName} date-picker-container w-full ${shellClass}`}
          >
            <DatePicker
              id={controlId}
              className={`${datePickerClassName} w-full ${disabled ? "cursor-not-allowed opacity-60" : ""}`}
              placeholder={placeholder}
              format={format}
              disabled={disabled}
              size={size}
              style={style}
              suffixIcon={suffixIcon}
              value={value}
              aria-label={!label ? ariaLabel : undefined}
              aria-invalid={errorMessage ? true : undefined}
              aria-describedby={describedBy}
              aria-required={isFieldRequired(rules, validation) || undefined}
              onChange={(date) => {
                onValueChange(date);
                onChange(date, date ? date.format(format) : "");
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
          renderPicker(
            field.value ? toDayjs(field.value) : null,
            (date) => field.onChange(date),
            validation ? fieldState.error?.message : undefined,
          )
        }
      />
    );
  }

  return renderPicker(selectedDate, (date) => {
    setSelectedDate(date);
  });
}

export default DatePickerComponent1;
