# Inverlock Website — Claude Code / Cursor Build Prompt

## Overview

Build a Next.js 14 (App Router) website for **Inverlock**, a specialist infrastructure advisory firm that has identified acute pressure in the offshore wind sector and delivers high-stakes commercial interventions for distressed investors and developers. The site should be modelled closely on [iconinfrastructure.com](https://iconinfrastructure.com/) in terms of layout, typography, colour palette, and overall institutional aesthetic. There are two pages: a **Landing Page** (with an integrated About Us section) and a **Contact Page**. A **disclaimer modal** must appear on first visit.

Reference screenshots from the Icon Infrastructure site are in `/Website/References/`. Use these as your primary visual guide for layout, spacing, and styling.

---

## Tech Stack

- **Framework**: Next.js 14 with App Router (`/app` directory)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion (for stat counter animations, fade-ins, scroll-triggered reveals)
- **Deployment-ready**: Static export compatible (`output: 'export'` in `next.config.js`)
- **TypeScript**: Yes

---

## Global Design System

### Colour Palette (match Icon Infrastructure)

| Token | Hex | Usage |
|-------|-----|-------|
| `navy-primary` | `#0a1628` | Footer background, dark sections |
| `navy-dark` | `#1a1f4e` | Navbar background (when scrolled), overlays |
| `slate-blue` | `#4a5680` | Hero overlay tint, contact page header |
| `light-grey` | `#eef1f5` | Main content background (About section) |
| `white` | `#ffffff` | Card backgrounds, text on dark |
| `text-dark` | `#1a1f4e` | Headings on light backgrounds |
| `text-body` | `#3a3f5a` | Body text on light backgrounds |
| `accent-blue` | `#4a90c4` | Links, hover states, scroll chevron |

### Typography (CRITICAL — match Icon Infrastructure exactly)

Icon Infrastructure uses **Inter for everything** — no serif fonts at all. The site must follow this:

- **Headings (h1, h2)**: `Inter`, weight 400 (regular, NOT bold), large sizes (56-70px for hero, 36px for section headings)
- **Body text**: `Inter`, weight 300 (light), 15-16px
- **Navbar links**: `Inter`, weight 300 (light), 15px, letter-spacing 0.15px
- **Do NOT use Playfair Display, Georgia, or any serif font anywhere.** No `font-serif` classes. No `font-bold` on headings.
- The overall feel should be institutional, understated, and clean — light font weights throughout.

### Layout Principles

- Max content width: `1280px`, centred with generous horizontal padding (80-120px on desktop).
- Generous vertical spacing between sections (80-120px).
- Clean, airy feel with lots of whitespace — never cramped.
- Fully responsive: mobile hamburger menu, stacked layouts on small screens.

---

## Assets (provided in `/Website/`)

| Asset | Path | Usage |
|-------|------|-------|
| Logo (SVG) | `/Website/inverlock_logo_nameonly.svg` | Navbar logo, top-left. Note: the SVG fill is `#1E4C6C`. On the hero (dark background) invert to white. On scrolled navbar with white background, use the original dark colour. |
| Hero image | `/Website/Images/Cover Page/Lighthouse.jpg` | Full-viewport hero background on landing page |
| Contact page image | `/Website/Images/Contact us bar/AdobeStock_1914851058 (2).jpeg` | Background image for the Contact page header banner |

Copy these into the Next.js `/public/images/` directory during setup.

---

## Page 1: Landing Page (`/`)

### Section 1: Hero (full viewport height)

- **Background**: `Lighthouse.jpg` covering the full viewport, with a dark navy/blue semi-transparent overlay (similar to how Icon uses a blue-tinted overlay on their hero images — see `References/About_Use Page.png`).
- **Navbar** (fixed, transparent over hero, transitions to solid white with shadow on scroll):
  - Left: Inverlock SVG logo (white version on hero, dark on scrolled white background)
  - Right: `About Us` | `Contact` links. Styled like Icon's nav — clean, sans-serif, ~15px, with subtle hover underline effect.
- **Centre content** (vertically and horizontally centred):
  - Headline: **"Decisive Intervention"** — Inter weight 400, white, ~56-70px (NO serif, NO bold)
  - Tagline below: **"Capturing Value in Infrastructure"** — Inter weight 300, white, ~20-24px, with slight letter-spacing
- **Scroll indicator**: Animated bouncing chevron/double-arrow at the bottom centre (light blue circle with white chevron, matching Icon's style — see reference screenshots). Clicking it smooth-scrolls to the About section.

### Section 2: About Us (scroll target)

Background: `light-grey` (`#eef1f5`). This section lives on the same landing page, below the hero.

**Layout**: Two columns on desktop (text left ~55% width, stats right ~40%), single column stacked on mobile.

#### Left Column — About Blurb

**NO "About Inverlock" heading.** Instead, lead with a bold tagline (matching how Icon opens with "iCON is an award-winning, independent investment firm managing funds with $12 billion of capital"):

Lead tagline (Inter weight 400, navy, ~28-32px):
**"Inverlock is a specialist infrastructure advisory firm delivering high-stakes commercial interventions across portfolio companies and mega projects"**

Supporting line below (Inter weight 300, ~16-18px):
**"We work at the intersection of capital, growth and execution — advising investors and developers through complex asset, portfolio and partnership situations across energy and infrastructure."**

Then body text (use this exact copy — note: positions Inverlock as infrastructure advisory who has identified offshore wind pressure, NOT as offshore wind consultants):

> We have identified that the offshore wind sector faces sustained pressure, exposing structural weaknesses in investment assumptions and project delivery. Developers often lack the dedicated capability to manage complex asset, portfolio and partnership situations.
>
> Strategy frequently lacks financial, commercial, and contractual depth. M&A lacks operational and delivery expertise. The most critical decisions sit between these disciplines — this is where Inverlock operates.
>
> Working alongside investors and developers, we build decision-grade views of commitments, claims, and capital exposure. We identify break points through targeted stress testing, quantify options across funding, restructuring and exit pathways, and execute outcomes across portfolios, partnerships, contracts, and delivery.

Below the blurb, include a styled link/button: **"Contact Us →"** (arrow icon, links to `/contact`). Match the Icon style — blue circle arrow icon with underlined text.

#### Right Column — Statistics

Heading: **"Our Track Record"** (Inter weight 400, navy, ~24px)

Display these stats in a 2x3 grid layout (matching Icon's stats layout — see `References/Stats.png`):

| Value | Label |
|-------|-------|
| **$1.5bn** | Value recovered |
| **€1.4bn** | Realised through divestitures |
| **~70%** | DEVEX reduction achieved |
| **15** | Joint ventures built and managed |
| **$6bn+** | Assets and business units stabilised |
| **3** | Continents of experience |

- The numbers should be large (36-48px), bold, navy/dark.
- Labels below each number in smaller, lighter text (14-16px, grey).
- **Animate the numbers**: Use a count-up animation triggered when the section scrolls into view (Framer Motion + Intersection Observer). Numbers should count from 0 to their final value over **0.5 seconds** (fast and punchy, not a slow crawl). For currency values, animate the numeric part only.

### Section 3: Contact Us Bar

A full-width banner/strip with a dark navy background (`navy-primary`), appearing below the About section.

- Centred text: **"Get in touch"** (white, Inter weight 400, ~28px)
- Subtitle: **"To discuss how Inverlock can support your portfolio, please contact us."** (white, lighter weight, ~16px)
- **CTA Button**: "Contact Us →" — styled as a bordered/outlined white button that links to `/contact`

### Footer

Dark navy background (`#0a1628`), matching Icon's footer style.

- Top row: Navigation links (About Us, Contact) in white/light grey, small font.
- Below: Legal disclaimer text in small grey font (~12px):
  > "Inverlock is a trading name. This website is intended for informational purposes only and does not constitute an offer or solicitation. Past performance is not indicative of future results."
- Bottom-right: `Privacy Policy` | `Cookie Policy` links (can be placeholder `#` hrefs for now).

---

## Page 2: Contact Page (`/contact`)

### Header Banner

- Background: `AdobeStock_1914851058 (2).jpeg` (the electrical substation image) with a dark navy/blue overlay, similar to how Icon styles their contact page header (see `References/Contact Page.png`).
- The same fixed navbar as the landing page (but with solid background since it's over a shorter banner).
- Large white heading: **"Contact"** (Inter weight 400, ~48px) overlaid on the banner.
- Banner height: ~250-300px (not full viewport).

### Content Section

White or very light grey background. Generous padding.

Body copy:

> For enquiries, please [email us here](mailto:info@inverlockadvisory.com).
>
> Should you wish for more information on how Inverlock can support your assets and portfolio, please do not hesitate to [contact us here](mailto:info@inverlockadvisory.com).

The `email us here` and `contact us here` should be `mailto:info@inverlockadvisory.com` links styled in the accent blue with underline on hover (matching Icon's link styling).

### Footer

Same footer component as the landing page.

---

## Disclaimer Modal (on first visit)

When a user first loads any page, display a full-screen overlay modal before any content is visible. This is standard practice for infrastructure advisory/fund websites.

### Design:
- Semi-transparent dark overlay covering the entire viewport
- Centred white card/modal (~600px wide, rounded corners, padding 40-60px)
- No close button — user MUST click "Accept" to proceed

### Content:
- Heading: **"Important Information"** (Inter weight 400, navy)
- Body text: `[DISCLAIMER TEXT TO BE PROVIDED BY CLIENT]`
- Use this placeholder for now:

> This website is intended for professional investors and qualified counterparties only. The information contained herein does not constitute an offer to sell or a solicitation of an offer to buy any securities or financial instruments. By accessing this website, you confirm that you are a professional investor or qualified counterparty as defined under applicable regulations.

- **Accept button**: Full-width navy button with white text: **"I Accept — Enter Site"**
- **Decline option**: Small text link below: "I do not meet these criteria" — clicking this redirects to `https://www.google.com` or shows a message that the site cannot be accessed.

### Behaviour:
- Use `localStorage` to remember acceptance (key: `inverlock_disclaimer_accepted`). Don't show the modal again for 30 days.
- While the modal is displayed, the page content behind should be blurred (`backdrop-filter: blur`).
- Fade-in animation on load.

---

## Animations & Interactions

- **Navbar**: Transparent → solid white transition on scroll (use scroll listener, ~50px threshold). Logo colour swaps accordingly.
- **Hero text**: Subtle fade-up on page load (0.5s delay, Framer Motion).
- **Scroll chevron**: Continuous gentle bounce animation (CSS keyframes or Framer Motion).
- **Stats counters**: Count-up from 0 when scrolled into view (trigger once, using Intersection Observer).
- **Section reveals**: Subtle fade-up as each section enters the viewport.
- **Page transitions**: Minimal — keep it professional, not flashy.
- **Links/buttons**: Smooth colour transitions on hover (~200ms).

---

## Project Structure

```
inverlock-website/
├── app/
│   ├── layout.tsx          # Root layout with navbar, footer, disclaimer modal
│   ├── page.tsx            # Landing page (hero + about + contact bar)
│   ├── contact/
│   │   └── page.tsx        # Contact page
│   └── globals.css         # Tailwind imports + custom styles
├── components/
│   ├── Navbar.tsx           # Fixed navbar with scroll behaviour
│   ├── Footer.tsx           # Shared footer
│   ├── DisclaimerModal.tsx  # First-visit disclaimer overlay
│   ├── Hero.tsx             # Full-viewport hero section
│   ├── AboutSection.tsx     # About blurb + stats grid
│   ├── StatCounter.tsx      # Animated counting stat component
│   ├── ContactBar.tsx       # CTA strip
│   └── ScrollChevron.tsx    # Animated scroll indicator
├── public/
│   └── images/
│       ├── inverlock-logo.svg
│       ├── lighthouse.jpg
│       └── substation.jpg
├── tailwind.config.ts
├── next.config.js
├── package.json
└── tsconfig.json
```

---

## Setup Commands

```bash
npx create-next-app@latest inverlock-website --typescript --tailwind --eslint --app --src-dir=false
cd inverlock-website
npm install framer-motion
```

Then copy the image assets from `/Website/` into `public/images/`.

---

## Key Implementation Notes

1. **The About Us section is NOT a separate page** — it's a scroll section on the landing page. The "About Us" nav link should smooth-scroll to `#about` on the landing page, and navigate to `/#about` from the contact page.
2. **Mobile responsiveness is essential** — the navbar should collapse to a hamburger menu, the about section columns should stack, and stats should reflow to a 2-column or single-column grid.
3. **Image optimisation**: Use Next.js `<Image>` component for all images with appropriate `priority`, `fill`, and `sizes` props.
4. **The SVG logo** needs two colour variants: white (for dark backgrounds) and the original dark teal `#1E4C6C` (for light backgrounds). Handle this with CSS `filter` or by passing a `className` prop that sets `fill` via Tailwind.
5. **Performance**: Keep bundle size minimal. Lazy-load below-fold sections. Use `next/font` for Google Fonts to avoid layout shift.
6. **SEO**: Add appropriate `<title>`, `<meta description>`, and Open Graph tags. Title: "Inverlock | Decisive Intervention in Infrastructure". Description: "Inverlock is a specialist infrastructure advisory firm delivering high-stakes commercial interventions across energy and infrastructure assets."
