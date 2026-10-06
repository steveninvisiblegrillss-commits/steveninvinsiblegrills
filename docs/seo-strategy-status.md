# SEO, AEO and AI search: status (2026-10-06)

No page can be guaranteed position 1 or an AI recommendation. This system maximises relevance, entity clarity, first-hand evidence, local prominence, crawlability and conversion.

Measured (Lighthouse mobile, indexable build, local): performance 100, accessibility 100, best practices 100, SEO 100. LCP 1.2 to 1.7 s, CLS 0. Staging builds are `noindex` by design, so SEO scores 69 there until `PUBLIC_INDEXABLE=true`.

## Built and verified by the build audit (`scripts/check-build.mjs`, runs in CI)
One H1, title at most 60 characters, description 70 to 160, unique titles and descriptions, absolute trailing-slash canonicals, valid JSON-LD, alt and dimensions on every image, no broken internal links, no orphan pages, no redirect chains, every `.php` redirect target exists, no "Durga", no em dashes, no image over 250 KB.

Also built: static pre-rendered HTML, sitemap, robots (Googlebot, Bingbot, OAI-SearchBot, GPTBot, PerplexityBot, ClaudeBot allowed), 25 legacy 301s, 404, Open Graph and Twitter tags, breadcrumbs, AVIF with WebP fallback, LCP image eager and high priority, one `HomeAndConstructionBusiness` entity with alternate legacy names, Service, BreadcrumbList, FAQPage and ImageObject schema, answer-first box at the top of every service page, question-shaped H2s, WhatsApp messages carrying business, service, area and source page, GA4 and Clarity wiring (idle-loaded), Search Console verification tag, optional `llms.txt`.

## Needs the client or owner (cannot be built by code)
| Item | Why it blocks |
|---|---|
| Set `PUBLIC_INDEXABLE=true`, `PUBLIC_GA_ID`, `PUBLIC_CLARITY_ID` in production | Until then the site is noindex and unmeasured |
| Google Business Profile: rename or create, categories chosen by accuracy only, hours, review link into `site.reviewUrl`, GBP URL into `site.gbpUrl` | Local pack ranking is relevance, distance and prominence |
| Confirmed address or service-area decision (D2), hours (D3) | Schema omits them until confirmed |
| Real project records with area, property type, problem, solution, photos, customer-approved text | Powers project pages, area pages and combo pages (anti-doorway rule: 60+ words of real local notes plus 2+ projects) |
| Written approval for photos showing faces | Held out of public pages |
| Real Google reviews, a verified rating | Rating badge and reviews render only from real data |
| Directory listings with identical name, phone and site: Bing Places, Apple Business Connect, Justdial, Sulekha, IndiaMART, Facebook, Instagram, YouTube. Add URLs to `site.sameAs` | Entity consistency across the web |
| Bing Webmaster Tools, IndexNow key, Search Console sitemap submission | Discovery and AI citation reporting |
| Short real videos | Video SEO, YouTube |

## Ongoing growth
Guides (8 planned in the main plan; written only with confirmed facts), one project page per installation, local links and RWA vendor lists, monthly query review.

## Search Console loop
High impressions with low CTR: rewrite title and meta. Position 4 to 10: improve the page. Position 8 to 20: strengthen content, internal links and project evidence. Wrong page ranking: fix topical links. Recurring query with no page: evaluate a useful page, never a city-name swap.

## AI visibility tracking
Keep a query set (best invisible grills in Hyderabad, pigeon safety nets near me, invisible grill price Hyderabad, pigeon nets Kukatpally, invisible grills Gachibowli, balcony safety nets Hyderabad). Each month record: mentioned or not, which page was cited, which competitors appeared, which sources were used, what facts are missing. Use Bing Webmaster Tools AI Performance for citation data.

## Known trade-offs
- The home FAQ uses native `<details>` accordions for design reasons. The content is in the HTML and indexable. Service pages show FAQs and the answer box fully open.
- The home H1 is the brand line "Unobstructed views. Uncompromised safety." Keywords sit in the sub-headline, title and description. Revisit if Search Console shows weak head-term rankings.
