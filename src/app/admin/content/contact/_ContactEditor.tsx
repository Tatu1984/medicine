"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { Plus, Trash2 } from "lucide-react";
import { saveContactContent, type ContentFormState } from "../actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import type { ContactContent, ContactChannel } from "@/lib/site-content";

const ICON_OPTIONS = [
  { value: "mail", label: "Mail" },
  { value: "phone", label: "Phone" },
  { value: "map-pin", label: "Map Pin" },
  { value: "at-sign", label: "At Sign (@)" },
  { value: "book-open", label: "Book Open" },
];

function SaveButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" className="rounded-full" disabled={pending}>
      {pending ? "Saving…" : "Save changes"}
    </Button>
  );
}

export function ContactEditor({ defaults }: { defaults: ContactContent }) {
  const [state, action] = useActionState<ContentFormState, FormData>(saveContactContent, undefined);
  const [eyebrow, setEyebrow] = useState(defaults.eyebrow);
  const [title, setTitle] = useState(defaults.title);
  const [intro, setIntro] = useState(defaults.intro);
  const [channels, setChannels] = useState<ContactChannel[]>(defaults.channels);

  function update<K extends keyof ContactChannel>(i: number, field: K, val: ContactChannel[K]) {
    setChannels((prev) => prev.map((c, idx) => (idx === i ? { ...c, [field]: val } : c)));
  }
  function addChannel() {
    setChannels((prev) => [...prev, { icon: "mail", label: "", value: "", href: "" }]);
  }
  function removeChannel(i: number) {
    setChannels((prev) => prev.filter((_, idx) => idx !== i));
  }
  function moveUp(i: number) {
    if (i === 0) return;
    setChannels((prev) => {
      const next = [...prev];
      [next[i - 1], next[i]] = [next[i], next[i - 1]];
      return next;
    });
  }
  function moveDown(i: number) {
    setChannels((prev) => {
      if (i === prev.length - 1) return prev;
      const next = [...prev];
      [next[i], next[i + 1]] = [next[i + 1], next[i]];
      return next;
    });
  }

  return (
    <form action={action} className="space-y-8">
      <input type="hidden" name="eyebrow" value={eyebrow} />
      <input type="hidden" name="title" value={title} />
      <input type="hidden" name="intro" value={intro} />
      <input type="hidden" name="channels" value={JSON.stringify(channels)} />

      {/* Hero text */}
      <section className="rounded-2xl border border-border bg-card p-6">
        <h2 className="mb-4 font-semibold">Page hero</h2>
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label>Eyebrow</Label>
            <Input value={eyebrow} onChange={(e) => setEyebrow(e.target.value)} placeholder="Get involved" />
          </div>
          <div className="space-y-1.5">
            <Label>Title</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label>Intro</Label>
            <Textarea rows={3} value={intro} onChange={(e) => setIntro(e.target.value)} />
          </div>
        </div>
      </section>

      {/* Channels */}
      <section className="rounded-2xl border border-border bg-card p-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="font-semibold">Contact channels</h2>
            <p className="mt-0.5 text-xs text-muted-foreground">Shown beside the contact form.</p>
          </div>
          <Button type="button" variant="outline" size="sm" className="rounded-full" onClick={addChannel}>
            <Plus className="size-4" /> Add
          </Button>
        </div>

        <div className="space-y-4">
          {channels.map((c, i) => (
            <div key={i} className="rounded-xl border border-border bg-secondary/30 p-4">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex gap-1">
                  <button type="button" onClick={() => moveUp(i)} disabled={i === 0}
                    className="rounded px-1.5 py-0.5 text-xs text-muted-foreground hover:bg-secondary disabled:opacity-30">↑</button>
                  <button type="button" onClick={() => moveDown(i)} disabled={i === channels.length - 1}
                    className="rounded px-1.5 py-0.5 text-xs text-muted-foreground hover:bg-secondary disabled:opacity-30">↓</button>
                </div>
                <button type="button" onClick={() => removeChannel(i)} className="text-muted-foreground hover:text-destructive">
                  <Trash2 className="size-4" />
                </button>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label>Icon</Label>
                  <select
                    value={c.icon}
                    onChange={(e) => update(i, "icon", e.target.value)}
                    className="h-9 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {ICON_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <Label>Label</Label>
                  <Input value={c.label} onChange={(e) => update(i, "label", e.target.value)} placeholder="Email" />
                </div>
                <div className="space-y-1.5">
                  <Label>Display value</Label>
                  <Input value={c.value} onChange={(e) => update(i, "value", e.target.value)} placeholder="hello@example.com" />
                </div>
                <div className="space-y-1.5">
                  <Label>Link (href)</Label>
                  <Input value={c.href} onChange={(e) => update(i, "href", e.target.value)} placeholder="mailto:hello@example.com" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {state?.error && (
        <p className="rounded-xl bg-destructive/10 px-3 py-2 text-sm text-destructive">{state.error}</p>
      )}
      {state?.ok && (
        <p className="rounded-xl bg-sage-soft px-3 py-2 text-sm text-sage-deep">Saved successfully.</p>
      )}
      <SaveButton />
    </form>
  );
}
