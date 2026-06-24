import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AdminBar } from "@/components/admin/AdminBar";
import { getContactContent } from "@/lib/site-content";
import { ContactEditor } from "./_ContactEditor";

export const metadata: Metadata = { title: "Edit Contact", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function ContactContentPage() {
  const contact = await getContactContent();
  return (
    <div className="min-h-screen bg-secondary/30">
      <AdminBar showNew={false} />
      <div className="container-page py-10">
        <Link href="/admin/content" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="size-4" /> Content
        </Link>
        <h1 className="mt-4 mb-8 text-2xl font-semibold">Contact</h1>
        <ContactEditor defaults={contact} />
      </div>
    </div>
  );
}
