---
project: Stompers
status: In Progress
last_session: 8
session_date: 2026-02-09
current_focus: Configuration optimization, skills, workflows
open_issues: 11
next_priority: "Tour page layout (#11)"
---

# Stompers Redesign Context

```yaml
project: Swamp City Stompers Website (Immersive Redesign)
type: Band website with scroll-based animations

tech:
  build: Vite
  scroll: Lenis (smooth scroll)
  animation: GSAP + ScrollTrigger
  transitions: Barba.js (Lift style)
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

### February 2026 - Session 8: Configuration Optimization

**Overhauled Claude Code configuration for Opus 4.6:**

- Expanded CLAUDE.md with communication style, keyword triggers, session protocol, project scope
- Created 4 custom skills: `/session-start`, `/handoff`, `/fix-issue`, `/simplify`
- Added YAML frontmatter to context.md for machine-readable state
- Added thinking-mode.md rule for complex animation analysis
- Cleaned up settings.local.json (34 entries to 7 generic patterns)
- Updated workflows.yaml with simplify and check workflows
- Refreshed functions.md with current line numbers from js/main.js
- Updated development-workflow.md with skill references

### February 2026 - Session 7 (Nav Menu Fixes)
**Fixed nav menu bugs and consolidated file naming:**

File Renames:
- `css/immersive-master.css` → `css/styles.css`
- `js/main-master.js` → `js/main.js`
- Updated all references across HTML, docs, and config

Nav Menu Fixes (css/styles.css + js/main.js):
- Fixed menu text hidden behind menu-bg: z-index stacking with `calc(var(--z-overlay) +/- 1)`
- Removed CSS `opacity: 0` from `.menu-nav-link` and `.menu-footer` (GSAP controls initial state)
- Added dynamic `is-active` class on menu links based on `window.location.pathname`
- Replaced `menuTimeline.reverse()` with custom close timeline for snappy exit
- Added dust particles on menu close for visual parity with open animation

Scroll Animation Fix (js/main.js):
- Added `immediateRender: false` to `gsap.from()` calls with ScrollTrigger

Config:
- Fixed `vite.config.js` server open path to `/index.html`

### January 2026 - Session 6 (Mobile-First Audit)
**Complete mobile-first refactor of entire codebase:**

CSS Changes (styles.css):
- Added `.no-js` fallback styles - content visible without JS
- Converted ALL 7 `max-width` queries to mobile-first `min-width`
- Responsive breakpoints: 481px, 769px, 1025px, 1201px

JS Changes (main.js):
- Added responsive utilities: `isMobile()`, `isTablet()`, `isDesktop()`, `isTouchDevice()`
- Added `prefersReducedMotion()` support throughout all animations
- `getScrollTriggerConfig()` returns mobile-adjusted trigger points
- Lenis configured with mobile touch multipliers
- Quote animation simplified on mobile (fade lines, not characters)

HTML Changes:
- Added `class="no-js"` to all 6 production pages

### January 2026 - Session 5
- Built merch.html page with sticky product slides layout
- Created tour-demos.html with 8 tour page layout options
- GSAP Animation Library updates (separate repo)

### January 2026 - Session 4
- Fixed sticky positioning broken by overflow-x: hidden
- Fixed band card animations (transform breaks sticky)
- Added Lenis CSS compatibility rules
- Created GitHub issues #6-10
