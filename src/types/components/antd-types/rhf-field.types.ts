import type { NumberDisplayFormat } from "@/utils/formatValue";
import type { Control, FieldValues, Path, RegisterOptions } from "react-hook-form";
import type { SelectProps } from "antd";
import type { CSSProperties, ReactNode } from "react";

export interface RhfFieldBaseProps<T extends FieldValues = FieldValues> {
  name: Path<T>;
  control?: Control<T> | null;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  validation?: boolean;
  rules?: RegisterOptions<T>;
  containerClassName?: string;
  labelClassName?: string;
  /** Helper text linked with aria-describedby. */
  hint?: string;
  /** When no visible label; do not use if `label` is set. */
  ariaLabel?: string;
}

export interface InputComponent1Props<T extends FieldValues = FieldValues>
  extends RhfFieldBaseProps<T> {
  type?: string;
  defaultValue?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  inputContainerClassName?: string;
  inputClassName?: string;
  size?: "large" | "middle" | "small";
  style?: CSSProperties;
  prefix?: ReactNode;
  suffix?: ReactNode;
  bordered?: boolean;
  /** When `type="number"`: `$` prefix for currency, `%` suffix for percent (overridable via prefix/suffix). */
  numberFormat?: NumberDisplayFormat;
}

export interface PasswordInputProps<T extends FieldValues = FieldValues>
  extends RhfFieldBaseProps<T> {
  value?: string;
  onChange?: (value: string) => void;
  inputContainerClassName?: string;
  inputClassName?: string;
  bordered?: boolean;
}

export interface SelectOptionRecord {
  [key: string]: string | number;
}

export interface SelectComponent1Props<T extends FieldValues = FieldValues>
  extends RhfFieldBaseProps<T> {
  options?: SelectOptionRecord[];
  labelTag?: string;
  valueTag?: string;
  defaultValue?: string | number | null;
  onChange?: (value: string | number | null) => void;
  selectContainerClassName?: string;
  selectClassName?: string;
  /** @deprecated Prefer `classNames.popup.root` — mapped internally for compatibility. */
  popupClassName?: string;
  classNames?: SelectProps["classNames"];
  showSearch?: boolean;
  filterOption?: boolean | ((input: string, option?: unknown) => boolean);
  optionFilterProp?: string;
  bordered?: boolean;
  /** Show clear (×) control when a value is selected. Default: `true`. */
  allowClear?: boolean;
}

export interface TextAreaComponent1Props<T extends FieldValues = FieldValues>
  extends RhfFieldBaseProps<T> {
  defaultValue?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  inputContainerClassName?: string;
  inputClassName?: string;
  size?: "large" | "middle" | "small";
  style?: CSSProperties;
  bordered?: boolean;
  rows?: number;
}

export interface CheckboxComponentProps<T extends FieldValues = FieldValues>
  extends RhfFieldBaseProps<T> {
  value?: boolean;
  onChange?: (checked: boolean) => void;
  checkboxClassName?: string;
}

export interface PhoneNumberInputProps<T extends FieldValues = FieldValues>
  extends RhfFieldBaseProps<T> {
  value?: string;
  onChange?: (phone: string) => void;
  defaultCountry?: string;
  inputClassName?: string;
  bordered?: boolean;
}

export interface OTPInputProps<T extends FieldValues = FieldValues>
  extends RhfFieldBaseProps<T> {
  length?: number;
}

export interface DatePickerComponent1Props<T extends FieldValues = FieldValues>
  extends RhfFieldBaseProps<T> {
  defaultValue?: unknown;
  value?: unknown;
  onChange?: (date: unknown, dateString: string | string[]) => void;
  inputContainerClassName?: string;
  datePickerClassName?: string;
  size?: "large" | "middle" | "small";
  style?: CSSProperties;
  bordered?: boolean;
  format?: string;
  suffixIcon?: ReactNode;
}
