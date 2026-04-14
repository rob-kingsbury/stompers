# Stompers Redesign - Handoff

**Last Updated:** 2026-04-13 (Session 16)
**Total Open Issues: 12**

---

## SESSION 16: Staging, Production Deploy, Mobile Audit, Performance Fixes

Deployed live to swampcitystompers.ca. Full mobile audit + fixes. Performance improvements.

- **Production deploy:** Site now live at swampcitystompers.ca. Staging retired. Deploy method: tar + scp + SSH untar to `/home/debl4277/public_html/`.
- **vite.php fix:** `is_vite_dev()` gated on HTTP_HOST being localhost — was serving dev asset tags on production.
- **bfcache:** Added `pageshow` reload handler for iOS back-button breakage.
- **Footer:** Replaced ScrollTrigger with IntersectionObserver for footer utility reveal (more reliable post-Barba).
- **Performance:** WebP logo (669KB vs 7.7MB PNG), deferred hero video load via `data-src` on window.load, cache headers + gzip in .htaccess, `font-display=swap`.
- **Tour dates:** Updated to 10 confirmed 2026 dates.
- **Mobile audit:** Accordion max-height fix, footer map mobile layout, EPK split-left flex fix, contact form font-size 16px (iOS zoom), menu nav link clamp reduced, footer social 44px touch targets.
- **CSS fixes:** `accordion-venue` ellipsis truncation, watch-thumbs horizontal scroll on mobile, tour-list-section reduced mobile padding.
- **Tagline:** `text-align: center` added (was left-aligned on mobile).
- **Known regression:** Homepage accordion buttons unresponsive on mobile (#21) — pointer-events fix was attempted and reverted, root cause not fully resolved.

## SESSION 15: Footer Cleanup, Watch Section, Tour Page, Story Timeline, URL Rewrites, Bug Fixes

Footer simplified (solid black). Watch section added (YouTube facade embeds). Tour/Story pages rebuilt. URL rewrites (.htaccess). Critical JS fixes: GSAP ticker accumulation, Vite HMR double-init, FOUC, Barba hash scroll, progress nav cleanup. 6 issues closed.

---

## NEXT SESSION PRIORITIES

1. **Fix mobile accordion (#21)** — Buttons unresponsive on iOS. Likely Lenis/touch event conflict or reveal not firing. Use MCP + device to diagnose.
2. **EPK genre/fans-of review** (#18) — Rob confirms genre direction
3. **EPK downloads** (#19) — Generate one-sheet PDF, stage plot SVG
4. **Venue testimonial** (#15) — Need a real quote from a venue owner
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
| 20 | Evaluate band-photo-doorway.jpeg for site use | media |
| 21 | Homepage accordion: buttons unresponsive on mobile | bug |

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
| `includes/head.php` | Shared `<head>` + no-js removal + vite_assets() |
| `includes/vite.php` | Vite dev detection (localhost-gated) |
| `includes/nav.php` | Shared nav (cart icon, hamburger, menu) |
| `includes/footer.php` | Shared footer (next show + utility strip) |
| `includes/tour-dates.php` | Single source of truth for all tour dates |
| `css/styles.css` | All styles |
| `js/main.js` | GSAP/Lenis/Barba animations |
| `.claude/design-system.md` | Design system & brand guide |

---

**Continue with:** Fix mobile accordion (#21), EPK genre review (#18)
