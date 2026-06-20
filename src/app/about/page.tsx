import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/reactbits/Reveal";
import { about } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description: `${about.name} — ${about.role}`,
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="The founder"
        title={about.name}
        intro={about.role}
      />

      <section className="container-page py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
          <Reveal>
            <div className="lg:sticky lg:top-24">
              <div className="aspect-[4/5] overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-sage-soft to-clay-soft">
                <div className="flex h-full items-center justify-center">
                  <span className="font-heading text-7xl font-semibold text-sage-deep/40">RM</span>
                </div>
              </div>
              <p className="mt-5 text-sm font-medium text-foreground">{about.creds}</p>
              <ul className="mt-4 space-y-2">
                {about.links.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-sage-deep transition-colors hover:text-clay"
                    >
                      {l.label} <ArrowUpRight className="size-3.5" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="space-y-6">
              {about.bio.map((para) => (
                <p key={para.slice(0, 24)} className="text-lg leading-relaxed text-foreground/85">
                  {para}
                </p>
              ))}

              <blockquote className="mt-8 rounded-3xl border-l-4 border-clay bg-secondary/50 p-7 text-lg italic leading-relaxed text-foreground/80">
                “The doctor’s role must be defined by what is in the best interest of patients and of
                the population served — drawing on scientific knowledge and well-developed clinical
                judgement.”
              </blockquote>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
