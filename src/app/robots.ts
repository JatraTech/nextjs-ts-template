import { siteConfig } from "@/constants/site";
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = siteConfig.url;

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/dashboard", "/auth/callback", "/api/"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
