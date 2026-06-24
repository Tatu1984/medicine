import type { Metadata } from "next";
import { Mail, AtSign, BookOpen, Phone, MapPin } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/reactbits/Reveal";
import { ContactForm } from "./ContactForm";
import { getContactContent } from "@/lib/site-content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the Rational Medicine Network.",
};

const iconMap: Record<string, LucideIcon> = {
  mail: Mail,
  phone: Phone,
  "map-pin": MapPin,
  "at-sign": AtSign,
  "book-open": BookOpen,
};

export default async function ContactPage() {
  const contact = await getContactContent();

  return (
    <>
      <PageHero
        eyebrow={contact.eyebrow}
        title={contact.title}
        intro={contact.intro}
      />

      <section className="container-page py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <ContactForm />
          </Reveal>

          <Reveal delay={0.1}>
            <div className="space-y-4">
              {contact.channels.map((c) => {
                const Icon = iconMap[c.icon] ?? Mail;
                return (
                  <a
                    key={c.label}
                    href={c.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-sage/50 hover:bg-secondary/40"
                  >
                    <span className="grid size-11 place-items-center rounded-xl bg-sage-soft text-sage-deep">
                      <Icon className="size-5" />
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-foreground">{c.label}</span>
                      <span className="block text-sm text-muted-foreground">{c.value}</span>
                    </span>
                  </a>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
