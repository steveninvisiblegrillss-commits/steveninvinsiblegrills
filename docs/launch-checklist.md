# Launch checklist: Steven Invisible Grills

Do these when the client approves the site. Until then the site stays a non-indexed preview on purpose.

## 1. Cloudflare build variables (Workers & Pages > steven-invisible-grills > Settings > Builds > Variables and secrets)
| Variable | Value | When |
|---|---|---|
| `PUBLIC_SITE_URL` | the real domain, e.g. `https://www.yourdomain.com` (no trailing slash) | at launch, with the domain |
| `PUBLIC_INDEXABLE` | `true` | at launch only. Leaving it unset keeps `noindex, nofollow` |
| `PUBLIC_GA_ID` | GA4 measurement ID (`G-XXXXXXXXXX`) | when GA4 exists |
| `PUBLIC_CLARITY_ID` | Microsoft Clarity project ID | when Clarity exists |

Then trigger a new build. Check the page source for `index, follow` and the canonical on the real domain.

## 2. Domain and search engines
- Choose the domain (decision D15). Connect it to the Worker (Settings > Domains and routes).
- If the old `mrrinvisiblegrillspigeonnets.in` is used for launch, keep the 25 `.php` redirects. If a new domain is used, redirect every old URL to the matching new page.
- Google Search Console: verify, submit `/sitemap-index.xml`, inspect the home page and the top service pages.
- Bing Webmaster Tools: import from Search Console, submit the sitemap, set up IndexNow.

## 3. Google Business Profile and directories (see `gbp-setup-steven-invisible-grills.md`)
Name exactly "Steven Invisible Grills". Same name, phone and website on Bing Places, Apple Business Connect, Justdial, Sulekha, IndiaMART, Facebook, Instagram, YouTube. Add each URL to `site.sameAs` and the review link to `site.reviewUrl` in `src/config/site.ts`.

## 4. Content only the owner can supply
- Starting prices ("from ₹X per sq ft"), per service.
- Real project details: area, property type, problem, solution (project files in `src/content/projects/`).
- Local notes per area (60+ words of real experience) to unlock area pages.
- A confirmed rating and real Google reviews.
- A real daylight hero photo of a finished invisible-grill balcony.
- Business hours and address, if there is a shopfront.

## 5. Test on a real phone
- Header, mobile menu, bottom Call / WhatsApp bar.
- Quote form opens WhatsApp with the right message.
- Every phone number and WhatsApp link.
- Both guides and a service page.

## 6. Housekeeping
- GitHub repo name is spelled `steveninvinsiblegrills`. Rename if wanted, then update the remote.
- Commits are authored as `dev <dev@local>`. Set the real author name and email if wanted.
