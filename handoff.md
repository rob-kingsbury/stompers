# Stompers Redesign - Handoff

**Last Updated:** 2026-03-27 (Session 15)
**Total Open Issues: 10**

---

## SESSION 15: Footer Cleanup, Watch Section, Tour Page, Story Timeline, URL Rewrites, Bug Fixes

Major session: footer simplification, homepage quote→Watch section, tour page rebuild, story page timeline, URL rewrites, critical JS bug fixes.

- **Footer simplified:** Removed bayou atmosphere (treeline SVG, fog, fireflies, water shimmer, Goon watermark, quote zone). Solid black background. Two zones remain: next show (OSM map) + utility strip (booking, socials, nav, copyright).
- **Homepage Watch section:** Replaced quote/"Words" section with YouTube facade embeds. 7 videos from playlist, session-based rotation, thumbnail strip, "Full Playlist" link. Zero YouTube JS until click. Progress nav updated: "Words" → "Watch".
- **Homepage contact section removed:** Redundant with footer. Progress nav contact dot removed.
- **Tour page rebuilt:** Replaced horizontal scroll carousel with accordion list pattern (matching homepage). Page hero with darkened Unsplash image. CTA links to contact page. Shows 50 dates before "Show More".
- **Story page timeline:** Staggered left/right timeline with center line and gold dots. Updated content (met at local jam, impromptu show origin). Quote section restyled (centered serif, no orange bar).
- **Sub-page hero images:** All 5 sub-pages now have darkened Unsplash background images with shared `.page-hero-bg` CSS pattern.
- **Shopping cart icon:** Added to nav beside hamburger on all pages, links to merch.
- **URL rewrites:** `.htaccess` created with clean URLs (`/tour`, `/story`, etc.). All internal links updated. Barba hash handling for cross-page anchors (`/#band`).
- **Critical JS fixes:** GSAP ticker callback accumulation (was never removed on Barba transitions — caused ScrollTrigger failures). Vite HMR double-init guard (`import.meta.hot.decline()`). `lenis.raf` null check. FOUC fix (moved `no-js` removal to inline `<head>` script). Progress nav cleanup (timeout + click handlers tracked in cleanupFns). `initNewFooter()` added to Barba afterEnter. `.eyebrow` CSS alias for `.section-number`.

## SESSION 14: EPK Split Screen, Footer Overhaul, Tour Dates DRY, Design System

EPK split-screen layout. Sitewide footer (3 zones). Tour dates DRY (`includes/tour-dates.php`). Design system created. Barba.js async enter fix. BandPilot DB analyzed.

---

## NEXT SESSION PRIORITIES

1. **EPK genre/fans-of review** (#18) — Rob confirms genre direction
2. **EPK downloads** (#19) — Generate one-sheet PDF, stage plot SVG
3. **Venue testimonial** (#15) — Need a real quote from a venue owner
4. **Contact page** — Build out contact form / booking info
5. **Deploy to staging** — Push updates to staging.swampcitystompers.ca

---

## OPEN ISSUES (10)

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
| `.htaccess` | Clean URL rewrites |
| `includes/head.php` | Shared `<head>` + no-js removal + vite_assets() |
| `includes/nav.php` | Shared nav (cart icon, hamburger, menu) |
| `includes/footer.php` | Shared footer (next show + utility strip) |
| `includes/tour-dates.php` | Single source of truth for all tour dates |
| `css/styles.css` | All styles |
| `js/main.js` | GSAP/Lenis/Barba animations |
| `.claude/design-system.md` | Design system & brand guide |

---

**Continue with:** EPK genre review (#18), contact page build, staging deployment
