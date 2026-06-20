import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/reactbits/Reveal";
import { publications } from "@/lib/content";

export const metadata: Metadata = {
  title: "Research & Publications",
  description:
    "Peer-reviewed, PubMed-indexed research from the Rational Medicine Network and the Evidence-Creating Medicine Group.",
};

export default function ResearchPage() {
  return (
    <>
      <PageHero
        eyebrow="Evidence-Creating Medicine"
        title="Research & publications"
        intro="Treating everyday clinical practice as an iterative scientific process — capturing real-life data to produce honest evidence, free from corporate funding and conflicts of interest."
      />

      <section className="container-page py-16 sm:py-20">
        <div className="grid gap-6">
          {publications.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.06}>
              <article className="group rounded-3xl border border-border bg-card p-7 transition-all hover:border-sage/50 hover:shadow-xl hover:shadow-sage/5 sm:p-8">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-clay-soft px-3 py-1 text-xs font-semibold uppercase tracking-wide text-clay">
                    {p.tag}
                  </span>
                  <span className="text-sm font-medium text-muted-foreground">
                    {p.journal} · {p.year}
                  </span>
                </div>
                <h2 className="mt-4 text-xl font-semibold leading-snug">{p.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{p.authors}</p>
                {p.doi && (
                  <a
                    href={`https://doi.org/${p.doi}`}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-sage-deep transition-colors hover:text-clay"
                  >
                    doi.org/{p.doi}
                    <ArrowUpRight className="size-4" />
                  </a>
                )}
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10">
          <div className="rounded-3xl border border-dashed border-sage/40 bg-sage-soft/40 p-8 text-center">
            <h3 className="text-lg font-semibold text-sage-deep">The ECM Multidisciplinary Group</h3>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-foreground/80">
              A voluntary network of physiologists, physiotherapists, nurses, health workers and
              physicians who see day-to-day clinical practice as an iterative scientific process and
              capture real-life data for continuous improvement.
            </p>
            <a
              href="https://www.researchgate.net/lab/Evidence-Creating-Medicine-ECM-Multidisciplinary-Group-Rahul-Mukherjee"
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-sage-deep hover:text-clay"
            >
              View the group on ResearchGate <ArrowUpRight className="size-4" />
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
