import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AdminBar } from "@/components/admin/AdminBar";
import { getPillars } from "@/lib/site-content";
import { PillarsEditor } from "./_PillarsEditor";

export const metadata: Metadata = { title: "Edit Pillars", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function PillarsContentPage() {
  const pillars = await getPillars();
  return (
    <div className="min-h-screen bg-secondary/30">
      <AdminBar showNew={false} />
      <div className="container-page py-10">
        <Link href="/admin/content" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="size-4" /> Content
        </Link>
        <h1 className="mt-4 mb-8 text-2xl font-semibold">Pillars</h1>
        <PillarsEditor defaults={pillars} />
      </div>
    </div>
  );
}
