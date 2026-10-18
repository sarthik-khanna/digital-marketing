# Growthline: digital marketing agency website

Next.js 16 (App Router) + Tailwind CSS v4 + shadcn, built with components from
Aceternity UI (base), Vengeance UI and Skiper UI (free tier).

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Pages

| Route | File |
| --- | --- |
| `/` | `src/app/page.tsx` |
| `/seo`, `/ppc`, `/performance-marketing`, `/meta-ads` | `src/app/<route>/page.tsx` (shared template `src/components/sections/service-page.tsx`) |
| `/about` | `src/app/about/page.tsx` |
| `/contact` | `src/app/contact/page.tsx` |

Also generated: `/sitemap.xml`, `/robots.txt` and a 404 page. Every page is prerendered
as static HTML. Set `NEXT_PUBLIC_SITE_URL` to the live domain for correct canonical URLs
and sitemap entries.

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
