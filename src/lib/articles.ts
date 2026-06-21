import "server-only";
import { prisma } from "@/lib/db";
import type { Article } from "@/generated/prisma/client";

/**
 * DB reads are wrapped so a missing/unreachable database (e.g. during a build
 * with no DATABASE_URL, or before the first migration) degrades gracefully to
 * empty results instead of crashing the page.
 */

export async function getPublishedArticles(): Promise<Article[]> {
  try {
    return await prisma.article.findMany({
      where: { published: true },
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
    });
  } catch (err) {
    console.error("[articles] getPublishedArticles failed:", err);
    return [];
  }
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    return await prisma.article.findUnique({ where: { slug } });
  } catch (err) {
    console.error("[articles] getArticleBySlug failed:", err);
    return null;
  }
}

export async function getAllArticles(): Promise<Article[]> {
  try {
    return await prisma.article.findMany({ orderBy: { updatedAt: "desc" } });
  } catch (err) {
    console.error("[articles] getAllArticles failed:", err);
    return [];
  }
}

export async function getArticleById(id: string): Promise<Article | null> {
  try {
    return await prisma.article.findUnique({ where: { id } });
  } catch (err) {
    console.error("[articles] getArticleById failed:", err);
    return null;
  }
}
