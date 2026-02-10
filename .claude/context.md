# Stompers Redesign Context

```yaml
project: Swamp City Stompers Website (Immersive Redesign)
type: Band website with scroll-based animations

tech:
  build: Vite
  scroll: Lenis (smooth scroll)
  animation: GSAP + ScrollTrigger
  transitions: View Transitions API (Lift style)
  css: Vanilla CSS with CSS variables
  js: Vanilla JS (ES6+)

paths:
  master: index.html
  css: css/styles.css
  js: js/main.js
  themes: css/themes.css
  pages: tour.html, story.html, epk.html, merch.html, contact.html
  docs: handoff.md (detailed section docs, read on-demand)

workflow:
  dev: npm run dev
  build: npm run build
  issues: gh issue list --state open

repo:
  github: https://github.com/rob-kingsbury/stompers.git
  branch: main
```

## Section Status

| Section | Status | Page Status |
|---------|--------|-------------|
| Progress Nav | Complete | index.html - Complete |
| Hero | Complete | tour.html - In Progress |
| About | Complete | merch.html - Complete |
| Band Cards | Complete | story.html - Not Started |
| Tour | Complete | epk.html - Not Started |
| Quote | Complete | contact.html - Not Started |
| Contact/Footer | Needs Work | |

## Recent Changes

### February 2026 - Session 7 (Nav Menu Fixes)
**Fixed nav menu bugs and consolidated file naming:**

File Renames:
- `css/immersive-master.css` → `css/styles.css`
- `js/main-master.js` → `js/main.js`
- Updated all references across HTML, docs, and config

Nav Menu Fixes (css/styles.css + js/main.js):
- Fixed menu text hidden behind menu-bg: z-index stacking with `calc(var(--z-overlay) +/- 1)`
  - `.menu-bg`: `calc(var(--z-overlay) - 1)` (background, behind content)
  - `.menu-overlay`: `var(--z-overlay)` (menu content)
  - `.hamburger-container`: `calc(var(--z-overlay) + 1)` (always clickable)
- Removed CSS `opacity: 0` from `.menu-nav-link` and `.menu-footer` (GSAP controls initial state)
- Added dynamic `is-active` class on menu links based on `window.location.pathname`
- Replaced `menuTimeline.reverse()` with custom close timeline for snappy exit
- Added dust particles on menu close for visual parity with open animation

Scroll Animation Fix (js/main.js):
- Added `immediateRender: false` to `gsap.from()` calls with ScrollTrigger
- Prevents about section text from being invisible at desktop widths

Config:
- Fixed `vite.config.js` server open path to `/index.html`

### January 2026 - Session 6 (Mobile-First Audit)
**Complete mobile-first refactor of entire codebase:**

CSS Changes (styles.css):
- Added `.no-js` fallback styles (lines 9-35) - content visible without JS
- Converted ALL 7 `max-width` queries to mobile-first `min-width`
- Responsive breakpoints: 481px, 769px, 1025px, 1201px
- Menu responsive styles refactored to mobile-first

JS Changes (main.js):
- Added responsive utilities: `isMobile()`, `isTablet()`, `isDesktop()`, `isTouchDevice()`
- Added `prefersReducedMotion()` support throughout all animations
- `getScrollTriggerConfig()` returns mobile-adjusted trigger points
- Lenis configured with mobile touch multipliers (1.5x mobile, 2.0x desktop)
- Quote animation simplified on mobile (fade lines, not characters)
- Menu shake reduced on mobile (4px/3 repeats vs 8px/6 repeats)
- Hero video scale reduced on mobile (1.15 vs 1.3)
- Removes `no-js` class from `<html>` on load

HTML Changes:
- Added `class="no-js"` to all 6 production pages (index, tour, merch, story, epk, contact)

### January 2026 - Session 5
- Built merch.html page with sticky product slides layout
- Created tour-demos.html with 8 tour page layout options
- GSAP Animation Library updates (separate repo)

### January 2026 - Session 4
- Fixed sticky positioning broken by overflow-x: hidden
- Fixed band card animations (transform breaks sticky)
- Added Lenis CSS compatibility rules
- Created GitHub issues #6-10

### January 2026 - Session 3
- Implemented Stomp hamburger menu with seismic shake
- Major CSS refactoring for DRY compliance
- Added comprehensive z-index scale to themes.css

### January 2026 - Session 2
- Added View Transitions API (Lift style chosen)
- Archived 52 experimental files to _archive/
- Created .claude/ configuration directory

### January 2026 - Session 1
- Initial GitHub repo setup
- Quote section overhauled to shrink reveal
