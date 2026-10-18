---
description: Build a site or section with Aceternity UI, Skiper UI and Vengeance UI instead of plain Tailwind
argument-hint: <what to build, e.g. "pricing section">
---

I am building **$ARGUMENTS** in Next.js with Tailwind and shadcn. Read `CLAUDE.md` first (stack, colour tokens, rules).

Libraries (all registered in `components.json`, install with `npx shadcn@latest add @<registry>/<name>`):

| Library | Registry | Docs | Use it for |
| --- | --- | --- | --- |
| Aceternity UI (BASE) | `@aceternity` | https://ui.aceternity.com/components | Heroes, backgrounds, bento grids, timelines, text effects, navbars |
| Vengeance UI | `@vengeanceui` (alias `@vengenceui`) | https://vengenceui.com/components | Marquees, counters, FAQ, tooltips, displacement hovers, scroll cards |
| Skiper UI | `@skiper-ui` | https://skiper-ui.com/components | Distinctive interactive pieces. **Only the free ones install without a licence key; free use needs attribution** |
| Animmaster Lib | not a package | https://animmasterlib.dev | Paid downloadable pack. Only if the user has bought it |

Workflow, every time:

1. Confirm the stack (Next.js + Tailwind + shadcn). If it does not match, say so before doing anything.
2. Before writing code, tell me which library components fit each section I need and which sections have nothing suitable.
3. Check the library's docs for the exact component name. Do not guess names. Check `src/components/ui/` for components that are already installed.
4. Build ONE section at a time and stop after each one for review.
5. Copy the component source in with the install command. Do not write your own version of something the library already has.
6. Keep my colour tokens and font sizes from `src/app/globals.css`. Replace the library's demo colours (hard-coded neutral, blue, purple) with tokens.
7. Only animate where it does something: guiding attention, showing state, aiding navigation. No decorative motion.
8. Aceternity is the base. Borrow single components from the others. Do not stack three animation libraries on one page.
9. Respect `prefers-reduced-motion` and keep every section usable at 375px width.
10. Run `npm run build` before saying a section is done.
