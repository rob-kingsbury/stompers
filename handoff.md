# Stompers Redesign - Handoff

**Last Updated:** 2026-03-26 (Session 13)
**Total Open Issues: 10**

---

## SESSION 13: About Images, Quote, Mobile, EPK Scaffold

- Replaced all 4 about section images:
  - Sound: guitarist in low light (no horns)
  - Vibe: packed dark venue crowd (locked in)
  - Mission: worn boot on pedalboard (locked in)
  - Road: "Cold Beer & Rock and Roll" neon sign (contain fit for full visibility)
- New Vibe copy: "strangers buy each other rounds"
- New Road copy: softer tone, not bar-owner-specific
- New closing quote: "We find the songs that deserved a bigger stage and we give them one."
- Hard Rock Cafe address fixed: 4837 Albion Rd S, Gloucester, ON (coords, map query, all files)
- Mobile fixes: hero text clamp, quote section 70vh (was 100vh), no horizontal overflow
- EPK page scaffolded with scroll animations (bio, stats, genre, sets, downloads, CTA)
- Demo pages created: epk-demos.html (5 layout options), vibe-options.html (image picker)

### KEY BRAND INSIGHT
The Stompers are "the B-side guys." They play familiar favorites people forgot they loved — not the obvious hits, not obscure stuff, but the deep cuts that get the best reaction. This angle needs to be woven into homepage copy (The Sound, The Mission sections) and the EPK bio.

## SESSION 12 (continued): Content Overhaul + Bug Fixes

- Fixed menu flash, progress nav, dates, bios, tour cards, quote section

## SESSION 12: Site Audit + PHP Conversion

- Converted all pages to PHP with includes. Fixed hero bugs. Updated tour dates and band info.

---

## NEXT SESSION PRIORITIES

1. **EPK page** — Rob needs to pick layout from epk-demos.html (5 options), then build final version
2. **Weave "B-sides" angle** into homepage copy (The Sound, The Mission sections)
3. Deploy updated files to staging.swampcitystompers.ca
4. Issue #13: Footer complete overhaul
5. Issue #11: Tour page final layout

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
