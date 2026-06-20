import { Aurora } from "@/components/reactbits/Aurora";
import { BlurText } from "@/components/reactbits/BlurText";

export function PageHero({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border/70 pt-16 pb-14 sm:pt-20">
      <Aurora className="opacity-70" />
      <div className="container-page">
        <span className="inline-flex items-center gap-2 rounded-full bg-sage-soft px-3 py-1 text-xs font-semibold uppercase tracking-widest text-sage-deep">
          {eyebrow}
        </span>
        <BlurText
          as="h1"
          text={title}
          className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.08] text-balance sm:text-5xl"
        />
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground text-balance">
          {intro}
        </p>
      </div>
    </section>
  );
}

export default PageHero;
