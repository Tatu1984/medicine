import type { Metadata } from "next";
import Link from "next/link";
import { Eye, EyeOff, FileText, Pencil, Plus, Trash2 } from "lucide-react";
import { AdminBar } from "@/components/admin/AdminBar";
import { Button } from "@/components/ui/button";
import { getAllArticles } from "@/lib/articles";
import { deleteArticle, togglePublish } from "./actions";

export const metadata: Metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const articles = await getAllArticles();

  return (
    <div className="min-h-screen bg-secondary/30">
      <AdminBar />

      <div className="container-page py-10">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Research articles</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {articles.length} {articles.length === 1 ? "article" : "articles"} · manage what
              appears on the public Research page.
            </p>
          </div>
        </div>

        {articles.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-dashed border-border bg-card p-12 text-center">
            <FileText className="mx-auto size-8 text-muted-foreground" />
            <h2 className="mt-4 text-lg font-semibold">No articles yet</h2>
            <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
              Publish your first research article — write it as a webpage and attach a PDF for
              download. (If you just set up the database, run the migration first.)
            </p>
            <Button asChild className="mt-6 rounded-full">
              <Link href="/admin/articles/new">
                <Plus className="size-4" /> New article
              </Link>
            </Button>
          </div>
        ) : (
          <div className="mt-8 overflow-hidden rounded-3xl border border-border bg-card">
            <table className="w-full text-sm">
              <thead className="border-b border-border bg-secondary/50 text-left text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-5 py-3 font-semibold">Title</th>
                  <th className="hidden px-5 py-3 font-semibold md:table-cell">Category</th>
                  <th className="px-5 py-3 font-semibold">Status</th>
                  <th className="hidden px-5 py-3 font-semibold sm:table-cell">PDF</th>
                  <th className="px-5 py-3 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {articles.map((a) => (
                  <tr key={a.id} className="align-middle">
                    <td className="px-5 py-4">
                      <div className="font-medium text-foreground">{a.title}</div>
                      <div className="text-xs text-muted-foreground">
                        {a.authors} · {a.year || "—"}
                      </div>
                    </td>
                    <td className="hidden px-5 py-4 text-muted-foreground md:table-cell">{a.category}</td>
                    <td className="px-5 py-4">
                      {a.published ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-sage-soft px-2.5 py-0.5 text-xs font-semibold text-sage-deep">
                          <Eye className="size-3" /> Live
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold text-muted-foreground">
                          <EyeOff className="size-3" /> Draft
                        </span>
                      )}
                    </td>
                    <td className="hidden px-5 py-4 sm:table-cell">
                      {a.pdfName ? (
                        <FileText className="size-4 text-sage" />
                      ) : (
                        <span className="text-xs text-muted-foreground">—</span>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <form action={togglePublish.bind(null, a.id, !a.published)}>
                          <Button type="submit" variant="ghost" size="sm" className="rounded-full" title={a.published ? "Unpublish" : "Publish"}>
                            {a.published ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                          </Button>
                        </form>
                        <Button asChild variant="ghost" size="sm" className="rounded-full">
                          <Link href={`/admin/articles/${a.id}/edit`} title="Edit">
                            <Pencil className="size-4" />
                          </Link>
                        </Button>
                        <form action={deleteArticle.bind(null, a.id)}>
                          <Button type="submit" variant="ghost" size="sm" className="rounded-full text-destructive hover:text-destructive" title="Delete">
                            <Trash2 className="size-4" />
                          </Button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
