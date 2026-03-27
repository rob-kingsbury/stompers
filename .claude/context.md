---
project: Stompers
status: In Progress
last_session: 15
session_date: 2026-03-27
current_focus: "EPK genre review, contact page, staging deploy"
open_issues: 10
next_priority: "EPK genre/fans-of review (#18), contact page build, staging deployment"
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
| Hero | Complete (logo anim + grunge video) | tour.php - Complete (accordion list) |
| About | Complete | merch.php - Complete |
| Band Cards | Complete | story.php - Complete (timeline) |
| Tour | Complete (homepage cards + accordion) | epk.php - Split Screen (functional) |
| Watch | Complete (YouTube facade embeds) | contact.php - Not Started |
| Footer | Complete (next show + utility strip) | |

## Recent Changes

### March 2026 - Session 15: Footer Cleanup, Watch, Tour, Story, URL Rewrites, JS Fixes

Footer simplified (solid black, removed atmosphere/goon/quote zone). Quote section replaced with Watch (YouTube facade embeds, session rotation). Homepage contact section removed. Tour page rebuilt (accordion pattern, hero image). Story page rebuilt (staggered timeline, jam origin story). All sub-pages got darkened hero images. Cart icon added to nav. .htaccess URL rewrites, all links updated to clean URLs. Critical JS fixes: GSAP ticker accumulation, Vite HMR double-init, FOUC fix, Barba hash scroll, progress nav cleanup. 6 issues closed.

### March 2026 - Session 14: EPK, Footer, Tour DRY, Design System

EPK split-screen layout. Sitewide footer (3 zones). Tour dates DRY. Design system created. Barba.js async enter fix. BandPilot DB analyzed.

### March 2026 - Session 13: About Images, Quote, Mobile, EPK Scaffold

Replaced about images. New closing quote. Mobile fixes. EPK scaffolded. "The B-side guys" brand insight.
