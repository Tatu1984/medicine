"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth";
import { setSiteContent } from "@/lib/site-content";

export type ContentFormState = { error?: string; ok?: boolean } | undefined;

async function requireAdmin() {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");
}

function revalidateAll() {
  revalidatePath("/");
  revalidatePath("/pillars");
  revalidatePath("/network");
  revalidatePath("/resources");
  revalidatePath("/about");
}

export async function saveHomeContent(
  _prev: ContentFormState,
  formData: FormData,
): Promise<ContentFormState> {
  await requireAdmin();
  try {
    const definition = String(formData.get("definition") ?? "").trim();
    const movements = JSON.parse(String(formData.get("movements") ?? "[]"));
    const stats = JSON.parse(String(formData.get("stats") ?? "[]"));
    if (!definition) return { error: "Definition is required." };
    await setSiteContent("home", { definition, movements, stats });
    revalidatePath("/");
    return { ok: true };
  } catch {
    return { error: "Failed to save. Check your input." };
  }
}

export async function savePillars(
  _prev: ContentFormState,
  formData: FormData,
): Promise<ContentFormState> {
  await requireAdmin();
  try {
    const pillars = JSON.parse(String(formData.get("pillars") ?? "[]"));
    await setSiteContent("pillars", pillars);
    revalidatePath("/pillars");
    revalidatePath("/");
    return { ok: true };
  } catch {
    return { error: "Failed to save. Check your input." };
  }
}

export async function saveNetworkContent(
  _prev: ContentFormState,
  formData: FormData,
): Promise<ContentFormState> {
  await requireAdmin();
  try {
    const intro = String(formData.get("intro") ?? "").trim();
    const groups = JSON.parse(String(formData.get("groups") ?? "[]"));
    const principles = JSON.parse(String(formData.get("principles") ?? "[]"));
    if (!intro) return { error: "Intro is required." };
    await setSiteContent("network", { intro, groups, principles });
    revalidatePath("/network");
    return { ok: true };
  } catch {
    return { error: "Failed to save. Check your input." };
  }
}

export async function saveResources(
  _prev: ContentFormState,
  formData: FormData,
): Promise<ContentFormState> {
  await requireAdmin();
  try {
    const resources = JSON.parse(String(formData.get("resources") ?? "[]"));
    await setSiteContent("resources", resources);
    revalidatePath("/resources");
    return { ok: true };
  } catch {
    return { error: "Failed to save. Check your input." };
  }
}

export async function saveAboutContent(
  _prev: ContentFormState,
  formData: FormData,
): Promise<ContentFormState> {
  await requireAdmin();
  try {
    const name = String(formData.get("name") ?? "").trim();
    const creds = String(formData.get("creds") ?? "").trim();
    const role = String(formData.get("role") ?? "").trim();
    const bio = JSON.parse(String(formData.get("bio") ?? "[]"));
    const links = JSON.parse(String(formData.get("links") ?? "[]"));
    if (!name) return { error: "Name is required." };
    await setSiteContent("about", { name, creds, role, bio, links });
    revalidatePath("/about");
    return { ok: true };
  } catch {
    return { error: "Failed to save. Check your input." };
  }
}

export async function saveContactContent(
  _prev: ContentFormState,
  formData: FormData,
): Promise<ContentFormState> {
  await requireAdmin();
  try {
    const eyebrow = String(formData.get("eyebrow") ?? "").trim();
    const title = String(formData.get("title") ?? "").trim();
    const intro = String(formData.get("intro") ?? "").trim();
    const channels = JSON.parse(String(formData.get("channels") ?? "[]"));
    if (!title) return { error: "Title is required." };
    await setSiteContent("contact", { eyebrow, title, intro, channels });
    revalidatePath("/contact");
    return { ok: true };
  } catch {
    return { error: "Failed to save. Check your input." };
  }
}

export async function resetSectionToDefault(section: string): Promise<void> {
  await requireAdmin();
  await setSiteContent(section, null as never);
  revalidateAll();
}
