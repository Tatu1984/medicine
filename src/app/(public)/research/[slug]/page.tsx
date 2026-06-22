import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft, Download, ExternalLink } from "lucide-react";
import { getArticleBySlug } from "@/lib/articles";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return { title: "Article not found" };
  return {
    title: article.title,
    description: article.abstract.slice(0, 160),
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article || !article.published) notFound();

  return (
    <article className="container-page max-w-3xl py-14 sm:py-20">
      <Link
        href="/research"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" /> All research
      </Link>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <span className="rounded-full bg-clay-soft px-3 py-1 text-xs font-semibold uppercase tracking-wide text-clay">
          {article.category}
        </span>
        <span className="text-sm font-medium text-muted-foreground">
          {[article.journal, article.year].filter(Boolean).join(" · ")}
        </span>
      </div>

      <h1 className="mt-4 text-3xl font-semibold leading-[1.12] text-balance sm:text-4xl">
        {article.title}
      </h1>
      <p className="mt-3 text-muted-foreground">{article.authors}</p>

      {/* Abstract + downloads */}
      <div className="mt-8 rounded-3xl border border-border bg-secondary/40 p-6 sm:p-7">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Abstract
        </h2>
        <p className="mt-3 leading-relaxed text-foreground/85">{article.abstract}</p>

        {(article.pdfName || article.doi) && (
          <div className="mt-5 flex flex-wrap gap-3">
            {article.pdfName && (
              <a
                href={`/api/research/${article.id}/pdf`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-sage px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                <Download className="size-4" /> Download PDF
              </a>
            )}
            {article.doi && (
              <a
                href={`https://doi.org/${article.doi}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground/80 transition-colors hover:border-sage/50 hover:text-sage-deep"
              >
                <ExternalLink className="size-4" /> View on doi.org
              </a>
            )}
          </div>
        )}
      </div>

      {/* Body */}
      {article.body.trim() && (
        <div className="prose prose-neutral mt-12 max-w-none prose-headings:font-heading prose-headings:tracking-tight prose-a:text-sage-deep hover:prose-a:text-clay prose-img:rounded-2xl">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{article.body}</ReactMarkdown>
        </div>
      )}
    </article>
  );
}
