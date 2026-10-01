import type { ReactNode, WheelEvent } from "react";

export type NumberDisplayFormat = "plain" | "currency" | "percent";

export function parseNumericValue(value: unknown): number | null {
  if (value === null || value === undefined || value === "") return null;
  const normalized = String(value).replace(/,/g, "").trim();
  if (!normalized) return null;
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : null;
}

export function formatNumberWithCommas(
  value: number | string | null | undefined,
  options?: { minimumFractionDigits?: number; maximumFractionDigits?: number },
): string {
  const numeric = parseNumericValue(value);
  if (numeric === null) return "";

  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: options?.minimumFractionDigits,
    maximumFractionDigits: options?.maximumFractionDigits ?? 20,
  }).format(numeric);
}

export function formatReadonlyNumber(
  value: number | string | null | undefined,
  format: NumberDisplayFormat = "plain",
  options?: { minimumFractionDigits?: number; maximumFractionDigits?: number },
): string {
  const core = formatNumberWithCommas(value, options);
  if (!core) return "";

  if (format === "currency") return `$${core}`;
  if (format === "percent") return `${core}%`;
  return core;
}

export function getNumberInputAffixes(format: NumberDisplayFormat = "plain"): {
  prefix?: ReactNode;
  suffix?: ReactNode;
} {
  if (format === "currency") return { prefix: "$" };
  if (format === "percent") return { suffix: "%" };
  return {};
}

export function preventNumberInputWheel(type: string) {
  return (event: WheelEvent<HTMLInputElement>) => {
    if (type === "number") {
      event.currentTarget.blur();
    }
  };
}

export function resolveInputAffixes({
  type,
  numberFormat,
  prefix,
  suffix,
}: {
  type: string;
  numberFormat?: NumberDisplayFormat;
  prefix?: ReactNode;
  suffix?: ReactNode;
}) {
  const fromFormat =
    type === "number" && numberFormat ? getNumberInputAffixes(numberFormat) : {};

  const hasPrefix = prefix !== undefined && prefix !== null && prefix !== "";
  const hasSuffix = suffix !== undefined && suffix !== null && suffix !== "";

  return {
    prefix: hasPrefix ? prefix : fromFormat.prefix,
    suffix: hasSuffix ? suffix : fromFormat.suffix,
  };
}
