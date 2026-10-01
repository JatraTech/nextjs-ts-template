import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

export interface SelectOption {
  value: string;
  label: string;
}

export interface FormFieldStyleProps {
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
  placeholderColor?: string;
  focusBorderColor?: string;
  focusRingColor?: string;
}

export interface BaseFormFieldProps extends FormFieldStyleProps {
  name: string;
  label?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  labelClassName?: string;
  containerClassName?: string;
  useFormik?: boolean;
  showValidationOnSubmit?: boolean;
  hasSubmitted?: boolean;
}

export interface InputComponentProps
  extends BaseFormFieldProps,
    Omit<InputHTMLAttributes<HTMLInputElement>, "name" | "type"> {
  type?: string;
  placeholder?: string;
  value?: string;
}

export interface PasswordInputComponentProps
  extends BaseFormFieldProps,
    Omit<InputHTMLAttributes<HTMLInputElement>, "name" | "type"> {
  placeholder?: string;
  value?: string;
  iconColor?: string;
  iconHoverColor?: string;
  showToggle?: boolean;
}

export interface TextareaComponentProps
  extends BaseFormFieldProps,
    Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "name"> {
  placeholder?: string;
  value?: string;
  rows?: number;
  maxLength?: number;
  showCharCount?: boolean;
  resize?: string;
}

export interface SelectComponentProps
  extends BaseFormFieldProps,
    Omit<SelectHTMLAttributes<HTMLSelectElement>, "name"> {
  placeholder?: string;
  value?: string;
  options?: SelectOption[];
  errorClassName?: string;
}
