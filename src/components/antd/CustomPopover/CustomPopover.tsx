// @ts-nocheck
"use client";

import {
  OVERLAY_BODY_TEXT_CLASS,
  OVERLAY_TITLE_TEXT_CLASS,
} from "@/constants/overlayText";
import { ChevronDown } from "lucide-react";
import { Popover } from "antd";

const CustomPopover = (props) => {
  const {
    title = "Title",
    label = null,
    popoverTitle = "",
    popoverContent = "Content",
    isOpen = false,
    onOpenChange = () => {},
    arrow = true,
    placement = "bottom",
    trigger = "click",
    className = "",
    containerClassName = "",
    titleClassName = "",
    profileImageClassName = "",
    labelClassName = "",
    profileImageSrc = null,
    showChevron = true,
    children,
  } = props;
  return (
    <div className={`flex items-center w-full gap-2 ${containerClassName}`}>
      {label ? (
        <p
          className={`text-lg font-light text-shark-800 dark:text-slate-300 font-inter ${labelClassName}`}
        >
          {label}
        </p>
      ) : null}

      <Popover
        content={
          <div
            className={`onpoint-popover-content max-w-xs p-1 text-sm leading-relaxed ${OVERLAY_BODY_TEXT_CLASS}`}
          >
            {popoverContent}
          </div>
        }
        title={
          popoverTitle ? (
            <span className={`font-medium ${OVERLAY_TITLE_TEXT_CLASS}`}>
              {popoverTitle}
            </span>
          ) : null
        }
        trigger={trigger}
        open={isOpen ? isOpen : undefined}
        onOpenChange={(open) => onOpenChange(open)}
        arrow={arrow}
        placement={placement}
        classNames={{ root: "onpoint-popover-overlay" }}
        getPopupContainer={(triggerNode) =>
          triggerNode.parentElement ?? document.body
        }
      >
        {/* Native wrapper so rc-trigger ref + popup share the same DOM root */}
        <span className="inline-flex">
          {!children ? (
            <button
              type="button"
              className={`inline-flex items-center gap-2 cursor-pointer bg-transparent border-0 p-0 font-inter ${className}`}
            >
              {profileImageSrc ? (
                <img
                  src={profileImageSrc}
                  alt=""
                  className={`w-8 h-8 rounded-full object-cover ${profileImageClassName}`}
                />
              ) : null}
              {title ? (
                <span className={`text-brand font-medium text-lg ${titleClassName}`}>
                  {title}
                </span>
              ) : null}
              {showChevron ? (
                <ChevronDown
                  className="h-5 w-5 text-shark-600 dark:text-slate-400"
                  strokeWidth={2}
                  aria-hidden
                />
              ) : null}
            </button>
          ) : (
            children
          )}
        </span>
      </Popover>
    </div>
  );
};

export default CustomPopover;
