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

## Home page redesign (2026-10-06, per design brief)
- Palette: midnight navy `#0B132B`, slate neutrals, amber `#F59E0B` for high-intent CTAs only, white sections. WhatsApp green darkened to `#15803D` so white text passes AA.
- Floating glass header (dark glass, zero layout height). Mobile menu uses the native Popover API so the blur cannot clip it. Scroll-spy is a 15-line IntersectionObserver.
- Home sections: Hero, "What do you need to fix?", ServicesGrid (4 pillar cards, native `<details name="pillar">` accordion with every sub-service as a pill), Process, Gallery (native `<dialog>` lightbox), ServiceAreas, FAQ (native accordion), CTA band. Fixed bottom call and WhatsApp bar on mobile only.
- Not shown until confirmed: "4.9 star rating" (renders from `site.rating` once a real Google rating is set), "Free on-site measurement", and neighbourhood tags like Gachibowli or Jubilee Hills (gallery tags say "Hyderabad" until real localities are known). No pricing calculator: the price guide page covers it.
- H1 is now "Unobstructed views. Uncompromised safety." Keywords sit in the sub-headline, title tag and meta description. Revisit if Search Console shows the home page missing "invisible grills Hyderabad" queries.
- Photo audit: project photos were relabelled after viewing every file. Held out of public pages until the client approves: `PG1`, `H-12`, `H-16` (identifiable faces), `H-15` (unclear subject). The monkey net image was removed because it carries another company's watermark.

## Photo approvals (2026-10-06)
The site owner approved the three photos showing faces (`PG1` installer, `H-12` child, `H-16` children on a football turf) for public use. Recommendation kept on record: confirm with the families of the children shown. `H-15` (indoor hall) stays out until its subject is known. The phone-brand watermark on `H-12` is cropped off. Project fields for area, property type, problem and solution are left blank until the client supplies real details; nothing is invented.

## Order of remaining work
Directory listings with identical name and phone, Bing Webmaster Tools and IndexNow are deliberately done last, after launch content is final.
