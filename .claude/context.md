---
project: Stompers
status: In Progress
last_session: 20
session_date: 2026-04-28
current_focus: "Tour date updates"
open_issues: 12
next_priority: "Verify maps on live, then accordion on real iOS, then Google Sheets (#22)"
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

### April 2026 - Session 20: Tour Date Updates

Added May 16 Cold Bear Brewery (Arnprior, pre-cached coords). Brauwerk Hoffman Jul 12 -> Jul 18. Hard Rock Cafe -> Hard Rock Casino (Albion Rd, south Ottawa) with corrected coords.

### April 2026 - Session 19: Mobile Fixes, Security, Collab Audit

Band card images: width:100% + per-member object-position. Tour page scroll-to-top fixed (scrollRestoration=manual). See All Dates links to tour.php. Soren+Atlas audit: accordion code correct. Security: email injection, e() helper, OG image, eager map iframes.

### April 2026 - Session 18: Mobile Accordion Fix, Band Card Images

iOS accordion fixed: data-lenis-prevent, touchend delta guard, tour section forced visible. Band card images 200px + object-position per member. #21 closed.

