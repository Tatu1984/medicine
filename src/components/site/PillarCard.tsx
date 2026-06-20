import {
  Globe,
  ShieldAlert,
  HandCoins,
  Stethoscope,
  FlaskConical,
  GraduationCap,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/reactbits/Reveal";
import { TiltedCard } from "@/components/reactbits/TiltedCard";
import type { Pillar } from "@/lib/content";
import { cn } from "@/lib/utils";

const ICONS: Record<string, LucideIcon> = {
  "universal-healthcare": Globe,
  overdiagnosis: ShieldAlert,
  stewardship: HandCoins,
  bedside: Stethoscope,
  "evidence-creating": FlaskConical,
  education: GraduationCap,
};

export function PillarCard({
  pillar,
  index,
  full = false,
}: {
  pillar: Pillar;
  index: number;
  full?: boolean;
}) {
  const Icon = ICONS[pillar.id] ?? Globe;

  return (
    <Reveal delay={index * 0.06} className="h-full">
      <TiltedCard amplitude={full ? 0 : 5} className="h-full">
        <article
          id={pillar.id}
          className={cn(
            "group flex h-full scroll-mt-24 flex-col overflow-hidden rounded-3xl border border-border bg-card p-7 transition-all hover:border-sage/50 hover:shadow-xl hover:shadow-sage/5",
            full && "p-8 sm:p-10"
          )}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="inline-flex size-12 items-center justify-center rounded-2xl bg-sage text-primary-foreground shadow-sm">
              <Icon className="size-6" />
            </div>
            <span className="font-heading text-5xl font-semibold leading-none text-sage-soft">
              {pillar.index}
            </span>
          </div>

          <h3 className={cn("mt-5 text-xl font-semibold", full && "text-2xl")}>{pillar.title}</h3>
          <p className="mt-1.5 text-sm font-medium text-clay">{pillar.plain}</p>
          <p className="mt-4 leading-relaxed text-muted-foreground">{pillar.summary}</p>

          {full && (
            <div className="mt-6 space-y-4 border-t border-border/70 pt-6">
              {pillar.detail.map((d) => (
                <p key={d} className="flex gap-3 text-sm leading-relaxed text-foreground/80">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-clay" />
                  {d}
                </p>
              ))}
            </div>
          )}

          <div className="mt-6 flex flex-wrap gap-2 pt-1">
            {pillar.highlights.slice(0, full ? 99 : 2).map((h) => (
              <span
                key={h.label}
                className="rounded-full border border-border bg-secondary/60 px-3 py-1 text-xs font-medium text-foreground/70"
                title={h.source}
              >
                {h.label}
              </span>
            ))}
          </div>
        </article>
      </TiltedCard>
    </Reveal>
  );
}

export default PillarCard;
