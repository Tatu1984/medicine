import type { Metadata } from "next";
import Link from "next/link";
import { AdminBar } from "@/components/admin/AdminBar";
import { FileText, Globe, Users, BookOpen, User, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Content",
  robots: { index: false, follow: false },
};

const sections = [
  {
    href: "/admin/content/home",
    icon: Globe,
    label: "The Idea (Home)",
    desc: "Hero definition, movements, stats band",
  },
  {
    href: "/admin/content/pillars",
    icon: FileText,
    label: "Pillars",
    desc: "The six pillars — title, summary, details, highlights",
  },
  {
    href: "/admin/content/network",
    icon: Users,
    label: "Network",
    desc: "Intro text, groups, founding principles",
  },
  {
    href: "/admin/content/resources",
    icon: BookOpen,
    label: "Resources",
    desc: "Curated library — add, edit or remove resources",
  },
  {
    href: "/admin/content/about",
    icon: User,
    label: "About",
    desc: "Name, credentials, bio paragraphs, links",
  },
  {
    href: "/admin/content/contact",
    icon: Phone,
    label: "Contact",
    desc: "Hero text, contact channels — email, phone, address, social",
  },
];

export default function ContentHubPage() {
  return (
    <div className="min-h-screen bg-secondary/30">
      <AdminBar showNew={false} />

      <div className="container-page py-10">
        <h1 className="text-2xl font-semibold">Site content</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Edit the content of each public section. Changes go live immediately.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="group flex items-start gap-4 rounded-3xl border border-border bg-card p-6 transition-all hover:border-sage/50 hover:shadow-lg hover:shadow-sage/5"
            >
              <div className="mt-0.5 inline-flex size-10 shrink-0 items-center justify-center rounded-2xl bg-sage-soft text-sage-deep">
                <s.icon className="size-5" />
              </div>
              <div>
                <p className="font-semibold text-foreground group-hover:text-sage-deep">{s.label}</p>
                <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
