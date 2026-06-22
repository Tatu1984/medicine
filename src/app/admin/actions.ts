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
import { articleSchema, contactSchema, MAX_PDF_BYTES } from "@/lib/validation";
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
  while (true) {
    const existing = await prisma.article.findUnique({ where: { slug }, select: { id: true } });
    if (!existing || existing.id === ignoreId) return slug;
    slug = `${base}-${n++}`;
  }
}

/** Pull an uploaded PDF out of the form (or null if none). Throws on bad input. */
async function extractPdf(formData: FormData) {
  const file = formData.get("pdf");
  if (!(file instanceof File) || file.size === 0) return null;
  if (file.type && file.type !== "application/pdf") {
    throw new Error("Only PDF files are allowed.");
  }
  if (file.size > MAX_PDF_BYTES) {
    throw new Error("PDF is too large (max 30 MB).");
  }
  const data = Buffer.from(await file.arrayBuffer());
  return { data, name: file.name, mime: file.type || "application/pdf" };
}

// ── Auth ────────────────────────────────────────────────────────────────────

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

// ── Articles ──────────────────────────────────────────────────────────────

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

  let pdf;
  try {
    pdf = await extractPdf(formData);
  } catch (e) {
    return { error: (e as Error).message };
  }

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
        published: data.published,
        featured: data.featured,
        pdfData: pdf?.data ?? null,
        pdfName: pdf?.name ?? null,
        pdfMime: pdf?.mime ?? null,
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

  let pdf;
  try {
    pdf = await extractPdf(formData);
  } catch (e) {
    return { error: (e as Error).message };
  }
  const removePdf =
    formData.get("removePdf") === "on" || formData.get("removePdf") === "true";

  const pdfFields = pdf
    ? { pdfData: pdf.data, pdfName: pdf.name, pdfMime: pdf.mime }
    : removePdf
      ? { pdfData: null, pdfName: null, pdfMime: null }
      : {};

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
        published: data.published,
        featured: data.featured,
        ...pdfFields,
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

// ── Contact messages ────────────────────────────────────────────────────────

export async function submitMessage(_prev: FormState, formData: FormData): Promise<FormState> {
  const parsed = contactSchema.safeParse({
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    role: String(formData.get("role") ?? ""),
    message: String(formData.get("message") ?? ""),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Please check the form." };
  }
  try {
    await prisma.contactMessage.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        role: parsed.data.role || null,
        message: parsed.data.message,
      },
    });
  } catch (err) {
    console.error("[submitMessage]", err);
    return { error: "Could not send your message — please try again shortly." };
  }
  revalidatePath("/admin/messages");
  return { ok: true };
}

export async function markMessageRead(id: string, read: boolean) {
  await requireAdmin();
  try {
    await prisma.contactMessage.update({ where: { id }, data: { read } });
  } catch (err) {
    console.error("[markMessageRead]", err);
  }
  revalidatePath("/admin/messages");
}

export async function deleteMessage(id: string) {
  await requireAdmin();
  try {
    await prisma.contactMessage.delete({ where: { id } });
  } catch (err) {
    console.error("[deleteMessage]", err);
  }
  revalidatePath("/admin/messages");
}
