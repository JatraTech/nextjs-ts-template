import UiShowcase from "@/components/demo/UiShowcase";
import JsonLd from "@/components/seo/JsonLd";
import {
  buildOrganizationJsonLd,
  buildWebPageJsonLd,
  buildWebSiteJsonLd,
} from "@/lib/seo/jsonLd";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { pageSeo } from "@/lib/seo/pageSeo";

export const metadata = buildPageMetadata(pageSeo.home);

export default function Home() {
  const seo = pageSeo.home;

  return (
    <>
      <JsonLd
        data={[
          buildOrganizationJsonLd(),
          buildWebSiteJsonLd(),
          buildWebPageJsonLd({
            path: seo.path,
            title: seo.title,
            description: seo.description,
          }),
        ]}
      />
      <UiShowcase />
    </>
  );
}
