import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";
import { ResourceGrid } from "@/components/sections/ResourceGrid";
import { getResources } from "@/lib/site-content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "A curated library of the key initiatives, publications and campaigns behind Rational Medicine.",
};

export default async function ResourcesPage() {
  const resources = await getResources();

  return (
    <>
      <PageHero
        eyebrow="Library"
        title="Resources & further reading"
        intro="The key initiatives, publications and campaigns that inform Rational Medicine — independent of advertising, regulators and commercial sponsorship."
      />

      <section className="container-page py-16 sm:py-20">
        <ResourceGrid resources={resources} />
      </section>
    </>
  );
}
