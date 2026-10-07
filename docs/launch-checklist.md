# Launch checklist: Steven Invisible Grills

The site is a non-indexed preview on purpose (`noindex, nofollow` on every page). It goes public only when step 3 is done.
Preview: https://steven-invisible-grills.steveninvisiblegrillss.workers.dev/

## Verified and ready (nothing to do)
Checked on 2026-10-07 by building the site as it will ship (`PUBLIC_INDEXABLE=true PUBLIC_SITE_URL=https://www.example-launch.in npm run build`):
- `check-build` passes: 40 pages, one H1 each, unique titles and descriptions, valid JSON-LD, correct canonicals.
- Every public page gets `index, follow`. The 404 and privacy pages stay `noindex`.
- Canonicals, `sitemap-index.xml` (38 URLs), `robots.txt` and schema all use the domain from `PUBLIC_SITE_URL`. No preview host leaks into pages.
- Without the variables the same build is `noindex, nofollow` everywhere, so an accidental deploy cannot publish early.
- 25 `.php` redirects from the old site are in `public/_redirects`.
- Security headers are set and there is no CSP, so GA4 and Clarity will load.
- Placeholder text ("to be confirmed by the client") was removed from the project pages.

## Decide first: the domain (D15)
The client already has `mrrinvisiblegrillspigeonnets.in` (brand "MRR", same services, same wording). Two live sites with the same content compete with each other in Google.
Recommended: put the new site on one domain and make the other site 301-redirect to it. Do not run both.
- New domain for Steven Invisible Grills: connect it to the Worker, then redirect every old URL (the 25 `.php` ones are already mapped) to the matching new page.
- Or reuse the old domain: connect it to the Worker. The `.php` redirects already match its URLs.
The Google Business Profile name must be exactly "Steven Invisible Grills" (see `gbp-setup-steven-invisible-grills.md`).

## 1. Connect the domain (Cloudflare dashboard)
Workers & Pages > steven-invisible-grills > Settings > Domains and routes > Add > Custom domain.
Wait until it shows Active (the certificate can take a few minutes).

## 2. Create the accounts you will need
- **GA4:** analytics.google.com > Admin > Create property > Web data stream. Copy the measurement ID (`G-XXXXXXXXXX`).
- **Microsoft Clarity:** clarity.microsoft.com > New project. Copy the project ID.
- **Google Search Console:** search.google.com/search-console > Add property > Domain. Verify with the DNS record (Cloudflare adds it in one click).

## 3. Cloudflare build variables, then redeploy
Workers & Pages > steven-invisible-grills > Settings > Builds > Variables and secrets:

| Variable | Value |
|---|---|
| `PUBLIC_SITE_URL` | the real domain, `https://www.yourdomain.com` (no trailing slash) |
| `PUBLIC_INDEXABLE` | `true` |
| `PUBLIC_GA_ID` | the GA4 ID, once it exists |
| `PUBLIC_CLARITY_ID` | the Clarity ID, once it exists |

Then Deployments > Retry build (or push any commit). Check the live page source: `index, follow`, and the canonical on the real domain.

## 4. After it is live (same day)
1. Search Console: submit `https://yourdomain/sitemap-index.xml`. Use URL Inspection > Request indexing on the home page and the top four service pages.
2. GA4: Realtime, open the site, confirm a visit shows. Tap a WhatsApp button and confirm the lead event fires.
3. Clarity: confirm recordings start within a few minutes.
4. Test on a real phone: header and menu, the bottom Call / WhatsApp bar, the quote form opening WhatsApp with the right text, the quick finder, the estimator, every phone and WhatsApp link.
5. Redirects: open two old `.php` URLs and confirm they land on the new pages.

## 5. Google Business Profile and directories (do these last)
Name exactly "Steven Invisible Grills". Same name, phone and website on Bing Places, Apple Business Connect, Justdial, Sulekha, IndiaMART, Facebook, Instagram, YouTube. Add each URL to `site.sameAs` and the review link to `site.reviewUrl` in `src/config/site.ts`. Then Bing Webmaster Tools: import from Search Console, submit the sitemap, set up IndexNow.

## 6. Content only the owner can supply (best before launch, not blocking)
- Starting prices ("from ₹X per sq ft"), per service.
- Real project details for the 6 projects: area, property type, problem, solution (`src/content/projects/`). The "job card" on each project page stays empty until then.
- Before and after photos of one job (turns on the With vs Without slider on that service).
- A photo of the owner and team, a short installation video, apartment communities worked in.
- Local notes per area (60+ words of real experience) to unlock area pages.
- A confirmed rating and real Google reviews.
- A Monkey Safety Nets photo (it still uses a stand-in), and daylight hero photos.
- Business hours and address, if there is a shopfront.

## 7. Housekeeping
- GitHub repo is spelled `steveninvinsiblegrills`. Rename if wanted, then update the remote.
- Commits show a placeholder author on older commits. Set your real name and email with `git config` if wanted.
