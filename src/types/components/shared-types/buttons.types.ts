import type { ButtonHTMLAttributes, ReactNode } from "react";
import type { StaticImageData } from "next/image";

export interface BaseButtonProps {
  text?: string;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  name?: string;
  value?: string | number;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  image?: StaticImageData | string | null;
  imagePosition?: "before" | "after";
  imageClassName?: string;
  icon?: ReactNode;
  iconPosition?: "before" | "after";
  /** Accessible name when visible `text` is not enough (e.g. icon-only). */
  ariaLabel?: string;
}

