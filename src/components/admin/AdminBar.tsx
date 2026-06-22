import Link from "next/link";
import { Inbox, LogOut, Plus } from "lucide-react";
import { Logo } from "@/components/site/Logo";
import { Button } from "@/components/ui/button";
import { logoutAction } from "@/app/admin/actions";
import { getUnreadMessageCount } from "@/lib/articles";

export async function AdminBar({ showNew = true }: { showNew?: boolean }) {
  const unread = await getUnreadMessageCount();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card/80 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/admin" aria-label="Admin dashboard">
            <Logo />
          </Link>
          <span className="rounded-full bg-clay-soft px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-clay">
            Admin
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm" className="rounded-full">
            <Link href="/admin/messages">
              <Inbox className="size-4" /> Messages
              {unread > 0 && (
                <span className="ml-1 inline-flex min-w-5 items-center justify-center rounded-full bg-clay px-1.5 text-[11px] font-semibold text-white">
                  {unread}
                </span>
              )}
            </Link>
          </Button>
          <Button asChild variant="ghost" size="sm" className="rounded-full">
            <Link href="/" target="_blank">
              View site
            </Link>
          </Button>
          {showNew && (
            <Button asChild size="sm" className="rounded-full">
              <Link href="/admin/articles/new">
                <Plus className="size-4" /> New article
              </Link>
            </Button>
          )}
          <form action={logoutAction}>
            <Button variant="outline" size="sm" className="rounded-full" type="submit">
              <LogOut className="size-4" /> Log out
            </Button>
          </form>
        </div>
      </div>
    </header>
  );
}

export default AdminBar;
