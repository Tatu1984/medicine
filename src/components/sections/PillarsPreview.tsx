import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/site/SectionHeading";
import { PillarCard } from "@/components/site/PillarCard";
import { Button } from "@/components/ui/button";
import { pillars } from "@/lib/content";

export function PillarsPreview() {
  return (
    <section id="pillars" className="bg-secondary/40 py-20 sm:py-28">
      <div className="container-page">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="The framework"
            title="Six pillars of Rational Medicine"
            intro="Distinct movements in global healthcare that, together, form a historic case for medicine as a benevolent human endeavour."
          />
          <Button asChild variant="outline" className="rounded-full">
            <Link href="/pillars">
              See all pillars <ArrowRight className="ml-1 size-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((p, i) => (
            <PillarCard key={p.id} pillar={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default PillarsPreview;
