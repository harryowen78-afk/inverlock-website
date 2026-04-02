---
name: Design system token gaps
description: globals.css is missing muted/secondary color tokens for dark backgrounds, causing devs to use default Tailwind grays
type: project
---

The globals.css @theme inline block defines 7 color tokens but lacks any muted/secondary colors for dark-background contexts (footer, contact bar). CURSOR_PROMPT.md references "light grey" and "small grey font" for footer text without providing a hex value.

**Why:** This gap causes developers to fall back to Tailwind's default gray scale (gray-300, gray-400, gray-700), which are not part of the design system. Found in Footer.tsx (3 instances) and ContactBar.tsx (1 instance).

**How to apply:** When reviewing or editing components on dark backgrounds, flag any use of Tailwind default grays. Recommend either adding dedicated tokens to globals.css or standardizing on white opacity variants (text-white/60, text-white/40, border-white/20).
