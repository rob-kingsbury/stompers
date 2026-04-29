# Stompers Redesign - Handoff

**Last Updated:** 2026-04-28 (Session 20)
**Total Open Issues: 12**

---

## SESSION 20: Tour Date Updates

Quick update session. Added May 16 Cold Bear Brewery (100 Madawaska Blvd, Arnprior) with pre-cached coords. Brauwerk Hoffman date corrected (Jul 12 -> Jul 18). Hard Rock "Cafe" was actually Hard Rock Casino (4837 Albion Rd, south Ottawa) — venue name + coords updated.

## SESSION 19: Mobile Fixes, Security, Audit

Band card images fixed (width:100%, per-member object-position). Tour page scroll fix (scrollRestoration=manual in head). Homepage "See All Dates" links to tour.php. Tour page iOS accordion ported. Soren+Atlas audit confirmed accordion code is correct (cache issue). Security: email header injection, e() helper, OG image URL, eager map iframes.

---

## NEXT SESSION PRIORITIES

1. **Verify accordion on real iOS device** — audit confirms code is correct; if still failing, connect Safari devtools via USB to a Mac and get console logs
2. **Connect Google Sheets (#22)** — Rob creates sheet, shares CSV URL, paste into SHEETS_CSV_URL in tour-dates.php and deploy
3. **EPK genre/fans-of review (#18)** — Rob confirms genre direction
4. **EPK downloads (#19)** — One-sheet PDF, stage plot SVG
5. **Contact page** — Build out contact form / booking info
6. **Replace Unsplash hotlinks** — Download + WebP convert 13 images, heroes first (audit M6)

---

## OPEN ISSUES (12)

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
| 22 | Connect Google Sheets for tour date editing | enhancement |

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
| `includes/tour-dates.php` | Tour dates — Sheets CSV + Nominatim + fallback; defines e() helper |
| `includes/vite.php` | Vite dev detection (localhost-gated) |
| `includes/head.php` | Shared head — sets scrollRestoration=manual inline |
| `includes/nav.php` | Shared nav |
| `includes/footer.php` | Shared footer |
| `data/geo-cache.json` | Permanent venue coordinate cache (do not delete) |
| `css/styles.css` | All styles |
| `js/main.js` | GSAP/Lenis/Barba animations |

---

**Continue with:** Verify maps on live site (Hard Rock Casino + Cold Bear Brewery). Then accordion verification on real iOS, then Google Sheets (#22).
