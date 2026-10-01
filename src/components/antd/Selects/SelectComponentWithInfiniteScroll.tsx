"use client";

import InfiniteSearchSelect from "@/components/antd/Selects/InfiniteSearchSelect";
import FieldErrorMessage from "@/components/shared/a11y/FieldErrorMessage";
import FieldHint from "@/components/shared/a11y/FieldHint";
import FieldLabel from "@/components/shared/a11y/FieldLabel";
import type { SelectComponentWithInfiniteScrollProps } from "@/types/components/antd-types/infinite-select.types";
import {
  fieldControlId,
  fieldErrorId,
  fieldHintId,
  isFieldRequired,
  mergeDescribedBy,
} from "@/utils/a11y/fieldA11y";
import { useEffect, useState } from "react";
import type { FieldValues } from "react-hook-form";
import { Controller } from "react-hook-form";

function SelectComponentWithInfiniteScroll<
  T extends FieldValues = FieldValues,
  TValue extends string | number = string | number,
>({
  name,
  control,
  label = "",
  hint = "",
  ariaLabel,
  labelClassName = "",
  placeholder = "Select",
  validation = false,
  rules = {},
  selectContainerClassName = "",
  selectClassName = "",
  popupClassName = "",
  bordered = true,
  value: controlledValue,
  onChange: controlledOnChange,
  options,
  loading,
  loadingMore,
  hasMore,
  onSearch,
  onScrollEnd,
  disabled,
  ...infiniteProps
}: SelectComponentWithInfiniteScrollProps<T, TValue>) {
  const controlId = fieldControlId(String(name));
  const errorId = fieldErrorId(String(name));
  const hintId = fieldHintId(String(name));

  const [internalValue, setInternalValue] = useState<TValue | null>(
    controlledValue ?? null,
  );

  useEffect(() => {
    if (controlledValue !== undefined) {
      setInternalValue(controlledValue);
    }
  }, [controlledValue]);

  const shellClass = bordered
    ? `${selectClassName} custom-select-container w-full border border-shark-700 dark:border-slate-600 rounded-md pt-[12px] pb-[12px] pl-[20px] pr-[15px] bg-white dark:bg-slate-800`
    : `${selectClassName} custom-select-container w-full`;

  const renderInfinite = (
    value: TValue | null,
    onValueChange: (next: TValue | null) => void,
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
          <div className={shellClass}>
            <InfiniteSearchSelect<TValue>
              {...infiniteProps}
              id={controlId}
              ariaLabel={!label ? ariaLabel : undefined}
              ariaDescribedBy={describedBy}
              ariaInvalid={errorMessage ? true : undefined}
              ariaRequired={isFieldRequired(rules, validation) || undefined}
              options={options}
              loading={loading}
              loadingMore={loadingMore}
              hasMore={hasMore}
              onSearch={onSearch}
              onScrollEnd={onScrollEnd}
              placeholder={placeholder}
              disabled={disabled}
              value={value}
              onChange={onValueChange}
              className={`w-full font-inter ${popupClassName}`}
              showAvatar={infiniteProps.showAvatar ?? false}
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
        render={({ field: { onChange: formOnChange, value: formValue }, fieldState }) =>
          renderInfinite(
            (formValue ?? null) as TValue | null,
            (next) => {
              formOnChange(next);
              setInternalValue(next);
              controlledOnChange?.(next);
            },
            validation ? fieldState.error?.message : undefined,
          )
        }
      />
    );
  }

  return renderInfinite(internalValue, (next) => {
    setInternalValue(next);
    controlledOnChange?.(next);
  });
}

export default SelectComponentWithInfiniteScroll;
