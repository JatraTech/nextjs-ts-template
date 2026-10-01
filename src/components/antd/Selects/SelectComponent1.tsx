"use client";

import FieldErrorMessage from "@/components/shared/a11y/FieldErrorMessage";
import FieldHint from "@/components/shared/a11y/FieldHint";
import FieldLabel from "@/components/shared/a11y/FieldLabel";
import type { SelectComponent1Props } from "@/types/components/antd-types/rhf-field.types";
import {
  fieldControlId,
  fieldErrorId,
  fieldHintId,
  isFieldRequired,
  mergeDescribedBy,
} from "@/utils/a11y/fieldA11y";
import { Select } from "antd";
import type { SelectProps } from "antd";
import { useEffect, useState, type ReactNode } from "react";
import type { FieldValues } from "react-hook-form";
import { Controller } from "react-hook-form";

const { Option } = Select;

function normalizeSelectValue(value: unknown): string | number | undefined {
  if (value === null || value === undefined || value === "") {
    return undefined;
  }
  return value as string | number;
}

function defaultFilterOption(input: string, option?: unknown) {
  const record = option as { children?: unknown } | undefined;
  const label = record?.children;
  const text =
    typeof label === "string" || typeof label === "number"
      ? String(label)
      : "";
  return text.toLowerCase().includes(input.trim().toLowerCase());
}

function mergeSelectClassNames(
  popupClassName: string,
  classNames?: SelectProps["classNames"],
): SelectProps["classNames"] | undefined {
  if (!popupClassName && !classNames) {
    return undefined;
  }

  const popupFromProp =
    classNames && typeof classNames === "object" && "popup" in classNames
      ? classNames.popup
      : undefined;
  const popupRootFromProp =
    popupFromProp && typeof popupFromProp === "object" && "root" in popupFromProp
      ? String(popupFromProp.root ?? "")
      : "";

  const popupRoot = [popupRootFromProp, popupClassName].filter(Boolean).join(" ");

  return {
    ...(classNames && typeof classNames === "object" ? classNames : {}),
    ...(popupRoot
      ? {
          popup: {
            ...(typeof popupFromProp === "object" ? popupFromProp : {}),
            root: popupRoot,
          },
        }
      : {}),
  };
}

function SelectComponent1<T extends FieldValues = FieldValues>({
  options = [],
  labelTag = "display_name",
  valueTag = "id",
  placeholder = "Select Field",
  defaultValue = null,
  name,
  control,
  onChange,
  selectContainerClassName = "",
  selectClassName = "",
  label = "",
  hint = "",
  ariaLabel,
  labelClassName = "",
  popupClassName = "",
  classNames: classNamesProp,
  validation = false,
  rules = {},
  showSearch = true,
  filterOption = defaultFilterOption,
  optionFilterProp = "children",
  bordered = true,
  allowClear = true,
  ...props
}: SelectComponent1Props<T>) {
  const controlId = fieldControlId(String(name));
  const errorId = fieldErrorId(String(name));
  const hintId = fieldHintId(String(name));

  const [selectedValue, setSelectedValue] = useState<string | number | null>(
    defaultValue,
  );

  const handleChange = (value: string | number | null) => {
    setSelectedValue(value);
    onChange?.(value);
  };

  useEffect(() => {
    if (defaultValue !== null && defaultValue !== undefined) {
      setSelectedValue(defaultValue);
    }
  }, [defaultValue]);

  const { popupClassName: popupClassNameProp, classNames: classNamesFromRest, ...restSelectProps } =
    props as SelectComponent1Props<T> & {
      popupClassName?: string;
      classNames?: SelectProps["classNames"];
    };

  const selectCommonProps = {
    ...restSelectProps,
    variant: "borderless" as const,
    placeholder,
    notFoundContent: "No data",
    showSearch,
    filterOption,
    optionFilterProp,
    autoClearSearchValue: true,
    allowClear,
    classNames: mergeSelectClassNames(
      popupClassName || popupClassNameProp || "",
      classNamesProp ?? classNamesFromRest,
    ),
  };

  const optionNodes = options.map((option) => (
    <Option key={option[valueTag]} value={option[valueTag]}>
      {option[labelTag]}
    </Option>
  ));

  const shellBorderClass = bordered
    ? "rounded-md border border-shark-700 pb-[12px] pl-[20px] pr-[15px] pt-[12px] dark:border-slate-600"
    : "";

  const shell = (select: ReactNode) => (
    <div
      className={`${selectClassName} custom-select-container w-full ${shellBorderClass}`}
    >
      {select}
    </div>
  );

  const renderSelectField = (
    value: unknown,
    onValueChange: (next: string | number | null) => void,
    errorMessage?: string,
  ) => {
    const describedBy = mergeDescribedBy(
      hint ? hintId : undefined,
      errorMessage ? errorId : undefined,
    );

    return (
      <div
        className={`${selectContainerClassName} custom-select-input-container flex flex-col items-start gap-[10px] font-inter`}
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
          {shell(
            <Select
              {...selectCommonProps}
              id={controlId}
              value={normalizeSelectValue(value)}
              aria-label={!label ? ariaLabel : undefined}
              aria-invalid={errorMessage ? true : undefined}
              aria-describedby={describedBy}
              aria-required={isFieldRequired(rules, validation) || undefined}
              onChange={(next) => {
                onValueChange(next ?? null);
              }}
            >
              {optionNodes}
            </Select>,
          )}
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
          renderSelectField(
            formValue,
            (next) => {
              formOnChange(next ?? "");
              handleChange(next);
            },
            validation ? fieldState.error?.message : undefined,
          )
        }
      />
    );
  }

  return renderSelectField(selectedValue, handleChange);
}

export default SelectComponent1;
