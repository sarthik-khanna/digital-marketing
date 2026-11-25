@AGENTS.md

# Digital marketing agency website

Marketing site for a digital marketing agency client. Next.js 16 (App Router, `cacheComponents` on), Tailwind CSS v4, shadcn (base-nova style), TypeScript.

## Monorepo (npm workspaces)
- The website stays at the repo root (its deploy settings are unchanged). Workspaces: `apps/*` and `packages/*`.
- `apps/e-sign`: a separate Next.js app (`basePath: "/e-sign"`) where clients sign up/sign in, choose a plan and e-sign their agreement. The website serves it at `/e-sign` through Next.js multi-zones: `rewrites()` in the root `next.config.ts` forward `/e-sign/*` to `ESIGN_URL` (default `http://localhost:3001` in dev). Links between the two apps are plain `<a>`, never `next/link`. It is deployed as its own project (root directory `apps/e-sign`) with the same env vars; locally it also reads the root `.env.local`.
- `packages/shared` (`@tdm/shared`): the Neon client, scrypt password hashing and Resend email (with attachments). `src/lib/db.ts`, `src/lib/password.ts` and `src/lib/email.ts` re-export from it, so existing imports are unchanged.
- `packages/esign-core` (`@tdm/esign-core`): plans (`plans.ts`; TODO(client) prices), agreement content built once and rendered as HTML and PDF (`agreement.ts`, provider details and terms version there), the PDF (`pdf.ts`, pdf-lib), the signed-copy email, the DB store and delivery. Relative imports use `.ts` extensions so `npm test` runs it under plain Node (`node --test`).
- Commands: `npm run dev:landing` (website, :3000) + `npm run dev:e-sign` (e-sign, :3001), `npm run build` (website), `npm run build:esign`, `npm test` (esign-core unit tests).

## Slash commands
- `/ui-libraries <what to build>`: the full workflow for building with the three UI libraries
- `/aceternity <slug>`, `/vengeance <slug>`, `/skiper <number>`: install one component
- `/add-section <name>`: plan and build one new home-page section

## Pages (marketing pages all statically prerendered)
Marketing pages live in the `src/app/(site)/` route group: `/` Home, `/seo`, `/ppc`, `/performance-marketing`, `/meta-ads`, `/about`, `/contact`, `/blog` and `/blog/[slug]`. Only these pages exist; do not add others without being asked. The four service pages share one layout, `ServicePageView` in `src/components/service-page/service-page.tsx`; each `page.tsx` only picks the service id. Their copy, photos, audit-form fields, plans and FAQs live in one file per service in `src/lib/service-pages/` (`types.ts` documents the shape; `shared.ts` holds the hourly AUD rates, industries, why-us points, cities and the closing photo). `src/lib/services.ts` only holds ids, names and URLs. Sections, in order: blue announcement bar (`#service-announcement`; the navbar sits below it via `:has()`), hero (home-page backdrop via `sections/hero-backdrop.tsx`, photo card with floating badges; SEO rotates city names in a fixed-width slot), free-audit card `#free-audit`, stats and platforms, "What's included" (native `<details name>` accordion, no JS), who we help + why us, how it works, `#pricing` (plans, the `fee-estimator.tsx` client component, comparison table), FAQ, closing CTA with contacts. Headline accents on these pages are blue italic (`Accent` in `service-page/parts.tsx`); eyebrows use the `highlight-strong` token. The audit form saves to `audit_requests` (`requestAudit` in `src/app/actions.ts`, form `service-audit`): required fields follow the page config, and dropdown answers are checked against its options and stored in `details` (`npm run db:setup` adds the column). Listed at `/admin/audits`. Add a route to `routes` in `src/lib/site.ts` (sitemap) and to `nav` when adding a page. The nav leads with the four services; the logo links home.

