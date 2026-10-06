# Steven Invisible Grills: Premium Website Implementation Plan

> **Brand decision (2026-10-06):** the client wants the business name **Steven Invisible Grills** (phone 6305721219, same as the current MRR site). Old names "MRR Safety Nets" and "MRR Invisible Grills" are kept only as `alternateName` in schema so existing brand searches and citations still resolve to the same entity. Part A (audit) keeps the old names because it documents the live site.

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.
> Design skills to load before UI tasks: `design-taste-frontend`, `high-end-visual-design`, `redesign-existing-projects`. Their pre-flight checklists apply to every page.

**Goal:** Replace the current template site with a fast, premium, mobile-first static website that ranks in Google Search, Google Maps and AI answers (AEO/GEO) for Hyderabad safety-net and invisible-grill searches, and turns visits into WhatsApp/call leads.

**Architecture:** Astro static site generation. All business data lives in one typed config file plus Markdown content collections in git (no CMS, no database, no server). Every page is pre-rendered HTML with near-zero JavaScript, served from Cloudflare's edge. SEO (schema, sitemap, redirects, llms.txt) is generated from the same content at build time, so data can never drift between pages.

**Tech Stack:**

| Layer | Choice | Why (SEO/speed) |
|---|---|---|
| Framework | **Astro 5** (`output: 'static'`) | Ships pure HTML, 0 KB JS by default, best-in-class Core Web Vitals, no JS-rendering risk for Googlebot or AI crawlers |
| Content | **Astro content collections** (Markdown + Zod schemas) in git | No CMS. Type-checked content, build fails on missing SEO fields |
| Styling | **Tailwind CSS v4** via `@tailwindcss/vite` | Purged CSS, typically < 15 KB |
| Images | `astro:assets` + `sharp` | Auto AVIF/WebP, responsive `srcset`, width/height (CLS = 0) |
| Fonts | `@fontsource-variable/plus-jakarta-sans` self-hosted, latin subset, preloaded | No Google Fonts request, `font-display: swap` |
| Icons | `astro-icon` + `@iconify-json/ph` (Phosphor, inlined SVG) | Zero icon-font weight |
| Sitemap | `@astrojs/sitemap` | Auto from routes |
| Hosting | **Cloudflare Pages** (free), Mumbai/Chennai/Hyderabad edges | HTTPS, HTTP/3, Brotli, real 301s via `_redirects` |
| Analytics | GA4 (deferred) + Google Search Console + Bing Webmaster Tools | Bing powers Copilot and feeds ChatGPT search |
| Indexing | IndexNow ping on deploy | Instant Bing/Yandex discovery |
| Tests | Vitest (lib units) + `scripts/check-build.mjs` (post-build SEO audit) + Lighthouse CI | Build fails on SEO regressions |

**No CMS (by decision):** content edits = edit a Markdown file, commit, push. Cloudflare rebuilds in ~1 minute. A new project, guide or area page is one `.md` file.

**Spec:** Part A of this document (audit of the live site, crawled 2026-10-06). Raw crawl kept in `research/` (`research/pages/*.txt`, `research/image-inventory.tsv`, `research/original-assets/`).

## Global Constraints

- Node >= 20.3, Astro ^5, Tailwind ^4. No React, Vue or any client framework. No jQuery.
- JavaScript budget: <= 15 KB gzipped per page, total. Only two islands allowed: quote form WhatsApp handoff and before/after slider (both vanilla `<script>` in Astro), plus deferred GA4. Mobile menu uses native `<details>`, zero JS.
- Performance budget (mobile, Lighthouse, Slow 4G): Performance >= 95, SEO = 100, Accessibility >= 95, Best Practices = 100. LCP < 2.0 s, CLS < 0.05, INP < 200 ms. Page weight < 600 KB on first load.
- Single source of truth for NAP: `src/config/site.ts`. No phone number, email or business name is hard-coded anywhere else.
- Business name used everywhere: **Steven Invisible Grills** (Decision D1, resolved). It must also be the Google Business Profile name. Never "Durga Safety Nets"; "MRR" appears only in `alternateName`.
- Phone: `+91 63057 21219` (display), `tel:+916305721219` (link), WhatsApp `916305721219`. Email `mrrsafetynets@gmail.com`.
- URLs: lowercase, hyphenated, trailing slash, no `.php`. Every old `.php` URL returns HTTP 301 to its new URL.
- Never invent facts. Unverified claims (prices, warranty, counters, testimonials, materials grade) render only after the client confirms them in `site.ts` / frontmatter. Fields default to `null` and components hide when `null`.
- Copy rules (design-taste-frontend 9.G): zero em-dashes (`—`) or en-dashes (`–`) in any visible string. No "elevate / seamless / unleash / next-gen". Sentence case headings.
- Every `<img>` has descriptive `alt`, `width`, `height`. Filenames are descriptive (`pigeon-safety-net-balcony-hyderabad.avif`).
- Every page: exactly one `<h1>`, unique `<title>` (<= 60 chars), unique meta description (70-160 chars), absolute canonical, Open Graph + Twitter tags, valid JSON-LD.
- One theme system: light default with `prefers-color-scheme: dark` tokens. One accent colour. Radius rule: buttons pill, cards 20px, inputs 12px.
- Honour `prefers-reduced-motion`: all motion collapses to none.

## Review Focus

