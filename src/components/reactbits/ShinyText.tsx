"use client";

import { cn } from "@/lib/utils";

type ShinyTextProps = {
  text: string;
  className?: string;
  speed?: number;
};

/** Subtle sweeping shine across text. Inspired by reactbits.dev/text-animations/shiny-text. */
export function ShinyText({ text, className, speed = 5 }: ShinyTextProps) {
  return (
    <span
      className={cn(
        "bg-clip-text text-transparent",
        "bg-[linear-gradient(110deg,currentColor_35%,#fff_50%,currentColor_65%)]",
        "bg-[length:200%_100%] animate-[shine_var(--shine-speed)_linear_infinite]",
        className
      )}
      style={{ ["--shine-speed" as string]: `${speed}s` }}
    >
      {text}
      <style>{`@keyframes shine{0%{background-position:200% 0}100%{background-position:-200% 0}}`}</style>
    </span>
  );
}

export default ShinyText;
