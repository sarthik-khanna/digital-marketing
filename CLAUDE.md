@AGENTS.md

# Digital marketing agency website

Marketing site for a digital marketing agency client. Next.js 16 (App Router, `cacheComponents` on), Tailwind CSS v4, shadcn (base-nova style), TypeScript.

## Slash commands
- `/ui-libraries <what to build>`: the full workflow for building with the three UI libraries
- `/aceternity <slug>`, `/vengeance <slug>`, `/skiper <number>`: install one component
- `/add-section <name>`: plan and build one new home-page section

## Pages (all statically prerendered)
`/` Home, `/seo`, `/ppc`, `/performance-marketing`, `/meta-ads`, `/about`, `/contact`. Only these pages exist; do not add others without being asked. The four service pages share `src/components/sections/service-page.tsx` and read from `services` in `src/lib/content.ts`. Add a route to `routes` in `src/lib/site.ts` (sitemap) and to `nav` when adding a page.

## Layout
- `src/app/layout.tsx`: navbar, footer and the Motion provider live here so they persist across navigation
- `src/lib/site.ts`: brand name, nav, routes, contact details. **Placeholder brand "Growthline"; change it here.**
- `src/lib/content.ts`: copy for every page (services, stats, process, work, testimonials, about, FAQ)
- `src/components/sections/`: one file per page section. `section-heading.tsx` holds `SectionHeading`, `Eyebrow` and `Accented`
- `src/components/arrow-link.tsx`: the one CTA style (pill + arrow chip); `rotating-badge.tsx`: circular text badge
- `src/components/ui/`: library components copied in by shadcn (Aceternity, Vengeance UI, Skiper UI)

## Performance rules
- Pages stay static. Do not read `searchParams`, `cookies()` or `headers()` in a page, and do not call `Math.random()` or `new Date()` while rendering (Cache Components fails the build).
- Animated components import `m` from `motion/react-m`, never `motion` from `motion/react`; `<MotionProvider>` lazy-loads the features and runs in strict mode.
- Prefer server components and CSS. A section needs a real reason to be a client component.
- Decorative motion is CSS (`animate-float`, `animate-spin-slow`, marquees) and is switched off under `prefers-reduced-motion` in `globals.css`.
- Navigation uses `next/link`, never a plain `<a>`, for internal routes.
- Keep display font to one weight; keep images on `next/image`.

## Rules
- Aceternity UI is the base library. Borrow single components from Vengeance UI and free Skiper UI. Never add a library component for something an installed one already does.
- Colours and fonts come from the tokens in `src/app/globals.css`: single light theme, violet `primary`, `lime` highlight (sparingly), `ink` for dark panels and the footer. Headings use Outfit 600; one phrase per headline may be wrapped in `*asterisks*` to get the Instrument Serif italic accent. Do not bring library demo colours into the project.
- Only animate where it does something. Respect `prefers-reduced-motion`.
- Skiper UI free components require attribution: keep the credit link in the footer.
- Registries are in `components.json`. Skiper Pro would need `SKIPER_LICENSE_KEY` in `.env.local`; never commit it.
- Run `npm run build` before calling work done.
