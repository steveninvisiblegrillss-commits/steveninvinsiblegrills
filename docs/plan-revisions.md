# Plan revisions (2026-10-06)

These override the matching parts of `steven-invisible-grills-website-plan.md`. Each was checked against official docs or the running build.

## Stack (as built)
- Astro 7 (Vite 8), Node 22.12+, TypeScript, Tailwind CSS v4, Astro content collections, Markdown/MDX in git.
- Static output served by Cloudflare Workers Static Assets: `wrangler.jsonc` with `assets.directory = ./dist`, no `main` field, no SSR, no adapter. Preview URLs are `*.workers.dev`, not `*.pages.dev`.
- Analytics: GA4, Microsoft Clarity (both loaded after idle), Search Console, Bing Webmaster Tools, IndexNow.

## Changes to the plan
| Plan said | Now |
|---|---|
| Astro 5, Node 20.3, Cloudflare Pages | Astro 7, Node 22.12+, Workers Static Assets |
| `src/pages/_redirects.ts` | Astro skips underscore routes. `scripts/make-redirects.mjs` writes `public/_redirects` from `legacyUrls` before each build. Workers supports `_redirects` (2,000 static rules). `scripts/check-build.mjs` fails the build if any target page is missing |
| D15: register a new domain | Keep `mrrinvisiblegrillspigeonnets.in` for launch. Revisit a brand domain after the rebrand settles. The `.php` to clean URL 301s stay mandatory |
| B9 "AEO / GEO layer" | B9 "AEO / AI search readiness": answer-first content, consistent entity facts, structured data for visible content only, real project evidence, internal links, indexable HTML. Google states no extra requirements or AI-specific files are needed for AI Overviews or AI Mode |
| `/llms.txt` as a core deliverable | Optional and low priority. Kept because it is cheap and generated from content |
| FAQ markup | Keep FAQs for users, topical coverage and direct answers. Not for rich-result expectations |
| Lighthouse budgets | Engineering quality gates, not ranking guarantees |
| Logo and favicon (D6) | No logo anywhere until the client's new one exists. Header shows the plain text name. `logo` is omitted from schema |
| Phosphor icons | Phosphor Duotone (`ph:*-duotone`), one family |
| Hero H1 | "Pigeon safety nets and invisible grills in Hyderabad" |
| GBP categories | Add rule: choose only categories that accurately describe the business, never for keywords alone |

## Project pages are the SEO engine
Real job, real photos, project page, service and area links, GBP post, review. Each project stores area, service, property type, problem, solution, photos, date and a customer-approved description. Location pages stay behind the anti-doorway rule (real local notes plus at least 2 projects).

## Search Console routine after launch
- Position 4-10: improve the page.
- Position 8-20: prioritise the page.
- High impressions, low CTR: rewrite title and meta description.
- Query with no dedicated page: evaluate a new page.
- Query ranking on the wrong page: fix internal links and page targeting.

## Still open
D5 real photos (30+, with area and service), D6 logo, premium imagery decision, consent for photos showing faces, owner confirmation of "10+ years", "free installation", counters and testimonials.
