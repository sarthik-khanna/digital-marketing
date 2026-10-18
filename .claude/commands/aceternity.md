---
description: Install an Aceternity UI component and wire it into the project
argument-hint: <component-slug, e.g. bento-grid>
allowed-tools: Bash(npx shadcn@latest add:*), Bash(npm run build), WebFetch
---

Install the Aceternity UI component `$ARGUMENTS`.

1. Confirm the slug on https://ui.aceternity.com/components/$ARGUMENTS (do not guess names).
2. Run `npx shadcn@latest add @aceternity/$ARGUMENTS -y`. The source lands in `src/components/ui/`.
3. Read the installed file. Replace hard-coded colours (`bg-white`, `dark:bg-neutral-*`, blue/purple gradients) with this project's tokens from `src/app/globals.css`.
4. Remove demo copy (e.g. "Changelog from my journey") by turning it into props.
5. If it pulls in heavy dependencies (`three`, `@react-three/fiber`, `gsap`) say so and ask before keeping it.
6. Use it in the requested section only. Stop and show the result.
