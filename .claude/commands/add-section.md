---
description: Plan and build one new page section using the UI libraries
argument-hint: <section name, e.g. "case studies">
---

Add a **$ARGUMENTS** section to the home page.

1. List which installed components in `src/components/ui/` fit it, and which library component (Aceternity first, then Vengeance UI, then free Skiper UI) would be the best new install. Say plainly if nothing suitable exists.
2. Wait for my answer only if the choice changes cost (extra dependencies, paid component). Otherwise continue.
3. Put the section in `src/components/sections/<name>.tsx`, content in `src/lib/content.ts`, and add it to `src/app/page.tsx`.
4. Follow the rules in `/ui-libraries` and `CLAUDE.md`. Stop after the section for review and run `npm run build`.
