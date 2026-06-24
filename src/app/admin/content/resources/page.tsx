import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AdminBar } from "@/components/admin/AdminBar";
import { getResources } from "@/lib/site-content";
import { ResourcesEditor } from "./_ResourcesEditor";

export const metadata: Metadata = { title: "Edit Resources", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function ResourcesContentPage() {
  const resources = await getResources();
  return (
    <div className="min-h-screen bg-secondary/30">
      <AdminBar showNew={false} />
      <div className="container-page py-10">
        <Link href="/admin/content" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="size-4" /> Content
        </Link>
        <h1 className="mt-4 mb-8 text-2xl font-semibold">Resources</h1>
        <ResourcesEditor defaults={resources} />
      </div>
    </div>
  );
}
