import { z } from "zod";

export const RESEARCH_CATEGORIES = [
  "Evidence-Creating Medicine",
  "Community epidemiology",
  "Rational clinical examination",
  "Medical education",
  "Overdiagnosis & overtreatment",
  "Stewardship & value",
] as const;

export const articleSchema = z.object({
  title: z.string().min(4, "Title is too short").max(240),
  authors: z.string().min(2, "Add at least one author"),
  journal: z.string().max(160).optional().or(z.literal("")),
  year: z
    .string()
    .regex(/^\d{4}$/u, "Use a 4-digit year")
    .optional()
    .or(z.literal("")),
  doi: z.string().max(160).optional().or(z.literal("")),
  category: z.enum(RESEARCH_CATEGORIES),
  abstract: z.string().min(20, "Abstract is too short").max(2000),
  body: z.string().min(0).max(60000),
  pdfUrl: z.string().url().optional().or(z.literal("")),
  pdfName: z.string().optional().or(z.literal("")),
  published: z.boolean(),
  featured: z.boolean(),
});

export type ArticleInput = z.infer<typeof articleSchema>;
