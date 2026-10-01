"use client";

import { FOCUS_RING_CLASS } from "@/constants/a11y";
import type { BaseButtonProps } from "@/types/components/shared-types/buttons.types";
import { Spin } from "antd";
import AppImage from "@/components/shared/AppImage";

const ButtonOutlined = ({
  text = "Button",
  type = "button",
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
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
      aria-busy={loading || undefined}
      className={`border-2 border-brand text-brand py-[7px] px-4 rounded-[5px] text-xl font-medium flex items-center justify-center gap-2 transition-all duration-300 ease-in-out hover:bg-brand hover:text-brand-foreground dark:border-brand dark:text-brand dark:hover:bg-brand dark:hover:text-brand-foreground ${FOCUS_RING_CLASS} ${className} ${disabled || loading ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
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

export default ButtonOutlined;