1. **Old `.php` URLs (including the typo `ceilling-cloth-hangers.php` and the broken `coconut-tree-safety-nets.php`)** must answer 301 to a live page, never 404 or a soft-200 homepage. Test: `check-build.mjs` asserts every `_redirects` target exists in `dist/` (Task 9).
2. **Thin location pages** (service x area with no real local proof) must not be built, or Google treats them as doorway pages. Test: `publishableCombos()` unit test returns nothing for an area with < 2 matching projects (Task 4).
3. **WhatsApp links with spaces, `&`, `?` or Telugu text** must open WhatsApp with the exact message. Test: `waLink()` round-trip decode test (Task 3).
4. **NAP drift / wrong business name in schema** (the live site's schema says "Durga Safety Nets"). Test: schema unit test asserts `name === site.name` and the string "Durga" never appears in `dist/` (Tasks 5, 9).
5. **Unoptimised or alt-less images** dragging LCP and image SEO. Test: `check-build.mjs` fails on any `<img>` missing `alt`/`width`/`height` or any image file > 250 KB in `dist/` (Task 9).

---

# PART A: AUDIT OF THE CURRENT WEBSITE (SPEC INPUT)

Legend: **[V]** verified from website crawl 2026-10-06 · **[I]** inferred · **[NF]** not found on website

## A1. Site map (live)

Domain `https://www.mrrinvisiblegrillspigeonnets.in/` [V]. Hosting: Hostinger (`platform: hostinger`, `server: hcdn`, `X-Powered-By: PHP/8.3.33`) [V]. `robots.txt` and `sitemap.xml` do not exist: both URLs return the homepage HTML with status 200 [V].

| # | Page | URL | H1 | Main image | Notes |
|---|---|---|---|---|---|
| 1 | Home | `/` (`/index.php`) | 6 slider H1s (multiple H1s) | 6 slider backgrounds | [V] |
| 2 | About | `/about.php` | "About Us" + "We Have 10 Years Experience In MRR Safety Nets Dealers In Hyderabad" | `about-1.jpg`, `about-2.jpg` | [V] |
| 3 | Contact | `/contact.php` | "Contact Us" + "Get In Touch" | Google Maps embed (generic "Hyderabad, Telangana" pin) | No form [V] |
| 4 | Balcony Safety Nets | `/balcony-safety-nets.php` | Balcony Safety Nets | `services/balcony-safety-net.webp` | [V] |
| 5 | Pigeon Safety Nets | `/pigeon-safety-nets.php` | Pigeon Safety Nets | `services/pigeon-nets-balcony.jpg` | [V] |
| 6 | Anti Bird Nets | `/anti-bird-nets.php` | Anti Bird Nets | `services/anti-bird-net.jpg` | [V] |
| 7 | Duct Area Safety Nets | `/duct-area-safety-nets.php` | Duct Area Safety Nets | `services/duct-area-nets.jpg` | [V] |
| 8 | Staircase Safety Nets | `/staircase-safety-nets.php` | Staircase Safety Nets | `services/invisible-grille-for-staircase.jpg` | Image shows grill, not net [I] |
| 9 | Construction Safety Nets | `/construction-safety-nets.php` | Construction Safety Nets | `services/construction-safety-nets.jpg` | [V] |
| 10 | Monkey Safety Nets | `/monkey-safety-nets.php` | Monkey Safety Nets | `services/monkey-nets.png` (747 KB) | [V] |
| 11 | Cricket Practice Nets | `/cricket-practice-nets.php` | Cricket Practice Nets | `services/cricket-nets.jpg` | [V] |
| 12 | All Sports Nets | `/all-sports-nets.php` | All Sports Nets | `services/all-sports-nets.jpg` | [V] |
| 13 | Invisible Grill | `/invisible-grill.php` | Invisible Grill | `services/invisible-grills.jpg` | [V] |
| 14 | Invisible Grill for Balconies | `/invisible-grill-for-balconies.php` | same | `services/invisible-grill-balcony.jpg` | [V] |
| 15 | Invisible Grill for Windows | `/invisible-grill-for-windows.php` | same | `services/invisible-grill-windows.jpg` | [V] |
| 16 | Stainless Steel Invisible Grill | `/stainless-steel-invisible-grill.php` | same | `services/stainless-grills.jpg` | [V] |
| 17 | Invisible Grill Dealers | `/invisible-grill-dealers.php` | same | `services/duct-area-nets.jpg` (wrong image, reused from duct page) | [V] |
| 18 | Invisible Grill Manufacturer | `/invisible-grill-manufacturer.php` | same | `services/invisible-grill-manufracture.jpg` | [V] |
| 19 | Invisible Grill for Balcony Price | `/invisible-grill-for-balcony-price.php` | same | `services/invisible-grill-balcony-price.jpg` | No actual price [V] |
| 20 | Invisible Grill Fixing Charges | `/invisible-grill-fixing-charges.php` | same | `services/invisible-grill-fix-charges.jpg` | No actual charges [V] |
| 21 | Cloth Hangers | `/cloth-hangers.php` | Cloth Hangers | `services/cloth-hanger-balcony.png` (721 KB) | [V] |
| 22 | Pull and Dry Cloth Hangers | `/pull-and-dry-cloth-hangers.php` | same | `services/pull-and-dry-hanger.png` | [V] |
| 23 | Cloth Hangers for Balcony | `/cloth-hangers-for-balcony.php` | same | `services/cloth-hanger-balcony.png` (same as #21) | [V] |
| 24 | Ceiling Cloth Hangers | `/ceilling-cloth-hangers.php` (typo in URL) | Ceiling Cloth Hangers | `services/ceiling-hangers.jpg` | [V] |
| x | Coconut Tree Safety Nets | `/coconut-tree-safety-nets.php` | n/a | n/a | Linked from homepage Cloth Hangers card image; soft 404 (serves homepage) [V] |

## A2. Navigation tree (live) [V]

```
Home
About
Safety Nets ▾  Balcony · Pigeon · Anti Bird · Duct Area · Staircase · Construction · Monkey · Cricket Practice · All Sports
Invisible Grills ▾  For Balconies · For Windows · Stainless Steel · Dealers · Manufacturer · For Balcony Price · Fixing Charges · Invisible Grill
Cloth Hangers ▾  Cloth Hangers · Pull and Dry · For Balcony · Ceiling
Contact
```
Top bar: phone `+91 6305721219`, email. Sticky header duplicate. Floating buttons on every page: call (`phone-icon.webp`), WhatsApp (`wp.gif`), email (`mail-icon.png`). WhatsApp prefilled text: "Can you let us know the pricing of your safety nets" [V].

## A3. Homepage sections in order [V]

1. Top bar (phone, email) + header (logo, mega nav, call + WhatsApp icons).
2. Hero slider, 6 slides, each H1 + H3 + phone button: "Balcony Safety Nets / Free Installation", "Invisible Grills for Balconies / Free Installation", "Pigeon Safety Nets / Best Quality Nets", "Children Safety Nets / Best Quality Nets", "Cricket Practice Safety Nets / Best Quality Nets", "Cloth Hangers Installation / Best Quality Hangers".
3. "Secure Your Balcony / Our Services" carousel, 8 cards (image + H3 + call link): Balcony Safety Nets, Invisible Grills, Duct Area Safety Nets, Anti Bird Nets, Cricket Nets, Bird Spikes, Pet Safety Nets, All Sports Nets.
4. Three feature cards with image + phone + WhatsApp: Free Installation, Quality Assurance, Reasonable Prices.
5. "About Us / Welcome to MRR Safety Nets": photo carousel (11 slides: PG1, H-12..H-16, PG3, PG3, H-12, PG1, H1.png) + H3 "Over 10 Years of Experience as Trusted Safety Nets Dealers in Hyderabad" + two paragraphs + "Contact Us" button.
6. "Our Netting solutions provides safety anywhere where heights may present a danger. / Our Safety Nets Services": 12 cards with description + Read More (copy in A5).
7. Counters (JS count-up): 32 "Our Team", 3000 "Project", 100 "% Happy Customer".
8. "Testimonials / Happy Say": Ananya, Rohit, Meera (text in A8). No ratings, photos or source.
9. Footer: About text, Safety Nets links, Invisible Grill & Cloth Hangers links, Get in Touch (Hyderabad, Telangana; phone; email), "Copyright © www.mrrinvisiblegrillspigeonnets.in 2025-26".

Inner service pages share one template [V]: page-title banner (`page-bg.webp`) → H1 → large image → H3 → two paragraphs → sidebar "Our Services" (17 links) → footer. No CTA block, no FAQ, no gallery, no related content.

## A4. Service catalogue

Pages exist for 21 services/keyword pages (A1 rows 4-24). Services mentioned **only in body text, no page** [V]: Children Safety Nets (also a hero slide), Industrial Safety Nets, Swimming Pool Safety Nets, Glass Safety Nets, Coconut Safety Nets (broken link), Mosquito Nets, Sports Practice Nets, Bird Spikes (homepage card), Pet Safety Nets (homepage card), Pigeon Nets for Balconies, Bird Protection Nets, Agro Shade Nets, Garden Plant Support Nets.

Materials stated [V]: anti-bird nets "made from high-strength nylon"; invisible grills "high-strength stainless steel wires", "corrosion-resistant". Grade (304/316), wire thickness, net type (HDPE/nylon mesh size), UV rating: [NF].
Pricing [NF]. Warranty [NF]. "Free Installation" [V] (hero slides + feature card). Free site inspection [NF].

## A5. Original service copy (preserve meaning; reuse as base copy)

Full original paragraphs for each page are in `research/pages/<slug>.txt`. Summary of each page's claims [V]:

- **Balcony Safety Nets:** prevent accidental falls in apartments/high-rise; preserves open view; "premium-quality, long-lasting nets with high tensile strength"; residential, commercial, high-rise.
- **Pigeon Safety Nets:** hygiene and maintenance problems from pigeons; humane; keeps ventilation and appearance; covers balconies, ducts, open areas; doesn't block air or sunlight; weather-resistant; residential, commercial, industrial; Hyderabad and Telangana.
- **Anti Bird Nets:** pigeons, crows, sparrows; balconies, ducts, open areas; weather-resistant; custom sizes and shapes; residential buildings, high-rises, bridges (homepage); high-strength nylon.
- **Duct Area Safety Nets:** ventilation ducts, shafts, open spaces between blocks; stop birds and debris; maintain airflow.
- **Staircase Safety Nets:** staircases, railings, open areas; children, elderly, visitors.
- **Construction Safety Nets:** scaffolding, building exteriors; workers and pedestrians; falling debris.
- **Monkey Safety Nets:** balconies, terraces, rooftops, gardens; humane barrier.
- **Cricket Practice Nets:** schools, clubs, sports complexes, residential training areas; indoor/outdoor; designed to requirement.
- **All Sports Nets:** cricket, football, badminton, tennis, swimming pool safety; custom sizes.
- **Invisible Grill (hub), for Balconies, for Windows, Stainless Steel:** safety without obstructing view; children and pets; intrusion protection; corrosion-resistant, low-maintenance, weather-resistant; apartments, homes, high-rise.
- **Dealers / Manufacturer:** claims "trusted dealer" and "leading invisible grill manufacturer in Hyderabad".
- **Balcony Price / Fixing Charges:** "transparent pricing", "competitive fixing charges", no figures.
- **Cloth Hangers, Pull and Dry, For Balcony, Ceiling:** balconies, terraces, rooftops; space-saving; weather-resistant; ceiling-mounted; apartments, homes, commercial.

## A6. Image inventory (68 unique files)

Full table with size, dimensions and pages: `research/image-inventory.tsv`. Originals downloaded to `research/original-assets/`. Every image on the live site has empty `alt=""` except 8 homepage product cards [V].

| Group | Files | Dimensions | Use on live site | Reuse plan |
|---|---|---|---|---|
| Logo | `MRR-logo.png` 193 KB | 800x180 | Header, footer, sticky | Optimise to WebP ~12 KB; designer SVG later (D6) |
| Hero slides | `sliders/balcony-safety-net.jpg`, `children-safety-net.jpg`, `cricket-practice-net.jpg`, `pigeon-net-installation.jpg` (1280x715/595), `invisible-grill.png` 1.8 MB, `cloth-hangers.png` 1.6 MB (1600x627) | | Home slider bg | Category tiles, service heroes |
| Real install photos | `about/PG1.jpg` 1200x1600, `about/PG3.jpg`, `about/H-12..H-16.jpg` 960x1280 | portrait, phone shots, some with "honor 9 Lite" watermark | Home about carousel | **Most valuable asset**: projects gallery, hero. Crop watermarks |
| Feature icons | `about/H1.png`, `H2.png`, `H3.png` 280x280; `ours/Home-services1-3.jpg` 500x500 | | Feature cards | Replace with Phosphor icons |
| Product cards | `products/*.jpg` 380x230 (7 files) | small | Home carousel | Low-res; use only as thumbnails |
| Main service cards | `mainservices/*` 12 files (372x402 to 1222x917) | | Home service grid | Service card images |
| Service heroes | `services/*` 19 files (~1062x592) | | Inner page heroes | Service page heroes |
| About | `about-1.jpg` 400x470, `about-2.jpg` 350x350 | | About page | About page |
| Page banner | `page-bg.webp` 1700x354 | | All inner pages | Drop |
| Floating icons | `phone-icon.webp`, `wp.gif` 139 KB, `mail-icon.png` 126 KB (883x897) | | All pages | Replace with inline SVG icons (saves ~285 KB/page) |
| Misc | `icon.png` 322x205 (x6 in testimonials) | | Quote icon | Drop |

Note [I]: several service images look like stock or AI-generated renders. Real phone photos (PG/H series) carry far more trust and E-E-A-T value. The client must supply 30+ more real installation photos (Decision D5).

## A7. Design system (live) [V from `css/style.css`]

Colours by frequency: `#2b4fba` (primary blue, 116 uses), `#2b3c6b` (navy, 71), `#43b3d9` (cyan), `#fbb419` (yellow), `#848484` (grey text), `#e5e5e5`. Fonts: "M PLUS Rounded 1c" (headings, 50 uses) and "Open Sans" via Google Fonts `@import` (render-blocking). Bootstrap 4 + jQuery + Owl Carousel + WOW.js + parallax + fancybox + Font Awesome 4.7 + Flaticon. Viewport meta disables zoom (`maximum-scale=1.0, user-scalable=0`) which is an accessibility failure. Logo palette [V visually]: navy, royal blue, gold/orange gradient, green pigeon mascot. Tagline in logo: "PREMIUM SAFETY SOLUTIONS".

## A8. Trust signals and their status

| Claim | Status |
|---|---|
| "Over 10 Years of Experience" / "We Have 10 Years Experience" | [V] on site, unverified fact |
| Free Installation | [V] on site |
| Quality Assurance, Reasonable Prices | [V] on site |
| Counters 32 team / 3000 projects / 100% happy | [V] in HTML (`data-stop`), unverified |
| Testimonials: Ananya ("excellent solution for our balcony safety needs... Highly recommended!"), Rohit ("High-quality safety nets installed perfectly... great value for money"), Meera ("very satisfied with the installation process and the quality of the nets") | [V] text, no surname, rating, date or source: treat as unverifiable |
| "nationwide network of local installers" (About) | [V] text, contradicts Hyderabad-only positioning [I] |
| Google reviews / rating | [NF] |
| Certifications, warranty, GST, years founded | [NF] |

## A9. Contact data

| Field | Value | Status |
|---|---|---|
| Name on site | "MRR Safety Nets" (text), "MRR Invisible Grills" (logo), domain "mrrinvisiblegrillspigeonnets" | [V] inconsistent |
| Name in schema | "Durga Safety Nets" | [V] **wrong** |
| Phone / WhatsApp | +91 6305721219 | [V] |
| Email | mrrsafetynets@gmail.com | [V] |
| Address | "Hyderabad, Telangana." only; schema `postalCode: "500XXX"` | [V] incomplete |
| Areas (schema only) | Hyderabad, Secunderabad, Gachibowli, Kondapur, Madhapur, Hitech City, Banjara Hills, Jubilee Hills, Kukatpally, Miyapur, Ameerpet, Begumpet, Dilsukhnagar, LB Nagar, Uppal, Tarnaka, Kompally, Attapur, Manikonda, Nallagandla | [V] |
| Hours, social links, GBP link, owner name | | [NF] |

## A10. SEO and technical findings

| Item | Live state | Impact |
|---|---|---|
| Titles | Pattern "X \| X & Invisible Grills in Hyderabad - Telangana", many > 60 chars | Truncated in SERP |
| Meta descriptions | Present, near-duplicate across pages, often > 160 chars | Low CTR |
| H1 | Home has 6 H1s; inner pages have banner H1 + content H3 | Weak hierarchy |
| Canonical | Home only | Duplicates possible (`/` vs `/index.php`) |
| Schema | One LocalBusiness block: wrong name, **invalid JSON** (missing commas, trailing comma), fake postal code, areas typed as `City` | Ignored by Google, harms entity clarity |
| Open Graph / Twitter | [NF] | Poor WhatsApp/social previews |
| robots.txt / sitemap.xml | Missing (soft 200) | Slower discovery |
| Analytics / Search Console | GSC verification meta present; no GA4/GTM/pixel [V] | No lead measurement |
| Content depth | ~120-150 words per service page, no FAQs, no prices, no local proof | Thin content |
| Internal linking | Sidebar list only; no contextual links | Weak topical graph |
| Images | No alt, PNG heroes up to 1.8 MB, no lazy loading on carousel | Slow LCP, no image SEO |
| Lead capture | Phone + WhatsApp only, no form, generic WhatsApp text | Can't tell which service/page converted |
| Accessibility | Zoom disabled, empty alts | Fails WCAG |
| Keywords targeted [I] | balcony safety nets hyderabad, invisible grills hyderabad, pigeon nets, anti bird nets, cloth hangers installation hyderabad, cricket practice nets hyderabad, sports nets hyderabad, invisible grill price/fixing charges/dealers/manufacturer | |

---

# PART B: NEW WEBSITE SPEC

## B1. Design read and dials

**Design read:** Local home-safety service for Hyderabad apartment families (parents, pet owners, NRI owners managing flats, builders), with a trust-first premium language, leaning toward Astro + Tailwind v4 + restrained CSS motion. Mode: **Redesign, overhaul visuals, preserve content and IA**.

Dials: `DESIGN_VARIANCE: 6`, `MOTION_INTENSITY: 4`, `VISUAL_DENSITY: 4`. Trust beats spectacle; people buying child safety want calm, clear, proof-heavy pages.

## B2. Design tokens

Derived from the logo (navy + royal blue + gold), recalibrated. One accent (gold) reserved for the primary action. WhatsApp green is a functional colour used only on the WhatsApp button (documented exception).

```css
/* src/styles/global.css */
@import "tailwindcss";

@theme {
  --font-sans: "Plus Jakarta Sans Variable", ui-sans-serif, system-ui, sans-serif;
  --color-ink: #0e1a2f;        /* headings, body on light */
  --color-ink-soft: #4a5873;   /* secondary text, 7.0:1 on surface */
  --color-surface: #f5f7fa;    /* page background (cool off-white) */
  --color-surface-2: #e8edf4;  /* tinted section background */
  --color-card: #ffffff;
  --color-brand: #1f45b5;      /* royal blue from logo: links, icons, headings accents */
  --color-brand-deep: #13285e; /* navy: footer, hero overlay */
  --color-accent: #f2b227;     /* logo gold: primary CTA only */
  --color-accent-ink: #1a1405; /* text on gold, 10.8:1 */
  --color-wa: #1d9e52;         /* WhatsApp button only */
  --radius-card: 20px;
  --radius-input: 12px;
  --shadow-soft: 0 1px 2px rgb(19 40 94 / .06), 0 12px 32px -12px rgb(19 40 94 / .18);
  --ease-out-quint: cubic-bezier(.22, 1, .36, 1);
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-ink: #e9eef7;
    --color-ink-soft: #a9b6cc;
    --color-surface: #0b1426;
    --color-surface-2: #111d35;
    --color-card: #14213b;
    --color-brand: #7f9cf5;
    --color-brand-deep: #060d1c;
  }
}

html { scroll-behavior: smooth; -webkit-text-size-adjust: 100%; }
body { background: var(--color-surface); color: var(--color-ink); font-family: var(--font-sans); }
h1, h2, h3 { text-wrap: balance; letter-spacing: -0.02em; }
p { text-wrap: pretty; }

@media (prefers-reduced-motion: no-preference) {
  .reveal { animation: reveal linear both; animation-timeline: view(); animation-range: entry 0% entry 40%; }
  @keyframes reveal { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: none; } }
}
```

Type scale: H1 `text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05]`; H2 `text-3xl md:text-4xl font-bold`; H3 `text-xl font-semibold`; body `text-base md:text-lg leading-relaxed max-w-[65ch]`. Container `max-w-7xl mx-auto px-4 md:px-8`. Section rhythm `py-20 md:py-28`. Nav height 68px. Buttons: pill, `px-6 py-3.5`, min touch target 48px, trailing icon in its own circle (button-in-button), `active:scale-[0.98]`.

Motion (all CSS, zero JS): scroll reveal via `animation-timeline: view()` (unsupported browsers just show content), button hover translate, before/after slider. No carousels anywhere (they hide content from users and crawlers).

## B3. Information architecture and URL map

Category structure (topical clusters):

```
/                                   Home
/safety-nets/                       Hub: Safety Nets
  /balcony-safety-nets/
  /pigeon-safety-nets/
  /anti-bird-nets/
  /duct-area-safety-nets/
  /staircase-safety-nets/
  /construction-safety-nets/
  /monkey-safety-nets/
  /children-safety-nets/            NEW (was hero slide + body text)
  /pet-safety-nets/                 NEW (was homepage card)
  /bird-spikes/                     NEW (was homepage card)
/sports-nets/                       Hub: Sports Nets
  /cricket-practice-nets/
  /all-sports-nets/
/invisible-grills/                  Hub: Invisible Grills (absorbs invisible-grill, dealers, manufacturer)
  /invisible-grills-for-balconies/
  /invisible-grills-for-windows/
  /stainless-steel-invisible-grills/
  /invisible-grill-price/           absorbs balcony-price + fixing-charges
/cloth-hangers/                     Hub: Cloth Hangers
  /pull-and-dry-cloth-hangers/
  /balcony-cloth-hangers/
  /ceiling-cloth-hangers/
/projects/                          Real installation gallery
  /projects/<slug>/                 One page per job (area + service + photos)
/areas/                             Areas served hub
  /areas/<area>/                    One page per area (only with real projects)
/<service>-<area>/                  e.g. /pigeon-safety-nets-kukatpally/ (only when publishable, see B6)
/guides/                            Customer-question articles
  /guides/<slug>/
/about/
/contact/
/faq/
/privacy-policy/
/404
/llms.txt   /robots.txt   /sitemap-index.xml   /_redirects
```

**Why no `/pigeon-safety-nets-hyderabad/`:** the whole business is Hyderabad, so `/pigeon-safety-nets/` already targets "pigeon safety nets in Hyderabad" (H1, title, schema `areaServed`). A second Hyderabad page would cannibalise it. Neighbourhood pages (Kukatpally, Gachibowli...) are the real local layer.

**Body-text-only services** (Industrial, Swimming Pool, Glass, Coconut Tree, Mosquito, Agro Shade, Garden Plant Support, Bird Protection Nets): listed on their hub under "Also available" with a WhatsApp link. A full page is created later only when the client provides photos and details (no thin pages).

**301 redirect map** (generated from `legacyUrls` frontmatter, Task 9):

| Old | New |
|---|---|
| `/index.php` | `/` |
| `/about.php` | `/about/` |
| `/contact.php` | `/contact/` |
| `/balcony-safety-nets.php` | `/balcony-safety-nets/` |
| `/pigeon-safety-nets.php` | `/pigeon-safety-nets/` |
| `/anti-bird-nets.php` | `/anti-bird-nets/` |
| `/duct-area-safety-nets.php` | `/duct-area-safety-nets/` |
| `/staircase-safety-nets.php` | `/staircase-safety-nets/` |
| `/construction-safety-nets.php` | `/construction-safety-nets/` |
| `/monkey-safety-nets.php` | `/monkey-safety-nets/` |
| `/cricket-practice-nets.php` | `/cricket-practice-nets/` |
| `/all-sports-nets.php` | `/all-sports-nets/` |
| `/invisible-grill.php` | `/invisible-grills/` |
| `/invisible-grill-dealers.php` | `/invisible-grills/` |
| `/invisible-grill-manufacturer.php` | `/invisible-grills/` |
| `/invisible-grill-for-balconies.php` | `/invisible-grills-for-balconies/` |
| `/invisible-grill-for-windows.php` | `/invisible-grills-for-windows/` |
| `/stainless-steel-invisible-grill.php` | `/stainless-steel-invisible-grills/` |
| `/invisible-grill-for-balcony-price.php` | `/invisible-grill-price/` |
| `/invisible-grill-fixing-charges.php` | `/invisible-grill-price/` |
| `/cloth-hangers.php` | `/cloth-hangers/` |
| `/pull-and-dry-cloth-hangers.php` | `/pull-and-dry-cloth-hangers/` |
| `/cloth-hangers-for-balcony.php` | `/balcony-cloth-hangers/` |
| `/ceilling-cloth-hangers.php` | `/ceiling-cloth-hangers/` |
| `/coconut-tree-safety-nets.php` | `/safety-nets/` |

## B4. Homepage structure (new)

Above the fold (mobile 390x844 and desktop 1440x900): header, H1, subtext, both CTAs, hero photo. Nothing else.

| # | Section | Layout family | Content | CTA |
|---|---|---|---|---|
| 1 | Header | Sticky, 68px, blurred background on scroll (CSS `backdrop-filter`, sticky element only) | Logo, nav (Safety Nets · Invisible Grills · Cloth Hangers · Projects · Areas · Contact), phone link | "WhatsApp us" (green) |
| 2 | Hero | Asymmetric split 7/5 | H1 "Pigeon nets and invisible grills for Hyderabad homes"; sub (<= 20 words) "Balcony safety nets, invisible grills and cloth hangers, installed by our own team across Hyderabad. Free installation."; real photo PG1 (child behind balcony net), cropped, `fetchpriority="high"` | Primary gold "Get a free quote" (opens WhatsApp with service picker message) · secondary "Call 63057 21219" |
| 3 | Trust strip | Full-width row of 4 facts with Phosphor icons | "10+ years in Hyderabad" · "Free installation" · "Own installation team" [D7] · "Google rating x.x" [renders only when `site.rating` set] | none |
| 4 | Need selector | Bento, 3 cells (1 large + 2 stacked), real photos as backgrounds | "Keep kids and pets safe" → balcony/children/invisible grills · "Stop pigeons and birds" → pigeon/anti-bird/duct/bird spikes · "Dry clothes in less space" → cloth hangers | Each cell links to hub |
| 5 | All services | Grouped list: 4 category columns, each service = small image + name + one line | Every service from B3 (no service dropped) | Text links |
| 6 | Real projects | Masonry, 6 latest from `projects` collection | Photo + "Pigeon net, 3BHK balcony, Kukatpally" caption below image | "See all projects" |
| 7 | Before / after | Single wide slider (native `<input type="range">` + CSS clip-path) | Pair supplied by client [D5] | none |
| 8 | How it works | Horizontal 3-step row with verbs, no "Step 1" labels | "Send photos on WhatsApp" · "Get a clear quote" · "We install, you inspect" | "Get a free quote" (one label per intent across the page) |
| 9 | Price guide teaser | Split text + table of price factors | What changes the price: area (sq ft), net type, floor height/access, grill wire spacing. Price ranges render only when client confirms [D4] | "Get a free quote" |
| 10 | Reviews | Masonry wall of 3-6 real Google reviews (verbatim, name + area + date) linked to GBP | Hidden until `reviews` data supplied [D8] | "Read all reviews on Google" |
| 11 | Areas served | Chip cloud, 20 areas, chips link to `/areas/<area>/` when page exists, plain text otherwise | From schema list (A9) | none |
| 12 | FAQ | Two-column visible Q/A list (not collapsed: better for AEO) | 6 questions, answer-first | none |
| 13 | Final CTA band | Full-width navy band | "Send us a photo of your balcony. We reply with a quote." | Gold "Get a free quote" + phone |
| 14 | Footer | 3 columns | NAP, service links by category, areas, legal, `© 2026` | |
| + | Mobile action bar | Fixed bottom, 2 buttons, visible on all pages < 768px | Call · WhatsApp | |

Eyebrow labels: max 1 per 3 sections (hero none, section 6 "Recent work", section 12 none).

## B5. Service page template (AEO structure)

Order for every service page:

1. Breadcrumbs (Home › Safety Nets › Pigeon Safety Nets) + BreadcrumbList schema.
2. **H1** "Pigeon Safety Nets in Hyderabad".
3. **Answer box** (40-60 words, first paragraph, the snippet/AI-citation target): what it is, who it's for, that Steven Invisible Grills installs it across Hyderabad, how to get a quote.
4. CTAs: "Get a free quote" (WhatsApp, prefilled with this service + page URL) · Call.
5. Hero image (real photo first, stock last) with descriptive alt.
6. **Key facts** table: Used for · Where · Material [only if confirmed] · Installation [free, V] · Typical time [D4] · Price basis [D4].
7. **Problems it solves** (from original copy, expanded): bullet list.
8. **Original description** (A5 copy, rewritten for clarity, meaning preserved).
9. **Project photos** from `projects` filtered by this service (auto).
10. **How we install** (service-specific steps).
11. **Price factors** (+ ranges when confirmed).
12. **FAQs** (4-8, answer-first, FAQPage schema).
13. **Areas we serve** for this service (links to published combo pages, else area hub).
14. **Related services** (2-4, from frontmatter `related`).
15. Final CTA band.

Hub pages: H1, answer box, service cards for the category, "Also available" list (body-text-only services), category FAQs, projects, CTA.

Area page: H1 "Safety nets and invisible grills in Kukatpally", local intro (client-supplied local notes: apartment communities served, typical building types), projects in that area, services list, map-free (no fake address), FAQs specific to area, CTA.

## B6. Location page publish rule (anti-doorway)

A `/<service>-<area>/` page is built only if:
- the area file has non-empty `localNotes` (>= 60 words, written from real experience), AND
- there are >= 2 projects in `projects` with that `area` and that `service`.

Area hub `/areas/<area>/` is built only if the area has >= 1 project. Otherwise the area appears as plain text in chips. Implemented in `src/lib/publish.ts` (Task 4) and enforced by unit test.

## B7. Lead flow

1. Every CTA opens WhatsApp with a context message, e.g. `Hi Steven Invisible Grills, I need a quote for Pigeon Safety Nets in Kukatpally. (from /pigeon-safety-nets/)`. Owner sees service, area and source page in the first message.
2. Quote form on `/contact/` and in the final CTA band: fields Name, Area (select from 20 areas + Other), Service (select), Message (optional). Submitting builds the WhatsApp message and opens it. No backend, no data stored, no spam. Native HTML validation, labels above inputs.
3. GA4 events: `lead_whatsapp` (params: `service`, `area`, `page`), `lead_call`, `lead_form`. Mark all three as key events in GA4.
4. Click-to-call `tel:+916305721219` everywhere; phone is text, not an image.

## B8. Structured data (entity SEO)

One `@graph` per page, stable `@id`s:

- `#business` `HomeAndConstructionBusiness` (subtype of LocalBusiness): name "Steven Invisible Grills", `alternateName` ["MRR Safety Nets", "MRR Invisible Grills", "MRR Invisible Grills & Pigeon Nets"], url, logo, image, telephone, email, `areaServed` as `Place` items (20 areas) + `City` Hyderabad, `address` only when confirmed (D2), `geo`, `openingHoursSpecification` (D3), `sameAs` [GBP URL, Justdial, IndiaMART, Facebook...] when available, `knowsAbout` (service names).
- `#website` `WebSite`.
- Per service page: `Service` (`serviceType`, `provider: {@id: #business}`, `areaServed`, `offers` only if price confirmed).
- `BreadcrumbList` on every non-home page.
- `FAQPage` on pages with FAQs (note: Google shows FAQ rich results only for authoritative gov/health sites since 2023; the markup is still useful for parsing and AI answers. Content must be visible on page).
- `ImageObject` for project photos (`contentLocation` = area).
- `Article` on guides (author = owner name, D9).
- No self-serving `AggregateRating` on LocalBusiness (not eligible for stars, risk of manual action).

## B9. AEO / GEO layer

- Answer-first paragraph at top of each page; question-shaped H2s ("How much do pigeon nets cost in Hyderabad?") with the direct answer in the first sentence below.
- Facts stated plainly and consistently (name, phone, areas, services, "free installation", years) so LLMs extract the same entity facts everywhere.
- `/llms.txt`: business summary, services with URLs, areas, contact, generated from content (Task 9).
- `robots.txt` allows Googlebot, Bingbot, GPTBot, OAI-SearchBot, ChatGPT-User, PerplexityBot, ClaudeBot, Google-Extended (visibility over opt-out; client may change, D10).
- Bing Webmaster Tools + IndexNow (Bing index feeds Copilot and ChatGPT search).
- Consistent citations off-site (Part C) because AI answers lean on directories and reviews to confirm local entities.

## B10. Content plan (guides, launch set)

Each guide: 800-1500 words, real photos, answer-first, links to 2+ service pages, Article schema, author byline.

1. How much does pigeon net installation cost in Hyderabad? (needs D4 figures)
2. Invisible grill vs pigeon net: which one is right for your balcony?
3. Are pigeon nets and invisible grills safe for children and pets?
4. How long do invisible grills last? Stainless steel grades explained (needs D11 material facts)
5. How to choose balcony safety nets for high-rise apartments
6. Duct area pigeon problem: how to close it without blocking ventilation
7. Pull and dry vs ceiling cloth hangers: which fits your balcony?
8. Does your society allow balcony nets and grills? What to ask your RWA

Cadence after launch: 1 project page per week (from every real install), 2 guides per month.

---

# PART C: OFF-SITE LOCAL SEO (NON-CODE, OWNER + MARKETER)

Ranking for "pigeon nets near me" depends mostly on the Google Business Profile (relevance, distance, prominence). No one can guarantee #1; this plan maximises the inputs Google states it uses.

| # | Task | Owner | When |
|---|---|---|---|
| C1 | Claim/verify Google Business Profile named **Steven Invisible Grills**: rename the existing MRR profile if one exists (keeps reviews), never create a duplicate with the same phone. Full step-by-step + paste-ready text: Part F below. Service-area business: hide address if no shopfront, list the 20 areas. | Client | Week 0 |
| C2 | Primary category: most specific available for netting/grill installation (check live options in GBP; e.g. candidates around "Window installation service", "Bird control service", "Fence contractor"; pick by testing which competitors ranking in Maps use). Add secondary categories for grills and cloth hangers. | Marketer | Week 0 |
| C3 | Add every service from B3 as a GBP Service with description; add products with photos. | Marketer | Week 1 |
| C4 | Upload 30+ real photos and 3+ short videos (installations, before/after) with descriptive filenames. Then 3 new photos per week. | Client | Ongoing |
| C5 | Review engine: after every job, send WhatsApp template with the GBP review short link (`site.reviewUrl`). Reply to every review within 48 h, mention service + area naturally. Never buy or gate reviews. | Client | Ongoing |
| C6 | GBP posts: 2 per week (project of the week, offer, tip). | Marketer | Ongoing |
| C7 | Citations with identical NAP: Bing Places, Apple Business Connect, Justdial, Sulekha, IndiaMART, Facebook page, Instagram, YouTube channel, local Hyderabad directories. Add each URL to `site.sameAs`. | Marketer | Weeks 1-4 |
| C8 | Local links: apartment association/RWA vendor lists, builder partnerships, local news/blog features, supplier pages. No paid link packages. | Marketer | Monthly |
| C9 | Track: GSC (queries, pages), GA4 key events, GBP Insights (calls, direction requests, website clicks), Bing Webmaster AI Performance (citations in AI answers). Monthly report. | Marketer | Monthly |

---

# PART D: DECISIONS AND CLIENT INPUTS (BLOCKING ITEMS MARKED *)

| ID | Question | Default if no answer |
|---|---|---|
| D1 | Official business name | **RESOLVED: Steven Invisible Grills.** GBP name must be changed to match, and Google expects the name to match real-world signage/invoices, so the client should update the shop sign, vehicle, invoices and visiting cards too, or the rename may be rejected or the profile suspended |
| D2 | Full street address + PIN? Shopfront or service-area only? | Service-area business, no address in schema |
| D3 | Working hours | Hide hours |
| D4 | Price ranges (per sq ft) for nets, grills, hangers; typical install time | Show price factors only, no numbers |
| D5* | 30+ real installation photos with area + service for each; 2+ before/after pairs; short videos | Launch with 7 existing real photos + service images |
| D6* | New logo for Steven Invisible Grills (the current logo says "MRR", so it can't be used) | Interim: typeset wordmark "Steven Invisible Grills" in Plus Jakarta Sans Bold (navy + gold), exported as SVG; commission a designer logo before or soon after launch |
| D7 | Own team or subcontractors? (About page says "nationwide network of local installers") | Remove "nationwide" claim |
| D8 | Real Google reviews to show; are Ananya/Rohit/Meera real customers? | Hide testimonials until real ones supplied |
| D9 | Owner name + photo + short story (E-E-A-T, guide author) | Author = business name |
| D10 | Allow AI crawlers? | Allow |
| D11 | Materials: net type (HDPE/nylon), mesh size, UV treatment; grill SS grade (304/316), wire thickness; warranty | Omit material specifics |
| D12 | Are counters 32 team / 3000 projects true? | Hide counters |
| D13 | Merge dealers/manufacturer/price/fixing-charges pages as in B3? | Merge (recommended) |
| D15* | Domain: keep `mrrinvisiblegrillspigeonnets.in` (has Search Console history, but doesn't match the new brand) or register a matching domain (e.g. `steveninvisiblegrills.in` / `.com`, availability to check)? | Recommended: register the matching domain, launch on it, and 301 every old-domain URL (both `.php` and new paths) to it page by page, then use GSC Change of Address. If the client won't buy a domain, launch on the old domain and keep the plan unchanged |
| D14 | Hosting: move to Cloudflare Pages (recommended) or stay on Hostinger | Cloudflare Pages; Hostinger fallback = upload `dist/` + `.htaccess` redirects |

---

# PART E: IMPLEMENTATION TASKS

## File structure

```
mrr-website/
├─ astro.config.mjs
├─ package.json
├─ tsconfig.json
├─ lighthouserc.json
├─ scripts/
│  ├─ check-build.mjs            post-build SEO/perf audit (fails CI)
│  └─ import-assets.mjs          copies + renames original images with SEO names
├─ public/
│  ├─ favicon.svg
│  └─ og-default.jpg             1200x630
├─ src/
│  ├─ config/site.ts             NAP, areas, nav, flags: single source of truth
│  ├─ content.config.ts          collection schemas
│  ├─ content/
│  │  ├─ services/*.md           one per service + hubs
│  │  ├─ areas/*.md              20 areas
│  │  ├─ projects/*.md           real jobs
│  │  └─ guides/*.md
│  ├─ assets/images/...          source images (optimised at build)
│  ├─ lib/
│  │  ├─ whatsapp.ts             link + message builders
│  │  ├─ schema.ts               JSON-LD builders
│  │  ├─ seo.ts                  title/description helpers
│  │  ├─ publish.ts              area/combo publish rules
│  │  └─ *.test.ts
│  ├─ styles/global.css
│  ├─ layouts/Base.astro
│  ├─ components/
│  │  ├─ Seo.astro  SchemaGraph.astro  Header.astro  MobileActionBar.astro  Footer.astro
│  │  ├─ Hero.astro  TrustStrip.astro  NeedSelector.astro  ServiceDirectory.astro
│  │  ├─ ServiceCard.astro  ProjectGrid.astro  BeforeAfter.astro  HowItWorks.astro
│  │  ├─ PriceFactors.astro  Reviews.astro  AreaChips.astro  FaqList.astro
│  │  ├─ QuoteForm.astro  CtaBand.astro  Breadcrumbs.astro  Button.astro  KeyFacts.astro
│  └─ pages/
│     ├─ index.astro  about.astro  contact.astro  faq.astro  privacy-policy.astro  404.astro
│     ├─ [slug].astro            services, hubs and service-area combos
│     ├─ areas/index.astro  areas/[area].astro
│     ├─ projects/index.astro  projects/[slug].astro
│     ├─ guides/index.astro  guides/[slug].astro
│     ├─ robots.txt.ts  llms.txt.ts  _redirects.ts
```

---

### Task 1: Scaffold project, tooling, deploy pipeline

**Files:** Create `mrr-website/` (all root config files), `src/styles/global.css`, `src/pages/index.astro` (placeholder).

**Interfaces:** Produces: working `npm run dev`, `npm run build`, `npm test`, `npm run check` scripts used by every later task.

- [ ] **Step 1: Create project**

```bash
npm create astro@latest mrr-website -- --template minimal --typescript strict --no-install --no-git
cd mrr-website
npm i astro@^5 @astrojs/sitemap @tailwindcss/vite tailwindcss@^4 @fontsource-variable/plus-jakarta-sans astro-icon @iconify-json/ph sharp
npm i -D vitest node-html-parser @lhci/cli
git init && git checkout -b main
```

- [ ] **Step 2: `astro.config.mjs`**

```js
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';

export default defineConfig({
  site: 'https://www.mrrinvisiblegrillspigeonnets.in',
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'always' },
  prefetch: { prefetchAll: false, defaultStrategy: 'hover' },
  image: { responsiveStyles: true },
  integrations: [
    icon(),
    sitemap({ filter: (p) => !p.endsWith('/404/') && !p.includes('/privacy-policy/') }),
  ],
  vite: { plugins: [tailwindcss()] },
});
```

- [ ] **Step 3: `package.json` scripts**

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build && node scripts/check-build.mjs",
    "preview": "astro preview",
    "test": "vitest run",
    "check": "astro check && vitest run",
    "lhci": "lhci autorun"
  }
}
```

- [ ] **Step 4: Copy `global.css` from B2 verbatim** into `src/styles/global.css` and add `@import "@fontsource-variable/plus-jakarta-sans";` at top.

- [ ] **Step 5: Placeholder `src/pages/index.astro`** with `<h1>Steven Invisible Grills</h1>` importing the CSS. Run `npm run dev`, open http://localhost:4321, expect heading in Plus Jakarta Sans.

- [ ] **Step 6: Cloudflare Pages**: connect the git repo, build command `npm run build`, output `dist`, env `NODE_VERSION=20`. Use a `*.pages.dev` preview URL until launch (do not point the domain yet). Add `<meta name="robots" content="noindex">` gating via env `PUBLIC_INDEXABLE` (set `true` only in production) inside `Seo.astro` (Task 6).

- [ ] **Step 7: Commit** `git add -A && git commit -m "chore: scaffold astro + tailwind v4 site"`

---

### Task 2: Site config (single source of truth)

**Files:** Create `src/config/site.ts`, `src/config/site.test.ts`.

**Interfaces:** Produces `site` object and `Area` type consumed by every component and lib.

- [ ] **Step 1: Failing test** `src/config/site.test.ts`

```ts
import { describe, it, expect } from 'vitest';
import { site } from './site';

describe('site config', () => {
  it('has consistent phone formats', () => {
    expect(site.phoneE164).toBe('+916305721219');
    expect(site.whatsapp).toBe(site.phoneE164.slice(1));
    expect(site.phoneDisplay.replace(/\D/g, '')).toBe(site.whatsapp);
  });
  it('never uses the wrong legacy schema name', () => {
    expect(JSON.stringify(site)).not.toMatch(/durga/i);
  });
  it('lists 20 unique areas with slugs', () => {
    expect(site.areas).toHaveLength(20);
    expect(new Set(site.areas.map((a) => a.slug)).size).toBe(20);
  });
});
```

- [ ] **Step 2: Run** `npx vitest run src/config` → FAIL (module missing).

- [ ] **Step 3: Implement `src/config/site.ts`**

```ts
export type Area = { name: string; slug: string };

const areaNames = [
  'Secunderabad', 'Gachibowli', 'Kondapur', 'Madhapur', 'Hitech City', 'Banjara Hills',
  'Jubilee Hills', 'Kukatpally', 'Miyapur', 'Ameerpet', 'Begumpet', 'Dilsukhnagar',
  'LB Nagar', 'Uppal', 'Tarnaka', 'Kompally', 'Attapur', 'Manikonda', 'Nallagandla', 'Hyderabad',
];
const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export const site = {
  name: 'Steven Invisible Grills', // D1 resolved: must equal GBP name
  alternateNames: ['MRR Safety Nets', 'MRR Invisible Grills', 'MRR Invisible Grills & Pigeon Nets'],
  tagline: 'Premium safety solutions',
  url: 'https://www.mrrinvisiblegrillspigeonnets.in', // D15: switch to the new brand domain if registered
  phoneE164: '+916305721219',
  phoneDisplay: '+91 63057 21219',
  whatsapp: '916305721219',
  email: 'mrrsafetynets@gmail.com',
  city: 'Hyderabad',
  region: 'Telangana',
  country: 'IN',
  address: null as null | { street: string; postalCode: string }, // D2
  geo: null as null | { lat: number; lng: number },               // D2
  hours: null as null | { days: string[]; opens: string; closes: string }[], // D3
  yearsClaim: '10+ years',          // [V] on live site
  freeInstallation: true,           // [V] on live site
  rating: null as null | { value: number; count: number },        // D8, display only, never in schema
  gbpUrl: null as null | string,
  reviewUrl: null as null | string,
  sameAs: [] as string[],           // C7 citations
  areas: areaNames.map((name) => ({ name, slug: slugify(name) })) satisfies Area[],
  nav: [
    { label: 'Safety Nets', href: '/safety-nets/' },
    { label: 'Invisible Grills', href: '/invisible-grills/' },
    { label: 'Cloth Hangers', href: '/cloth-hangers/' },
    { label: 'Projects', href: '/projects/' },
    { label: 'Areas', href: '/areas/' },
    { label: 'Contact', href: '/contact/' },
  ],
} as const;
```

- [ ] **Step 4: Run** `npx vitest run src/config` → PASS.
- [ ] **Step 5: Commit** `git commit -am "feat: single-source site config"`

---

### Task 3: WhatsApp + call link builders

**Files:** Create `src/lib/whatsapp.ts`, `src/lib/whatsapp.test.ts`.

**Interfaces:** Consumes `site`. Produces `waLink(text: string): string`, `quoteMessage(o: { service?: string; area?: string; path?: string }): string`, `telLink(): string`.

- [ ] **Step 1: Failing test**

```ts
import { describe, it, expect } from 'vitest';
import { waLink, quoteMessage, telLink } from './whatsapp';

describe('whatsapp', () => {
  it('round-trips special characters and Telugu', () => {
    const msg = 'Need 2 nets & 1 grill? కుకట్‌పల్లి';
    const url = new URL(waLink(msg));
    expect(url.origin + url.pathname).toBe('https://wa.me/916305721219');
    expect(url.searchParams.get('text')).toBe(msg);
  });
  it('builds context message', () => {
    expect(quoteMessage({ service: 'Pigeon Safety Nets', area: 'Kukatpally', path: '/pigeon-safety-nets/' }))
      .toBe('Hi Steven Invisible Grills, I need a quote for Pigeon Safety Nets in Kukatpally. (from /pigeon-safety-nets/)');
    expect(quoteMessage({})).toBe('Hi Steven Invisible Grills, I need a quote.');
  });
  it('tel link', () => expect(telLink()).toBe('tel:+916305721219'));
});
```

- [ ] **Step 2: Run** → FAIL.
- [ ] **Step 3: Implement**

```ts
import { site } from '../config/site';

export const waLink = (text: string) => `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
export const telLink = () => `tel:${site.phoneE164}`;

export function quoteMessage({ service, area, path }: { service?: string; area?: string; path?: string }) {
  let m = `Hi ${site.name}, I need a quote`;
  if (service) m += ` for ${service}`;
  if (area) m += ` in ${area}`;
  m += '.';
  if (path) m += ` (from ${path})`;
  return m;
}
```

- [ ] **Step 4: Run** → PASS. **Step 5: Commit** `feat: whatsapp lead links`

---

### Task 4: Content collections + publish rules

**Files:** Create `src/content.config.ts`, `src/lib/publish.ts`, `src/lib/publish.test.ts`.

**Interfaces:** Produces collections `services`, `areas`, `projects`, `guides`; `publishableAreas(areas, projects): string[]` and `publishableCombos(areas, projects): {service: string; area: string}[]` (plain-data signatures so they are unit-testable).

- [ ] **Step 1: `src/content.config.ts`**

```ts
import { defineCollection, reference, z } from 'astro:content';
import { glob } from 'astro/loaders';

const faq = z.object({ q: z.string(), a: z.string().min(40) });

const services = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/services' }),
  schema: ({ image }) => z.object({
    kind: z.enum(['hub', 'service']),
    category: z.enum(['safety-nets', 'sports-nets', 'invisible-grills', 'cloth-hangers']),
    title: z.string(),                         // H1, e.g. "Pigeon Safety Nets in Hyderabad"
    name: z.string(),                          // short name, e.g. "Pigeon Safety Nets"
    seoTitle: z.string().max(60),
    description: z.string().min(70).max(160),
    answer: z.string().min(150).max(420),      // 40-60 word answer box
    hero: image(),
    heroAlt: z.string().min(15),
    uses: z.array(z.string()).min(1),
    problems: z.array(z.string()).min(1),
    installSteps: z.array(z.string()).default([]),
    priceFactors: z.array(z.string()).default([]),
    priceRange: z.string().nullable().default(null),   // D4, null hides
    material: z.string().nullable().default(null),     // D11, null hides
    alsoAvailable: z.array(z.string()).default([]),    // hubs only
    faqs: z.array(faq).default([]),
    related: z.array(reference('services')).default([]),
    legacyUrls: z.array(z.string().regex(/^\/.*\.php$/)).default([]),
    order: z.number(),
  }),
});

const areas = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/areas' }),
  schema: z.object({
    name: z.string(),
    localNotes: z.string().default(''),       // real experience, >= 60 words to publish combos
    landmarks: z.array(z.string()).default([]),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/projects' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    date: z.coerce.date(),
    area: reference('areas'),
    services: z.array(reference('services')).min(1),
    photos: z.array(z.object({ src: image(), alt: z.string().min(15) })).min(1),
    before: image().optional(),
    after: image().optional(),
  }),
});

const guides = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/guides' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    seoTitle: z.string().max(60),
    description: z.string().min(70).max(160),
    answer: z.string().min(150).max(420),
    hero: image(),
    heroAlt: z.string(),
    published: z.coerce.date(),
    updated: z.coerce.date().optional(),
    services: z.array(reference('services')).min(1),
  }),
});

export const collections = { services, areas, projects, guides };
```

- [ ] **Step 2: Failing test `src/lib/publish.test.ts`**

```ts
import { describe, it, expect } from 'vitest';
import { publishableAreas, publishableCombos } from './publish';

const notes = 'word '.repeat(60);
const areas = [{ id: 'kukatpally', localNotes: notes }, { id: 'miyapur', localNotes: '' }];
const p = (area: string, services: string[]) => ({ area, services });

describe('publish rules', () => {
  it('area page needs at least one project', () => {
    expect(publishableAreas(areas, [p('kukatpally', ['pigeon-safety-nets'])])).toEqual(['kukatpally']);
    expect(publishableAreas(areas, [])).toEqual([]);
  });
  it('combo needs >= 2 matching projects and local notes', () => {
    const projects = [p('kukatpally', ['pigeon-safety-nets']), p('kukatpally', ['pigeon-safety-nets', 'anti-bird-nets']),
                      p('miyapur', ['pigeon-safety-nets']), p('miyapur', ['pigeon-safety-nets'])];
    expect(publishableCombos(areas, projects)).toEqual([{ service: 'pigeon-safety-nets', area: 'kukatpally' }]);
  });
  it('returns nothing for an area with one project', () => {
    expect(publishableCombos(areas, [p('kukatpally', ['pigeon-safety-nets'])])).toEqual([]);
  });
});
```

- [ ] **Step 3: Run** → FAIL. **Step 4: Implement `src/lib/publish.ts`**

```ts
type A = { id: string; localNotes: string };
type P = { area: string; services: string[] };

export const publishableAreas = (areas: A[], projects: P[]) =>
  areas.filter((a) => projects.some((p) => p.area === a.id)).map((a) => a.id);

export function publishableCombos(areas: A[], projects: P[]) {
  const out: { service: string; area: string }[] = [];
  for (const a of areas) {
    if (a.localNotes.trim().split(/\s+/).length < 60) continue;
    const counts = new Map<string, number>();
    for (const p of projects) if (p.area === a.id) for (const s of p.services) counts.set(s, (counts.get(s) ?? 0) + 1);
    for (const [service, n] of counts) if (n >= 2) out.push({ service, area: a.id });
  }
  return out;
}
```

Callers map Astro entries to plain data: `areas.map(e => ({ id: e.id, localNotes: e.data.localNotes }))`, `projects.map(e => ({ area: e.data.area.id, services: e.data.services.map(s => s.id) }))`.

- [ ] **Step 5: Run** → PASS. **Step 6: Commit** `feat: content collections and anti-doorway publish rules`

---

### Task 5: JSON-LD builders

**Files:** Create `src/lib/schema.ts`, `src/lib/schema.test.ts`.

**Interfaces:** Produces `businessNode()`, `websiteNode()`, `serviceNode(s: {name; description; path})`, `breadcrumbNode(items: {name; path}[])`, `faqNode(faqs: {q; a}[], path)`, `articleNode(g: {title; description; path; published: Date; updated?: Date; image: string})`, `graph(...nodes): string`.

- [ ] **Step 1: Failing test**

```ts
import { describe, it, expect } from 'vitest';
import { graph, businessNode, serviceNode, breadcrumbNode, faqNode } from './schema';
import { site } from '../config/site';

describe('schema', () => {
  const json = JSON.parse(graph(businessNode(), serviceNode({ name: 'Pigeon Safety Nets', description: 'x'.repeat(80), path: '/pigeon-safety-nets/' }),
    breadcrumbNode([{ name: 'Home', path: '/' }, { name: 'Pigeon Safety Nets', path: '/pigeon-safety-nets/' }]),
    faqNode([{ q: 'Q?', a: 'A'.repeat(50) }], '/pigeon-safety-nets/')));

  it('is a valid graph with business name from config', () => {
    expect(json['@context']).toBe('https://schema.org');
    const biz = json['@graph'].find((n: any) => n['@id'] === `${site.url}/#business`);
    expect(biz.name).toBe(site.name);
    expect(biz['@type']).toBe('HomeAndConstructionBusiness');
    expect(biz.areaServed.length).toBe(site.areas.length);
  });
  it('omits address when not confirmed', () => {
    const biz = json['@graph'][0];
    expect(site.address === null ? biz.address : biz.address).toEqual(site.address === null ? undefined : expect.anything());
  });
  it('service references business by @id', () => {
    const svc = json['@graph'].find((n: any) => n['@type'] === 'Service');
    expect(svc.provider['@id']).toBe(`${site.url}/#business`);
  });
  it('breadcrumb positions are 1-based absolute urls', () => {
    const bc = json['@graph'].find((n: any) => n['@type'] === 'BreadcrumbList');
    expect(bc.itemListElement[1]).toMatchObject({ position: 2, item: `${site.url}/pigeon-safety-nets/` });
  });
});
```

- [ ] **Step 2: Run** → FAIL. **Step 3: Implement `src/lib/schema.ts`**

```ts
import { site } from '../config/site';

