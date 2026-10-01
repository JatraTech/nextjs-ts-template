import { buildPageMetadata } from "@/lib/seo/metadata";
import { pageSeo } from "@/lib/seo/pageSeo";
import type { ReactNode } from "react";

export const metadata = buildPageMetadata(pageSeo.login);

export default function LoginLayout({ children }: { children: ReactNode }) {
  return children;
}
