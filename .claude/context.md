---
project: Stompers
status: In Progress
last_session: 21
session_date: 2026-05-27
current_focus: "Google Sheets tour feed live"
open_issues: 11
next_priority: "Backfill start times in sheet, then iOS accordion verify, then EPK (#18/#19)"
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
  deploy: npm run deploy (build + tar + scp + untar on whc-hellopebble)
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

tour_sheet:
  source: Google Sheets CSV (published)
  schema: Date | Hour | Minute | AM/PM | Venue | Location | Age | Note
  url_const: SHEETS_CSV_URL in includes/tour-dates.php
  cache_ttl: 60s (deploy also clears tour-cache.json on the live server)
  apps_script: data/tour-sheet-setup.gs (installed in sheet's Apps Script editor)
  editors: Rob + Eugene
```

## Section Status

| Section | Status | Page Status |
|---------|--------|-------------|
| Progress Nav | Complete | index.php - Complete |
| Hero | Complete (logo anim + grunge video) | tour.php - Complete (accordion list) |
| About | Complete | merch.php - Complete |
| Band Cards | Complete | story.php - Complete (timeline) |
| Tour | Complete (homepage cards + accordion, Sheets-driven) | epk.php - Split Screen (functional) |
| Watch | Complete (YouTube facade embeds) | contact.php - Not Started |
| Footer | Complete (next show + utility strip, with time) | |

## Recent Changes

### May 2026 - Session 21: Google Sheets Tour Feed Live

Connected published Google Sheets CSV as the live tour-date source. Schema: Date | Hour | Minute | AM/PM | Venue | Location | Age | Note. PHP combines time columns into single `time` string surfaced on big card, both accordions, and footer Next Show line. Apps Script (`data/tour-sheet-setup.gs`) installs Stompers menu + date picker + dropdowns + past-show conditional formatting. Deployed. #22 closed.

### April 2026 - Session 20: Tour Date Updates

Added May 16 Cold Bear Brewery (Arnprior, pre-cached coords). Brauwerk Hoffman Jul 12 -> Jul 18. Hard Rock Cafe -> Hard Rock Casino (Albion Rd, south Ottawa) with corrected coords.

### April 2026 - Session 19: Mobile Fixes, Security, Collab Audit

Band card images: width:100% + per-member object-position. Tour page scroll-to-top fixed (scrollRestoration=manual). See All Dates links to tour.php. Soren+Atlas audit: accordion code correct. Security: email injection, e() helper, OG image, eager map iframes.
