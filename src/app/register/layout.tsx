import { buildPageMetadata } from "@/lib/seo/metadata";
import { pageSeo } from "@/lib/seo/pageSeo";
import type { ReactNode } from "react";

export const metadata = buildPageMetadata(pageSeo.register);

export default function RegisterLayout({ children }: { children: ReactNode }) {
  return children;
}
