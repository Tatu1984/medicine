import Image from "next/image";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <Image
        src="/logo.svg"
        alt="Rational Medicine logo"
        width={20}
        height={20}
        className="size-15 rounded-xl object-contain"
        priority
      />
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
