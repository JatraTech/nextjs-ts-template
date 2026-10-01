import { siteConfig } from "@/constants/site";

const orgId = `${siteConfig.url}/#organization`;
const websiteId = `${siteConfig.url}/#website`;

export function buildOrganizationJsonLd() {
  const logo = `${siteConfig.url}${siteConfig.organization.logoPath.startsWith("/") ? siteConfig.organization.logoPath : `/${siteConfig.organization.logoPath}`}`;

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": orgId,
    name: siteConfig.organization.legalName || siteConfig.name,
    url: siteConfig.url,
    logo,
    ...(siteConfig.organization.email
      ? { contactPoint: [{ "@type": "ContactPoint", email: siteConfig.organization.email, contactType: "customer support" }] }
      : {}),
  };
}

export function buildWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: siteConfig.language,
    publisher: { "@id": orgId },
  };
}

export function buildWebPageJsonLd(options: {
  path: string;
  title: string;
  description: string;
}) {
  const url = `${siteConfig.url}${options.path === "/" ? "" : options.path}`;

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: options.title,
    description: options.description,
    isPartOf: { "@id": websiteId },
    inLanguage: siteConfig.language,
  };
}

export function buildBreadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path === "/" ? "" : item.path}`,
    })),
  };
}
