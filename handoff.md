# Stompers Redesign - Handoff

**Last Updated:** 2026-05-27 (Session 21)
**Total Open Issues: 11**

---

## SESSION 21: Google Sheets Tour Feed Live

Connected Google Sheets CSV as the live tour-date source. New schema: Date | Hour | Minute | AM/PM | Venue | Location | Age | Note. PHP combines hour/min/ampm into a single `time` string surfaced on homepage card, both accordions, and footer Next Show line. Apps Script (`data/tour-sheet-setup.gs`) installs Stompers menu + date picker + dropdowns + past-show conditional formatting. Deployed live. #22 closed.

## SESSION 20: Tour Date Updates

Added May 16 Cold Bear Brewery (Arnprior) with pre-cached coords. Brauwerk Hoffman corrected Jul 12 -> Jul 18. Hard Rock "Cafe" -> Hard Rock Casino (Albion Rd, south Ottawa) with corrected coords.

---

## NEXT SESSION PRIORITIES

1. **Backfill start times in the sheet** — Rob/Eugene fill Hour/Minute/AM/PM dropdowns for the 11 shows as confirmed with venues
2. **Verify accordion on real iOS device** — audit confirms code is correct; if still failing, connect Safari devtools via USB to a Mac
3. **EPK genre/fans-of review (#18)** — Rob confirms genre direction
4. **EPK downloads (#19)** — One-sheet PDF, stage plot SVG
5. **Contact page** — Build out contact form / booking info
6. **Replace Unsplash hotlinks** — Download + WebP convert 13 images, heroes first (audit M6)

---

## OPEN ISSUES (11)

| # | Title | Category |
|---|-------|----------|
| 1 | Mobile: Progress nav hidden on screens < 768px | note (by design) |
| 2 | Band cards: flip animation tuning | animation |
| 5 | Static/lite version of site | enhancement |
| 6 | Hardcoded colors on band cards | css |
| 7 | Tour panels: persistent label | enhancement |
| 8 | Consolidate tour to tour page | enhancement |
| 9 | Gradient blends at image edges | css |
| 10 | JSON config for dynamic content | enhancement |
| 15 | EPK: Add real venue testimonial | enhancement |
| 18 | EPK: Review genre tags and expand For Fans Of | enhancement |
| 19 | EPK: Generate downloadable assets | enhancement |

---

## KEY FILES

| File | Purpose |
|------|---------|
| `index.php` | Home page (hero, about, band, tour cards, watch, footer) |
| `tour.php` | Tour page (accordion list, CTA) |
| `story.php` | Story page (staggered timeline, closing quote) |
| `epk.php` | EPK page (split-screen layout) |
| `merch.php` | Merch page |
| `contact.php` | Contact page (not started) |
| `.htaccess` | Clean URL rewrites + cache headers + gzip |
| `includes/tour-dates.php` | Tour dates — Sheets CSV (live) + Nominatim + fallback; defines e() helper |
| `includes/vite.php` | Vite dev detection (localhost-gated) |
| `includes/head.php` | Shared head — sets scrollRestoration=manual inline |
| `includes/nav.php` | Shared nav |
| `includes/footer.php` | Shared footer |
| `data/geo-cache.json` | Permanent venue coordinate cache (do not delete) |
| `data/tour-cache.json` | 1-hour CSV cache (auto-created on first fetch; safe to delete) |
| `data/tour-sheet-setup.gs` | Apps Script source for the tour sheet (paste into Extensions → Apps Script) |
| `css/styles.css` | All styles |
| `js/main.js` | GSAP/Lenis/Barba animations |

---

## TOUR SHEET — OPERATIONS NOTE

- Published CSV URL is in `includes/tour-dates.php` line 17 (constant `SHEETS_CSV_URL`)
- Sheet Share access is restricted to Rob + Eugene; the publish-to-web URL is its own public read layer (independent of Share)
- Edits in the sheet appear on the site within ~60 seconds (PHP cache TTL). `npm run deploy` also clears `data/tour-cache.json` on the server
- New venues geocode once via Nominatim on first fetch, then cache permanently in `data/geo-cache.json`

---

**Continue with:** Rob/Eugene backfill confirmed start times in the sheet. Then accordion verification on real iOS, then EPK work (#18/#19).
