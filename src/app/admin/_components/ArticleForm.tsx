"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { FileText, Loader2, Upload, X } from "lucide-react";
import type { FormState } from "@/app/admin/actions";
import { RESEARCH_CATEGORIES } from "@/lib/validation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Defaults = {
  title?: string;
  authors?: string;
  journal?: string | null;
  year?: string | null;
  doi?: string | null;
  category?: string;
  abstract?: string;
  body?: string;
  pdfName?: string | null;
  published?: boolean;
  featured?: boolean;
};

function SaveButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" className="rounded-full" disabled={pending}>
      {pending ? "Saving…" : "Save article"}
    </Button>
  );
}

export function ArticleForm({
  action,
  defaults = {},
}: {
  action: (prev: FormState, formData: FormData) => Promise<FormState>;
  defaults?: Defaults;
}) {
  const [state, formAction] = useActionState<FormState, FormData>(action, undefined);

  const [body, setBody] = useState(defaults.body ?? "");
  const [pickedName, setPickedName] = useState("");
  const [removePdf, setRemovePdf] = useState(false);
  const [extracting, setExtracting] = useState(false);
  const existingPdf = defaults.pdfName ?? "";

  async function handlePdfChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setPickedName(file.name);
    setRemovePdf(false);

    setExtracting(true);
    try {
      const pdfjsLib = await import("pdfjs-dist");
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

      const pages: string[] = [];
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const pageText = content.items
          .map((item) => ("str" in item ? item.str : ""))
          .join(" ")
          .replace(/\s+/g, " ")
          .trim();
        if (pageText) pages.push(pageText);
      }

      if (pages.length > 0) {
        setBody(pages.join("\n\n"));
      }
    } catch (err) {
      console.error("[PDF extract]", err);
    } finally {
      setExtracting(false);
    }
  }

  return (
    <form action={formAction} className="grid gap-8 lg:grid-cols-[2fr_1fr]">
      {/* Main column */}
      <div className="space-y-6">
        <Field label="Title" htmlFor="title">
          <Input id="title" name="title" required defaultValue={defaults.title} placeholder="Rationalising the Clinical Examination" />
        </Field>

        <Field label="Authors" htmlFor="authors">
          <Input id="authors" name="authors" required defaultValue={defaults.authors} placeholder="Mukherjee R, et al." />
        </Field>

        <Field label="Abstract / summary" htmlFor="abstract" hint="Shown in listings and at the top of the article page.">
          <Textarea id="abstract" name="abstract" required rows={4} defaultValue={defaults.abstract} placeholder="A short summary of the work…" />
        </Field>

        <div>
          <Label className="mb-2 block">Article body</Label>
          <p className="mb-2 text-xs text-muted-foreground">
            Markdown supported — headings, lists, links, tables. This renders as the public webpage.
          </p>
          {/* Hidden input always carries the body value regardless of active tab */}
          <input type="hidden" name="body" value={body} />
          <Tabs defaultValue="write">
            <TabsList>
              <TabsTrigger value="write">Write</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>
            <TabsContent value="write">
              <Textarea
                rows={16}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="font-mono text-sm"
                placeholder={"## Background\n\nWrite the full article here…"}
              />
            </TabsContent>
            <TabsContent value="preview">
              <div className="prose prose-sm max-w-none rounded-xl border border-border bg-card p-5 prose-headings:font-heading">
                {body.trim() ? (
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{body}</ReactMarkdown>
                ) : (
                  <p className="text-muted-foreground">Nothing to preview yet.</p>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Sidebar */}
      <aside className="space-y-6">
        <div className="space-y-5 rounded-2xl border border-border bg-card p-5">
          <Field label="Category" htmlFor="category">
            <select
              id="category"
              name="category"
              defaultValue={defaults.category ?? RESEARCH_CATEGORIES[0]}
              className="h-9 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {RESEARCH_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Journal" htmlFor="journal">
              <Input id="journal" name="journal" defaultValue={defaults.journal ?? ""} placeholder="BMJ" />
            </Field>
            <Field label="Year" htmlFor="year">
              <Input id="year" name="year" defaultValue={defaults.year ?? ""} placeholder="2024" />
            </Field>
          </div>

          <Field label="DOI" htmlFor="doi" hint="Without the https:// prefix.">
            <Input id="doi" name="doi" defaultValue={defaults.doi ?? ""} placeholder="10.7759/cureus.51436" />
          </Field>
        </div>

        {/* PDF upload (stored in the database) */}
        <div className="space-y-3 rounded-2xl border border-border bg-card p-5">
          <Label className="block">PDF download</Label>

          {existingPdf && !removePdf && !pickedName && (
            <div className="flex items-center justify-between gap-3 rounded-xl border border-sage/40 bg-sage-soft/40 p-3">
              <span className="flex min-w-0 items-center gap-2 text-sm">
                <FileText className="size-4 shrink-0 text-sage-deep" />
                <span className="truncate">{existingPdf}</span>
              </span>
              <button
                type="button"
                onClick={() => setRemovePdf(true)}
                className="text-muted-foreground hover:text-destructive"
                aria-label="Remove PDF"
              >
                <X className="size-4" />
              </button>
            </div>
          )}

          {removePdf && (
            <p className="flex items-center justify-between rounded-xl bg-destructive/10 px-3 py-2 text-xs text-destructive">
              PDF will be removed on save.
              <button type="button" onClick={() => setRemovePdf(false)} className="font-medium underline">
                undo
              </button>
            </p>
          )}
          <input type="hidden" name="removePdf" value={removePdf ? "true" : "false"} />

          <label className="flex cursor-pointer flex-col items-center gap-2 rounded-xl border border-dashed border-border bg-background p-6 text-center text-sm text-muted-foreground transition-colors hover:border-sage/50 hover:bg-secondary/40">
            {extracting
              ? <Loader2 className="size-5 animate-spin text-sage" />
              : <Upload className="size-5 text-sage" />}
            <span>
              {extracting
                ? "Extracting text from PDF…"
                : pickedName || (existingPdf && !removePdf ? "Replace PDF" : "Click to choose a PDF")}
            </span>
            <input
              type="file"
              name="pdf"
              accept="application/pdf"
              className="sr-only"
              onChange={handlePdfChange}
            />
          </label>
          {pickedName && !extracting && (
            <p className="truncate text-xs text-sage-deep">Selected: {pickedName} — body auto-filled from PDF</p>
          )}
          <p className="text-xs text-muted-foreground">PDF up to 30 MB — text is auto-extracted into the article body.</p>
        </div>

        {/* Status */}
        <div className="space-y-3 rounded-2xl border border-border bg-card p-5">
          <label className="flex items-center gap-3 text-sm">
            <input type="checkbox" name="published" defaultChecked={defaults.published} className="size-4 accent-[var(--sage)]" />
            <span className="font-medium">Published</span>
            <span className="text-muted-foreground">— visible on the site</span>
          </label>
          <label className="flex items-center gap-3 text-sm">
            <input type="checkbox" name="featured" defaultChecked={defaults.featured} className="size-4 accent-[var(--clay)]" />
            <span className="font-medium">Featured</span>
            <span className="text-muted-foreground">— pinned to top</span>
          </label>
        </div>

        {state?.error && (
          <p className="rounded-xl bg-destructive/10 px-3 py-2 text-sm text-destructive">{state.error}</p>
        )}

        <div className="flex items-center gap-3">
          <SaveButton />
        </div>
      </aside>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

export default ArticleForm;
