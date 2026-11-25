# Growthline: digital marketing agency website

Next.js 16 (App Router) + Tailwind CSS v4 + shadcn, built with components from
Aceternity UI (base), Vengeance UI and Skiper UI (free tier).

```bash
npm install
npm run dev:landing   # website, http://localhost:3000
npm run dev:e-sign    # e-sign app on :3001 (run in a second terminal)
npm run build         # production build
```

## E-Sign app (`/e-sign`)

An npm-workspaces monorepo: the website is the root app, and `apps/e-sign` is a separate
Next.js app that the website serves at `/e-sign` (Next.js multi-zones). Clients sign up or
sign in, choose a Weekly, Monthly or Quarterly plan, then read and e-sign their agreement.
The signed PDF is stored, emailed to them, and listed for admins at `/admin/e-sign`.

```bash
npm run db:setup     # once: adds the esign_* tables (existing data untouched)
npm run dev:landing  # website, http://localhost:3000
npm run dev:e-sign   # e-sign app on :3001, open it at http://localhost:3000/e-sign
npm run build:esign  # production build of the e-sign app
npm test             # unit tests for packages/esign-core
```

Deploying: create a second Vercel project from this repo with **Root Directory
`apps/e-sign`** and the same `DATABASE_URL`, `RESEND_API_KEY` and `RESEND_FROM_EMAIL`. Then set
`ESIGN_URL` on the website's project to that project's URL (for example
`https://tdm-esign.vercel.app`) and redeploy the website. Before going live, set the real
plan prices in `packages/esign-core/src/plans.ts` and the provider details in
`packages/esign-core/src/agreement.ts`, and have the terms reviewed.

## Pages

| Route | File |
| --- | --- |
| `/` | `src/app/page.tsx` |
| `/seo`, `/ppc`, `/performance-marketing`, `/meta-ads` | `src/app/<route>/page.tsx` (shared template `src/components/sections/service-page.tsx`) |
| `/about` | `src/app/about/page.tsx` |
| `/contact` | `src/app/contact/page.tsx` |

Also generated: `/sitemap.xml`, `/robots.txt` and a 404 page. Every page is prerendered
as static HTML. The live domain (`https://www.techdigitalmarketer.com`) is `url` in
`src/lib/site.ts`; canonical URLs, the sitemap, robots.txt and reset links all use it.

## Make it the client's

- Brand name, nav, contact details: `src/lib/site.ts` ("Growthline" is a placeholder)
- All copy, client names, stats, testimonials and team: `src/lib/content.ts`.
  **Everything in it is placeholder content. Replace it with real, verifiable material.**
- Colours and fonts: `src/app/globals.css` (tokens) and `src/app/layout.tsx` (fonts)
- Client logos: swap the text `Wordmark` in `src/components/sections/clients.tsx` for real SVGs

## Contact form

`src/app/actions.ts` validates the form and POSTs JSON to the URL in the
`CONTACT_WEBHOOK_URL` environment variable (Zapier, Make, a CRM form endpoint,
Slack, etc.). Until it is set, the form tells visitors to email instead of
pretending the message was sent. Put it in `.env.local`:

```
CONTACT_WEBHOOK_URL=https://...
```

## UI libraries and slash commands

Registries are configured in `components.json`. Claude Code slash commands live in
`.claude/commands/`:

| Command | What it does |
| --- | --- |
| `/ui-libraries <what to build>` | Full workflow for building with the three libraries |
| `/aceternity <slug>` | Install an Aceternity UI component |
| `/vengeance <slug>` | Install a Vengeance UI component |
| `/skiper <number>` | Install a free Skiper UI component |
| `/add-section <name>` | Plan and build one new home-page section |

Skiper UI's free components require attribution (kept in the footer). Pro
components need a licence key and are not used here.
