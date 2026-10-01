type FieldErrorMessageProps = {
  id: string;
  message?: string;
};

export default function FieldErrorMessage({ id, message }: FieldErrorMessageProps) {
  if (!message) return null;

  return (
    <span
      id={id}
      role="alert"
      className="text-sm text-red-600 dark:text-red-400 font-inter"
    >
      {message}
    </span>
  );
}
