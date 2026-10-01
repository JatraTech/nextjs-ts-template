"use client";

import SmallLoader from "@/components/shared/Loaders/SmallLoader";
import type { ProtectedRouteProps } from "@/types/components/shared-types/layout.types";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NavigationLoader = ({ children }: ProtectedRouteProps) => {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timeout);
  }, [pathname]);

  if (loading) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center">
        <SmallLoader className="w-full flex justify-center" />
      </div>
    );
  }

  return children;
};

export default NavigationLoader;
