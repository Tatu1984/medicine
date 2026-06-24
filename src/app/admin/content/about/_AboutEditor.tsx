"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { Plus, Trash2 } from "lucide-react";
import { saveAboutContent, type ContentFormState } from "../actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import type { AboutContent, AboutLink } from "@/lib/site-content";

function SaveButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" className="rounded-full" disabled={pending}>
      {pending ? "Saving…" : "Save changes"}
    </Button>
  );
}

export function AboutEditor({ defaults }: { defaults: AboutContent }) {
  const [state, action] = useActionState<ContentFormState, FormData>(saveAboutContent, undefined);
  const [name, setName] = useState(defaults.name);
  const [creds, setCreds] = useState(defaults.creds);
  const [role, setRole] = useState(defaults.role);
  const [bio, setBio] = useState<string[]>(defaults.bio);
  const [links, setLinks] = useState<AboutLink[]>(defaults.links);

  function updateBio(i: number, val: string) { setBio((prev) => prev.map((p, idx) => (idx === i ? val : p))); }
  function addBio() { setBio((prev) => [...prev, ""]); }
  function removeBio(i: number) { setBio((prev) => prev.filter((_, idx) => idx !== i)); }

  function updateLink(i: number, field: keyof AboutLink, val: string) {
    setLinks((prev) => prev.map((l, idx) => (idx === i ? { ...l, [field]: val } : l)));
  }
  function addLink() { setLinks((prev) => [...prev, { label: "", href: "" }]); }
  function removeLink(i: number) { setLinks((prev) => prev.filter((_, idx) => idx !== i)); }

  return (
    <form action={action} className="space-y-8">
      <input type="hidden" name="name" value={name} />
      <input type="hidden" name="creds" value={creds} />
      <input type="hidden" name="role" value={role} />
      <input type="hidden" name="bio" value={JSON.stringify(bio)} />
      <input type="hidden" name="links" value={JSON.stringify(links)} />

      {/* Identity */}
      <section className="rounded-2xl border border-border bg-card p-6">
        <h2 className="mb-4 font-semibold">Identity</h2>
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label>Name</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label>Credentials</Label>
            <Input value={creds} onChange={(e) => setCreds(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label>Role / affiliation</Label>
            <Textarea rows={2} value={role} onChange={(e) => setRole(e.target.value)} />
          </div>
        </div>
      </section>

      {/* Bio */}
      <section className="rounded-2xl border border-border bg-card p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-semibold">Bio paragraphs</h2>
          <Button type="button" variant="outline" size="sm" className="rounded-full" onClick={addBio}>
            <Plus className="size-4" /> Add
          </Button>
        </div>
        <div className="space-y-3">
          {bio.map((para, i) => (
            <div key={i} className="flex gap-2">
              <Textarea rows={4} value={para} onChange={(e) => updateBio(i, e.target.value)} className="flex-1 text-sm" />
              <button type="button" onClick={() => removeBio(i)} className="mt-1 text-muted-foreground hover:text-destructive">
                <Trash2 className="size-4" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Links */}
      <section className="rounded-2xl border border-border bg-card p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-semibold">Links</h2>
          <Button type="button" variant="outline" size="sm" className="rounded-full" onClick={addLink}>
            <Plus className="size-4" /> Add
          </Button>
        </div>
        <div className="space-y-3">
          {links.map((l, i) => (
            <div key={i} className="flex items-center gap-2">
              <Input placeholder="Label" value={l.label} onChange={(e) => updateLink(i, "label", e.target.value)} className="flex-1" />
              <Input placeholder="https://…" type="url" value={l.href} onChange={(e) => updateLink(i, "href", e.target.value)} className="flex-1" />
              <button type="button" onClick={() => removeLink(i)} className="text-muted-foreground hover:text-destructive">
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