## Blog
- Posts live in Neon (`blog_posts`) and are written at `/admin/blog` (list, `/admin/blog/new`, `/admin/blog/edit?id=`; actions in `src/app/admin/blog-actions.ts`). The editor uses a query string, not an `[id]` segment, because the admin sidebar reads the pathname and must stay prerenderable. Bodies are a small markdown subset rendered by `src/components/blog/markdown.tsx` straight to React (no HTML strings).
- Public reads (`getPublishedPosts`, `getPublishedPost` in `src/lib/blog.ts`) are `"use cache"` with `cacheTag("blog")`; every admin action calls `updateTag("blog")` so publishing shows at once. Until the table exists the site shows the starter articles in `src/lib/blog-seed.ts`, which `npm run db:setup` inserts (by slug, never overwriting).
- `/blog/[slug]` reads `params` inside `<Suspense>` (Partial Prefetching shell rule); known slugs are still prerendered via `generateStaticParams`.
- Cover photos: each post has `cover_image` (an Unsplash URL in the fixed form from `src/lib/cover-image.ts`, the only form `next.config` allows); empty falls back to the category's `cover`. Admins paste the link in the editor.
- Categories (and which service page each maps to) are in `src/lib/blog-categories.ts`. Service pages show related articles via `LatestPosts`. Articles are general guidance: no invented results, statistics or quotes.

## Admin (`/admin`)
Enquiries from the contact form are saved to Neon Postgres (`leads` table) and listed at `/admin` behind an admin login, with `/admin/login`, `/admin/forgot-password` and `/admin/reset-password` (reset links sent through the Resend API). Not in the sitemap or nav; `robots.ts` disallows it.
- `src/lib/db.ts` (Neon client, `Lead` type), `src/lib/admin.ts` (sessions, `requireAdmin`), `src/lib/password.ts` (scrypt hashing, tokens), `src/lib/email.ts` (Resend), `src/app/admin/actions.ts`
- Schema and admin accounts: `npm run db:setup` (`scripts/db-setup.mjs`) creates tables, the starter blog articles and any admin in `ADMIN_EMAILS` that does not exist yet, printing a one-time password. `npm run admin:add -- name@example.com` creates an admin with a password typed at a hidden prompt (`--update` sets a new one for an existing admin; scripts/admin-add.mjs). Env vars are listed in `.env.example`.
- Route groups: `src/app/admin/(auth)/` (login, forgot, reset; plain header) and `src/app/admin/(dashboard)/` (shadcn `sidebar` layout; `src/components/admin/admin-sidebar.tsx`). Add new admin pages to `(dashboard)` and to `nav` in the sidebar; each page calls `requireAdmin()` itself.
- The leads list uses shadcn `table` on md+ and stacked cards on phones (`src/components/admin/leads-table.tsx`).
- Call-back requests: `src/components/callback-dialog.tsx` (shadcn `dialog`, provided by `(site)/layout.tsx`) opens from the navbar button and pops up once after 15 s (7-day snooze after closing, never after submitting, never on `/contact`; flag in localStorage). Saved by `requestCallback` in `src/app/actions.ts` to `callback_requests`, listed at `/admin/callbacks`.
- Invoices (`/admin/invoices`, list; `/new` (optional `?lead=` prefill from an enquiry), `/edit?id=` drafts only, `/view?id=` preview with send / mark paid / delete draft; actions in `src/app/admin/invoice-actions.ts`). Tables `invoices` and `invoice_counters` (db:setup). Amounts are stored in paise (`src/lib/invoice-math.ts`). The number (`TDM/2026-27/0001`, per Indian financial year) and issue date are fixed on first send; only un-numbered drafts can be deleted. Sending emails the invoice through Resend (`src/lib/invoice-email.ts`, reply-to the business email) with a private link to `/invoice/<token>` (token stored only as a hash, rotated on each resend, noindex and disallowed in robots), which renders `components/invoice/invoice-document.tsx` with print-to-PDF. Seller details (legal name, address, GSTIN, bank, UPI) live in `src/lib/invoice-settings.ts`; empty ones are hidden and GST defaults to 0% until a GSTIN is set. Enquiries have a "Create invoice" link.
- E-Sign Agreements (`/admin/e-sign`, list searchable by client name/username/email with status chips Pending/Signed/Completed; `/view?id=` the record: client, plan, signature record, PDF preview, other agreements; `/pdf?id=` (`&download=1`) serves the stored PDF to admins). Resend action in `src/app/admin/esign-actions.ts`. Tables `esign_users`, `esign_sessions`, `esign_agreements` (db:setup; one pending agreement per client; the plan is copied into the agreement; the signed PDF is stored as base64). Statuses: pending (plan chosen), signed (signed, PDF stored), completed (signed copy emailed). Client accounts are separate from admins; password hashes are never selected for display.
- Anything that reads the session cookie or `searchParams` renders inside `<Suspense>` (Cache Components).

