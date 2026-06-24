import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";
import { PillarCard } from "@/components/site/PillarCard";
import { JoinCTA } from "@/components/sections/JoinCTA";
import { getPillars } from "@/lib/site-content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "The Six Pillars",
  description:
    "The six movements that together form Rational Medicine — from universal healthcare to evidence-creating medicine.",
};

export default async function PillarsPage() {
  const pillars = await getPillars();

  return (
    <>
      <PageHero
        eyebrow="The framework"
        title="The six pillars of Rational Medicine"
        intro="Highly developed initiatives within global healthcare that, taken together, form a historic movement for medicine as a benevolent human endeavour."
      />

      <section className="container-page py-16 sm:py-20">
        <div className="grid gap-6 lg:grid-cols-2">
          {pillars.map((p, i) => (
            <PillarCard key={p.id} pillar={p} index={i} full />
          ))}
        </div>
      </section>

      <JoinCTA />
    </>
  );
}
