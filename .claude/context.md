---
project: Stompers
status: In Progress
last_session: 14
session_date: 2026-03-27
current_focus: "Footer illustration integration, EPK refinements"
open_issues: 16
next_priority: "Integrate swamp SVG into footer as atmospheric design, EPK YouTube embed, genre review"
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
  includes: includes/head.php, includes/nav.php, includes/footer.php, includes/tour-dates.php
  pages: tour.php, story.php, epk.php, merch.php, contact.php
  docs: handoff.md, .claude/design-system.md

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

socials:
  facebook: https://www.facebook.com/profile.php?id=61576878274856
  instagram: https://www.instagram.com/swamp_city_stompers
  youtube_playlist: https://youtube.com/playlist?list=PLy1-_1Va1knJ8knIMNVISzCq9HsexLwf-
  booking: booking@swampcitystompers.ca
```

## Section Status

| Section | Status | Page Status |
|---------|--------|-------------|
| Progress Nav | Complete | index.php - Complete |
| Hero | Complete (logo anim + grunge video) | tour.php - In Progress |
| About | Complete | merch.php - Complete |
| Band Cards | Complete | story.php - Not Started |
| Tour | Updated (auto-prune, DRY) | epk.php - Split Screen (functional) |
| Quote | Complete | contact.php - Not Started |
| Footer | In Progress (3 zones working, illustration pending) | |

## Recent Changes

### March 2026 - Session 14: EPK, Footer, Tour DRY, Design System

EPK rebuilt as split-screen (sticky sidebar + scrollable content). B-sides brand copy. Barba.js async enter fix. New sitewide footer: quote zone + next show (auto from tour-dates.php, OSM map parallax) + utility strip (fireflies, fog, Goon watermark). Tour dates consolidated to includes/tour-dates.php with auto-prune. Added Cupboard Arnprior (Aug 8, Nov 7) and Brauwerk Hoffman Campbell's Bay (Jul 18). Design system created (.claude/design-system.md). BandPilot DB analyzed (52 songs, genre breakdown). Social URLs updated to real profiles. Footer illustration (swamp SVG) pending integration as atmospheric design element.

### March 2026 - Session 13: About Images, Quote, Mobile, EPK Scaffold

Replaced all 4 about section images. New closing quote. Mobile fixes. Hard Rock address corrected. EPK scaffolded. Key brand insight: "the B-side guys" — familiar favorites people forgot they loved.

### March 2026 - Session 12: PHP Conversion + Content Overhaul

PHP conversion, bug fixes, content rewrite, deployed to staging. Fixed menu flash, progress nav, dates, bios, tour cards, quote section. Dropped .html files — PHP is canonical.
