"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { Plus, Trash2 } from "lucide-react";
import { saveNetworkContent, type ContentFormState } from "../actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import type { NetworkContent, NetworkGroup } from "@/lib/site-content";

function SaveButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" className="rounded-full" disabled={pending}>
      {pending ? "Saving…" : "Save changes"}
    </Button>
  );
}

export function NetworkEditor({ defaults }: { defaults: NetworkContent }) {
  const [state, action] = useActionState<ContentFormState, FormData>(saveNetworkContent, undefined);
  const [intro, setIntro] = useState(defaults.intro);
  const [groups, setGroups] = useState<NetworkGroup[]>(defaults.groups);
  const [principles, setPrinciples] = useState<string[]>(defaults.principles);

  function updateGroup(i: number, field: keyof NetworkGroup, val: string) {
    setGroups((prev) => prev.map((g, idx) => (idx === i ? { ...g, [field]: val } : g)));
  }
  function addGroup() { setGroups((prev) => [...prev, { name: "", body: "" }]); }
  function removeGroup(i: number) { setGroups((prev) => prev.filter((_, idx) => idx !== i)); }

  function updatePrinciple(i: number, val: string) {
    setPrinciples((prev) => prev.map((p, idx) => (idx === i ? val : p)));
  }
  function addPrinciple() { setPrinciples((prev) => [...prev, ""]); }
  function removePrinciple(i: number) { setPrinciples((prev) => prev.filter((_, idx) => idx !== i)); }

  return (
    <form action={action} className="space-y-8">
      <input type="hidden" name="intro" value={intro} />
      <input type="hidden" name="groups" value={JSON.stringify(groups)} />
      <input type="hidden" name="principles" value={JSON.stringify(principles)} />

      {/* Intro */}
      <section className="rounded-2xl border border-border bg-card p-6">
        <h2 className="mb-4 font-semibold">Intro text</h2>
        <Textarea rows={4} value={intro} onChange={(e) => setIntro(e.target.value)} />
      </section>

      {/* Groups */}
      <section className="rounded-2xl border border-border bg-card p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-semibold">Groups</h2>
          <Button type="button" variant="outline" size="sm" className="rounded-full" onClick={addGroup}>
            <Plus className="size-4" /> Add
          </Button>
        </div>
        <div className="space-y-4">
          {groups.map((g, i) => (
            <div key={i} className="relative rounded-xl border border-border bg-secondary/30 p-5">
              <button type="button" onClick={() => removeGroup(i)} className="absolute right-4 top-4 text-muted-foreground hover:text-destructive">
                <Trash2 className="size-4" />
              </button>
              <div className="space-y-3 pr-8">
                <div className="space-y-1.5">
                  <Label>Name</Label>
                  <Input value={g.name} onChange={(e) => updateGroup(i, "name", e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>Description</Label>
                  <Textarea rows={3} value={g.body} onChange={(e) => updateGroup(i, "body", e.target.value)} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Principles */}
      <section className="rounded-2xl border border-border bg-card p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-semibold">Founding principles</h2>
          <Button type="button" variant="outline" size="sm" className="rounded-full" onClick={addPrinciple}>
            <Plus className="size-4" /> Add
          </Button>
        </div>
        <div className="space-y-2">
          {principles.map((p, i) => (
            <div key={i} className="flex gap-2">
              <Input value={p} onChange={(e) => updatePrinciple(i, e.target.value)} className="flex-1" />
              <button type="button" onClick={() => removePrinciple(i)} className="text-muted-foreground hover:text-destructive">
                <Trash2 className="size-4" />
              </button>
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
