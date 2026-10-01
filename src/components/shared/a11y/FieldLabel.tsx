import { isFieldRequired } from "@/utils/a11y/fieldA11y";
type FieldLabelProps = {
  htmlFor: string;
  label: string;
  className?: string;
  rules?: { required?: unknown };
  validation?: boolean;
};

export default function FieldLabel({
  htmlFor,
  label,
  className = "text-base font-medium text-grey-950 dark:text-slate-100 font-inter",
  rules,
  validation = false,
}: FieldLabelProps) {
  const required = isFieldRequired(rules, validation);

  return (
    <label htmlFor={htmlFor} className={className}>
      {label}
      {required ? (
        <>
          <span className="text-red-600 dark:text-red-400" aria-hidden="true">
            {" "}
            *
          </span>
          <span className="sr-only"> (required)</span>
        </>
      ) : null}
    </label>
  );
}
