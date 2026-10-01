
export function fieldControlId(name: string): string {
  return `field-${String(name).replace(/\./g, "-")}`;
}

export function fieldErrorId(name: string): string {
  return `${fieldControlId(name)}-error`;
}

export function fieldHintId(name: string): string {
  return `${fieldControlId(name)}-hint`;
}

export function mergeDescribedBy(
  ...ids: Array<string | false | null | undefined>
): string | undefined {
  const value = ids.filter(Boolean).join(" ");
  return value || undefined;
}

export function isFieldRequired(
  rules?: { required?: unknown },
  validation?: boolean,
): boolean {
  if (!validation || !rules) return false;
  const { required } = rules;
  if (required === true) return true;
  if (typeof required === "string") return true;
  if (typeof required === "object" && required && "value" in required) {
    return Boolean(required.value);
  }
  return false;
}
