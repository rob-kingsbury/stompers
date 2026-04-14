---
project: Stompers
status: In Progress
last_session: 16
session_date: 2026-04-13
current_focus: "Mobile accordion fix, EPK genre review"
open_issues: 12
next_priority: "Fix mobile accordion (#21), EPK genre/fans-of review (#18)"
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

### April 2026 - Session 16: Production Deploy, Mobile Audit, Performance

Site live at swampcitystompers.ca. vite.php fixed for production. bfcache reload handler added. Footer reveal switched to IntersectionObserver. WebP logo, deferred video, cache headers, font-display=swap. Tour dates updated (10 shows). Mobile audit: accordion max-height, footer map, EPK flex, contact font-size 16px, touch targets, ellipsis truncation, watch-thumbs scroll. Open bug: homepage accordion unresponsive on iOS (#21).

### March 2026 - Session 15: Footer Cleanup, Watch, Tour, Story, URL Rewrites, JS Fixes

Footer simplified (solid black). Watch section (YouTube facade embeds). Tour/Story pages rebuilt. .htaccess URL rewrites. GSAP ticker fix, Vite HMR guard, FOUC fix, Barba hash scroll. 6 issues closed.

### March 2026 - Session 14: EPK, Footer, Tour DRY, Design System

EPK split-screen layout. Sitewide footer (3 zones). Tour dates DRY. Design system created. Barba.js async enter fix.
