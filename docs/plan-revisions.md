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

## Hero redesign (2026-10-06)
H1 is now "Invisible grills and safety nets for Hyderabad homes" with the eyebrow "Hyderabad home safety". The old brand line "Unobstructed views. Uncompromised safety." is a small italic statement under the trust row. Layout: 45/55 split on desktop (navy text column, one rounded-3xl photo, no text over the image, no float animation). On mobile the content comes first and the 4:3 image second; hero height is about 1.3 viewports. Colours unchanged (accent stays `#F59E0B`).
Hero photo: the dusk balcony with an almost invisible grill, a plant and city lights (`services/invisible-grills-for-balconies-hyderabad`). It came from the old site and is NOT confirmed as a Steven installation. Replace it with a real project photo (modern apartment, clean daylight, grill barely visible) when available: swap the import in `src/pages/index.astro`.
The "Safety and fall prevention" card now uses the real child-safe net project photo.

## Review fixes (2026-10-06, second pass)
- One brand identity: name, email and domain now come from `site.ts` and `PUBLIC_SITE_URL`. Email is `steveninvisiblegrillss@gmail.com`. Until a real domain is connected, canonicals and schema point at the preview host. Set `PUBLIC_SITE_URL` at launch (decision D15: which domain).
- Service pages: unique H2 wording per service (`src/config/headings.ts`), proper "Price basis" line, real job photos as hero where we have them, no duplicate bottom quote box.
- Header: near-opaque navy bar, page-aware nav (inner pages link to real pages), scroll-spy clears at the top, mobile menu leads with Call and Quote then grouped services.
- Hubs: no half-empty rows. Home accordion no longer leaves a gap. Projects: uniform tiles, service filters, tiles link to detail pages.
- Areas: an area page now needs real local notes plus a project, so `/areas/hyderabad/` is no longer published.
- About, Contact, Areas, Projects expanded with practical content built only from confirmed facts.
- Guides section added with two careful starter guides. Footer links to it.
- Tap targets: all links and buttons 44px or taller on mobile (measured on 7 page types). Mobile footer lists categories only.
- `favicon.ico` added. `_headers` adds X-Content-Type-Options, Referrer-Policy, Strict-Transport-Security, X-Frame-Options, Permissions-Policy and one-year immutable caching for hashed assets.
- Quote form shows a fallback WhatsApp link after submit. Not added, pending owner confirmation: a "we will call you within 30 minutes" promise, "from ₹X per sq ft" prices, 300 to 500 words per area page (needs real local jobs).

## New photography and full logo (2026-10-06)
Supplied by the site owner and placed: sunlit invisible-grill balcony (home hero), golden-hour clear net (Safety Nets hub), green pigeon net with pigeon (Pigeon and Anti Bird pages and the home bird card), tabby cat behind a net (Pet page), invisible grill being measured (Price page). The two "Pigeon and Bird Net" files were identical.
These look AI-generated. They are used only as service illustrations with neutral alt text, never on project pages or in the gallery as the client's own work. Originals are kept in `research/new-images/` (git-ignored).
Full logo lockup is now `public/logo.png` (schema logo) and the social share image `public/og-default.jpg`. The header still uses the S mark with live text for legibility at small sizes.
Still using older stock images and worth replacing the same way: balcony cloth hangers (floor rack, wrong product), staircase nets (shows wires), stainless steel page, construction, duct, window grills, and a second distinct image for Anti Bird Nets.

## Creative pass (2026-10-06): "the site is the invisible grill"
- Palette moved to the owner's brief: navy `#0b1426`, amber `#f5b83d`. Display type is Instrument Serif for H1 and H2 (single weight, italic accent phrases via `.em-accent` and `.em-brand`), body stays Plus Jakarta Sans.
- Header wordmark lockup: "Steven" in serif over small-caps "Invisible Grills", beside the S mark.
- Signature motif: fine steel wires every 30px with one gold wire every 300px (the gold wire in the logo) on the hero, call-to-action band and footer. The process timeline is a gold wire that draws itself on scroll. Photo cards light up steel wires around the mouse pointer on hover (no effect on touch). The 404 page speaks in the brand voice.
- Interactive hero "There's a grill in this photo. Can you see it?" (`HeroLens.astro`): CSS-drawn cables in three layers (faint, cursor lens, full reveal), spring-like follow, idle sweep on touch, circular "Show the grill" reveal growing out of the button, reduced-motion safe. Built without React or Framer Motion to keep the site static and light.
- The lens hero switches on automatically when a clean photo exists at `src/assets/images/hero/skyline.(jpg|png|webp|avif)` (2000px wide or more, a balcony view with NO grill or net). Until then the improved classic hero shows. `PUBLIC_HERO_LENS=true npm run dev` previews it with a stand-in.
- Copy used from the owner's brief: "Book a free site visit", "Free site visit and measurement". Kept as "Corrosion-resistant stainless steel" instead of "Marine-grade" until the owner confirms the steel grade.