const abs = (p: string) => new URL(p, site.url).href;
const BIZ = `${site.url}/#business`;

export function businessNode() {
  const n: Record<string, unknown> = {
    '@type': 'HomeAndConstructionBusiness',
    '@id': BIZ,
    name: site.name,
    alternateName: site.alternateNames,
    slogan: site.tagline,
    url: abs('/'),
    logo: abs('/logo.png'),
    image: abs('/og-default.jpg'),
    telephone: site.phoneE164,
    email: site.email,
    priceRange: '₹₹',
    areaServed: site.areas.map((a) => ({ '@type': 'Place', name: `${a.name}, ${site.city}` })),
  };
  if (site.address) n.address = { '@type': 'PostalAddress', streetAddress: site.address.street, postalCode: site.address.postalCode,
    addressLocality: site.city, addressRegion: site.region, addressCountry: site.country };
  if (site.geo) n.geo = { '@type': 'GeoCoordinates', latitude: site.geo.lat, longitude: site.geo.lng };
  if (site.hours) n.openingHoursSpecification = site.hours.map((h) => ({ '@type': 'OpeningHoursSpecification', dayOfWeek: h.days, opens: h.opens, closes: h.closes }));
  if (site.sameAs.length) n.sameAs = site.sameAs;
  return n;
}

