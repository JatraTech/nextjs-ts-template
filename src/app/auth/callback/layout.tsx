import { buildPageMetadata } from "@/lib/seo/metadata";
import { pageSeo } from "@/lib/seo/pageSeo";
import type { ReactNode } from "react";

export const metadata = buildPageMetadata(pageSeo.authCallback);

export default function AuthCallbackLayout({ children }: { children: ReactNode }) {
  return children;
}
