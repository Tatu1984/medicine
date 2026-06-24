import { Hero } from "@/components/sections/Hero";
import { SourceMarquee } from "@/components/sections/SourceMarquee";
import { Movements } from "@/components/sections/Movements";
import { StatsBand } from "@/components/sections/StatsBand";
import { PillarsPreview } from "@/components/sections/PillarsPreview";
import { ResearchPreview } from "@/components/sections/ResearchPreview";
import { JoinCTA } from "@/components/sections/JoinCTA";
import { getHomeContent } from "@/lib/site-content";

export const dynamic = "force-dynamic";

export default async function Home() {
  const home = await getHomeContent();

  return (
    <>
      <Hero definition={home.definition} />
      <SourceMarquee />
      <Movements movements={home.movements} />
      <StatsBand stats={home.stats} />
      <PillarsPreview />
      <ResearchPreview />
      <JoinCTA />
    </>
  );
}