export const websiteNode = () => ({ '@type': 'WebSite', '@id': `${site.url}/#website`, url: abs('/'), name: site.name, publisher: { '@id': BIZ } });

export const serviceNode = (s: { name: string; description: string; path: string }) => ({
  '@type': 'Service', '@id': `${abs(s.path)}#service`, name: s.name, serviceType: s.name, description: s.description,
  url: abs(s.path), provider: { '@id': BIZ }, areaServed: { '@type': 'City', name: site.city },
});

export const breadcrumbNode = (items: { name: string; path: string }[]) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: abs(it.path) })),
});

export const faqNode = (faqs: { q: string; a: string }[], path: string) => ({
  '@type': 'FAQPage', '@id': `${abs(path)}#faq`,
  mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
});

export const articleNode = (g: { title: string; description: string; path: string; published: Date; updated?: Date; image: string }) => ({
  '@type': 'Article', headline: g.title, description: g.description, url: abs(g.path), image: abs(g.image),
  datePublished: g.published.toISOString(), dateModified: (g.updated ?? g.published).toISOString(),
  author: { '@id': BIZ }, publisher: { '@id': BIZ },
});

export const graph = (...nodes: object[]) =>
  JSON.stringify({ '@context': 'https://schema.org', '@graph': nodes }).replace(/</g, '\\u003c');
