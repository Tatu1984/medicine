import "server-only";
import { prisma } from "@/lib/db";

/**
 * DB reads are wrapped so a missing/unreachable database degrades gracefully to
 * empty results instead of crashing the page.
 *
 * The PDF binary (`pdfData`) is deliberately excluded from every list/detail
 * query — only the download route selects it. `pdfName` signals "has a PDF".
 */
const articleSelect = {
  id: true,
  slug: true,
  title: true,
  authors: true,
  journal: true,
  year: true,
  doi: true,
  category: true,
  abstract: true,
  body: true,
  pdfName: true,
  pdfMime: true,
  published: true,
  featured: true,
  createdAt: true,
  updatedAt: true,
} as const;

export type ArticleListItem = Awaited<ReturnType<typeof getAllArticles>>[number];

export async function getPublishedArticles() {
  try {
    return await prisma.article.findMany({
      where: { published: true },
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
      select: articleSelect,
    });
  } catch (err) {
    console.error("[articles] getPublishedArticles failed:", err);
    return [];
  }
}

export async function getArticleBySlug(slug: string) {
  try {
    return await prisma.article.findUnique({ where: { slug }, select: articleSelect });
  } catch (err) {
    console.error("[articles] getArticleBySlug failed:", err);
    return null;
  }
}

export async function getAllArticles() {
  try {
    return await prisma.article.findMany({
      orderBy: { updatedAt: "desc" },
      select: articleSelect,
    });
  } catch (err) {
    console.error("[articles] getAllArticles failed:", err);
    return [];
  }
}

export async function getArticleById(id: string) {
  try {
    return await prisma.article.findUnique({ where: { id }, select: articleSelect });
  } catch (err) {
    console.error("[articles] getArticleById failed:", err);
    return null;
  }
}

// ── Contact messages ────────────────────────────────────────────────────────

export async function getMessages() {
  try {
    return await prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" } });
  } catch (err) {
    console.error("[messages] getMessages failed:", err);
    return [];
  }
}

export async function getUnreadMessageCount() {
  try {
    return await prisma.contactMessage.count({ where: { read: false } });
  } catch {
    return 0;
  }
}
