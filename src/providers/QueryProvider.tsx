"use client";

import { getQueryClient } from "@/lib/queryClient";
import type { QueryProviderProps } from "@/types/components/shared-types/layout.types";
import { QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState, type ReactNode } from "react";

function QueryDevtools() {
  const [Devtools, setDevtools] = useState<((props: { initialIsOpen?: boolean }) => ReactNode) | null>(
    null,
  );

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;
    void import("@tanstack/react-query-devtools").then((mod) => {
      setDevtools(() => mod.ReactQueryDevtools);
    });
  }, []);

  if (!Devtools) return null;
  return <Devtools initialIsOpen={false} />;
}

export default function QueryProvider({ children }: QueryProviderProps) {
  const [queryClient] = useState(() => getQueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <QueryDevtools />
    </QueryClientProvider>
  );
}
