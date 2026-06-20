import { cn } from "@/lib/utils";

/** Brand mark: a stethoscope-meets-balance motif suggesting care + judgement. */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span className="relative grid size-9 place-items-center rounded-xl bg-sage text-primary-foreground shadow-sm">
        <svg viewBox="0 0 24 24" fill="none" className="size-5" aria-hidden>
          <path
            d="M12 3v6.5M12 9.5a4 4 0 0 0 4 4 4 4 0 0 0 4-4M12 9.5a4 4 0 0 1-4 4 4 4 0 0 1-4-4"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
          <circle cx="4" cy="9.5" r="1.6" fill="currentColor" />
          <circle cx="20" cy="9.5" r="1.6" fill="currentColor" />
          <path d="M12 13.5v5a3 3 0 0 0 3 3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          <circle cx="15" cy="21.5" r="1.8" stroke="currentColor" strokeWidth="1.7" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-heading text-[15px] font-semibold tracking-tight text-foreground">
          Rational Medicine
        </span>
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-clay">
          care · value · evidence
        </span>
      </span>
    </span>
  );
}

export default Logo;
