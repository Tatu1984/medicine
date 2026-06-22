# Rational Medicine

The online platform for **Dr Rahul Mukherjee's** concept of *Rational Medicine* — improving
healthcare quality while driving down cost by preventing overdiagnosis and overtreatment — and a
home for publishing his research.

- **Stack:** Next.js 16 (App Router) · React 19 · Tailwind v4 · shadcn (Base UI) · Prisma 7 +
  Neon Postgres · motion (reactbits-style animations)
- **Design:** "Modern & humane" — warm cream canvas, sage + clay palette
- **No external services:** research PDFs are stored in Postgres and streamed via an API route;
  contact messages are stored in the database. Just Next.js + a Postgres database.

## Public site

`/` home · `/pillars` · `/research` · `/research/[slug]` (article pages) · `/network` ·
`/resources` · `/about` · `/contact`

## Admin (research publishing)

A private area for a single admin (Dr Mukherjee) to publish research as **both a webpage and a
downloadable PDF**.

- `/admin/login` — email + password sign in
- `/admin` — dashboard (list / publish / unpublish / edit / delete)
- `/admin/articles/new` & `/admin/articles/[id]/edit` — write the article in Markdown (with live
  preview) and upload a PDF (stored in Postgres, served from `/api/research/[id]/pdf`)
- `/admin/messages` — inbox for the public contact form (mark read / delete)

Access is protected by `src/proxy.ts` (Next.js 16 proxy/middleware) using a signed JWT cookie.

## Setup

1. **Install** (also runs `prisma generate`):
   ```bash
   npm install
   ```

2. **Environment** — copy `.env.example` to `.env` and fill in:
   - `DATABASE_URL` — your Neon pooled connection string
   - `ADMIN_EMAIL` / `ADMIN_PASSWORD` — the single admin's login
   - `SESSION_SECRET` — any long random string (32+ chars)

3. **Create the database tables**:
   ```bash
   npm run db:migrate      # first run: name it e.g. "init"
   npm run db:seed         # optional: loads Dr Mukherjee's existing publications
   ```

4. **Run**:
   ```bash
   npm run dev             # http://localhost:3000
   ```

## Deploy (any Node host)

The app is a standard Next.js server with one dependency: a Postgres database. To deploy anywhere
(a VPS, a container, or a managed Node host):

1. Set the three env vars (`DATABASE_URL`, `ADMIN_EMAIL`/`ADMIN_PASSWORD`, `SESSION_SECRET`).
2. `npm run build` (runs `prisma generate`).
3. `npm run db:deploy` to apply migrations to the production database.
4. `npm run start`.

## Useful scripts

| Script | What it does |
|---|---|
| `npm run db:migrate` | Create/apply a dev migration |
| `npm run db:deploy` | Apply migrations in production |
| `npm run db:seed` | Seed the existing publications |
| `npm run db:studio` | Open Prisma Studio |
