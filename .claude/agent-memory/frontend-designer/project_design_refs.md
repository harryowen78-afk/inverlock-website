---
name: Design system reference locations
description: Where design tokens and spec are defined -- no docs/design/ directory exists, CURSOR_PROMPT.md and globals.css are authoritative
type: reference
---

- Design tokens are defined in `src/app/globals.css` via `@theme inline` (Tailwind v4 syntax)
- Full design spec (colors, typography, spacing, layout, component specs) lives in `CURSOR_PROMPT.md` at project root
- No `docs/design/` directory exists in this project
- No `tailwind.config.*` file exists -- all config is in globals.css