```

- [ ] **Step 4: Run** → PASS. **Step 5: Commit** `feat: json-ld graph builders`

---

### Task 6: Base layout, SEO head, header, footer, mobile action bar

**Files:** Create `src/lib/seo.ts` (+ test), `src/layouts/Base.astro`, `src/components/{Seo,SchemaGraph,Header,Footer,MobileActionBar,Button}.astro`, `public/favicon.svg`, `public/logo.png` (optimised logo).

**Interfaces:** Consumes `site`, `graph`, `waLink`, `quoteMessage`, `telLink`. Produces `<Base title description path image? schema={object[]} noindex?>` used by all pages; `<Button href variant="accent|wa|ghost" icon?>`.

- [ ] **Step 1: Failing test `src/lib/seo.test.ts`**

```ts
import { describe, it, expect } from 'vitest';
import { pageTitle } from './seo';
describe('pageTitle', () => {
  it('appends brand when it fits in 60 chars', () => expect(pageTitle('Pigeon Safety Nets in Hyderabad')).toBe('Pigeon Safety Nets in Hyderabad | Steven Invisible Grills'));
  it('keeps raw title when too long', () => {
    const t = 'Invisible Grills for Balconies in Hyderabad, Price and Install';
    expect(pageTitle(t)).toBe(t);
  });
});
```

- [ ] **Step 2: Implement `src/lib/seo.ts`**

```ts
import { site } from '../config/site';
export const pageTitle = (t: string) => (`${t} | ${site.name}`.length <= 60 ? `${t} | ${site.name}` : t);
```

Run → PASS.

- [ ] **Step 3: `src/components/Seo.astro`**

```astro
---
import { site } from '../config/site';
import { pageTitle } from '../lib/seo';
interface Props { title: string; description: string; path: string; image?: string; noindex?: boolean }
const { title, description, path, image = '/og-default.jpg', noindex = false } = Astro.props;
const canonical = new URL(path, site.url).href;
const ogImage = new URL(image, site.url).href;
const indexable = import.meta.env.PUBLIC_INDEXABLE === 'true' && !noindex;
const full = pageTitle(title);
---
<title>{full}</title>
<meta name="description" content={description} />
<link rel="canonical" href={canonical} />
<meta name="robots" content={indexable ? 'index, follow, max-image-preview:large, max-snippet:-1' : 'noindex, nofollow'} />
<meta property="og:type" content="website" />
<meta property="og:site_name" content={site.name} />
<meta property="og:locale" content="en_IN" />
<meta property="og:title" content={full} />
<meta property="og:description" content={description} />
<meta property="og:url" content={canonical} />
<meta property="og:image" content={ogImage} />
<meta name="twitter:card" content="summary_large_image" />
<meta name="geo.region" content="IN-TG" />
<meta name="geo.placename" content="Hyderabad" />
```

- [ ] **Step 4: `src/layouts/Base.astro`**

```astro
---
import '../styles/global.css';
import fontUrl from '@fontsource-variable/plus-jakarta-sans/files/plus-jakarta-sans-latin-wght-normal.woff2?url';
import Seo from '../components/Seo.astro';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
import MobileActionBar from '../components/MobileActionBar.astro';
import { graph, businessNode, websiteNode } from '../lib/schema';
interface Props { title: string; description: string; path: string; image?: string; schema?: object[]; noindex?: boolean; service?: string; area?: string }
const { schema = [], service, area, ...seo } = Astro.props;
const GA = import.meta.env.PUBLIC_GA_ID;
---
<!doctype html>
<html lang="en-IN">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="preload" href={fontUrl} as="font" type="font/woff2" crossorigin />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <meta name="theme-color" content="#13285e" />
  <Seo {...seo} />
  <script type="application/ld+json" set:html={graph(businessNode(), websiteNode(), ...schema)} />
  {GA && <script is:inline define:vars={{ GA }}>
    window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)};window.gtag=gtag;
    gtag('js',new Date());gtag('config',GA);
    const load=()=>{const s=document.createElement('script');s.src='https://www.googletagmanager.com/gtag/js?id='+GA;s.async=true;document.head.append(s)};
    addEventListener('load',()=>('requestIdleCallback' in window?requestIdleCallback(load):setTimeout(load,2000)));
  </script>}
</head>
<body class="min-h-[100dvh] antialiased">
  <a href="#main" class="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-full focus:bg-card focus:px-4 focus:py-2">Skip to content</a>
  <Header service={service} area={area} />
  <main id="main"><slot /></main>
  <Footer />
  <MobileActionBar service={service} area={area} />
  <script is:inline>
    // ponytail: one delegated listener tracks every lead link; add per-button params if GA4 reports need more
    document.addEventListener('click',e=>{const a=e.target.closest('a[href^="https://wa.me"],a[href^="tel:"]');if(!a||!window.gtag)return;
      gtag('event',a.href.startsWith('tel:')?'lead_call':'lead_whatsapp',{page:location.pathname,service:a.dataset.service||'',area:a.dataset.area||''});});
  </script>
