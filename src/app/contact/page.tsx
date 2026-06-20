import type { Metadata } from "next";
import { Mail, AtSign, BookOpen } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/reactbits/Reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { site } from "@/lib/content";

const channels = [
  { icon: AtSign, label: "Twitter / X", value: site.twitter, href: `https://twitter.com/${site.twitter.replace("@", "")}` },
  { icon: BookOpen, label: "ORCID", value: site.orcid, href: `https://orcid.org/${site.orcid}` },
  { icon: Mail, label: "General enquiries", value: "hello@rationalmedicine.org", href: "mailto:hello@rationalmedicine.org" },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get involved"
        title="Start a conversation"
        intro="For clinicians, researchers, health workers, students and anyone who believes healthcare should be affordable, sustainable and humane."
      />

      <section className="container-page py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <form className="rounded-3xl border border-border bg-card p-8 sm:p-10">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Dr Jane Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="you@example.com" />
                </div>
              </div>
              <div className="mt-5 space-y-2">
                <Label htmlFor="role">Role / affiliation</Label>
                <Input id="role" placeholder="e.g. GP, physiotherapist, researcher" />
              </div>
              <div className="mt-5 space-y-2">
                <Label htmlFor="message">How would you like to contribute?</Label>
                <Textarea id="message" rows={5} placeholder="Tell us a little about your interest in Rational Medicine…" />
              </div>
              <Button type="submit" size="lg" className="mt-6 rounded-full">
                Send message
              </Button>
              <p className="mt-3 text-xs text-muted-foreground">
                Demo form — not yet wired to a backend.
              </p>
            </form>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="space-y-4">
              {channels.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-sage/50 hover:bg-secondary/40"
                >
                  <span className="grid size-11 place-items-center rounded-xl bg-sage-soft text-sage-deep">
                    <c.icon className="size-5" />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-foreground">{c.label}</span>
                    <span className="block text-sm text-muted-foreground">{c.value}</span>
                  </span>
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
