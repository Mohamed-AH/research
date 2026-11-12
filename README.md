# Claiming Ideas

A bilingual (English and Arabic) companion site for the podcast episode with **Salman Butt**, co-founder of Salla and KnowledgeX. In the episode he talks about how research turns into business value.

- Episode: https://www.youtube.com/watch?v=0t0UiPQnskk
- Purpose: a study aid that sits beside the episode, so viewers can follow the ideas, look up terms and check sources.

## Layout

| Path | What it holds |
| --- | --- |
| `content/en/` | English chapter drafts (source of truth for wording) |
| `content/ar/` | Arabic versions (added after the English is approved) |
| `docs/design-brief.md` | Visual direction for the site |

The site will be static and is meant for Cloudflare Pages.

## Deploy

Hosted on Cloudflare Pages, which rebuilds on every push to `main`.

- Build command: `npm run build`
- Output folder: `dist`
- Framework preset: None
- Node version: pinned in `.nvmrc`
- Security and cache headers live in `site/_headers`. The Content-Security-Policy allows Cloudflare Web Analytics (`static.cloudflareinsights.com`, `cloudflareinsights.com`); add any new outside script or font host there first.
- Fonts are self-hosted in `site/assets/fonts` (Latin, Latin Extended and Arabic subsets), so pages make no requests to Google.