</body>
</html>
```

- [ ] **Step 5: `Header.astro`** (sticky, 68px; desktop nav single line; mobile menu = native `<details>` element, zero JS, styled as full-screen sheet; contains all services grouped by category, phone, WhatsApp). Logo `<img src="/logo.png" width="178" height="40" alt="Steven Invisible Grills logo">` with `fetchpriority="high"`. Active nav item uses `aria-current="page"` from `Astro.url.pathname`. Header WhatsApp button: `<Button variant="wa" href={waLink(quoteMessage({ service, area, path: Astro.url.pathname }))} data-service={service} data-area={area}>WhatsApp us</Button>`.

- [ ] **Step 6: `MobileActionBar.astro`**: `fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 p-3 pb-[max(.75rem,env(safe-area-inset-bottom))] md:hidden bg-card/95 backdrop-blur border-t`, buttons "Call now" (`telLink()`) and "WhatsApp" (green). Add `pb-24 md:pb-0` to `<body>` content so the bar never hides the footer.

- [ ] **Step 7: `Footer.astro`**: navy background, NAP from `site` (phone, email, "Serving Hyderabad and Secunderabad"), service links grouped by category (query `getCollection('services')`), area links (published only), legal links, `© {new Date().getFullYear()} {site.name}`.

- [ ] **Step 8: `Button.astro`**: pill, 48px min height, variants: `accent` (gold bg, `text-accent-ink`), `wa` (green bg, white text, WhatsApp logo icon `ph:whatsapp-logo`), `ghost` (border brand, brand text). Trailing icon inside its own 32px circle. `active:scale-[0.98] transition-transform duration-300 ease-[var(--ease-out-quint)]`.

- [ ] **Step 9: Verify** `npm run dev`; check 390px and 1440px widths: nav one line at >= 1024px, mobile bar visible < 768px, keyboard Tab shows skip link and focus rings. Run `npm test` → PASS.
- [ ] **Step 10: Commit** `feat: base layout, seo head, header, footer, mobile action bar`

---

### Task 7: Asset import + image pipeline

**Files:** Create `scripts/import-assets.mjs`, `src/assets/images/**`.

**Interfaces:** Produces optimisable images at the paths referenced by content frontmatter in Task 8.

- [ ] **Step 1: Copy `research/original-assets/` into the repo** at `research/original-assets/` (keep originals out of `src/`).

- [ ] **Step 2: `scripts/import-assets.mjs`** renames originals to SEO filenames and strips metadata, normalising to max 2000px WebP sources (Astro then emits AVIF/WebP responsive variants at build):

```js
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

const SRC = 'research/original-assets/';
const OUT = 'src/assets/images/';
const map = {
  'about/PG1.jpg': 'projects/child-safe-balcony-safety-net-hyderabad.webp',
  'about/PG3.jpg': 'projects/balcony-safety-net-installation-hyderabad-1.webp',
  'about/H-12.jpg': 'projects/balcony-safety-net-apartment-hyderabad.webp',
  'about/H-13.jpg': 'projects/pigeon-net-balcony-installation-hyderabad-2.webp',
  'about/H-14.jpg': 'projects/pigeon-net-balcony-installation-hyderabad-3.webp',
  'about/H-15.jpg': 'projects/pigeon-net-balcony-installation-hyderabad-4.webp',
  'about/H-16.jpg': 'projects/pigeon-net-balcony-installation-hyderabad-5.webp',
  'services/balcony-safety-net.webp': 'services/balcony-safety-nets-hyderabad.webp',
  'services/pigeon-nets-balcony.jpg': 'services/pigeon-safety-nets-balcony-hyderabad.webp',
  'services/anti-bird-net.jpg': 'services/anti-bird-nets-hyderabad.webp',
  'services/duct-area-nets.jpg': 'services/duct-area-safety-nets-hyderabad.webp',
  'services/invisible-grille-for-staircase.jpg': 'services/staircase-safety-nets-hyderabad.webp',
  'services/construction-safety-nets.jpg': 'services/construction-safety-nets-hyderabad.webp',
  'services/monkey-nets.png': 'services/monkey-safety-nets-hyderabad.webp',
  'services/cricket-nets.jpg': 'services/cricket-practice-nets-hyderabad.webp',
  'services/all-sports-nets.jpg': 'services/all-sports-nets-hyderabad.webp',
  'services/invisible-grills.jpg': 'services/invisible-grills-hyderabad.webp',
  'services/invisible-grill-balcony.jpg': 'services/invisible-grills-for-balconies-hyderabad.webp',
  'services/invisible-grill-windows.jpg': 'services/invisible-grills-for-windows-hyderabad.webp',
  'services/stainless-grills.jpg': 'services/stainless-steel-invisible-grills-hyderabad.webp',
  'services/invisible-grill-balcony-price.jpg': 'services/invisible-grill-price-hyderabad.webp',
  'services/invisible-grill-fix-charges.jpg': 'services/invisible-grill-fixing-hyderabad.webp',
  'services/invisible-grill-manufracture.jpg': 'services/invisible-grill-wires-closeup.webp',
  'services/cloth-hanger-balcony.png': 'services/balcony-cloth-hangers-hyderabad.webp',
  'services/pull-and-dry-hanger.png': 'services/pull-and-dry-cloth-hangers-hyderabad.webp',
  'services/ceiling-hangers.jpg': 'services/ceiling-cloth-hangers-hyderabad.webp',
  'sliders/children-safety-net.jpg': 'services/children-safety-nets-hyderabad.webp',
  'sliders/pigeon-net-installation.jpg': 'services/pigeon-net-installation-hyderabad.webp',
  'sliders/balcony-safety-net.jpg': 'categories/safety-nets-category.webp',
  'sliders/invisible-grill.png': 'categories/invisible-grills-category.webp',
  'sliders/cloth-hangers.png': 'categories/cloth-hangers-category.webp',
  'sliders/cricket-practice-net.jpg': 'categories/sports-nets-category.webp',
  'products/birdspikes.jpg': 'services/bird-spikes-hyderabad.webp',
  'products/petsafetynet.jpg': 'services/pet-safety-nets-hyderabad.webp',
  'about-1.jpg': 'about/mrr-team-installation.webp',
};
for (const [from, to] of Object.entries(map)) {
  mkdirSync(dirname(OUT + to), { recursive: true });
  await sharp(SRC + from).rotate().resize({ width: 2000, withoutEnlargement: true }).webp({ quality: 86 }).toFile(OUT + to);
  console.log('ok', to);
}
// Old MRR logo is NOT used (brand changed). Place the new logo (D6) at public/logo.svg and public/logo.png (512px wide, for schema).
```

- [ ] **Step 3: Run** `node scripts/import-assets.mjs`; expect 35 "ok" lines.
- [ ] **Step 4: Manually crop** the "honor 9 Lite" watermark from `projects/*` photos (bottom-left) in any editor, re-save same filename. Visually check each image matches its new filename (fix mapping if a photo shows a different product; e.g. `staircase` source shows a grill).
- [ ] **Step 5: Create `public/og-default.jpg`** 1200x630: navy background, logo, one real installation photo, text "Safety nets and invisible grills, Hyderabad" (any image editor). Keep < 120 KB.
- [ ] **Step 6: Commit** `feat: import and rename image assets with seo filenames`

Rule for all components: render images with `<Picture src={img} formats={['avif','webp']} widths={[400,800,1200]} sizes="(min-width: 1024px) 50vw, 100vw" alt={alt} />`. Hero image only: `loading="eager" fetchpriority="high"`; all others lazy (Astro default).

---

### Task 8: Content migration (all services, hubs, areas)

**Files:** Create `src/content/services/*.md` (25 files: 4 hubs + 21 services), `src/content/areas/*.md` (20 files), `src/content/projects/2026-10-launch-*.md` (from the 7 real photos).

**Interfaces:** Must satisfy Task 4 schemas. Slugs (file names) must equal the URLs in B3.

- [ ] **Step 1: Write the pigeon page exactly as the reference template** `src/content/services/pigeon-safety-nets.md`:

```markdown
---
kind: service
category: safety-nets
order: 2
name: Pigeon Safety Nets
title: Pigeon Safety Nets in Hyderabad
seoTitle: Pigeon Safety Nets in Hyderabad, Free Installation
description: Pigeon safety nets for balconies, ducts and open areas across Hyderabad. Keeps birds out without blocking air or light. Free installation. WhatsApp for a quote.
answer: Pigeon safety nets are strong, weather-resistant nets fixed across balconies, ducts and open areas to stop pigeons and other birds from entering or nesting. Steven Invisible Grills installs them for apartments, offices and commercial buildings across Hyderabad and Secunderabad, with free installation. Send a photo of your balcony on WhatsApp to get a quote.
hero: ../../assets/images/services/pigeon-safety-nets-balcony-hyderabad.webp
heroAlt: Pigeon safety net fitted across an apartment balcony in Hyderabad
uses: [Apartment balconies, Utility and duct areas, Open terraces, Office and mall openings]
problems:
  - Pigeon droppings that make balconies unhygienic and hard to clean
  - Birds nesting in ducts, AC ledges and unused corners
  - Damage and repeated maintenance around windows and pipes
  - Keeping birds out without closing the space or blocking ventilation
installSteps:
  - Share photos and rough measurements on WhatsApp
  - Site measurement and quote
  - Fixing hooks and border wire around the opening
  - Net stretched, tied and checked for gaps
priceFactors: [Total area in square feet, Net type and mesh size, Floor height and access, Number of separate openings]
priceRange: null
material: null
faqs:
  - q: How much do pigeon nets cost in Hyderabad?
    a: The price depends mainly on the area in square feet, the net type and how easy the balcony is to access. Send a photo and approximate size on WhatsApp and we will share a quote. Installation is free.
  - q: Do pigeon nets block air or sunlight?
    a: No. Pigeon safety nets are made to keep birds out while letting air and sunlight through, so the balcony stays open and ventilated.
  - q: Can pigeon nets be fitted to duct areas?
    a: Yes. We cover ducts, shafts and open spaces between building blocks, which are common nesting spots for pigeons in apartments.
  - q: Are pigeon nets harmful to birds?
    a: No. The net is a humane barrier. It stops birds from entering but does not trap or injure them.
related: [anti-bird-nets, duct-area-safety-nets, bird-spikes, balcony-safety-nets]
legacyUrls: [/pigeon-safety-nets.php]
---

Pigeons can create serious hygiene and maintenance problems around homes, apartments and commercial spaces. A pigeon safety net is an effective, humane way to keep them away while keeping your balcony ventilated and good looking.

The nets are designed to stop pigeons and other birds from entering balconies, ducts and open areas. They form a strong, durable barrier without blocking air or sunlight. We install weather-resistant nets for residential, commercial and industrial buildings across Hyderabad and Telangana.
```

- [ ] **Step 2: Create the other 20 service files** with the same frontmatter keys. Body = the original copy from `research/pages/<old-slug>.txt` rewritten for clarity, meaning preserved, no new factual claims. Per-file specifics:

| File | name | category | legacyUrls | related |
|---|---|---|---|---|
| `balcony-safety-nets.md` | Balcony Safety Nets | safety-nets | `/balcony-safety-nets.php` | children-safety-nets, invisible-grills-for-balconies, pigeon-safety-nets |
| `anti-bird-nets.md` | Anti Bird Nets | safety-nets | `/anti-bird-nets.php` | pigeon-safety-nets, bird-spikes, duct-area-safety-nets. `material: High-strength nylon` [V] |
| `duct-area-safety-nets.md` | Duct Area Safety Nets | safety-nets | `/duct-area-safety-nets.php` | pigeon-safety-nets, anti-bird-nets |
| `staircase-safety-nets.md` | Staircase Safety Nets | safety-nets | `/staircase-safety-nets.php` | children-safety-nets, balcony-safety-nets |
| `construction-safety-nets.md` | Construction Safety Nets | safety-nets | `/construction-safety-nets.php` | balcony-safety-nets |
| `monkey-safety-nets.md` | Monkey Safety Nets | safety-nets | `/monkey-safety-nets.php` | balcony-safety-nets, anti-bird-nets |
| `children-safety-nets.md` | Children Safety Nets | safety-nets | (none) | balcony-safety-nets, invisible-grills-for-balconies, staircase-safety-nets |
| `pet-safety-nets.md` | Pet Safety Nets | safety-nets | (none) | balcony-safety-nets, invisible-grills-for-balconies |
| `bird-spikes.md` | Bird Spikes | safety-nets | (none) | pigeon-safety-nets, anti-bird-nets |
| `cricket-practice-nets.md` | Cricket Practice Nets | sports-nets | `/cricket-practice-nets.php` | all-sports-nets |
| `all-sports-nets.md` | All Sports Nets | sports-nets | `/all-sports-nets.php` | cricket-practice-nets |
| `invisible-grills-for-balconies.md` | Invisible Grills for Balconies | invisible-grills | `/invisible-grill-for-balconies.php` | stainless-steel-invisible-grills, balcony-safety-nets, invisible-grill-price |
| `invisible-grills-for-windows.md` | Invisible Grills for Windows | invisible-grills | `/invisible-grill-for-windows.php` | stainless-steel-invisible-grills, invisible-grill-price |
| `stainless-steel-invisible-grills.md` | Stainless Steel Invisible Grills | invisible-grills | `/stainless-steel-invisible-grill.php` | invisible-grills-for-balconies, invisible-grills-for-windows. `material: Stainless steel wire` [V] |
| `invisible-grill-price.md` | Invisible Grill Price | invisible-grills | `/invisible-grill-for-balcony-price.php`, `/invisible-grill-fixing-charges.php` | invisible-grills-for-balconies, invisible-grills-for-windows |
| `pull-and-dry-cloth-hangers.md` | Pull and Dry Cloth Hangers | cloth-hangers | `/pull-and-dry-cloth-hangers.php` | ceiling-cloth-hangers, balcony-cloth-hangers |
| `balcony-cloth-hangers.md` | Balcony Cloth Hangers | cloth-hangers | `/cloth-hangers-for-balcony.php` | pull-and-dry-cloth-hangers, ceiling-cloth-hangers |
| `ceiling-cloth-hangers.md` | Ceiling Cloth Hangers | cloth-hangers | `/ceilling-cloth-hangers.php` | pull-and-dry-cloth-hangers, balcony-cloth-hangers |

Children, Pet and Bird Spikes bodies: only facts present on the live site (homepage mentions) plus generic, non-factual explanation of use; flag to client for review before launch.

- [ ] **Step 3: Create 4 hubs** (`kind: hub`):

| File | legacyUrls | alsoAvailable |
|---|---|---|
| `safety-nets.md` | `/coconut-tree-safety-nets.php` | Industrial Safety Nets, Swimming Pool Safety Nets, Glass Safety Nets, Coconut Tree Safety Nets, Mosquito Nets, Bird Protection Nets, Agro Shade Nets, Garden Plant Support Nets |
| `sports-nets.md` | (none) | Sports Practice Nets |
| `invisible-grills.md` | `/invisible-grill.php`, `/invisible-grill-dealers.php`, `/invisible-grill-manufacturer.php` | (none) |
| `cloth-hangers.md` | `/cloth-hangers.php` | (none) |

Hub body for `invisible-grills.md` merges the original Invisible Grill, Dealers and Manufacturer copy (A5), keeping "trusted dealer" and manufacturer claims only if client confirms (D13).

- [ ] **Step 4: Create 20 area files** `src/content/areas/<slug>.md` with `name` and empty `localNotes` (filled by client over time; combos auto-publish once rule B6 passes).
- [ ] **Step 5: Create launch projects** from the 7 real photos, area `hyderabad` until client confirms the real locality:

```markdown
---
title: Child-safe balcony net for a high-rise apartment
date: 2026-10-01
area: hyderabad
services: [balcony-safety-nets, children-safety-nets]
photos:
  - src: ../../assets/images/projects/child-safe-balcony-safety-net-hyderabad.webp
    alt: Child looking out through a white balcony safety net at night in a Hyderabad apartment
---
Balcony safety net fitted on a high-rise apartment balcony so children can use the space safely. (Client to confirm locality, flat type and net details.)
```

- [ ] **Step 6: Run** `npx astro sync && npx astro check` → no schema errors (Zod lists any missing/too-long field; fix until clean).
- [ ] **Step 7: Commit** `feat: migrate all services, hubs, areas and launch projects`

---

### Task 9: SEO endpoints + post-build audit

**Files:** Create `src/pages/_redirects.ts`, `src/pages/robots.txt.ts`, `src/pages/llms.txt.ts`, `scripts/check-build.mjs`.

**Interfaces:** Consumes collections. Produces `dist/_redirects`, `dist/robots.txt`, `dist/llms.txt`; `check-build.mjs` exits 1 on any failure (wired into `npm run build` in Task 1).

- [ ] **Step 1: `src/pages/_redirects.ts`**

```ts
import { getCollection } from 'astro:content';
export async function GET() {
  const services = await getCollection('services');
  const lines = [
    '/index.php / 301',
    '/about.php /about/ 301',
    '/contact.php /contact/ 301',
    ...services.flatMap((s) => s.data.legacyUrls.map((u) => `${u} /${s.id}/ 301`)),
  ];
  return new Response(lines.join('\n') + '\n', { headers: { 'Content-Type': 'text/plain' } });
}
```

- [ ] **Step 2: `src/pages/robots.txt.ts`**

```ts
import { site } from '../config/site';
export const GET = () => new Response(
`User-agent: *
Allow: /

User-agent: GPTBot
Allow: /
User-agent: OAI-SearchBot
Allow: /
User-agent: PerplexityBot
Allow: /
User-agent: ClaudeBot
Allow: /
User-agent: Google-Extended
Allow: /

Sitemap: ${site.url}/sitemap-index.xml
`, { headers: { 'Content-Type': 'text/plain' } });
```

- [ ] **Step 3: `src/pages/llms.txt.ts`**

```ts
import { getCollection } from 'astro:content';
import { site } from '../config/site';
export async function GET() {
  const services = (await getCollection('services')).sort((a, b) => a.data.order - b.data.order);
  const body = `# ${site.name}

> ${site.name} installs balcony safety nets, pigeon nets, invisible grills and cloth hangers for homes and buildings in ${site.city}, ${site.region}, India. ${site.yearsClaim} of experience. Free installation.

- Phone / WhatsApp: ${site.phoneDisplay}
- Email: ${site.email}
- Areas served: ${site.areas.map((a) => a.name).join(', ')}

## Services
${services.map((s) => `- [${s.data.name}](${site.url}/${s.id}/): ${s.data.description}`).join('\n')}

## Key pages
- [Projects](${site.url}/projects/)
- [Areas served](${site.url}/areas/)
- [FAQ](${site.url}/faq/)
- [Contact](${site.url}/contact/)
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
```

- [ ] **Step 4: `scripts/check-build.mjs`**

```js
// Post-build audit. Fails the build on SEO/perf regressions.
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'node-html-parser';

const DIST = 'dist';
const walk = (d) => readdirSync(d).flatMap((f) => (statSync(join(d, f)).isDirectory() ? walk(join(d, f)) : [join(d, f)]));
const files = walk(DIST);
const errors = [];
const titles = new Map(), descs = new Map();

for (const f of files.filter((f) => f.endsWith('.html'))) {
  const page = f.slice(DIST.length).replace(/\\/g, '/').replace(/index\.html$/, '');
  const html = readFileSync(f, 'utf8');
  const doc = parse(html);
  const err = (m) => errors.push(`${page}: ${m}`);
  if (/durga/i.test(html)) err('contains "Durga"');
  if (/[–—]/.test(doc.querySelector('body')?.text ?? '')) err('visible em/en dash');
  if (page === '/404.html') continue;
  const h1 = doc.querySelectorAll('h1').length; if (h1 !== 1) err(`${h1} h1 tags`);
  const title = doc.querySelector('title')?.text ?? ''; if (!title || title.length > 60) err(`title length ${title.length}`);
  const desc = doc.querySelector('meta[name="description"]')?.getAttribute('content') ?? '';
  if (desc.length < 70 || desc.length > 160) err(`description length ${desc.length}`);
  if (titles.has(title)) err(`duplicate title with ${titles.get(title)}`); titles.set(title, page);
  if (descs.has(desc)) err(`duplicate description with ${descs.get(desc)}`); descs.set(desc, page);
  const canon = doc.querySelector('link[rel="canonical"]')?.getAttribute('href') ?? '';
  if (!canon.startsWith('https://www.mrrinvisiblegrillspigeonnets.in/') || !canon.endsWith('/')) err(`bad canonical ${canon}`);
  for (const s of doc.querySelectorAll('script[type="application/ld+json"]')) { try { JSON.parse(s.text); } catch { err('invalid JSON-LD'); } }
  for (const img of doc.querySelectorAll('img')) {
    if (!img.getAttribute('alt')?.trim()) err(`img without alt: ${img.getAttribute('src')}`);
    if (!img.getAttribute('width') || !img.getAttribute('height')) err(`img without dimensions: ${img.getAttribute('src')}`);
  }
  for (const a of doc.querySelectorAll('a[href^="/"]')) {
    const href = a.getAttribute('href').split('#')[0];
    if (href && !existsSync(join(DIST, href, href.endsWith('/') ? 'index.html' : '')) && !existsSync(join(DIST, href))) err(`broken link ${href}`);
  }
}
for (const line of readFileSync(join(DIST, '_redirects'), 'utf8').trim().split('\n')) {
  const [, to] = line.split(' ');
  if (!existsSync(join(DIST, to, 'index.html'))) errors.push(`_redirects target missing: ${line}`);
}
for (const f of files.filter((f) => /\.(avif|webp|jpe?g|png)$/.test(f))) {
  const kb = statSync(f).size / 1024; if (kb > 250) errors.push(`image too large ${f} ${kb | 0}KB`);
}
if (errors.length) { console.error(errors.join('\n')); console.error(`\n${errors.length} SEO check failures`); process.exit(1); }
console.log(`check-build: ${files.filter((f) => f.endsWith('.html')).length} pages OK`);
```

- [ ] **Step 5: Run** `npm run build` now (pages from Task 10 not yet built, so expect failures for missing redirect targets). Confirm the script reports them. It must pass after Task 10.
- [ ] **Step 6: Commit** `feat: redirects, robots, llms.txt and post-build seo audit`

---

### Task 10: Page templates and section components

**Files:** Create all `src/components/*` from the file structure, `src/pages/[slug].astro`, `index.astro`, `about.astro`, `contact.astro`, `faq.astro`, `privacy-policy.astro`, `404.astro`, `areas/*`, `projects/*`, `guides/*`.

**Interfaces:** Consumes everything above. Load `design-taste-frontend` + `high-end-visual-design` before starting; run their pre-flight checklists at the end.

- [ ] **Step 1: `src/pages/[slug].astro`** (services, hubs, combos in one route)

```astro
---
import { getCollection, getEntries, render } from 'astro:content';
import Base from '../layouts/Base.astro';
import ServicePage from '../components/ServicePage.astro';
import HubPage from '../components/HubPage.astro';
import ComboPage from '../components/ComboPage.astro';
import { publishableCombos } from '../lib/publish';
import { serviceNode, breadcrumbNode, faqNode } from '../lib/schema';

export async function getStaticPaths() {
  const services = await getCollection('services');
  const areas = await getCollection('areas');
  const projects = await getCollection('projects');
  const combos = publishableCombos(
    areas.map((a) => ({ id: a.id, localNotes: a.data.localNotes })),
    projects.map((p) => ({ area: p.data.area.id, services: p.data.services.map((s) => s.id) })),
  );
  return [
    ...services.map((s) => ({ params: { slug: s.id }, props: { type: s.data.kind, service: s } })),
    ...combos.map((c) => ({
      params: { slug: `${c.service}-${c.area}` },
      props: { type: 'combo', service: services.find((s) => s.id === c.service), area: areas.find((a) => a.id === c.area) },
    })),
  ];
}
const { type, service, area } = Astro.props;
const path = Astro.url.pathname;
const d = service.data;
const hubPath = `/${d.category}/`;
const crumbs = [{ name: 'Home', path: '/' }, ...(d.kind === 'service' ? [{ name: d.category.replace('-', ' '), path: hubPath }] : []), { name: area ? `${d.name} in ${area.data.name}` : d.name, path }];
const schema = [serviceNode({ name: d.name, description: d.description, path }), breadcrumbNode(crumbs), ...(d.faqs.length ? [faqNode(d.faqs, path)] : [])];
const { Content } = await render(service);
const related = await getEntries(d.related);
---
<Base title={area ? `${d.name} in ${area.data.name}, Hyderabad` : d.seoTitle} description={area ? `${d.name} in ${area.data.name}. Real installations by Steven Invisible Grills, free installation. WhatsApp for a quote.` : d.description}
      path={path} schema={schema} service={d.name} area={area?.data.name}>
  {type === 'hub' && <HubPage entry={service} crumbs={crumbs}><Content /></HubPage>}
  {type === 'service' && <ServicePage entry={service} related={related} crumbs={crumbs}><Content /></ServicePage>}
  {type === 'combo' && <ComboPage entry={service} area={area} related={related} crumbs={crumbs} />}
</Base>
```

- [ ] **Step 2: `ServicePage.astro`** renders B5 order exactly: `Breadcrumbs` → H1 `d.title` → answer box (`<p class="text-lg md:text-xl">`) → two Buttons (accent "Get a free quote" → `waLink(quoteMessage({service: d.name, path}))`; ghost "Call 63057 21219") → hero `<Picture>` eager → `KeyFacts` (rows hidden when null; "Installation: Free" when `site.freeInstallation`) → "What it solves" list → `<slot />` body → `ProjectGrid` filtered by service (hidden when empty) → "How we install" (`installSteps`) → `PriceFactors` → `FaqList` → `AreaChips` → related cards → `CtaBand`. Desktop: content column `lg:col-span-8` + sticky quote card `lg:col-span-4` (`QuoteForm` compact); mobile single column.

- [ ] **Step 3: `HubPage.astro`**: H1 + answer box + service cards for `category` (image, name, one line from `description`, link) in asymmetric grid (first card large) + "Also available" pill list with one WhatsApp link + projects + FAQs + CTA.

- [ ] **Step 4: `ComboPage.astro`**: H1 `${d.name} in ${area.data.name}`, intro from `area.data.localNotes`, projects filtered by area AND service, service summary (`d.answer`), FAQs, link back to main service page and area hub, CTA with area in WhatsApp message.

- [ ] **Step 5: Homepage `index.astro`**: compose B4 sections in order: `Hero`, `TrustStrip`, `NeedSelector`, `ServiceDirectory`, `ProjectGrid limit=6`, `BeforeAfter` (only if a project has `before` and `after`), `HowItWorks`, `PriceFactors` (generic), `Reviews` (only if data), `AreaChips`, `FaqList` (6 home FAQs), `CtaBand`. H1 text: "Pigeon nets and invisible grills for Hyderabad homes". Title: "Steven Invisible Grills: Pigeon Nets & Grills, Hyderabad". Description: "Balcony safety nets, pigeon nets, invisible grills and cloth hangers installed across Hyderabad. 10+ years, free installation. WhatsApp for a quote."

- [ ] **Step 6: `BeforeAfter.astro`** (one of the two allowed vanilla-JS islands):

```astro
---
import { Picture } from 'astro:assets';
const { before, after, alt } = Astro.props;
---
<figure class="relative overflow-hidden rounded-[var(--radius-card)] [--pos:50%]" data-ba>
  <Picture src={after} alt={`After: ${alt}`} widths={[600, 1200]} sizes="100vw" />
  <div class="absolute inset-0" style="clip-path: inset(0 calc(100% - var(--pos)) 0 0)">
    <Picture src={before} alt={`Before: ${alt}`} widths={[600, 1200]} sizes="100vw" />
  </div>
  <input type="range" min="0" max="100" value="50" aria-label="Compare before and after"
         class="absolute inset-0 h-full w-full cursor-ew-resize opacity-0" />
</figure>
<script>
  document.querySelectorAll<HTMLElement>('[data-ba]').forEach((el) =>
    el.querySelector('input')!.addEventListener('input', (e) => el.style.setProperty('--pos', (e.target as HTMLInputElement).value + '%')));
</script>
```

- [ ] **Step 7: `QuoteForm.astro`** (WhatsApp handoff, no backend):

```astro
---
import { site } from '../config/site';
import { getCollection } from 'astro:content';
const services = (await getCollection('services')).filter((s) => s.data.kind === 'service').sort((a, b) => a.data.order - b.data.order);
---
<form data-quote class="grid gap-4" novalidate={false}>
  <div class="grid gap-2"><label for="q-name" class="font-medium">Your name</label>
    <input id="q-name" name="name" required autocomplete="name" class="rounded-[var(--radius-input)] border border-ink-soft/40 bg-card px-4 py-3" /></div>
  <div class="grid gap-2"><label for="q-area" class="font-medium">Area</label>
    <select id="q-area" name="area" required class="rounded-[var(--radius-input)] border border-ink-soft/40 bg-card px-4 py-3">
      <option value="">Choose your area</option>{site.areas.map((a) => <option>{a.name}</option>)}<option>Other</option></select></div>
  <div class="grid gap-2"><label for="q-service" class="font-medium">Service</label>
    <select id="q-service" name="service" required class="rounded-[var(--radius-input)] border border-ink-soft/40 bg-card px-4 py-3">
      <option value="">Choose a service</option>{services.map((s) => <option>{s.data.name}</option>)}</select></div>
  <div class="grid gap-2"><label for="q-msg" class="font-medium">Details (optional)</label>
    <textarea id="q-msg" name="msg" rows="3" class="rounded-[var(--radius-input)] border border-ink-soft/40 bg-card px-4 py-3"></textarea>
    <p class="text-sm text-ink-soft">Opens WhatsApp with your message. Nothing is stored on this website.</p></div>
  <button class="rounded-full bg-wa px-6 py-3.5 font-semibold text-white active:scale-[0.98]">Send on WhatsApp</button>
</form>
<script>
  import { waLink, quoteMessage } from '../lib/whatsapp';
  document.querySelectorAll<HTMLFormElement>('[data-quote]').forEach((f) => f.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!f.reportValidity()) return;
    const d = new FormData(f);
    let m = `${quoteMessage({ service: String(d.get('service')), area: String(d.get('area')), path: location.pathname })} Name: ${d.get('name')}.`;
    if (d.get('msg')) m += ` ${d.get('msg')}`;
    (window as any).gtag?.('event', 'lead_form', { service: d.get('service'), area: d.get('area'), page: location.pathname });
    window.location.href = waLink(m);
  }));
</script>
```

- [ ] **Step 8: Remaining pages**
  - `about.astro`: story (D9), "10+ years" claim, free installation, own team (D7), real team/install photos, service list, CTA. No "nationwide" wording.
  - `contact.astro`: H1 "Contact Steven Invisible Grills", phone, WhatsApp, email, areas served, `QuoteForm`, hours (when set). No map until real address (D2); then a lazy `loading="lazy"` Maps iframe of the GBP listing behind a click-to-load facade.
  - `faq.astro`: all service FAQs grouped by category + FAQPage schema.
  - `areas/index.astro` + `areas/[area].astro` using `publishableAreas`.
  - `projects/index.astro` (masonry of all) + `projects/[slug].astro` (photos, area, services, ImageObject schema with `contentLocation`).
  - `guides/index.astro` + `guides/[slug].astro` (Article schema, answer box, related services).
  - `privacy-policy.astro` (`noindex`): states GA4 usage, no form storage, WhatsApp handoff.
  - `404.astro`: helpful links to hubs + WhatsApp button.

- [ ] **Step 9: Run** `npm run build` → `check-build: N pages OK`. Fix every reported error.
- [ ] **Step 10: Visual QA** at 360, 390, 768, 1024, 1440 px in light and dark: no horizontal scroll, hero CTA above fold, nav one line at 1024, mobile bar not overlapping footer text. Run design-taste-frontend section 14 checklist and record pass/fail in the PR description.
- [ ] **Step 11: Commit** `feat: page templates and section components`

---

### Task 11: Performance gate (Lighthouse CI)

**Files:** Create `lighthouserc.json`, `.github/workflows/ci.yml`.

- [ ] **Step 1: `lighthouserc.json`**

```json
{
  "ci": {
    "collect": {
      "staticDistDir": "./dist",
      "url": ["/", "/pigeon-safety-nets/", "/invisible-grills/", "/contact/", "/projects/"],
      "settings": { "preset": "mobile" }
    },
    "assert": {
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.95 }],
        "categories:seo": ["error", { "minScore": 1 }],
        "categories:accessibility": ["error", { "minScore": 0.95 }],
        "categories:best-practices": ["error", { "minScore": 1 }],
        "largest-contentful-paint": ["error", { "maxNumericValue": 2000 }],
        "cumulative-layout-shift": ["error", { "maxNumericValue": 0.05 }],
        "total-byte-weight": ["error", { "maxNumericValue": 600000 }]
      }
    }
  }
}
```

- [ ] **Step 2: `.github/workflows/ci.yml`**

```yaml
name: ci
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: npm }
      - run: npm ci
      - run: npm run check
      - run: npm run build
      - run: npx lhci autorun
```

- [ ] **Step 3: Run locally** `npm run build && npx lhci autorun` → all assertions pass. If performance < 95: check hero image is eager + `fetchpriority=high`, fonts preloaded, no blocking third-party script.
- [ ] **Step 4: Commit** `ci: lighthouse performance and seo gate`

---

### Task 12: Launch and migration

**Files:** none (ops). Checklist in PR description.

- [ ] **Step 1: Pre-launch content review with client**: every page with `[client to confirm]` text resolved or removed; D1, D5, D7, D8, D12 answered.
- [ ] **Step 2: Crawl the preview** (`*.pages.dev`) with Screaming Frog (free <= 500 URLs) or `npx linkinator https://<preview>.pages.dev --recurse`: zero 4xx, zero redirect chains.
- [ ] **Step 3: Point domain** `www.mrrinvisiblegrillspigeonnets.in` to Cloudflare Pages (custom domain), apex `mrrinvisiblegrillspigeonnets.in` 301 → www (Cloudflare redirect rule). Set `PUBLIC_INDEXABLE=true` and `PUBLIC_GA_ID` in production env, redeploy.
- [ ] **Step 4: Verify redirects live**:

```bash
for u in index about contact balcony-safety-nets pigeon-safety-nets invisible-grill invisible-grill-dealers ceilling-cloth-hangers coconut-tree-safety-nets; do curl -s -o /dev/null -w "$u %{http_code} %{redirect_url}\n" "https://www.mrrinvisiblegrillspigeonnets.in/$u.php"; done
```
Expected: every line `301` with the B3 target.

- [ ] **Step 5: Search engines**: GSC (existing verification meta must stay: add `<meta name="google-site-verification" content="3PBf3hmNn64TV5vTmNb2a--RYWcUaWkQ7G7bhD1iiok">` to `Seo.astro` before launch), submit `sitemap-index.xml`, URL-inspect home + 5 top services. Bing Webmaster Tools: import from GSC, submit sitemap. Validate schema with Rich Results Test and validator.schema.org on home, one service, one project.
- [ ] **Step 6: IndexNow**: generate key, place `public/<key>.txt`, after each deploy run `curl "https://api.indexnow.org/indexnow?url=https://www.mrrinvisiblegrillspigeonnets.in/&key=<key>"` (add as Cloudflare Pages deploy hook or GitHub Action step).
- [ ] **Step 7: Update GBP website link** to `https://www.mrrinvisiblegrillspigeonnets.in/?utm_source=gbp&utm_medium=organic` so GBP traffic is separated in GA4.
- [ ] **Step 8: Monitor 4 weeks**: GSC Coverage (old `.php` URLs move to "Page with redirect"), Core Web Vitals report, key events in GA4.

---

### Task 13: Growth operations (ongoing, no new code)

- [ ] **Every installation:** take 4+ photos (wide, close-up, before, after), note area + flat type. Add `src/content/projects/<date>-<area>-<service>.md`. Commit. Site rebuilds; area and combo pages auto-publish when rule B6 passes. Upload the same photos to GBP.
- [ ] **Every installation:** send review request WhatsApp template with `site.reviewUrl`.
- [ ] **Weekly:** 2 GBP posts; check GSC queries with impressions but position 8-20 and improve those pages (answer box, FAQ, internal links).
- [ ] **Twice monthly:** publish one guide from B10 list as `src/content/guides/<slug>.md`.
- [ ] **Monthly:** citation audit (C7), backlink outreach (C8), Lighthouse re-run, report: rankings for 20 target keywords, GBP calls/clicks, GA4 lead events, Bing AI citations.

Target keyword set (track monthly): pigeon nets hyderabad · pigeon safety nets hyderabad · balcony safety nets hyderabad · invisible grills hyderabad · invisible grill price hyderabad · anti bird nets hyderabad · duct area nets hyderabad · cloth hangers hyderabad · pull and dry cloth hangers hyderabad · cricket practice nets hyderabad · children safety nets hyderabad · monkey safety nets hyderabad · pigeon nets near me · invisible grills near me · pigeon nets kukatpally · pigeon nets gachibowli · invisible grills gachibowli · pigeon nets madhapur · balcony nets miyapur · invisible grills kondapur.

---

## Self-review

- **Spec coverage:** all 24 live pages mapped (B3 table); all 13 body-text services placed (new pages or "Also available"); all 68 images inventoried, 35 reused via Task 7 map, rest replaced by icons or dropped with reason (A6); NAP, schema bug, redirects, robots, sitemap, llms.txt, GA4, GBP, citations, content, CRO all have tasks.
- **Placeholders:** client-dependent facts are explicit decisions (Part D) with defaults, rendered as `null` and hidden, never invented.
- **Type consistency:** `waLink`, `quoteMessage`, `telLink`, `publishableAreas`, `publishableCombos`, `graph`, `businessNode`, `serviceNode`, `breadcrumbNode`, `faqNode`, `articleNode`, `pageTitle` names identical across Tasks 3-10.
- **Review Focus:** each of the 5 items has a test in its owning task (Tasks 3, 4, 5, 9).
- **Honesty:** no #1 ranking guarantee. Rankings depend on Google's relevance, distance and prominence; this plan maximises all three inputs that the business controls.

---

# PART F: GOOGLE BUSINESS PROFILE FOR "STEVEN INVISIBLE GRILLS"

The business owner must do the account and verification steps personally in their own Google account. Text marked **Paste** is ready to use.

## F0. New profile or rename? (decide first)

Search Google Maps for **6305721219**, "MRR Safety Nets" and "MRR Invisible Grills".

| Situation | Do this | Why |
|---|---|---|
| Profile exists under an MRR name, owned by client | **Rename it** to "Steven Invisible Grills". Do NOT create a second profile | Keeps reviews, photos, ranking history. Two profiles with one phone = duplicate, one can be suspended |
| Profile exists, someone else owns it | "Own this business?" ownership request, then rename | Same |
| No profile | Create new at business.google.com named "Steven Invisible Grills" | Clean start |

**Name rules:**
- Name field = exactly `Steven Invisible Grills`. No keywords or city ("Steven Invisible Grills & Pigeon Nets Hyderabad" gets suspended).
- Google may ask for proof of the real-world name. Before renaming, have at least one of: signboard, vehicle branding, invoice/GST certificate, visiting cards showing "Steven Invisible Grills". A rename often triggers re-verification.

## F1. Core fields

| Field | Value |
|---|---|
| Business name | `Steven Invisible Grills` |
| Primary category | Most specific available for grill/net installation. Test in the dropdown (exact names vary): "Window installation service", "Bird control service", "Fence contractor", "Safety equipment supplier". Pick what the top 3 Maps results for "invisible grills Hyderabad" use (check with GMB Everywhere extension) |
| Secondary categories | Up to 9 that genuinely fit (bird control, netting, window installation, home improvement) |
| Business type | Service-area business. Add address only if customers can visit a real shop/office |
| Service areas | Hyderabad, Secunderabad, Gachibowli, Kondapur, Madhapur, Hitech City, Banjara Hills, Jubilee Hills, Kukatpally, Miyapur, Ameerpet, Begumpet, Dilsukhnagar, LB Nagar, Uppal, Tarnaka, Kompally, Attapur, Manikonda, Nallagandla |
| Phone | +91 63057 21219 |
| Website | `https://www.mrrinvisiblegrillspigeonnets.in/?utm_source=gbp&utm_medium=organic` (new domain if D15 approved) |
| WhatsApp | Add as contact option if offered |
| Hours | Real hours (same as website) |
| Opening date | Real start year (backs "10+ years") |
| Attributes | Only true ones, e.g. "Onsite services", "Free estimates" |

### Description (Paste, max 750 chars, no links/phone)

> Steven Invisible Grills installs invisible grills, balcony safety nets, pigeon nets and cloth hangers for homes, apartments and offices across Hyderabad and Secunderabad. We fit stainless steel invisible grills for balconies and windows, pigeon and anti bird nets for balconies and duct areas, children and pet safety nets, staircase, monkey and construction safety nets, cricket practice and sports nets, and pull and dry, ceiling and balcony cloth hangers. With over 10 years of experience and free installation, our team measures your space, gives a clear quote and installs neatly without blocking light or air. Send a photo of your balcony on WhatsApp for a quick quote.

(Remove "over 10 years" or "free installation" if not true.)

## F2. Services (Paste, max 300 chars each)

| Service | Description |
|---|---|
| Invisible Grills for Balconies | Stainless steel invisible grills for apartment balconies. Keeps children and pets safe without blocking the view. Measured and installed across Hyderabad. |
| Invisible Grills for Windows | Invisible window grills in stainless steel wire for safety and security with a clear, open view. For homes and offices in Hyderabad. |
| Stainless Steel Invisible Grills | Corrosion-resistant, low-maintenance stainless steel invisible grills for balconies, windows and open spaces. |
| Balcony Safety Nets | Strong balcony safety nets that prevent accidental falls in high-rise apartments while keeping the balcony open and airy. |
| Pigeon Safety Nets | Pigeon nets for balconies, ducts and open areas. Stops birds and droppings without blocking air or sunlight. |
| Anti Bird Nets | High-strength nylon bird nets in custom sizes to keep pigeons, crows and sparrows out of balconies and buildings. |
| Duct Area Safety Nets | Nets for ventilation ducts and shafts between building blocks to stop birds and debris while keeping airflow. |
| Children Safety Nets | Balcony and window nets that keep children safe at height in apartments. |
| Pet Safety Nets | Balcony nets that keep cats and dogs safe in apartments. |
| Staircase Safety Nets | Nets for staircases and railings to protect children, elderly people and visitors from falls. |
| Monkey Safety Nets | Strong nets for balconies, terraces and rooftops that keep monkeys out without harming them. |
| Construction Safety Nets | Safety nets for scaffolding and building exteriors to protect workers and passersby from falls and debris. |
| Bird Spikes | Bird spikes for ledges, AC units and parapets to stop pigeons sitting and nesting. |
| Cricket Practice Nets | Cricket practice nets for homes, schools, clubs and sports complexes, designed to your space. |
| All Sports Nets | Nets for cricket, football, badminton, tennis and other sports areas, in custom sizes. |
| Pull and Dry Cloth Hangers | Ceiling-mounted pull and dry cloth hangers for balconies that save space and dry clothes faster. |
| Ceiling Cloth Hangers | Ceiling cloth hangers for balconies, utility areas and terraces. Space-saving and easy to use. |
| Balcony Cloth Hangers | Durable cloth hangers made for apartment balconies. Keeps the balcony neat and clutter-free. |

Also add each main service as a **Product** (real photo + "Get quote" button linking to its website page).

## F3. Verification

- Google picks the method (usually video; sometimes SMS/email).
- Video usually needs one continuous clip: outside of business or work vehicle with "Steven Invisible Grills" visible, tools/equipment, proof of management (business document with the name).
- Don't edit name, category or address while verification is pending.

## F4. Photos and videos

- Logo: new Steven Invisible Grills logo, 720x720. Cover: best real install photo, 1080x608+.
- Launch with 30+ real photos, then 3 per week. Descriptive filenames (`invisible-grill-balcony-kukatpally.jpg`).
- 3+ short videos (15-30 s): install time-lapse, before/after, grill wire close-up. Never stock images.

## F5. Reviews

1. GBP dashboard > "Ask for reviews" > copy short link > put in `site.reviewUrl`.
2. After every job, WhatsApp (Paste):

> Hi {Name}, thank you for choosing Steven Invisible Grills for your {service} in {area}. If you're happy with the work, could you leave us a short Google review? It really helps other families find us: {review link}

3. Reply to every review within 48 h, mention service + area naturally.
4. Never buy reviews, reward reviews, or ask only happy customers.
5. Old reviews stay after a rename.

## F6. Weekly routine (15 min)

| When | Action |
|---|---|
| Mon | "Project of the week" post: 2-3 photos, service + area, "Get quote" button |
| Thu | Tip/offer post (e.g. monsoon pigeon-nesting reminder) |
| Every job | Upload photos, send review request |
| Fri | Answer Q&A, reply to reviews, check Performance (calls, clicks, directions) |

Seed Q&A: "Do you install invisible grills in Gachibowli?" / "Is installation free?" / "Do pigeon nets block air?" (answer truthfully from the business account).

## F7. NAP consistency

Exactly **Steven Invisible Grills / +91 63057 21219 / same website** on: website (auto from `site.ts`), Bing Places, Apple Business Connect, Justdial, Sulekha, IndiaMART, Facebook, Instagram, YouTube. Update or close listings still saying "MRR Safety Nets" or "Durga Safety Nets". Add each listing URL to `site.sameAs`.

## F8. Owner checklist

- [ ] Searched Maps for existing profile with 6305721219
- [ ] Signage / invoice / cards with "Steven Invisible Grills" ready
- [ ] Profile renamed or created, name field only "Steven Invisible Grills"
- [ ] Primary + secondary categories set
- [ ] 20 service areas, hours, phone, website with UTM
- [ ] Description pasted, 18 services + products added
- [ ] Verified
- [ ] Logo, cover, 30+ photos, 3 videos uploaded
- [ ] Review link saved and sent to past customers
- [ ] Old MRR / Durga listings updated
