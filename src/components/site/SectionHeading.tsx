import { cn } from "@/lib/utils";
import { BlurText } from "@/components/reactbits/BlurText";

type Props = {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({ eyebrow, title, intro, align = "left", className }: Props) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <span className="inline-flex items-center gap-2 rounded-full bg-sage-soft px-3 py-1 text-xs font-semibold uppercase tracking-widest text-sage-deep">
          {eyebrow}
        </span>
      )}
      <BlurText
        as="h2"
        text={title}
        className="mt-4 text-3xl font-semibold leading-[1.1] text-balance sm:text-4xl"
      />
      {intro && (
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground text-balance">{intro}</p>
      )}
    </div>
  );
}

export default SectionHeading;
