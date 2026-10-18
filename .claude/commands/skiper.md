---
description: Install a FREE Skiper UI component and wire it into the project
argument-hint: <number, e.g. 52 for skiper52>
allowed-tools: Bash(npx shadcn@latest add:*), Bash(npm run build), WebFetch
---

Install Skiper UI component `skiper$ARGUMENTS`.

Free components that install without a licence key (verified against the registry): 3, 4, 16, 17, 19, 25, 26, 28, 30, 31, 34, 37, 39, 40, 41, 47, 48, 49, 50, 51, 52, 53, 54, 58, 61, 62, 63, 64, 65, 66, 67. Everything else is Pro ($129 one-off) and returns 401 without a key.

1. Look at https://skiper-ui.com/v1/skiper$ARGUMENTS to confirm what it is.
2. Run `npx shadcn@latest add @skiper-ui/skiper$ARGUMENTS -y`. The file lands in `src/components/ui/skiper-ui/`.
3. The demo wrapper usually has hard-coded images or colours. Use the exported inner component, pass real content, and swap colours for this project's tokens.
4. Keep the attribution comment at the bottom of the file. Free use requires credit to Skiper UI; the footer must keep its "UI by Skiper UI" link.
5. If a Pro component is needed, tell the user. They add `SKIPER_LICENSE_KEY` to `.env.local` and a `headers` entry on the `@skiper-ui` registry in `components.json`. Never paste a licence key into chat or commit it.
