---
project: Stompers
status: In Progress
last_session: 12
session_date: 2026-03-23
current_focus: "Site audit: PHP includes, band member fixes, tour date updates, token optimization"
open_issues: 10
next_priority: "Test PHP pages on Apache, verify animations work"
---

# Stompers Redesign Context

> **MAINTENANCE NOTE:** Keep this file under 200 lines. Only retain the 3 most recent session notes. For older history, see git log.

```yaml
project: Swamp City Stompers Website (Immersive Redesign)
type: Band website with scroll-based animations

tech:
  build: Vite (JS/CSS bundling)
  server: XAMPP Apache (PHP pages)
  scroll: Lenis (smooth scroll)
  animation: GSAP + ScrollTrigger
  transitions: Barba.js (Lift style)
  css: Vanilla CSS with CSS variables
  js: Vanilla JS (ES6+)

paths:
  master: index.php (canonical) / index.html (Vite entry)
  css: css/styles.css
  js: js/main.js
  themes: css/themes.css
  includes: includes/head.php, includes/nav.php
  pages: tour.php, story.php, epk.php, merch.php, contact.php
  docs: handoff.md (section docs, read on-demand)

workflow:
  dev: npm run dev (Vite + .html files)
  apache: http://localhost/stompers-redesign/index.php
  build: npm run build
  issues: gh issue list --state open

repo:
  github: https://github.com/rob-kingsbury/stompers.git
  branch: main

band:
  Rob: Guitar / Vocals
  Jeans: Guitar / Vocals
  Kurt: Bass / Vocals
  Matt: Drums
```

## Section Status

| Section | Status | Page Status |
|---------|--------|-------------|
| Progress Nav | Complete | index.php - Complete |
| Hero | Complete (logo anim + grunge video) | tour.php - In Progress |
| About | Complete | merch.php - Complete |
| Band Cards | Complete | story.php - Not Started |
| Tour | Updated (real dates) | epk.php - Not Started |
| Quote | Complete | contact.php - Not Started |
| Contact/Footer | Needs Work | |

## Recent Changes

### March 2026 - Session 12: Site Audit + PHP Conversion

**Fixed hero bugs, updated tour dates, converted to PHP includes, band member corrections.**

Bug Fixes:
- Logo scroll fade: changed `gsap.to()` to `gsap.fromTo()` with `immediateRender: false` (was reading pre-animation opacity:0 as start value)
- Menu flash on load: set visibility/right inline on `.menu-bg` creation, added explicit GSAP visibility toggling in open/close/reset

PHP Conversion:
- Created `includes/head.php` (meta, fonts, CSS) and `includes/nav.php` (skip-link, hamburger, menu overlay)
- Converted all 6 pages to .php with includes (DRY: ~45 lines removed per page)
- Tour accordion in index.php uses PHP loop from `$shows` array
- Nav links updated to .php extensions
- .html files kept as Vite entry points for bundling

Content Fixes:
- Band member roles corrected: Rob (gtr/vox), Jeans (gtr/vox), Kurt (bass/vox), Matt (drums)
- Matt and Kurt cards were swapped — fixed order and bios
- EPK stats: 5 → 4 band members
- Tour dates: replaced 12 fake US venues with 7 real dates (Mar-Jul 2026)
- Contact email standardized to .ca across all pages
- Social links: replaced # placeholders with real URLs
- Removed placeholder phone number and placeholder resource links
- merch.php: removed hardcoded .menu-bg/.dust-container divs, removed CDN script duplicates

Slimmed context.md and handoff.md (learned from Daybook/BandPilot patterns).

### February 2026 - Session 11: Hero Background Rework

Replaced static grunge textures with looping grunge video + single scratch overlay. Video at 15% opacity with `mix-blend-mode: screen`. Single scratch overlay drifts on top at 8% opacity.

Unresolved bugs (fixed in session 12): menu flash on load, logo instant disappear on scroll.

### February 2026 - Session 10: Hero Redesign (Video to Logo Animation)

Replaced 16MB hero video with logo-based intro animation. Sequence: logo fade-in with scale → meta/tagline → stamp BAM with screen shake. Two-layer grunge background (static scratch + moving Ken Burns). Ambient gold sparks.
