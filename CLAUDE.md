@AGENTS.md

# Digital marketing agency website

Marketing site for a digital marketing agency client. Next.js 16 (App Router, `cacheComponents` on), Tailwind CSS v4, shadcn (base-nova style), TypeScript.

## Slash commands
- `/ui-libraries <what to build>`: the full workflow for building with the three UI libraries
- `/aceternity <slug>`, `/vengeance <slug>`, `/skiper <number>`: install one component
- `/add-section <name>`: plan and build one new home-page section

## Pages (marketing pages all statically prerendered)
Marketing pages live in the `src/app/(site)/` route group: `/` Home, `/seo`, `/ppc`, `/performance-marketing`, `/meta-ads`, `/about`, `/contact`. Only these pages exist; do not add others without being asked. Service data (all four) lives in `src/lib/services.ts`. Redesigned service pages compose the shared sections in `src/components/services/` (service-specific extras in subfolders, e.g. `services/seo/`); pages not yet redesigned still use the legacy `src/components/sections/service-page.tsx`. Free-audit forms save to `audit_requests` (`requestAudit` in `src/app/actions.ts`), listed at `/admin/audits`. Add a route to `routes` in `src/lib/site.ts` (sitemap) and to `nav` when adding a page.

## Admin (`/admin`)
Enquiries from the contact form are saved to Neon Postgres (`leads` table) and listed at `/admin` behind an admin login, with `/admin/login`, `/admin/forgot-password` and `/admin/reset-password` (reset links sent through the Resend API). Not in the sitemap or nav; `robots.ts` disallows it.
- `src/lib/db.ts` (Neon client, `Lead` type), `src/lib/admin.ts` (sessions, `requireAdmin`), `src/lib/password.ts` (scrypt hashing, tokens), `src/lib/email.ts` (Resend), `src/app/admin/actions.ts`
- Schema and admin accounts: `npm run db:setup` (`scripts/db-setup.mjs`) creates tables and any admin in `ADMIN_EMAILS` that does not exist yet, printing a one-time password. Env vars are listed in `.env.example`.
- Route groups: `src/app/admin/(auth)/` (login, forgot, reset; plain header) and `src/app/admin/(dashboard)/` (shadcn `sidebar` layout; `src/components/admin/admin-sidebar.tsx`). Add new admin pages to `(dashboard)` and to `nav` in the sidebar; each page calls `requireAdmin()` itself.
- The leads list uses shadcn `table` on md+ and stacked cards on phones (`src/components/admin/leads-table.tsx`).
- Call-back requests: `src/components/callback-dialog.tsx` (shadcn `dialog`, provided by `(site)/layout.tsx`) opens from the navbar button and pops up once after 15 s (7-day snooze after closing, never after submitting, never on `/contact`; flag in localStorage). Saved by `requestCallback` in `src/app/actions.ts` to `callback_requests`, listed at `/admin/callbacks`.
- Anything that reads the session cookie or `searchParams` renders inside `<Suspense>` (Cache Components).

## Layout
- `src/app/layout.tsx`: html/body, fonts and the Motion provider. `src/app/(site)/layout.tsx`: navbar and footer for the marketing pages (`not-found.tsx` renders them itself). `src/app/admin/layout.tsx`: admin header
- `src/lib/site.ts`: brand name, nav, routes, contact details. Brand is "Tech Digital Marketer" (TDM). Empty contact fields are hidden site-wide.
- `src/lib/content.ts`: copy for every page (services, stats, process, work, testimonials, about, FAQ). India market, ₹ budgets. Client logos, case studies, testimonials and team are empty lists and their sections hide; add only real, permitted entries. Never invent results or quotes.
- `src/components/sections/`: one file per page section. `section-heading.tsx` holds `SectionHeading`, `Eyebrow` and `Accented`
- `src/components/arrow-link.tsx`: the one CTA style (pill + arrow chip); `rotating-badge.tsx`: circular text badge
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
- Colours and fonts come from the tokens in `src/app/globals.css`: single light theme from the TDM logo: royal-blue `primary` (#0048F8), navy `ink` for dark panels and the footer (#020A28), orange `highlight` (#F86800) used sparingly as a fill with navy text or as text on ink, never as small text on white. Headings use Outfit 600; one phrase per headline may be wrapped in `*asterisks*` to get the Instrument Serif italic accent. Do not bring library demo colours into the project. Aceternity components copied in are adapted: `m` from `motion/react-m`, tokens instead of demo colours, reduced motion respected, heavy deps (three.js, tsparticles) stripped.
- Only animate where it does something. Respect `prefers-reduced-motion`.
- Skiper UI free components require attribution: keep the credit link in the footer.
- Registries are in `components.json`. Skiper Pro would need `SKIPER_LICENSE_KEY` in `.env.local`; never commit it.
- Run `npm run build` before calling work done.
