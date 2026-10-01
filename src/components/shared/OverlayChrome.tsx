"use client";

import { OVERLAY_BODY_TEXT_CLASS } from "@/constants/overlayText";
import type { ReactNode } from "react";
import OverlayCloseButton from "./OverlayCloseButton";

interface OverlayChromeProps {
  title?: ReactNode;
  titleId?: string;
  onClose: () => void;
  showClose?: boolean;
  titleClassName?: string;
  barClassName?: string;
  children?: ReactNode;
}

export function OverlayHeaderBar({
  title,
  titleId,
  onClose,
  showClose = true,
  titleClassName = "",
  barClassName = "",
}: OverlayChromeProps) {
  return (
    <div
      className={`flex items-center justify-between gap-4 bg-blue-800 px-6 py-5 rounded-t-[10px] ${barClassName}`}
    >
      {title ? (
        <h2
          id={titleId}
          className={`m-0 text-xl font-medium text-white font-inter ${titleClassName}`}
        >
          {title}
        </h2>
      ) : (
        <span />
      )}
      {showClose ? <OverlayCloseButton onClick={onClose} /> : null}
    </div>
  );
}

export function OverlayBody({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`onpoint-overlay-body px-6 py-6 text-base leading-relaxed ${OVERLAY_BODY_TEXT_CLASS} ${className}`}
    >
      {children}
    </div>
  );
}
