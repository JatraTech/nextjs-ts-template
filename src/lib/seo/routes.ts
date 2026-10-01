import { pageSeo } from "./pageSeo";
import type { IndexableRoute } from "./types";

/** Routes included in `sitemap.ts`. Only paths with `noindex !== true` in `pageSeo`. */
export function getIndexableRoutes(): IndexableRoute[] {
  const entries = Object.values(pageSeo).filter((entry) => !("noindex" in entry && entry.noindex));

  return entries.map((entry) => ({
    path: entry.path,
    changeFrequency: entry.path === "/" ? "weekly" : "monthly",
    priority: entry.path === "/" ? 1 : 0.6,
  }));
}
