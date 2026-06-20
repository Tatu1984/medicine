"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { resources, type Resource } from "@/lib/content";

const categories = ["All", "Foundations", "Overdiagnosis", "Evidence", "Bedside", "Education"] as const;
type Cat = (typeof categories)[number];

export function ResourceGrid() {
  const [active, setActive] = useState<Cat>("All");
  const filtered: Resource[] =
    active === "All" ? resources : resources.filter((r) => r.category === active);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              active === c
                ? "bg-sage text-primary-foreground shadow-sm"
                : "border border-border bg-card text-foreground/70 hover:bg-secondary"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <motion.div layout className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((r) => (
            <motion.a
              key={r.title}
              href={r.href}
              target="_blank"
              rel="noreferrer"
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }}
              className="group flex flex-col rounded-3xl border border-border bg-card p-6 transition-all hover:border-sage/50 hover:shadow-xl hover:shadow-sage/5"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-sage-soft px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-sage-deep">
                  {r.category}
                </span>
                <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-clay" />
              </div>
              <h3 className="mt-4 font-semibold leading-snug text-foreground group-hover:text-sage-deep">
                {r.title}
              </h3>
              <p className="mt-1 text-xs font-medium text-clay">{r.source}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{r.note}</p>
            </motion.a>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default ResourceGrid;
