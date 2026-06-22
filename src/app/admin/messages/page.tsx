import type { Metadata } from "next";
import { Mail, MailOpen, Trash2 } from "lucide-react";
import { AdminBar } from "@/components/admin/AdminBar";
import { Button } from "@/components/ui/button";
import { getMessages } from "@/lib/articles";
import { deleteMessage, markMessageRead } from "@/app/admin/actions";

export const metadata: Metadata = {
  title: "Messages",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

function formatDate(d: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
}

export default async function MessagesPage() {
  const messages = await getMessages();

  return (
    <div className="min-h-screen bg-secondary/30">
      <AdminBar />
      <div className="container-page py-10">
        <h1 className="text-2xl font-semibold">Messages</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {messages.length} {messages.length === 1 ? "message" : "messages"} from the contact form.
        </p>

        {messages.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-dashed border-border bg-card p-12 text-center">
            <Mail className="mx-auto size-8 text-muted-foreground" />
            <h2 className="mt-4 text-lg font-semibold">No messages yet</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Enquiries from the public contact form will appear here.
            </p>
          </div>
        ) : (
          <div className="mt-8 space-y-4">
            {messages.map((m) => (
              <article
                key={m.id}
                className={`rounded-3xl border bg-card p-6 transition-colors ${
                  m.read ? "border-border" : "border-sage/50 bg-sage-soft/20"
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      {!m.read && <span className="size-2 rounded-full bg-clay" aria-label="unread" />}
                      <h3 className="font-semibold text-foreground">{m.name}</h3>
                      {m.role && (
                        <span className="rounded-full bg-secondary px-2 py-0.5 text-xs text-muted-foreground">
                          {m.role}
                        </span>
                      )}
                    </div>
                    <a href={`mailto:${m.email}`} className="text-sm text-sage-deep hover:text-clay">
                      {m.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="mr-2 text-xs text-muted-foreground">{formatDate(m.createdAt)}</span>
                    <form action={markMessageRead.bind(null, m.id, !m.read)}>
                      <Button type="submit" variant="ghost" size="sm" className="rounded-full" title={m.read ? "Mark unread" : "Mark read"}>
                        {m.read ? <Mail className="size-4" /> : <MailOpen className="size-4" />}
                      </Button>
                    </form>
                    <form action={deleteMessage.bind(null, m.id)}>
                      <Button type="submit" variant="ghost" size="sm" className="rounded-full text-destructive hover:text-destructive" title="Delete">
                        <Trash2 className="size-4" />
                      </Button>
                    </form>
                  </div>
                </div>
                <p className="mt-4 whitespace-pre-wrap leading-relaxed text-foreground/85">{m.message}</p>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
