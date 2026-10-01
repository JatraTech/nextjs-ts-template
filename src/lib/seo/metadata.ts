import { siteConfig } from "@/constants/site";
import type { Metadata } from "next";
import type { PageSeoInput } from "./types";

const absoluteUrl = (pathOrUrl: string) => {
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  const path = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;
  return `${siteConfig.url}${path}`;
};

const resolveImage = (imagePath?: string) => {
  const src = imagePath || siteConfig.defaultOgImagePath;
  return absoluteUrl(src);
};

/** Root layout defaults — import as `export const metadata` from `app/layout.tsx`. */
export function buildRootMetadata(): Metadata {
  const ogImage = resolveImage();

  const verification: Metadata["verification"] = {};
  if (siteConfig.verification.google) {
    verification.google = siteConfig.verification.google;
  }
  if (siteConfig.verification.yandex) {
    verification.yandex = siteConfig.verification.yandex;
  }
  if (siteConfig.verification.bing) {
    verification.other = { "msvalidate.01": siteConfig.verification.bing };
  }

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: siteConfig.name,
      template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    applicationName: siteConfig.name,
    keywords: ["Next.js", "React", "Ant Design", "TanStack Query"],
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      type: "website",
      locale: siteConfig.locale.replace("-", "_"),
      url: siteConfig.url,
      siteName: siteConfig.name,
      title: siteConfig.name,
      description: siteConfig.description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: siteConfig.name,
      description: siteConfig.description,
      images: [ogImage],
      ...(siteConfig.twitterHandle ? { site: siteConfig.twitterHandle } : {}),
      ...(siteConfig.creatorHandle ? { creator: siteConfig.creatorHandle } : {}),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: siteConfig.url,
      languages: Object.keys(siteConfig.defaultAlternateLanguages).length
        ? Object.fromEntries(
            Object.entries(siteConfig.defaultAlternateLanguages).map(([lang, path]) => [
              lang,
              absoluteUrl(path),
            ]),
          )
        : undefined,
    },
    ...(Object.keys(verification).length ? { verification } : {}),
    category: "technology",
  };
}

/** Per-page metadata for static routes, `generateMetadata`, or route layouts. */
export function buildPageMetadata(input: PageSeoInput): Metadata {
  const {
    path,
    title,
    description,
    useTitleTemplate = true,
    noindex = false,
    nofollow = false,
    keywords,
    openGraph,
    twitter,
    canonicalPath,
    languages,
    overrides,
  } = input;

  const canonical = absoluteUrl(canonicalPath ?? path);
  const ogImage = resolveImage(openGraph?.image);
  const pageTitle = useTitleTemplate ? title : { absolute: title };

  const robots =
    noindex || nofollow
      ? {
          index: !noindex,
          follow: !nofollow,
          googleBot: {
            index: !noindex,
            follow: !nofollow,
          },
        }
      : undefined;

  const alternateLanguages = languages
    ? Object.fromEntries(
        Object.entries(languages).map(([lang, langPath]) => [
          lang,
          absoluteUrl(langPath),
        ]),
      )
    : undefined;

  const metadata: Metadata = {
    title: pageTitle,
    description,
    ...(keywords?.length ? { keywords } : {}),
    alternates: {
      canonical,
      ...(alternateLanguages ? { languages: alternateLanguages } : {}),
    },
    openGraph: {
      type: openGraph?.type ?? "website",
      locale: siteConfig.locale.replace("-", "_"),
      url: canonical,
      siteName: siteConfig.name,
      title: openGraph?.title ?? title,
      description: openGraph?.description ?? description,
      ...(openGraph?.publishedTime ? { publishedTime: openGraph.publishedTime } : {}),
      ...(openGraph?.modifiedTime ? { modifiedTime: openGraph.modifiedTime } : {}),
      ...(openGraph?.authors?.length ? { authors: openGraph.authors } : {}),
      ...(openGraph?.section ? { section: openGraph.section } : {}),
      ...(openGraph?.tags?.length ? { tags: openGraph.tags } : {}),
      images: [
        {
          url: ogImage,
          alt: openGraph?.imageAlt ?? title,
        },
      ],
    },
    twitter: {
      card: twitter?.card ?? "summary_large_image",
      title: twitter?.title ?? openGraph?.title ?? title,
      description: twitter?.description ?? openGraph?.description ?? description,
      images: [twitter?.image ? absoluteUrl(twitter.image) : ogImage],
      ...(twitter?.imageAlt ? {} : {}),
      ...(siteConfig.twitterHandle ? { site: siteConfig.twitterHandle } : {}),
    },
    ...(robots ? { robots } : {}),
    ...overrides,
  };

  return metadata;
}
