"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import {
  createSession,
  destroySession,
  getSession,
  verifyCredentials,
} from "@/lib/auth";
import { articleSchema } from "@/lib/validation";
import { slugify } from "@/lib/slug";

export type FormState = { error?: string; ok?: boolean } | undefined;

async function requireAdmin() {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");
}

async function uniqueSlug(title: string, ignoreId?: string): Promise<string> {
  const base = slugify(title) || "article";
  let slug = base;
  let n = 2;
  // Resolve collisions: base, base-2, base-3 …
  while (true) {
    const existing = await prisma.article.findUnique({ where: { slug } });
    if (!existing || existing.id === ignoreId) return slug;
    slug = `${base}-${n++}`;
  }
}

export async function loginAction(_prev: FormState, formData: FormData): Promise<FormState> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const from = String(formData.get("from") ?? "/admin");

  if (!verifyCredentials(email, password)) {
    return { error: "Incorrect email or password." };
  }
  await createSession(email);
  redirect(from.startsWith("/admin") ? from : "/admin");
}

export async function logoutAction() {
  await destroySession();
  redirect("/admin/login");
}

function parseForm(formData: FormData) {
  return articleSchema.safeParse({
    title: String(formData.get("title") ?? ""),
    authors: String(formData.get("authors") ?? ""),
    journal: String(formData.get("journal") ?? ""),
    year: String(formData.get("year") ?? ""),
    doi: String(formData.get("doi") ?? ""),
    category: String(formData.get("category") ?? ""),
    abstract: String(formData.get("abstract") ?? ""),
    body: String(formData.get("body") ?? ""),
    pdfUrl: String(formData.get("pdfUrl") ?? ""),
    pdfName: String(formData.get("pdfName") ?? ""),
    published: formData.get("published") === "on" || formData.get("published") === "true",
    featured: formData.get("featured") === "on" || formData.get("featured") === "true",
  });
}

export async function createArticle(_prev: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const parsed = parseForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }
  const data = parsed.data;
  const slug = await uniqueSlug(data.title);

  try {
    await prisma.article.create({
      data: {
        slug,
        title: data.title,
        authors: data.authors,
        journal: data.journal || null,
        year: data.year || null,
        doi: data.doi || null,
        category: data.category,
        abstract: data.abstract,
        body: data.body,
        pdfUrl: data.pdfUrl || null,
        pdfName: data.pdfName || null,
        published: data.published,
        featured: data.featured,
      },
    });
  } catch (err) {
    console.error("[createArticle]", err);
    return { error: "Could not save — is the database connected?" };
  }

  revalidatePath("/research");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function updateArticle(id: string, _prev: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const parsed = parseForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }
  const data = parsed.data;
  const slug = await uniqueSlug(data.title, id);

  try {
    await prisma.article.update({
      where: { id },
      data: {
        slug,
        title: data.title,
        authors: data.authors,
        journal: data.journal || null,
        year: data.year || null,
        doi: data.doi || null,
        category: data.category,
        abstract: data.abstract,
        body: data.body,
        pdfUrl: data.pdfUrl || null,
        pdfName: data.pdfName || null,
        published: data.published,
        featured: data.featured,
      },
    });
  } catch (err) {
    console.error("[updateArticle]", err);
    return { error: "Could not update — is the database connected?" };
  }

  revalidatePath("/research");
  revalidatePath(`/research/${slug}`);
  revalidatePath("/admin");
  redirect("/admin");
}

export async function deleteArticle(id: string) {
  await requireAdmin();
  try {
    await prisma.article.delete({ where: { id } });
  } catch (err) {
    console.error("[deleteArticle]", err);
  }
  revalidatePath("/research");
  revalidatePath("/admin");
}

export async function togglePublish(id: string, published: boolean) {
  await requireAdmin();
  try {
    await prisma.article.update({ where: { id }, data: { published } });
  } catch (err) {
    console.error("[togglePublish]", err);
  }
  revalidatePath("/research");
  revalidatePath("/admin");
}
