import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AdminBar } from "@/components/admin/AdminBar";
import { ArticleForm } from "@/app/admin/_components/ArticleForm";
import { createArticle } from "@/app/admin/actions";

export const metadata: Metadata = {
  title: "New article",
  robots: { index: false, follow: false },
};

export default function NewArticlePage() {
  return (
    <div className="min-h-screen bg-secondary/30">
      <AdminBar showNew={false} />
      <div className="container-page py-10">
        <Link href="/admin" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="size-4" /> Back to dashboard
        </Link>
        <h1 className="mt-4 mb-8 text-2xl font-semibold">New research article</h1>
        <ArticleForm action={createArticle} />
      </div>
    </div>
  );
}
