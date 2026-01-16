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
  css: css/immersive-master.css
  js: js/main-master.js
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
