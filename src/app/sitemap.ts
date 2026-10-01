import { siteConfig } from "@/constants/site";
import { getIndexableRoutes } from "@/lib/seo/routes";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;

  return getIndexableRoutes().map((route) => ({
    url: `${base}${route.path === "/" ? "" : route.path}`,
    lastModified: route.lastModified ?? new Date(),
    changeFrequency: route.changeFrequency ?? "monthly",
    priority: route.priority ?? 0.5,
  }));
}
