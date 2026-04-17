# Stompers Redesign - Handoff

**Last Updated:** 2026-04-17 (Session 18)
**Total Open Issues: 12**

---

## SESSION 18: Mobile Accordion Fix, Band Card Images

Fixed long-standing iOS accordion bug and band card image cropping.

- **Mobile accordion fixed (#21 closed):** Root cause was Lenis intercepting touch events. Fix: `data-lenis-prevent` on `.tour-accordion-list`, touchstart/touchend delta guard (>10px = scroll gesture, ignored), tour-list-section forced visible on mobile (opacity:1, transform:none — skips GSAP reveal animation).
- **Band card images:** Height 200px (was 120px — too short), `object-position: top` on mobile so faces show. Reset to `50% 50%` on desktop (min-width 992px).
- MCP verified: accordion opens to 272px, object-position confirmed `50% 0%` on live server.

## SESSION 17: Tour Date Fixes, Google Sheets Integration, Accordion/Tagline Mobile Fixes

Minor session: tour date corrections, mobile CSS fixes, Google Sheets + Nominatim infrastructure built.

- Hard Rock Cafe corrected to Apr 30. Hero tagline font-size reverted. Accordion pointer-events fix reverted.
- Google Sheets integration built (#22): `tour-dates.php` fetches CSV, auto-geocodes via Nominatim, falls back to hardcoded. Waiting on Rob to create sheet and share CSV URL.

---

## NEXT SESSION PRIORITIES

1. **Connect Google Sheets (#22)** — Rob creates sheet, shares CSV URL, paste into `SHEETS_CSV_URL` in `tour-dates.php` and deploy
2. **Test accordion on real iOS device** — MCP confirms working in Chromium; needs real-device verification
3. **EPK genre/fans-of review (#18)** — Rob confirms genre direction
4. **EPK downloads (#19)** — One-sheet PDF, stage plot SVG
5. **Contact page** — Build out contact form / booking info

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
| `includes/tour-dates.php` | Tour dates — Sheets CSV fetch + Nominatim geocoding + fallback |
| `includes/vite.php` | Vite dev detection (localhost-gated) |
| `includes/head.php` | Shared `<head>` |
| `includes/nav.php` | Shared nav |
| `includes/footer.php` | Shared footer |
| `data/geo-cache.json` | Permanent venue coordinate cache (do not delete) |
| `css/styles.css` | All styles |
| `js/main.js` | GSAP/Lenis/Barba animations |

---

**Continue with:** Connect Google Sheets (#22), verify accordion on real iOS device
