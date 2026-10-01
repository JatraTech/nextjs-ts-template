"use client";

import { FOCUS_RING_CLASS } from "@/constants/a11y";
import type { BaseButtonProps } from "@/types/components/shared-types/buttons.types";
import { Spin } from "antd";
import AppImage from "@/components/shared/AppImage";

const ButtonFilled = ({
  text = "Button",
  type = "button",
  name,
  value,
  onClick = () => {},
  className = "",
  disabled = false,
  loading = false,
  image = null,
  imagePosition = "before",
  imageClassName = "",
  icon = null,
  iconPosition = "before",
  ariaLabel,
}: BaseButtonProps) => {
  return (
    <button
      name={name}
      type={type}
      value={value}
      onClick={onClick}
      aria-label={ariaLabel}
      aria-busy={loading || undefined}
      className={`bg-brand text-brand-foreground py-[10px] px-[15px] rounded-[5px] text-xl font-medium font-inter flex items-center justify-center gap-2 transition-colors hover:bg-brand-hover dark:bg-brand dark:text-brand-foreground dark:hover:bg-brand-hover ${FOCUS_RING_CLASS} ${className} ${disabled || loading ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}
      disabled={disabled || loading}
    >
      {loading && <Spin size="small" className="mr-2" aria-hidden />}
      {image && imagePosition === "before" && (
        <AppImage src={image} alt="" width={20} height={20} className={`${imageClassName} mr-2`} />
      )}
      {icon && iconPosition === "before" && icon}
      {!loading && text}
      {image && imagePosition === "after" && (
        <AppImage src={image} alt="" width={20} height={20} className={`${imageClassName} ml-2`} />
      )}
      {icon && iconPosition === "after" && icon}
    </button>
  );
};

export default ButtonFilled;
