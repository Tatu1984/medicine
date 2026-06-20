"use client";

import { cn } from "@/lib/utils";

/** Soft drifting aurora/blob backdrop. Inspired by reactbits.dev/backgrounds/aurora. */
export function Aurora({ className }: { className?: string }) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)} aria-hidden>
      <div className="absolute -left-24 -top-24 size-[34rem] rounded-full bg-sage-soft/70 blur-3xl animate-[float1_18s_ease-in-out_infinite]" />
      <div className="absolute right-[-10rem] top-10 size-[30rem] rounded-full bg-clay-soft/60 blur-3xl animate-[float2_22s_ease-in-out_infinite]" />
      <div className="absolute bottom-[-12rem] left-1/3 size-[28rem] rounded-full bg-sage/15 blur-3xl animate-[float3_26s_ease-in-out_infinite]" />
      <style>{`
        @keyframes float1{0%,100%{transform:translate(0,0)}50%{transform:translate(40px,30px)}}
        @keyframes float2{0%,100%{transform:translate(0,0)}50%{transform:translate(-50px,40px)}}
        @keyframes float3{0%,100%{transform:translate(0,0)}50%{transform:translate(30px,-40px)}}
      `}</style>
    </div>
  );
}

export default Aurora;
