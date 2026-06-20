"use client";

import { cn } from "@/lib/utils";

type MarqueeProps = {
  items: string[];
  className?: string;
  speed?: number;
};

/** Infinite horizontal marquee. reactbits.dev/components/marquee. */
export function Marquee({ items, className, speed = 36 }: MarqueeProps) {
  const row = [...items, ...items];
  return (
    <div
      className={cn(
        "group relative flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]",
        className
      )}
    >
      <div
        className="flex shrink-0 items-center gap-10 pr-10 animate-[marquee_var(--mq)_linear_infinite] group-hover:[animation-play-state:paused]"
        style={{ ["--mq" as string]: `${speed}s` }}
      >
        {row.map((it, i) => (
          <span key={i} className="flex items-center gap-10 whitespace-nowrap text-sm font-medium text-muted-foreground">
            {it}
            <span className="size-1.5 rounded-full bg-clay/60" />
          </span>
        ))}
      </div>
      <style>{`@keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
    </div>
  );
}

export default Marquee;
