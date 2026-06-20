"use client";

import { cn } from "@/lib/utils";

type GradientTextProps = {
  children: React.ReactNode;
  className?: string;
  /** seconds for one animation cycle */
  speed?: number;
};

/**
 * Animated gradient text. Inspired by reactbits.dev/text-animations/gradient-text.
 */
export function GradientText({ children, className, speed = 8 }: GradientTextProps) {
  return (
    <span
      className={cn(
        "inline-block bg-clip-text text-transparent",
        "bg-[linear-gradient(90deg,var(--sage-deep),var(--clay),var(--sage),var(--clay),var(--sage-deep))]",
        "bg-[length:300%_100%] animate-[gradientmove_var(--gt-speed)_linear_infinite]",
        className
      )}
      style={{ ["--gt-speed" as string]: `${speed}s` }}
    >
      {children}
      <style>{`@keyframes gradientmove{0%{background-position:0% 50%}100%{background-position:300% 50%}}`}</style>
    </span>
  );
}

export default GradientText;
