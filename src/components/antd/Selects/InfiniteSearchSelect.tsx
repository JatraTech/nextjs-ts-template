"use client";

import type {
  InfiniteSearchSelectProps,
  InfiniteSelectOption,
} from "@/types/components/antd-types/infinite-select.types";
import { Select } from "antd";
import type { LabelInValueType } from "rc-select/lib/Select";
import { Image as ImageIcon, Loader2 } from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";

type BaseValue = string | number;

export function InfiniteSearchSelect<T extends BaseValue = BaseValue>(
  props: InfiniteSearchSelectProps<T>,
) {
  const {
    options,
    loading = false,
    loadingMore = false,
    loadingMoreLabel = "Loading more...",
    placeholder,
    allowClear = true,
    hasMore,
    onSearch,
    onScrollEnd,
    onClear,
    customAction,
    footerAction,
    collapseLabelOnSelect = false,
    renderSelectedLabel,
    getPrimaryLabel,
    getDescription,
    getAvatarUrl,
    getAvatarFallback,
    showAvatar = true,
    className = "",
    classNames,
    style,
    dropdownStyle,
    styles,
    disabled = false,
    open,
    onOpenChange,
    size = "middle",
    notFoundContent,
    wrapLabels = false,
    id,
    ariaLabel,
    ariaDescribedBy,
    ariaInvalid,
    ariaRequired,
    getPopupContainer = () => document.body,
  } = props;
  const multiple = props.multiple === true;
  const isOpenControlled = open !== undefined;
  const [internalOpen, setInternalOpen] = useState(false);
  const suppressCloseUntilRef = useRef(0);
  const hasUserScrolledRef = useRef(false);
  const canLoadMoreRef = useRef(true);
  const lastScrollTopRef = useRef(0);
  const openedAtRef = useRef(0);
  const mergedOpen = isOpenControlled ? open : internalOpen;

  const handleOpenChange = useCallback(
    (nextOpen: boolean) => {
      if (!nextOpen && Date.now() < suppressCloseUntilRef.current) {
        if (!isOpenControlled) {
          setInternalOpen(true);
        }
        return;
      }

      if (nextOpen) {
        suppressCloseUntilRef.current = Date.now() + 250;
      }

      if (!isOpenControlled) {
        setInternalOpen(nextOpen);
      }
      onOpenChange?.(nextOpen);
    },
    [isOpenControlled, onOpenChange],
  );

  useEffect(() => {
    if (mergedOpen) {
      openedAtRef.current = Date.now();
      return;
    }

    hasUserScrolledRef.current = false;
    canLoadMoreRef.current = true;
    lastScrollTopRef.current = 0;
    openedAtRef.current = 0;
  }, [mergedOpen]);

  const markUserScrolled = useCallback(() => {
    hasUserScrolledRef.current = true;
  }, []);

  const handlePopupScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
      const target = e.target as HTMLDivElement;
      const scrollTop = target.scrollTop;

      if (
        openedAtRef.current > 0 &&
        Date.now() - openedAtRef.current > 200 &&
        scrollTop > lastScrollTopRef.current + 1
      ) {
        hasUserScrolledRef.current = true;
      }

      const distanceFromBottom =
        target.scrollHeight - scrollTop - target.clientHeight;
      if (distanceFromBottom > 48) {
        canLoadMoreRef.current = true;
      }

      lastScrollTopRef.current = scrollTop;

      if (!onScrollEnd || !hasMore || loading || loadingMore) return;
      if (!hasUserScrolledRef.current || !canLoadMoreRef.current) return;
      if (target.scrollHeight <= target.clientHeight + 1) return;
      if (scrollTop + target.clientHeight >= target.scrollHeight - 24) {
        canLoadMoreRef.current = false;
        onScrollEnd();
      }
    },
    [onScrollEnd, hasMore, loading, loadingMore],
  );

  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    if (!onSearch) return;
    const timeoutId = window.setTimeout(() => {
      onSearch(searchInput);
    }, 300);
    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [onSearch, searchInput]);

  const selectOptions = options.map((opt) => {
    const primaryLabel =
      getPrimaryLabel?.(opt) ||
      (typeof opt.label === "string" ? opt.label : opt.avatarFallback || "");
    const description = getDescription?.(opt) ?? opt.description;
    const avatarUrl = getAvatarUrl?.(opt) ?? opt.avatarUrl;
    const avatarFallback =
      getAvatarFallback?.(opt) ||
      (typeof opt.label === "string"
        ? opt.label.trim().charAt(0).toUpperCase()
        : opt.avatarFallback || "•");

    const shouldShowAvatar = showAvatar;

    const avatarNode = avatarUrl ? (
      <img
        src={avatarUrl}
        alt={primaryLabel || "Option"}
        className="h-8 w-8 rounded-full object-cover ring-1 ring-shark-200 dark:ring-slate-600"
        onError={(event) => {
          const target = event.currentTarget;
          target.style.display = "none";
          const fallback = target.nextElementSibling as HTMLElement | null;
          if (fallback) fallback.style.display = "flex";
        }}
      />
    ) : null;

    const avatarFallbackNode = (
      <div
        className={`flex h-8 w-8 items-center justify-center rounded-full bg-shark-100 text-shark-400 ring-1 ring-shark-200 dark:bg-slate-700 dark:text-slate-500 dark:ring-slate-600 ${
          avatarUrl ? "hidden" : ""
        }`}
      >
        {avatarUrl ? (
          <ImageIcon className="h-3.5 w-3.5" />
        ) : avatarFallback && avatarFallback !== "•" ? (
          <span className="text-xs font-semibold text-shark-500 dark:text-slate-300">
            {avatarFallback}
          </span>
        ) : (
          <ImageIcon className="h-3.5 w-3.5" />
        )}
      </div>
    );

    return {
      label: (
        <div
          className={`flex w-full gap-3 py-2 ${
            wrapLabels ? "items-start" : "items-center"
          }`}
        >
          {shouldShowAvatar ? (
            <div className="relative shrink-0">
              {avatarNode}
              {avatarFallbackNode}
            </div>
          ) : null}

          <div className="flex min-w-0 flex-1 flex-col">
            <span
              className={`${
                wrapLabels ? "whitespace-normal break-words" : "truncate"
              } font-semibold text-shark-900 dark:text-slate-100`}
            >
              {primaryLabel}
            </span>

            {description ? (
              wrapLabels ? (
                <div className="text-xs text-shark-500 dark:text-slate-400">
                  {description}
                </div>
              ) : (
                <span className="truncate text-xs text-shark-500 dark:text-slate-400">
                  {description}
                </span>
              )
            ) : null}
          </div>

          {opt.rightContent ? (
            <div className="shrink-0 self-center text-right text-xs text-shark-500 dark:text-slate-400">
              {opt.rightContent}
            </div>
          ) : null}
        </div>
      ),
      value: opt.value,
      disabled: opt.disabled,
    };
  });

  const handleClear = () => {
    if (multiple) {
      (props.onChange as (value: T[]) => void)([]);
    } else {
      (props.onChange as (value: T | null) => void)(null);
    }
    setSearchInput("");
    onClear?.();
  };

  const labelRender =
    renderSelectedLabel || collapseLabelOnSelect
      ? (item: LabelInValueType) => {
          const value = item.value as T;
          const matched = options.find((opt) => opt.value === value);
          if (renderSelectedLabel) {
            if (matched) {
              return renderSelectedLabel(matched);
            }
            if (typeof item.label === "string") {
              return <span className="truncate">{item.label}</span>;
            }
            return <span className="truncate" />;
          }

          const primaryLabel = matched
            ? getPrimaryLabel?.(matched) ||
              (typeof matched.label === "string" ? matched.label : "")
            : typeof item.label === "string"
              ? item.label
              : "";

          if (!collapseLabelOnSelect) {
            return <span className="truncate">{primaryLabel}</span>;
          }

          if (!showAvatar) {
            return <span className="truncate">{primaryLabel}</span>;
          }

          const avatarUrl =
            getAvatarUrl?.(matched as InfiniteSelectOption<T>) ??
            matched?.avatarUrl;
          const avatarFallback =
            getAvatarFallback?.(matched as InfiniteSelectOption<T>) ||
            (typeof matched?.label === "string"
              ? matched.label.trim().charAt(0).toUpperCase()
              : matched?.avatarFallback || "•");

          return (
            <div className="flex min-w-0 items-center gap-2">
              <div className="relative shrink-0">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={primaryLabel || "Selected option"}
                    className="h-6 w-6 rounded-full object-cover ring-1 ring-shark-200 dark:ring-slate-600"
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                      const fallback = event.currentTarget
                        .nextElementSibling as HTMLElement | null;
                      if (fallback) fallback.style.display = "flex";
                    }}
                  />
                ) : null}
                <div
                  className={`flex h-6 w-6 items-center justify-center rounded-full bg-shark-100 text-[10px] font-semibold text-shark-500 ring-1 ring-shark-200 dark:bg-slate-700 dark:text-slate-300 dark:ring-slate-600 ${
                    avatarUrl ? "hidden" : ""
                  }`}
                >
                  {avatarFallback && avatarFallback !== "•" ? (
                    avatarFallback
                  ) : (
                    <ImageIcon className="h-3 w-3" />
                  )}
                </div>
              </div>
              <span className="truncate">{primaryLabel}</span>
            </div>
          );
        }
      : undefined;

  const handleTriggerMouseDownCapture = (
    event: React.MouseEvent<HTMLDivElement>,
  ) => {
    const target = event.target as HTMLElement;
    const root = event.currentTarget;

    if (target.closest(".ant-select-dropdown")) {
      return;
    }

    if (
      target instanceof HTMLInputElement &&
      root.contains(target) &&
      target.closest(".ant-select")
    ) {
      return;
    }

    if (
      target.closest(".ant-select-selection-search-input") ||
      target.closest(".ant-select-selection-search")
    ) {
      return;
    }

    event.preventDefault();
  };

  return (
    <div onMouseDownCapture={handleTriggerMouseDownCapture}>
      <Select<T | T[]>
        id={id}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
        aria-invalid={ariaInvalid}
        aria-required={ariaRequired}
        showSearch
        allowClear={allowClear}
        mode={multiple ? "multiple" : undefined}
        value={
          multiple
            ? ((Array.isArray(props.value) ? props.value : []) as T[])
            : ((props.value ?? undefined) as T | undefined)
        }
        onChange={(val) => {
          if (multiple) {
            (props.onChange as (value: T[]) => void)(
              (Array.isArray(val) ? val : []) as T[],
            );
          } else {
            (props.onChange as (value: T | null) => void)(
              (val ?? null) as T | null,
            );
          }
        }}
        onSelect={() => {
          setSearchInput("");
        }}
        onSearch={setSearchInput}
        filterOption={false}
        loading={loading}
        placeholder={placeholder}
        options={selectOptions}
        onPopupScroll={handlePopupScroll}
        popupRender={(menu) => (
          <div onWheel={markUserScrolled} onTouchMove={markUserScrolled}>
            {customAction &&
            (!customAction.requireSearchInput ||
              Boolean(searchInput.trim())) ? (
              <button
                type="button"
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => {
                  const typed = searchInput.trim();
                  customAction.onClick(typed || undefined);
                  setSearchInput("");
                }}
                className="flex w-full cursor-pointer items-center gap-2 border-b border-shark-100 px-3 py-2.5 text-left text-sm font-semibold text-green-600 transition hover:bg-green-50 dark:border-slate-700 dark:text-green-400 dark:hover:bg-green-900/20"
              >
                {customAction.label}
              </button>
            ) : null}
            {menu}
            {loadingMore ? (
              <div className="flex items-center justify-center gap-2 border-t border-shark-100 px-3 py-2.5 text-xs text-shark-500 dark:border-slate-700 dark:text-slate-400">
                <Loader2 className="h-4 w-4 shrink-0 animate-spin text-green-600 dark:text-green-400" />
                <span>{loadingMoreLabel}</span>
              </div>
            ) : null}
            {footerAction ? (
              <div className="sticky bottom-0 border-t border-shark-200 bg-shark-50 px-2 py-1.5 dark:border-slate-600 dark:bg-slate-800/90">
                <button
                  type="button"
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => {
                    if (footerAction.loading || footerAction.disabled) return;
                    footerAction.onClick();
                  }}
                  disabled={footerAction.loading || footerAction.disabled}
                  aria-busy={footerAction.loading || undefined}
                  className="flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-semibold text-green-600 transition hover:bg-green-50 disabled:cursor-not-allowed disabled:text-shark-400 disabled:hover:bg-transparent dark:text-green-400 dark:hover:bg-green-900/30 dark:disabled:text-slate-500"
                >
                  {footerAction.loading ? (
                    <Loader2 className="h-3.5 w-3.5 shrink-0 animate-spin" />
                  ) : footerAction.icon ? (
                    <span className="inline-flex shrink-0 [&_svg]:h-3.5 [&_svg]:w-3.5">
                      {footerAction.icon}
                    </span>
                  ) : null}
                  <span>{footerAction.label}</span>
                </button>
              </div>
            ) : null}
          </div>
        )}
        className={className}
        classNames={
          classNames ??
          (className
            ? {
                root: className,
              }
            : undefined)
        }
        style={style}
        styles={
          typeof styles === "function"
            ? styles
            : {
                ...styles,
                popup: {
                  ...styles?.popup,
                  root: {
                    borderRadius: 8,
                    fontFamily: "Inter, sans-serif",
                    zIndex: 1000001,
                    ...dropdownStyle,
                    ...styles?.popup?.root,
                  },
                },
              }
        }
        listHeight={320}
        virtual={false}
        notFoundContent={
          notFoundContent ?? (loading ? "Loading..." : "No options")
        }
        disabled={disabled}
        open={mergedOpen}
        onOpenChange={handleOpenChange}
        size={size}
        onClear={handleClear}
        labelRender={labelRender}
        getPopupContainer={getPopupContainer}
      />
    </div>
  );
}

export default InfiniteSearchSelect;
