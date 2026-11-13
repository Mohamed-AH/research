# Claiming Ideas · حجز خانات فكرية

A free, bilingual (Arabic and English) study companion to a podcast episode with Salman Butt, co-founder of Salla and KnowledgeX, on how research becomes business value. The name comes from his phrase «حجز خانات فكرية» (27:22).

- **Live site:** https://claiming-ideas.pages.dev
- **Episode:** https://www.youtube.com/watch?v=0t0UiPQnskk

It is an independent study aid, not affiliated with Salla, KnowledgeX or the podcast.

## What's on the site

Eight chapters that follow the episode's own chapter markers, plus a glossary and a sources page, in both languages. Each chapter has:

- **From the episode:** the key moments, each linked to the exact minute in the video.
- **The idea, explained:** the concept in plain words.
- **Context and evidence:** outside sources, cited inline.
- **Try it:** a small interactive example.

| # | Chapter | Try it |
| --- | --- | --- |
| 1 | What technology and deep tech mean | Depth ladder: car, electric car, self-driving car |
| 2 | Deep tech in practice: reading heat | Two feet, one small temperature gap |
| 3 | Why companies build research centres | Product vs research payback, with a typical venture fund life shaded |
| 4 | From research to patent | The seven-step pipeline, with a "What if they publish first?" switch |
| 5 | Forecasting: the Eid warehouse story | Forecast playground, researcher vs merchant view, and a reorder-point calculator |
| 6 | Sponsored research and the Saudi ecosystem | Who puts what into a sponsored-research deal |
| 7 | Patents as assets | Route-to-market chooser |
| 8 | Founders, teams and AI | Founder triangle (works with the keyboard too) and an AI can/can't card |

## Repository layout

| Path | What it holds |
| --- | --- |
| `content/en/`, `content/ar/` | One Markdown file per page in each language: `00-home`, `01`–`08` chapters, `glossary`, `sources` |
| `build.mjs` | The static site generator: Markdown in, HTML out, plus the sitemap and robots.txt |
| `site/index.html` | Root page: sends visitors to their last-read or browser language (`/?choose` shows the chooser) |
| `site/assets/style.css` | Design tokens, light and dark themes, Arabic typography |
| `site/assets/widgets.js` | The Try-it widgets, with English and Arabic strings |
| `site/assets/site.js`, `theme.js`, `splash.js` | Menu, theme toggle, language memory |
| `site/assets/fonts/` | Self-hosted fonts: Young Serif, Literata and Martian Mono for English; Reem Kufi and Noto Naskh Arabic for Arabic |
| `site/assets/og-en.png`, `og-ar.png` | Link-preview images |
| `site/_headers` | Security and cache headers for Cloudflare Pages |
| `docs/design-brief.md` | Visual direction |

## Writing a page

Each page starts with front matter:

```yaml
---
chapter: 5
title: "Forecasting: the Eid warehouse story"
description: "One or two sentences for search results and link previews."
video_chapters: [9, 12]
starts: "33:08"
---
```

- **Timestamps:** a YouTube link with `&t=…s` becomes an orange chip that opens the video at that minute.
- **Widgets:** `<div class="widget" data-widget="NAME"></div>` places a Try-it widget. The names are listed at the bottom of `widgets.js`.
- **Both languages:** every change goes into `content/en` and `content/ar` together.

House rules for the text:

- Only verified facts go on the site, each with its source. Anything unverified stays in private notes.
- Quotes are translated from Saudi Arabic and lightly condensed. In Arabic they keep the speaker's dialect.
- The guest is named only on the home page and the sources page. Elsewhere it is "he".
- Plain language, short sentences, no em dashes. Arabic should read as written Arabic, not as a translation.

## Run locally

```sh
npm install
npm run build   # writes dist/
npm run dev     # builds, then serves dist/ on a local port
```

## Deploy

Cloudflare Pages rebuilds on every push to `main`, and every other branch gets a preview at `<branch>.claiming-ideas.pages.dev`.

- Build command: `npm run build`
- Output folder: `dist`
- Framework preset: None
- Node version: pinned in `.nvmrc`
- Cloudflare Web Analytics is on. The Content-Security-Policy in `site/_headers` allows its script (`static.cloudflareinsights.com`, `cloudflareinsights.com`). Add any new outside script or font host there first.
- Pages make no requests to Google: fonts are served from the site itself.
- Canonical URLs, `hreflang` links and the sitemap use `https://claiming-ideas.pages.dev`. If the site moves to its own domain, change `SITE` in `build.mjs` and the links in `site/index.html`.

## Quality checks

Before launch the site passed an audit covering accessibility (axe-core finds no issues on any page, in either theme), layouts from 320 to 1920 px, older iPhones (iOS 15), security headers, copy in both languages, fact checks against the cited sources, and an AI-phrasing check.
