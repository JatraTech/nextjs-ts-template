import { buildPageMetadata } from "@/lib/seo/metadata";
import { pageSeo } from "@/lib/seo/pageSeo";
import type { ReactNode } from "react";

export const metadata = buildPageMetadata(pageSeo.dashboard);

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return children;
}
