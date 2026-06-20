"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

type TiltedCardProps = {
  children: React.ReactNode;
  className?: string;
  amplitude?: number;
};

/** Pointer-reactive 3D tilt card. reactbits.dev/components/tilted-card. */
export function TiltedCard({ children, className, amplitude = 8 }: TiltedCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const rx = useSpring(useTransform(y, [0, 1], [amplitude, -amplitude]), { stiffness: 200, damping: 18 });
  const ry = useSpring(useTransform(x, [0, 1], [-amplitude, amplitude]), { stiffness: 200, damping: 18 });

  function onMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width);
    y.set((e.clientY - r.top) / r.height);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => {
        x.set(0.5);
        y.set(0.5);
      }}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      className={cn("[transform-style:preserve-3d]", className)}
    >
      {children}
    </motion.div>
  );
}

export default TiltedCard;
