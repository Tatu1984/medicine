import { Marquee } from "@/components/reactbits/Marquee";

const sources = [
  "WHO Alma-Ata",
  "Choosing Wisely",
  "Bad Pharma",
  "Stanford Medicine 25",
  "Wiser Healthcare",
  "AllTrials",
  "JAMA Rational Clinical Examination",
  "NHS — A Culture of Stewardship",
  "Preventing Overdiagnosis",
  "STROBE",
];

export function SourceMarquee() {
  return (
    <section className="border-y border-border/70 bg-card/50 py-6">
      <p className="container-page mb-4 text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        Standing on the shoulders of a global movement
      </p>
      <Marquee items={sources} />
    </section>
  );
}

export default SourceMarquee;
