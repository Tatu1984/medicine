import "server-only";
import { prisma } from "@/lib/db";
import {
  definition as defaultDefinition,
  movements as defaultMovements,
  stats as defaultStats,
  pillars as defaultPillars,
  network as defaultNetwork,
  resources as defaultResources,
  about as defaultAbout,
  type Pillar,
  type Resource,
} from "@/lib/content";

// ── Types ──────────────────────────────────────────────────────────────────

export type Movement = { title: string; plain: string; body: string };
export type Stat = { value: number; suffix: string; label: string };
export type HomeContent = { definition: string; movements: Movement[]; stats: Stat[] };

export type NetworkGroup = { name: string; body: string };
export type NetworkContent = { intro: string; groups: NetworkGroup[]; principles: string[] };

export type AboutLink = { label: string; href: string };
export type AboutContent = {
  name: string;
  creds: string;
  role: string;
  bio: string[];
  links: AboutLink[];
};

export type ContactChannel = { icon: string; label: string; value: string; href: string };
export type ContactContent = {
  eyebrow: string;
  title: string;
  intro: string;
  channels: ContactChannel[];
};

export type { Pillar, Resource };

// ── Helpers ────────────────────────────────────────────────────────────────

async function get<T>(key: string, fallback: T): Promise<T> {
  try {
    const row = await prisma.siteContent.findUnique({ where: { key } });
    if (!row) return fallback;
    return row.data as T;
  } catch {
    return fallback;
  }
}

export async function setSiteContent(key: string, data: unknown): Promise<void> {
  await prisma.siteContent.upsert({
    where: { key },
    update: { data: data as never },
    create: { key, data: data as never },
  });
}

// ── Section getters ────────────────────────────────────────────────────────

export async function getHomeContent(): Promise<HomeContent> {
  return get("home", {
    definition: defaultDefinition,
    movements: defaultMovements,
    stats: defaultStats,
  });
}

export async function getPillars(): Promise<Pillar[]> {
  return get("pillars", defaultPillars);
}

export async function getNetworkContent(): Promise<NetworkContent> {
  return get("network", defaultNetwork);
}

export async function getResources(): Promise<Resource[]> {
  return get("resources", defaultResources);
}

export async function getAboutContent(): Promise<AboutContent> {
  return get("about", defaultAbout);
}

const defaultContact: ContactContent = {
  eyebrow: "Get involved",
  title: "Start a conversation",
  intro:
    "For clinicians, researchers, health workers, students and anyone who believes healthcare should be affordable, sustainable and humane.",
  channels: [
    { icon: "mail", label: "Email", value: "rmukherjee@doctors.org.uk", href: "mailto:rmukherjee@doctors.org.uk" },
    { icon: "phone", label: "Phone", value: "+44 7780 971921", href: "tel:+447780971921" },
    { icon: "map-pin", label: "Address", value: "1 De Moram Grove, Solihull, B92 0PZ, UK", href: "https://maps.google.com/?q=1+De+Moram+Grove+Solihull+B92+0PZ+UK" },
    { icon: "at-sign", label: "Twitter / X", value: "@rationalmed", href: "https://twitter.com/rationalmed" },
    { icon: "book-open", label: "ORCID", value: "0000-0003-4466-0660", href: "https://orcid.org/0000-0003-4466-0660" },
    { icon: "mail", label: "General enquiries", value: "hello@rationalmedicine.org", href: "mailto:hello@rationalmedicine.org" },
  ],
};

export async function getContactContent(): Promise<ContactContent> {
  return get("contact", defaultContact);
}
