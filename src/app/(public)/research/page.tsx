import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Download, FileText } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/reactbits/Reveal";
import { publications } from "@/lib/content";
import { getPublishedArticles } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Research & Publications",
  description:
    "Peer-reviewed, PubMed-indexed research from the Rational Medicine Network and the Evidence-Creating Medicine Group.",
};

export const dynamic = "force-dynamic";

export default async function ResearchPage() {
  const articles = await getPublishedArticles();

  return (
    <>
      <PageHero
        eyebrow="Evidence-Creating Medicine"
        title="Research & publications"
        intro="Treating everyday clinical practice as an iterative scientific process — capturing real-life data to produce honest evidence, free from corporate funding and conflicts of interest."
      />

      <section className="container-page py-16 sm:py-20">
        {articles.length > 0 ? (
          <div className="grid gap-6">
            {articles.map((a, i) => (
              <Reveal key={a.id} delay={i * 0.05}>
                <article className="group rounded-3xl border border-border bg-card p-7 transition-all hover:border-sage/50 hover:shadow-xl hover:shadow-sage/5 sm:p-8">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-clay-soft px-3 py-1 text-xs font-semibold uppercase tracking-wide text-clay">
                      {a.category}
                    </span>
                    <span className="text-sm font-medium text-muted-foreground">
                      {[a.journal, a.year].filter(Boolean).join(" · ")}
                    </span>
                  </div>
                  <h2 className="mt-4 text-xl font-semibold leading-snug">
                    <Link href={`/research/${a.slug}`} className="transition-colors group-hover:text-sage-deep">
                      {a.title}
                    </Link>
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground">{a.authors}</p>
                  <p className="mt-3 line-clamp-2 leading-relaxed text-foreground/80">{a.abstract}</p>

                  <div className="mt-5 flex flex-wrap items-center gap-4">
                    <Link
                      href={`/research/${a.slug}`}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-sage-deep transition-colors hover:text-clay"
                    >
                      Read article <ArrowUpRight className="size-4" />
                    </Link>
                    {a.pdfName && (
                      <a
                        href={`/api/research/${a.id}/pdf`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-sm font-medium text-foreground/80 transition-colors hover:border-sage/50 hover:text-sage-deep"
                      >
                        <Download className="size-4" /> PDF
                      </a>
                    )}
                    {a.doi && (
                      <a
                        href={`https://doi.org/${a.doi}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm text-muted-foreground transition-colors hover:text-clay"
                      >
                        doi.org/{a.doi}
                      </a>
                    )}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        ) : (
          <FallbackPublications />
        )}

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

/** Shown until articles are published through the admin area. */
function FallbackPublications() {
  return (
    <div>
      <div className="mb-6 flex items-center gap-2 rounded-2xl border border-border bg-secondary/50 px-4 py-3 text-sm text-muted-foreground">
        <FileText className="size-4 text-sage" />
        Selected prior publications — full article pages &amp; PDFs are published through the admin area.
      </div>
      <div className="grid gap-6">
        {publications.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.05}>
            <article className="rounded-3xl border border-border bg-card p-7 sm:p-8">
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
                  doi.org/{p.doi} <ArrowUpRight className="size-4" />
                </a>
              )}
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
