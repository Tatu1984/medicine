import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/reactbits/Reveal";
import { JoinCTA } from "@/components/sections/JoinCTA";
import { network } from "@/lib/content";

export const metadata: Metadata = {
  title: "The Network",
  description:
    "The Rational Medicine Network and the Evidence-Creating Medicine Group — community-based, conflict-free healthcare.",
};

export default function NetworkPage() {
  return (
    <>
      <PageHero
        eyebrow="Community"
        title="The Rational Medicine Network"
        intro={network.intro}
      />

      <section className="container-page py-16 sm:py-20">
        <div className="grid gap-6 md:grid-cols-2">
          {network.groups.map((g, i) => (
            <Reveal key={g.name} delay={i * 0.1}>
              <div className="h-full rounded-3xl border border-border bg-card p-8">
                <h2 className="text-xl font-semibold text-sage-deep">{g.name}</h2>
                <p className="mt-4 leading-relaxed text-muted-foreground">{g.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10">
          <div className="rounded-3xl border border-border bg-secondary/40 p-8 sm:p-10">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              Founding principles · Alma-Ata
            </h3>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {network.principles.map((p) => (
                <li key={p} className="flex items-center gap-3 text-foreground">
                  <CheckCircle2 className="size-5 shrink-0 text-sage" />
                  <span className="font-medium">{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>

      <JoinCTA />
    </>
  );
}
