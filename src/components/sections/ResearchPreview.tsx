import Link from "next/link";
import { ArrowUpRight, FileText } from "lucide-react";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Reveal } from "@/components/reactbits/Reveal";
import { Button } from "@/components/ui/button";
import { publications } from "@/lib/content";

export function ResearchPreview() {
  return (
    <section id="research" className="container-page py-20 sm:py-28">
      <SectionHeading
        eyebrow="Evidence-Creating Medicine"
        title="Research, free from conflicts of interest"
        intro="Day-to-day clinical practice treated as an iterative scientific process — capturing real-life data to build honest evidence, without corporate funding."
      />

      <div className="mt-12 divide-y divide-border overflow-hidden rounded-3xl border border-border bg-card">
        {publications.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.05}>
            <Link
              href="/research"
              className="group flex flex-col gap-3 p-6 transition-colors hover:bg-secondary/50 sm:flex-row sm:items-center sm:gap-6 sm:p-7"
            >
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-sage-soft text-sage-deep">
                <FileText className="size-5" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="inline-block rounded-full bg-clay-soft px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-clay">
                  {p.tag}
                </span>
                <h3 className="mt-2 font-medium leading-snug text-foreground group-hover:text-sage-deep">
                  {p.title}
                </h3>
                <p className="mt-1 truncate text-sm text-muted-foreground">{p.authors}</p>
              </div>
              <div className="flex shrink-0 items-center gap-4 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">{p.journal}</span>
                <span>{p.year}</span>
                <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </div>
            </Link>
          </Reveal>
        ))}
      </div>

      <div className="mt-8">
        <Button asChild className="rounded-full">
          <Link href="/research">All publications & the ECM Group</Link>
        </Button>
      </div>
    </section>
  );
}

export default ResearchPreview;
