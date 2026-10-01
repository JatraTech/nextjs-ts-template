"use client";

import { FOCUS_RING_CLASS } from "@/constants/a11y";
import { X } from "lucide-react";

interface OverlayCloseButtonProps {
  onClick: () => void;
  className?: string;
  iconClassName?: string;
  label?: string;
}

export default function OverlayCloseButton({
  onClick,
  className = "",
  iconClassName = "w-5 h-5",
  label = "Close",
}: OverlayCloseButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`inline-flex items-center justify-center rounded-md p-1.5 text-white/90 hover:text-white hover:bg-white/10 transition-colors ${FOCUS_RING_CLASS} ${className}`}
    >
      <X className={iconClassName} strokeWidth={2} aria-hidden />
    </button>
  );
}
