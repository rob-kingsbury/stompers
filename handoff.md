# Stompers Redesign - Handoff

**Last Updated:** 2026-03-23 (Session 12)
**Total Open Issues: 10**

---

## SESSION 12: Site Audit + PHP Conversion

- Fixed hero bugs (logo scroll fade, menu flash)
- Converted all 6 pages to PHP with shared includes
- Corrected band member roles/order (Rob/Jeans: gtr+vox, Kurt: bass+vox, Matt: drums)
- Updated tour section with 7 real dates (Mar-Jul 2026)
- Fixed contact email (.ca everywhere), social links, EPK stats
- Cleaned merch.php (removed CDN duplicates, hardcoded menu elements)
- Slimmed context.md and handoff.md

---

## NEXT SESSION PRIORITIES

1. Test PHP pages on Apache — verify all includes render correctly
2. Replace placeholder Unsplash images with real venue/band photos
3. Issue #3: Footer design refresh
4. Issue #11: Tour page final layout

---

## OPEN ISSUES (10)

| # | Title | Category |
|---|-------|----------|
| 2 | Band cards: Scroll-triggered flip animation needs tuning | animation |
| 3 | Footer design needs refresh | css |
| 4 | Quote section: Pin behavior removed due to GSAP conflicts | note |
| 5 | Create static/lite version of site | enhancement |
| 6 | Fix hardcoded colors on band cards | css |
| 7 | Tour panels: persistent section label | enhancement |
| 8 | Consolidate tour section: move list to tour page | enhancement |
| 9 | Add gradient blends at image edges | css |
| 10 | JSON config for dynamic content | enhancement |
| 11 | Tour page: implement final layout design | enhancement |

---

## KEY FILES

| File | Purpose |
|------|---------|
| `index.php` | Home page (canonical, PHP includes) |
| `index.html` | Vite entry point (for `npm run dev`) |
| `includes/head.php` | Shared `<head>` (meta, fonts, CSS) |
| `includes/nav.php` | Shared nav (skip-link, hamburger, menu overlay) |
| `css/styles.css` | All styles (~1470 lines) |
| `js/main.js` | GSAP/Lenis/Barba animations (~570 lines) |
| `css/themes.css` | CSS variables |
| `vite.config.js` | Build config |

---

## SECTION REFERENCE

Read the code directly for implementation details. Key patterns:

- **Progress Nav**: MetaMask-style vertical pill with gold blob. `initProgressNav()` in main.js.
- **Hero**: Logo animation timeline + grunge video bg + ambient sparks. `initHeroAnimations()` + `initHeroSparks()`.
- **About**: Clip-path reveal + content slide-in. `initAboutAnimations()`.
- **Band Cards**: Sticky stacking cards (concom.tv style). `initBandCardStack()`.
- **Tour**: Fullpage cards + accordion list. `initTourSection()`.
- **Quote**: Character fade-in + concom.tv shrink effect. `initQuoteSection()`.
- **Contact/Footer**: Parallax reveal under shrinking quote section.
- **Menu**: Stomp effect with screen shake + dust particles. `initSiteNav()`.

---

## DEV ENVIRONMENT

```bash
npm run dev                    # Vite dev server (.html files)
# OR
# Apache: http://localhost/stompers-redesign/index.php (.php files)

npm run build                  # Production build to dist/
gh issue list --state open     # View issues
```

---

## COLOR PALETTE

```
--color-bg: #0a0a0a       --color-text: #f5f5f0
--color-bg-alt: #111111   --color-accent: #c9a227
```

## FONTS

- **IBM Plex Mono** — Headers, UI
- **Source Serif Pro** — Body, quotes

---

**Continue with:** Test PHP pages, replace placeholder images
