"use client";

import FieldErrorMessage from "@/components/shared/a11y/FieldErrorMessage";
import FieldHint from "@/components/shared/a11y/FieldHint";
import type { CheckboxComponentProps } from "@/types/components/antd-types/rhf-field.types";
import {
  fieldControlId,
  fieldErrorId,
  fieldHintId,
  isFieldRequired,
  mergeDescribedBy,
} from "@/utils/a11y/fieldA11y";
import { Checkbox } from "antd";
import type { FieldValues } from "react-hook-form";
import { Controller } from "react-hook-form";

function CheckboxComponent<T extends FieldValues = FieldValues>({
  name,
  control = null,
  label = "",
  hint = "",
  ariaLabel,
  value = false,
  onChange = () => {},
  disabled = false,
  validation = false,
  rules = {},
  containerClassName = "",
  checkboxClassName = "",
  labelClassName = "",
}: CheckboxComponentProps<T>) {
  const controlId = fieldControlId(String(name));
  const errorId = fieldErrorId(String(name));
  const hintId = fieldHintId(String(name));

  const renderCheckbox = (
    checked: boolean,
    onCheckedChange: (next: boolean) => void,
    errorMessage?: string,
  ) => {
    const describedBy = mergeDescribedBy(
      hint ? hintId : undefined,
      errorMessage ? errorId : undefined,
    );
    const accessibleName = label || ariaLabel;

    return (
      <div
        className={`${containerClassName} custom-checkbox-input-container flex flex-col gap-1 font-inter`}
      >
        <FieldHint id={hintId} hint={hint} />
        <Checkbox
          id={controlId}
          checked={checked}
          onChange={(e) => onCheckedChange(e.target.checked)}
          disabled={disabled}
          className={checkboxClassName}
          aria-label={!label ? ariaLabel : undefined}
          aria-invalid={errorMessage ? true : undefined}
          aria-describedby={describedBy}
          aria-required={isFieldRequired(rules, validation) || undefined}
        >
          {accessibleName ? (
            <span
              className={`${labelClassName || ""} text-base text-grey-950 dark:text-slate-100`}
            >
              {label}
              {validation && isFieldRequired(rules, validation) && label ? (
                <>
                  <span className="text-red-600 dark:text-red-400" aria-hidden="true">
                    {" "}
                    *
                  </span>
                  <span className="sr-only"> (required)</span>
                </>
              ) : null}
            </span>
          ) : null}
        </Checkbox>
        <FieldErrorMessage id={errorId} message={errorMessage} />
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
          renderCheckbox(
            Boolean(formValue),
            (next) => formOnChange(next),
            validation ? fieldState.error?.message : undefined,
          )
        }
      />
    );
  }

  return renderCheckbox(value, onChange);
}

export default CheckboxComponent;
