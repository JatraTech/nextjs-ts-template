type FieldHintProps = {
  id: string;
  hint?: string;
};

export default function FieldHint({ id, hint }: FieldHintProps) {
  if (!hint) return null;

  return (
    <span id={id} className="text-sm text-shark-500 dark:text-slate-400 font-inter">
      {hint}
    </span>
  );
}
