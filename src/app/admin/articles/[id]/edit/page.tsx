import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { AdminBar } from "@/components/admin/AdminBar";
import { ArticleForm } from "@/app/admin/_components/ArticleForm";
import { updateArticle } from "@/app/admin/actions";
import { getArticleById } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Edit article",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = await getArticleById(id);
  if (!article) notFound();

  const action = updateArticle.bind(null, id);

  return (
    <div className="min-h-screen bg-secondary/30">
      <AdminBar showNew={false} />
      <div className="container-page py-10">
        <div className="flex items-center justify-between">
          <Link href="/admin" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="size-4" /> Back to dashboard
          </Link>
          {article.published && (
            <Link
              href={`/research/${article.slug}`}
              target="_blank"
              className="text-sm font-medium text-sage-deep hover:text-clay"
            >
              View live →
            </Link>
          )}
        </div>
        <h1 className="mt-4 mb-8 text-2xl font-semibold">Edit article</h1>
        <ArticleForm action={action} defaults={article} />
      </div>
    </div>
  );
}
