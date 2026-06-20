import Link from "next/link";
import { ArrowRight, Users } from "lucide-react";
import { Reveal } from "@/components/reactbits/Reveal";
import { ShinyText } from "@/components/reactbits/ShinyText";
import { Button } from "@/components/ui/button";

export function JoinCTA() {
  return (
    <section id="join" className="container-page pb-24">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2rem] bg-sage-deep px-8 py-16 text-center text-primary-foreground sm:px-16 sm:py-20">
          <div className="pointer-events-none absolute -right-16 -top-16 size-72 rounded-full bg-clay/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-10 size-72 rounded-full bg-sage/40 blur-3xl" />

          <span className="relative inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium">
            <Users className="size-4" /> Join the Rational Medicine Network
          </span>

          <h2 className="relative mx-auto mt-6 max-w-2xl text-3xl font-semibold leading-tight text-balance sm:text-4xl">
            Help build <ShinyText text="affordable, sustainable, humane" /> healthcare — for everyone.
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-primary-foreground/80">
            Clinicians, physiologists, physiotherapists, nurses, health workers and researchers
            are welcome. No corporate funding. No conflicts of interest.
          </p>

          <div className="relative mt-9 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" variant="secondary" className="rounded-full text-base">
              <Link href="/contact">
                Get in touch <ArrowRight className="ml-1 size-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-white/30 bg-transparent text-base text-primary-foreground hover:bg-white/10 hover:text-primary-foreground"
            >
              <Link href="/network">About the network</Link>
            </Button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export default JoinCTA;
