import { Counter } from "@/components/reactbits/Counter";
import { Reveal } from "@/components/reactbits/Reveal";
import type { Stat } from "@/lib/site-content";

export function StatsBand({ stats }: { stats: Stat[] }) {
  return (
    <section className="border-y border-border/70 bg-sage-deep text-primary-foreground">
      <div className="container-page grid grid-cols-2 gap-8 py-14 lg:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08} className="text-center sm:text-left">
            <div className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
              <Counter to={s.value} suffix={s.suffix} />
            </div>
            <p className="mt-2 text-sm leading-snug text-primary-foreground/75">{s.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export default StatsBand;
