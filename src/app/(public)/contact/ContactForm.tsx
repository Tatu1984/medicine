"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { CheckCircle2 } from "lucide-react";
import { submitMessage, type FormState } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" className="mt-6 rounded-full" disabled={pending}>
      {pending ? "Sending…" : "Send message"}
    </Button>
  );
}

export function ContactForm() {
  const [state, action] = useActionState<FormState, FormData>(submitMessage, undefined);

  if (state?.ok) {
    return (
      <div className="rounded-3xl border border-sage/40 bg-sage-soft/40 p-8 text-center sm:p-12">
        <CheckCircle2 className="mx-auto size-10 text-sage" />
        <h2 className="mt-4 text-xl font-semibold text-sage-deep">Thank you</h2>
        <p className="mx-auto mt-2 max-w-sm text-muted-foreground">
          Your message has reached the Rational Medicine Network. We&apos;ll be in touch soon.
        </p>
      </div>
    );
  }

  return (
    <form action={action} className="rounded-3xl border border-border bg-card p-8 sm:p-10">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" required placeholder="Dr Jane Doe" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required placeholder="you@example.com" />
        </div>
      </div>
      <div className="mt-5 space-y-2">
        <Label htmlFor="role">Role / affiliation</Label>
        <Input id="role" name="role" placeholder="e.g. GP, physiotherapist, researcher" />
      </div>
      <div className="mt-5 space-y-2">
        <Label htmlFor="message">How would you like to contribute?</Label>
        <Textarea id="message" name="message" rows={5} required placeholder="Tell us a little about your interest in Rational Medicine…" />
      </div>

      {state?.error && (
        <p className="mt-4 rounded-xl bg-destructive/10 px-3 py-2 text-sm text-destructive">{state.error}</p>
      )}

      <SubmitButton />
    </form>
  );
}

export default ContactForm;
