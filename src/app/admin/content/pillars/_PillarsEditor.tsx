"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { savePillars, type ContentFormState } from "../actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import type { Pillar } from "@/lib/site-content";

function SaveButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" className="rounded-full" disabled={pending}>
      {pending ? "Saving…" : "Save changes"}
    </Button>
  );
}

export function PillarsEditor({ defaults }: { defaults: Pillar[] }) {
  const [state, action] = useActionState<ContentFormState, FormData>(savePillars, undefined);
  const [pillars, setPillars] = useState<Pillar[]>(defaults);
  const [open, setOpen] = useState<number | null>(0);

  function update<K extends keyof Pillar>(i: number, field: K, val: Pillar[K]) {
    setPillars((prev) => prev.map((p, idx) => (idx === i ? { ...p, [field]: val } : p)));
  }

  function updateDetail(pi: number, di: number, val: string) {
    setPillars((prev) =>
      prev.map((p, idx) =>
        idx === pi ? { ...p, detail: p.detail.map((d, j) => (j === di ? val : d)) } : p,
      ),
    );
  }
  function addDetail(pi: number) {
    setPillars((prev) =>
      prev.map((p, idx) => (idx === pi ? { ...p, detail: [...p.detail, ""] } : p)),
    );
  }
  function removeDetail(pi: number, di: number) {
    setPillars((prev) =>
      prev.map((p, idx) =>
        idx === pi ? { ...p, detail: p.detail.filter((_, j) => j !== di) } : p,
      ),
    );
  }

  function updateHighlight(pi: number, hi: number, field: "label" | "source", val: string) {
    setPillars((prev) =>
      prev.map((p, idx) =>
        idx === pi
          ? { ...p, highlights: p.highlights.map((h, j) => (j === hi ? { ...h, [field]: val } : h)) }
          : p,
      ),
    );
  }
  function addHighlight(pi: number) {
    setPillars((prev) =>
      prev.map((p, idx) =>
        idx === pi ? { ...p, highlights: [...p.highlights, { label: "", source: "" }] } : p,
      ),
    );
  }
  function removeHighlight(pi: number, hi: number) {
    setPillars((prev) =>
      prev.map((p, idx) =>
        idx === pi ? { ...p, highlights: p.highlights.filter((_, j) => j !== hi) } : p,
      ),
    );
  }

  return (
    <form action={action} className="space-y-4">
      <input type="hidden" name="pillars" value={JSON.stringify(pillars)} />

      {pillars.map((p, i) => (
        <div key={p.id} className="rounded-2xl border border-border bg-card overflow-hidden">
          <button
            type="button"
            className="flex w-full items-center justify-between px-6 py-4 text-left hover:bg-secondary/40"
            onClick={() => setOpen(open === i ? null : i)}
          >
            <span className="font-semibold">
              {p.index.toUpperCase()}. {p.title || "(untitled)"}
            </span>
            {open === i ? <ChevronUp className="size-4 text-muted-foreground" /> : <ChevronDown className="size-4 text-muted-foreground" />}
          </button>

          {open === i && (
            <div className="space-y-5 border-t border-border p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label>ID (slug)</Label>
                  <Input value={p.id} onChange={(e) => update(i, "id", e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>Index (a–f)</Label>
                  <Input value={p.index} maxLength={1} onChange={(e) => update(i, "index", e.target.value)} />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label>Title</Label>
                <Input value={p.title} onChange={(e) => update(i, "title", e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label>Tagline</Label>
                <Input value={p.plain} onChange={(e) => update(i, "plain", e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label>Summary</Label>
                <Textarea rows={3} value={p.summary} onChange={(e) => update(i, "summary", e.target.value)} />
              </div>

              {/* Detail bullets */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Detail bullets</Label>
                  <Button type="button" variant="outline" size="sm" className="rounded-full" onClick={() => addDetail(i)}>
                    <Plus className="size-3.5" /> Add
                  </Button>
                </div>
                {p.detail.map((d, di) => (
                  <div key={di} className="flex gap-2">
                    <Textarea rows={2} value={d} onChange={(e) => updateDetail(i, di, e.target.value)} className="flex-1 text-sm" />
                    <button type="button" onClick={() => removeDetail(i, di)} className="mt-1 text-muted-foreground hover:text-destructive">
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Highlights */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Highlights</Label>
                  <Button type="button" variant="outline" size="sm" className="rounded-full" onClick={() => addHighlight(i)}>
                    <Plus className="size-3.5" /> Add
                  </Button>
                </div>
                {p.highlights.map((h, hi) => (
                  <div key={hi} className="flex items-start gap-2">
                    <Input placeholder="Label" value={h.label} onChange={(e) => updateHighlight(i, hi, "label", e.target.value)} className="flex-1" />
                    <Input placeholder="Source" value={h.source} onChange={(e) => updateHighlight(i, hi, "source", e.target.value)} className="w-40" />
                    <button type="button" onClick={() => removeHighlight(i, hi)} className="mt-1 text-muted-foreground hover:text-destructive">
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}

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
