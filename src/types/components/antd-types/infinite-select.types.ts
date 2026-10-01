import type { SelectProps } from "antd";
import type { CSSProperties, ReactNode } from "react";
import type { FieldValues } from "react-hook-form";
import type { RhfFieldBaseProps } from "./rhf-field.types";

type BaseValue = string | number;

export type InfiniteSelectOption<T extends BaseValue = BaseValue> = {
  value: T;
  label: ReactNode;
  description?: ReactNode;
  rightContent?: ReactNode;
  disabled?: boolean;
  raw?: unknown;
  avatarUrl?: string | null;
  avatarFallback?: string;
};

type InfiniteSearchSelectSharedProps<T extends BaseValue = BaseValue> = {
  options: InfiniteSelectOption<T>[];
  loading?: boolean;
  loadingMore?: boolean;
  loadingMoreLabel?: string;
  placeholder?: string;
  allowClear?: boolean;
  hasMore?: boolean;
  onSearch?: (search: string) => void;
  onScrollEnd?: () => void;
  onClear?: () => void;
  customAction?: {
    label: ReactNode;
    onClick: (searchInput?: string) => void;
    requireSearchInput?: boolean;
  };
  footerAction?: {
    label: ReactNode;
    onClick: () => void;
    loading?: boolean;
    disabled?: boolean;
    icon?: ReactNode;
  };
  collapseLabelOnSelect?: boolean;
  renderSelectedLabel?: (option: InfiniteSelectOption<T>) => ReactNode;
  getPrimaryLabel?: (option: InfiniteSelectOption<T>) => string;
  getDescription?: (option: InfiniteSelectOption<T>) => ReactNode;
  getAvatarUrl?: (option: InfiniteSelectOption<T>) => string | null | undefined;
  getAvatarFallback?: (option: InfiniteSelectOption<T>) => string | undefined;
  showAvatar?: boolean;
  className?: string;
  classNames?: SelectProps<T>["classNames"];
  style?: CSSProperties;
  dropdownStyle?: CSSProperties;
  styles?: SelectProps<T>["styles"];
  disabled?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  size?: SelectProps<T>["size"];
  notFoundContent?: ReactNode;
  wrapLabels?: boolean;
  id?: string;
  ariaLabel?: string;
  ariaDescribedBy?: string;
  ariaInvalid?: boolean;
  ariaRequired?: boolean;
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
};

type InfiniteSearchSelectSingleProps<T extends BaseValue = BaseValue> = {
  multiple?: false;
  value?: T | null;
  onChange: (value: T | null) => void;
};

type InfiniteSearchSelectMultiProps<T extends BaseValue = BaseValue> = {
  multiple: true;
  value?: T[];
  onChange: (value: T[]) => void;
};

export type InfiniteSearchSelectProps<T extends BaseValue = BaseValue> =
  InfiniteSearchSelectSharedProps<T> &
    (InfiniteSearchSelectSingleProps<T> | InfiniteSearchSelectMultiProps<T>);

export interface SelectComponentWithInfiniteScrollProps<
  TField extends FieldValues = FieldValues,
  TValue extends string | number = string | number,
> extends RhfFieldBaseProps<TField>,
    Omit<
      InfiniteSearchSelectProps<TValue>,
      "value" | "onChange" | "multiple" | "onSearch"
    > {
  selectContainerClassName?: string;
  selectClassName?: string;
  popupClassName?: string;
  bordered?: boolean;
  onSearch?: (search: string) => void;
  value?: TValue | null;
  onChange?: (value: TValue | null) => void;
}
