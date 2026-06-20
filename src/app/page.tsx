import { Hero } from "@/components/sections/Hero";
import { SourceMarquee } from "@/components/sections/SourceMarquee";
import { Movements } from "@/components/sections/Movements";
import { StatsBand } from "@/components/sections/StatsBand";
import { PillarsPreview } from "@/components/sections/PillarsPreview";
import { ResearchPreview } from "@/components/sections/ResearchPreview";
import { JoinCTA } from "@/components/sections/JoinCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <SourceMarquee />
      <Movements />
      <StatsBand />
      <PillarsPreview />
      <ResearchPreview />
      <JoinCTA />
    </>
  );
}
