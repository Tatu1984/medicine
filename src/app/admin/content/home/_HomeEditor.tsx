"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { Plus, Trash2 } from "lucide-react";
import { saveHomeContent, type ContentFormState } from "../actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import type { HomeContent, Movement, Stat } from "@/lib/site-content";

function SaveButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" className="rounded-full" disabled={pending}>
      {pending ? "Saving…" : "Save changes"}
    </Button>
  );
}

export function HomeEditor({ defaults }: { defaults: HomeContent }) {
  const [state, action] = useActionState<ContentFormState, FormData>(saveHomeContent, undefined);
  const [definition, setDefinition] = useState(defaults.definition);
  const [movements, setMovements] = useState<Movement[]>(defaults.movements);
  const [stats, setStats] = useState<Stat[]>(defaults.stats);

  function updateMovement(i: number, field: keyof Movement, val: string) {
    setMovements((prev) => prev.map((m, idx) => (idx === i ? { ...m, [field]: val } : m)));
  }
  function addMovement() {
    setMovements((prev) => [...prev, { title: "", plain: "", body: "" }]);
  }
  function removeMovement(i: number) {
    setMovements((prev) => prev.filter((_, idx) => idx !== i));
  }

  function updateStat(i: number, field: keyof Stat, val: string | number) {
    setStats((prev) => prev.map((s, idx) => (idx === i ? { ...s, [field]: field === "value" ? Number(val) : val } : s)));
  }
  function addStat() {
    setStats((prev) => [...prev, { value: 0, suffix: "", label: "" }]);
  }
  function removeStat(i: number) {
    setStats((prev) => prev.filter((_, idx) => idx !== i));
  }

  return (
    <form action={action} className="space-y-10">
      <input type="hidden" name="definition" value={definition} />
      <input type="hidden" name="movements" value={JSON.stringify(movements)} />
      <input type="hidden" name="stats" value={JSON.stringify(stats)} />

      {/* Definition */}
      <section className="rounded-2xl border border-border bg-card p-6">
        <h2 className="mb-4 font-semibold">Hero definition</h2>
        <div className="space-y-2">
          <Label>Definition text</Label>
          <Textarea rows={4} value={definition} onChange={(e) => setDefinition(e.target.value)} />
        </div>
      </section>

      {/* Movements */}
      <section className="rounded-2xl border border-border bg-card p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-semibold">Movements</h2>
          <Button type="button" variant="outline" size="sm" className="rounded-full" onClick={addMovement}>
            <Plus className="size-4" /> Add
          </Button>
        </div>
        <div className="space-y-6">
          {movements.map((m, i) => (
            <div key={i} className="relative rounded-xl border border-border bg-secondary/30 p-5">
              <button type="button" onClick={() => removeMovement(i)} className="absolute right-4 top-4 text-muted-foreground hover:text-destructive">
                <Trash2 className="size-4" />
              </button>
              <div className="space-y-3 pr-8">
                <div className="space-y-1.5">
                  <Label>Title</Label>
                  <Input value={m.title} onChange={(e) => updateMovement(i, "title", e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>Tagline</Label>
                  <Input value={m.plain} onChange={(e) => updateMovement(i, "plain", e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>Body</Label>
                  <Textarea rows={3} value={m.body} onChange={(e) => updateMovement(i, "body", e.target.value)} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="rounded-2xl border border-border bg-card p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-semibold">Stats band</h2>
          <Button type="button" variant="outline" size="sm" className="rounded-full" onClick={addStat}>
            <Plus className="size-4" /> Add
          </Button>
        </div>
        <div className="space-y-4">
          {stats.map((s, i) => (
            <div key={i} className="relative flex items-end gap-3 rounded-xl border border-border bg-secondary/30 p-4">
              <button type="button" onClick={() => removeStat(i)} className="absolute right-3 top-3 text-muted-foreground hover:text-destructive">
                <Trash2 className="size-4" />
              </button>
              <div className="w-24 space-y-1.5">
                <Label>Value</Label>
                <Input type="number" value={s.value} onChange={(e) => updateStat(i, "value", e.target.value)} />
              </div>
              <div className="w-20 space-y-1.5">
                <Label>Suffix</Label>
                <Input value={s.suffix} onChange={(e) => updateStat(i, "suffix", e.target.value)} placeholder="+" />
              </div>
              <div className="flex-1 space-y-1.5 pr-6">
                <Label>Label</Label>
                <Input value={s.label} onChange={(e) => updateStat(i, "label", e.target.value)} />
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
