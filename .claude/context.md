---
project: Stompers
status: In Progress
last_session: 18
session_date: 2026-04-17
current_focus: "Mobile accordion fix, band card images"
open_issues: 12
next_priority: "Connect Google Sheets (#22), verify accordion on real iOS"
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

### April 2026 - Session 18: Mobile Accordion Fix, Band Card Images

iOS accordion fixed: data-lenis-prevent on list, touchend delta guard, tour-list-section forced visible on mobile. Band card images 200px with object-position:top (faces visible). #21 closed.

### April 2026 - Session 17: Tour Date Fix, Sheets Integration, Mobile CSS Fixes

Hard Rock Cafe corrected to Apr 30. Hero tagline font-size reverted. Google Sheets + Nominatim infrastructure built in tour-dates.php — waiting on CSV URL to activate (#22).

### April 2026 - Session 16: Production Deploy, Mobile Audit, Performance

Site live at swampcitystompers.ca. vite.php fixed for production. bfcache reload handler, IntersectionObserver footer, WebP logo, deferred video, cache headers. Mobile audit pass.

