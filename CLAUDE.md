@AGENTS.md

# Digital marketing agency website

Marketing site for a digital marketing agency client. Next.js 16 (App Router, `cacheComponents` on), Tailwind CSS v4, shadcn (base-nova style), TypeScript.

## Slash commands
- `/ui-libraries <what to build>`: the full workflow for building with the three UI libraries
- `/aceternity <slug>`, `/vengeance <slug>`, `/skiper <number>`: install one component
- `/add-section <name>`: plan and build one new home-page section

## Pages (marketing pages all statically prerendered)
Marketing pages live in the `src/app/(site)/` route group: `/` Home, `/seo`, `/ppc`, `/performance-marketing`, `/meta-ads`, `/about`, `/contact`, `/blog` and `/blog/[slug]`. Only these pages exist; do not add others without being asked. Service data (all four) lives in `src/lib/services.ts`. PPC, Performance and Meta Ads render `ServiceTemplate` (`src/components/services/service-template.tsx`), which composes the shared sections in `src/components/services/`. `/seo` has its own composition in its `page.tsx`: hero with an illustrated results page (`services/seo/serp-visual.tsx`), search surfaces, found/trusted/chosen pillars, an interactive 24-point self-check (`seo-self-check.tsx`, gauge `ui/circular-progress.tsx` adapted from 21st.dev), a timeline and reporting, then the shared plans, FAQ, posts and CTA. Its copy is in `src/lib/seo-page.ts`. Free-audit forms save to `audit_requests` (`requestAudit` in `src/app/actions.ts`), listed at `/admin/audits`. Add a route to `routes` in `src/lib/site.ts` (sitemap) and to `nav` when adding a page. The nav leads with the four services; the logo links home.

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
- Anything that reads the session cookie or `searchParams` renders inside `<Suspense>` (Cache Components).

## Layout
- `src/app/layout.tsx`: html/body, fonts and the Motion provider. `src/app/(site)/layout.tsx`: navbar and footer for the marketing pages (`not-found.tsx` renders them itself). `src/app/admin/layout.tsx`: admin header
- `src/lib/site.ts`: brand name, live URL (`https://www.techdigitalmarketer.com`, used by sitemap, robots, canonicals and reset links), nav, routes, contact details. Brand is "Tech Digital Marketer" (TDM). Empty contact fields are hidden site-wide.
- `src/lib/content.ts`: copy for every page (services, stats, process, work, testimonials, about, FAQ). India market, ₹ budgets. Client logos, case studies, testimonials and team are empty lists and their sections hide; add only real, permitted entries. Never invent results or quotes.
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
