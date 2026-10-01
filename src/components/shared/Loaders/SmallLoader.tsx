"use client";

interface SmallLoaderProps {
  className?: string;
}

const SmallLoader = ({ className = "w-full flex justify-center mt-0" }: SmallLoaderProps) => {
  return (
    <div className={className} role="status" aria-label="Loading">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-green-500 dark:border-slate-600 dark:border-t-green-400" />
    </div>
  );
};

export default SmallLoader;