## Layout
- `src/app/layout.tsx`: html/body, fonts and the Motion provider. `src/app/(site)/layout.tsx`: navbar and footer for the marketing pages (`not-found.tsx` renders them itself). `src/app/admin/layout.tsx`: admin header
- `src/lib/site.ts`: brand name, live URL (`https://www.techdigitalmarketer.com`, used by sitemap, robots, canonicals and reset links), nav, routes, contact details (`phones` holds the Australian, Indian and New Zealand numbers, each shown with its country in the footer and on /contact). Brand is "Tech Digital Marketer" (TDM). Empty contact fields are hidden site-wide.
- `src/lib/content.ts`: copy for every page (services, stats, process, work, testimonials, about, FAQ). No India-specific copy, place names or ₹ amounts on public pages. The service pages target Australian businesses (AUD prices, Australian cities); other pages stay international ($ examples). Invoices stay INR/GST because the business bills from India. Client logos, case studies, testimonials and team are empty lists and their sections hide; add only real, permitted entries. Never invent results or quotes.
- `src/components/sections/`: one file per page section. `section-heading.tsx` holds `SectionHeading` (default "split": title left, paragraph and optional action right; no small labels above headings), `sectionTitle` and `Accented`. Layout follows the client reference: left-aligned split headers, white cards on the lavender canvas with at most one navy `ink` card per section, a navy CTA band (`cta-band.tsx`) and a light footer.
- `src/components/arrow-link.tsx`: the one CTA style (pill + arrow chip; `light` variant for navy panels)
- `src/components/ui/`: library components copied in by shadcn (Aceternity, Vengeance UI, Skiper UI)

## Performance rules
- Marketing pages stay static. Do not read `searchParams`, `cookies()` or `headers()` in a page, and do not call `Math.random()` or `new Date()` while rendering (Cache Components fails the build).
- Animated components import `m` from `motion/react-m`, never `motion` from `motion/react`; `<MotionProvider>` lazy-loads the features and runs in strict mode.
- Prefer server components and CSS. A section needs a real reason to be a client component.
- Decorative motion is CSS (`animate-float`, `animate-spin-slow`, marquees) and is switched off under `prefers-reduced-motion` in `globals.css`.
- Navigation uses `next/link`, never a plain `<a>`, for internal routes.
- Keep display font to one weight; keep images on `next/image`.

## Rules
- Aceternity UI is the base library. Borrow single components from Vengeance UI and free Skiper UI. Never add a library component for something an installed one already does.
- Colours and fonts come from the tokens in `src/app/globals.css`: single light theme from the TDM logo: royal-blue `primary` (#0048F8), navy `ink` for dark panels and the CTA band (#020A28), orange `highlight` (#F86800) used sparingly as a fill with navy text or as text on ink, never as small text on white. Headings use Outfit 600; one phrase per headline may be wrapped in `*asterisks*` to get the Instrument Serif italic accent. Do not bring library demo colours into the project. Aceternity components copied in are adapted: `m` from `motion/react-m`, tokens instead of demo colours, reduced motion respected, heavy deps (three.js, tsparticles) stripped.
- Only animate where it does something. Respect `prefers-reduced-motion`.
- Skiper UI free components require attribution: keep the credit link in the footer.
- Registries are in `components.json`. Skiper Pro would need `SKIPER_LICENSE_KEY` in `.env.local`; never commit it.
- Run `npm run build` before calling work done.
