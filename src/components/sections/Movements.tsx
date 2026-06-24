import { Reveal } from "@/components/reactbits/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { GitMerge } from "lucide-react";
import type { Movement } from "@/lib/site-content";

export function Movements({ movements }: { movements: Movement[] }) {
  return (
    <section className="container-page py-20 sm:py-28">
      <SectionHeading
        eyebrow="The confluence"
        title="Two movements, one idea"
        intro="Rational Medicine is where the campaign for the rational use of medicines meets the call for judicious, value-driven use of evidence."
      />

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {movements.map((m, i) => (
          <Reveal key={m.title} delay={i * 0.1}>
            <div className="group relative h-full overflow-hidden rounded-3xl border border-border bg-card p-8 transition-shadow hover:shadow-xl hover:shadow-sage/5">
              <div className="mb-6 inline-flex size-12 items-center justify-center rounded-2xl bg-sage-soft text-sage-deep">
                <span className="font-heading text-lg font-semibold">{i + 1}</span>
              </div>
              <h3 className="text-xl font-semibold">{m.title}</h3>
              <p className="mt-2 text-sm font-medium text-clay">{m.plain}</p>
              <p className="mt-4 leading-relaxed text-muted-foreground">{m.body}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1} className="mt-8">
        <div className="flex items-center justify-center gap-3 rounded-3xl border border-dashed border-sage/40 bg-sage-soft/40 px-6 py-5 text-center text-sage-deep">
          <GitMerge className="size-5 shrink-0" />
          <p className="text-sm font-medium sm:text-base">
            Converging since the 1977 WHO Model List of Essential Medicines — and more urgent than ever.
          </p>
        </div>
      </Reveal>
    </section>
  );
}

export default Movements;
