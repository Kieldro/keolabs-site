# AGENTS.md — keolabs.ai marketing site

Astro + Tailwind static site. Served from Cloudflare Pages (auto-deploys on
push to `main`). Single-page layout at `src/pages/index.astro`.

## Repo layout

- `src/pages/index.astro` — the whole site
- `src/layouts/Layout.astro` — HTML shell, viewport/meta tags, fonts
- `src/styles/global.css` — Tailwind entry
- No CMS, no database, no server — just static HTML at build time

## Quick commands

```bash
pnpm dev                 # local preview at http://localhost:4321
pnpm build               # static build into dist/
pnpm preview             # serve the built dist/
```

Deployment: `git push origin main` → Cloudflare Pages rebuild.

## Coupling with the voice agent

**Only `VOICE_DEMO_URL` ties this site to the agent.** Defined at the top of
`src/pages/index.astro`, optionally overridden via env var at build time.
Iframe loads lazily on click with a pre-flight fetch so the site stays pretty
when the agent is down. Never pull code from `keolabs-voice-agent` or
`keolabs-web-frontend` into this repo. Never share npm packages.

## Mobile-first by default — non-negotiable

Most visitors come from mobile, and the live demo is designed to be tapped
through on a phone. Every change must stay mobile-safe with zero extra work.
Rules that keep us safe automatically:

- **Tailwind mobile-first.** Default classes target the phone; add `sm:`/`md:`
  /`lg:` breakpoints to scale up. Never write desktop-only styles that break
  at narrow widths.
- **Never use fixed pixel widths.** Use `max-w-*`, `w-full`, fractions, `rem`.
- **Touch targets ≥ 44×44 px.** Buttons: at least `py-3 px-5 text-base`.
- **Nav items that don't fit:** wrap in `hidden sm:inline`. Keep primary CTA
  always visible.
- **Viewport + theme-color meta are in `Layout.astro`.** Do not remove. Do not
  add `maximumScale` — it blocks accessibility zoom.
- **Test at 375×812 (iPhone SE/13 mini) before shipping.** Chrome DevTools
  mobile mode is enough.
- **Safe areas.** Bottom-anchored elements use
  `pb-[env(safe-area-inset-bottom)]`. Top bars use
  `pt-[env(safe-area-inset-top)]` when they're full-width over the notch.
- **Grids:** start 1-column, expand with `sm:grid-cols-2` or `md:grid-cols-3`.
- **Text sizes:** start at `text-base` or `text-lg`; headlines can scale
  `text-3xl sm:text-5xl lg:text-7xl`. No `text-sm` for body copy.
- **No `:hover`-only affordances.** Pair `hover:` with `active:` or a default
  state that reads correctly on touch.

If a component doesn't follow these rules, fix it. A visual regression on
mobile is a real regression — don't "fix later."

## Writing style

- **Sentence case** in headlines and buttons. No Title Case UI text.
- **Short. Concrete. Specific.** Avoid marketing buzzwords. See existing copy
  for the voice.
- **No emojis in body text.** (The one ⚠️ in the offline fallback is the
  deliberate exception.)

## Operational gotchas

- The **VOICE_DEMO_URL fallback** is a cloudflared quick-tunnel URL that
  rotates each time the tunnel is restarted. When it does, update the
  fallback string at the top of `src/pages/index.astro`. Longer-term fix:
  set a named Cloudflare tunnel so the URL is stable.
- Cloudflare Pages may cache the old build briefly after push; hard-refresh
  (Shift+R) if the change doesn't appear.
- The live demo iframe uses `allow="microphone; autoplay"`. Removing either
  will silently break the demo.

## Content structure

Five sections, in order:

1. **Hero** — headline + CTAs ("Book a free pilot" / "Try the live demo" /
   "See what we build")
2. **`#what`** — services grid (6 cards)
3. **`#how`** — three-step process
4. **`/who`** — "operator-built" block
5. **`#demo`** — embedded live voice demo (lazy iframe)
6. **`#contact`** — email CTA

Keep this structure unless you're making a deliberate IA change.
