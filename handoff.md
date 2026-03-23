# Stompers Redesign - Handoff

**Last Updated:** 2026-03-23 (Session 12, continued)
**Total Open Issues: 11**

---

## SESSION 12 (continued): Content Overhaul + Bug Fixes

- Fixed menu flash (visibility:hidden on .menu-overlay in CSS)
- Fixed progress nav bar starting full (scrollRange calculation was dividing by zero for hero section)
- Est. 2019 → 2025 sitewide (hero, story, EPK)
- Removed all section numbers (01, 02, etc) from index.php
- Replaced about section images with grittier bar band Unsplash photos
- Rewrote The Mission (removed "loud" language)
- Swapped Rob/Jeans bios, rewrote Kurt + Matt bios and quotes
- Tour fullpage cards: stock photos replaced with dark-filtered OpenStreetMap embeds
- Removed all "Get Tickets" references
- Quote section: less pretentious ("We're not here to make it big...")
- Created issue #13 for footer overhaul

## SESSION 12: Site Audit + PHP Conversion

- Converted all pages to PHP with includes. Fixed hero bugs. Updated tour dates and band info. Slimmed docs.

---

## NEXT SESSION PRIORITIES

1. Rob noted "a few minor issues" to tackle
2. Deploy updated files to staging.swampcitystompers.ca
3. Issue #13: Footer complete overhaul
4. Issue #11: Tour page final layout

---

## OPEN ISSUES (11)

| # | Title | Category |
|---|-------|----------|
| 2 | Band cards: flip animation tuning | animation |
| 3 | Footer design needs refresh | css |
| 4 | Quote section: pin behavior note | note |
| 5 | Static/lite version of site | enhancement |
| 6 | Hardcoded colors on band cards | css |
| 7 | Tour panels: persistent label | enhancement |
| 8 | Consolidate tour to tour page | enhancement |
| 9 | Gradient blends at image edges | css |
| 10 | JSON config for dynamic content | enhancement |
| 11 | Tour page: final layout | enhancement |
| 13 | Footer needs complete overhaul | enhancement |

---

## KEY FILES

| File | Purpose |
|------|---------|
| `index.php` | Home page (canonical) |
| `includes/head.php` | Shared `<head>` + vite_assets() |
| `includes/nav.php` | Shared nav (skip-link, hamburger, menu) |
| `includes/vite.php` | Vite manifest reader (dev/prod) |
| `css/styles.css` | All styles |
| `js/main.js` | GSAP/Lenis/Barba animations |

---

**Continue with:** Fix minor issues Rob noted, deploy to staging, footer overhaul (#13)
