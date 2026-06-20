"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type BlurTextProps = {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  by?: "word" | "char";
};

/**
 * Word/char-by-word blur-in reveal. Inspired by reactbits.dev/text-animations/blur-text.
 */
export function BlurText({
  text,
  className,
  delay = 0,
  as = "span",
  by = "word",
}: BlurTextProps) {
  const segments = by === "word" ? text.split(" ") : text.split("");
  const Tag = motion[as];

  return (
    <Tag
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ staggerChildren: 0.045, delayChildren: delay }}
      aria-label={text}
    >
      {segments.map((seg, i) => (
        <motion.span
          key={i}
          className="inline-block will-change-[filter,transform,opacity]"
          variants={{
            hidden: { opacity: 0, filter: "blur(10px)", y: "0.4em" },
            visible: {
              opacity: 1,
              filter: "blur(0px)",
              y: "0em",
              transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
            },
          }}
          aria-hidden
        >
          {seg}
          {by === "word" && i < segments.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </Tag>
  );
}

export default BlurText;
