"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { Plus, Trash2 } from "lucide-react";
import { saveResources, type ContentFormState } from "../actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import type { Resource } from "@/lib/site-content";

const CATEGORIES = ["Foundations", "Overdiagnosis", "Evidence", "Bedside", "Education"] as const;

function SaveButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" className="rounded-full" disabled={pending}>
      {pending ? "Saving…" : "Save changes"}
    </Button>
  );
}

export function ResourcesEditor({ defaults }: { defaults: Resource[] }) {
  const [state, action] = useActionState<ContentFormState, FormData>(saveResources, undefined);
  const [resources, setResources] = useState<Resource[]>(defaults);

  function update<K extends keyof Resource>(i: number, field: K, val: Resource[K]) {
    setResources((prev) => prev.map((r, idx) => (idx === i ? { ...r, [field]: val } : r)));
  }
  function addResource() {
    setResources((prev) => [...prev, { title: "", source: "", href: "", category: "Foundations", note: "" }]);
  }
  function removeResource(i: number) {
    setResources((prev) => prev.filter((_, idx) => idx !== i));
  }

  return (
    <form action={action} className="space-y-6">
      <input type="hidden" name="resources" value={JSON.stringify(resources)} />

      <div className="flex justify-end">
        <Button type="button" variant="outline" size="sm" className="rounded-full" onClick={addResource}>
          <Plus className="size-4" /> Add resource
        </Button>
      </div>

      <div className="space-y-4">
        {resources.map((r, i) => (
          <div key={i} className="relative rounded-2xl border border-border bg-card p-6">
            <button type="button" onClick={() => removeResource(i)} className="absolute right-5 top-5 text-muted-foreground hover:text-destructive">
              <Trash2 className="size-4" />
            </button>
            <div className="grid gap-4 pr-8 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label>Title</Label>
                <Input value={r.title} onChange={(e) => update(i, "title", e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label>Source</Label>
                <Input value={r.source} onChange={(e) => update(i, "source", e.target.value)} placeholder="BMJ — since 1962" />
              </div>
              <div className="space-y-1.5">
                <Label>URL</Label>
                <Input type="url" value={r.href} onChange={(e) => update(i, "href", e.target.value)} placeholder="https://" />
              </div>
              <div className="space-y-1.5">
                <Label>Category</Label>
                <select
                  value={r.category}
                  onChange={(e) => update(i, "category", e.target.value as Resource["category"])}
                  className="h-9 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label>Note</Label>
                <Textarea rows={2} value={r.note} onChange={(e) => update(i, "note", e.target.value)} />
              </div>
            </div>
          </div>
        ))}
      </div>

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
