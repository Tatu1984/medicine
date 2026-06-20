"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, ShieldCheck, Stethoscope, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Aurora } from "@/components/reactbits/Aurora";
import { BlurText } from "@/components/reactbits/BlurText";
import { GradientText } from "@/components/reactbits/GradientText";
import { definition } from "@/lib/content";

const chips = [
  { icon: Stethoscope, label: "Rational clinical examination" },
  { icon: ShieldCheck, label: "Preventing overdiagnosis" },
  { icon: Scale, label: "Honest, conflict-free evidence" },
];

export function Hero() {
  return (
    <section id="idea" className="relative overflow-hidden pt-20 pb-24 sm:pt-28">
      <Aurora />
      <div className="absolute inset-0 -z-10 text-border/40 grain opacity-60" aria-hidden />

      <div className="container-page">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-1.5 text-sm font-medium text-sage-deep shadow-sm backdrop-blur"
        >
          <span className="size-2 rounded-full bg-clay" />
          A movement for affordable, sustainable, humane healthcare
        </motion.span>

        <h1 className="mt-7 max-w-4xl text-5xl font-semibold leading-[1.04] tracking-tight text-balance sm:text-6xl lg:text-7xl">
          Medicine that puts{" "}
          <GradientText>people before profit.</GradientText>
        </h1>

        <BlurText
          as="p"
          text={definition}
          className="mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl"
        />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-9 flex flex-wrap items-center gap-3"
        >
          <Button asChild size="lg" className="rounded-full text-base">
            <Link href="/pillars">
              Explore the six pillars <ArrowRight className="ml-1 size-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-full text-base">
            <Link href="/research">Read the research</Link>
          </Button>
        </motion.div>

        <div className="mt-12 flex flex-wrap gap-3">
          {chips.map((c, i) => (
            <motion.span
              key={c.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 + i * 0.1 }}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-2 text-sm font-medium text-foreground/80 backdrop-blur"
            >
              <c.icon className="size-4 text-sage" />
              {c.label}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;
