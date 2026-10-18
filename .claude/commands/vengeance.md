---
description: Install a Vengeance UI component and wire it into the project
argument-hint: <component-slug, e.g. faq-accordion>
allowed-tools: Bash(npx shadcn@latest add:*), Bash(npm run build), WebFetch
---

Install the Vengeance UI component `$ARGUMENTS`.

1. Confirm the slug at https://vengenceui.com/components (the site lists 70+ components across families: Buttons, Text & Motion, Interactive, Layout & Cards, Tooltip & Marquee, Loaders, Navbar & Docs, Collections, Backgrounds). Do not guess names.
2. Run `npx shadcn@latest add @vengeanceui/$ARGUMENTS -y`. The registry is spelled `@vengeanceui` on the site; `@vengenceui` is kept as an alias in `components.json`.
3. Read the installed file and swap its hard-coded neutral colours for this project's tokens.
4. Check for assets the component expects in `public/` (some need images) and say if they are missing.
5. Use it in the requested section only. Stop and show the result.
