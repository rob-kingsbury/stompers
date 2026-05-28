---
project: Stompers
status: In Progress
last_session: 22
session: 23
session_date: 2026-05-27
current_focus: "Round-5 polish + Drive integration complete; awaiting Max bio + deploy"
open_issues: 11
next_priority: "Max bio + photo (#23); deploy round-2 site to WHC + cross-device smoke test"
---

# Stompers Redesign Context

> **MAINTENANCE NOTE:** Keep this file under 200 lines. Only retain the 3 most recent session notes. For older history, see git log.

```yaml
project: Swamp City Stompers Website (JK-style redesign)
type: Single-page band site, vanilla PHP/JS

tech:
  build: NONE (no Vite, no GSAP, no Lenis, no Barba). Plain PHP + CSS + JS.
  server: XAMPP Apache locally; WHC shared hosting in prod
  css: Vanilla CSS with CSS variables (oxblood/gold/parchment palette)
  js: Vanilla JS (ES6+), IntersectionObserver scroll reveals
  type_stack: Patua One + IM Fell English SC + Libre Caslon + Special Elite
  scroll: CSS scroll-behavior: smooth (no Lenis)

paths:
  master: index.php (single-page, all sections via includes)
  css: css/site.css + css/colors_and_type.css
  js: js/site.js
  includes: includes/head.php, nav.php, hero.php, marquee.php, about.php,
            band.php, tour-section.php, tour-dates.php (data),
            watch.php, epk.php, contact.php, footer.php, ticket-modal.php,
            helpers.php
  config: config.php (gitignored) — legacy Supabase mgmt token; marquee no longer uses it
  archive: _archive/site-v2-pre-jk-redesign/ (previous Vite/GSAP site, frozen)
  docs: handoff.md, .claude/context.md

workflow:
  dev: http://localhost/stompers-redesign/ via XAMPP. No build step.
  deploy: SFTP includes/, css/, js/, img/, index.php, contact-handler.php to WHC
  issues: gh issue list --state open

repo:
  github: https://github.com/rob-kingsbury/stompers.git
  branch: main

band:
  Rob:  Guitar / Vocals (founder)
  Jeans: Guitar / Vocals (Eugene)
  Max:  Bass / Vocals (joined session 22, replaced Kurt; bio + photo pending #23)
  Matt: Drums

socials:
  facebook: https://www.facebook.com/swampcitystompers
  instagram: https://www.instagram.com/swamp_city_stompers
  youtube_playlist: https://youtube.com/playlist?list=PLy1-_1Va1knJ8knIMNVISzCq9HsexLwf-
  booking: booking@swampcitystompers.ca

tour_sheet:
  source: Google Sheets CSV (published)
  schema: Date | Hour | Minute | AM/PM | Venue | Location | Age | Note
  url_const: SHEETS_CSV_URL in includes/tour-dates.php
  cache_ttl: 60s
  apps_script: data/tour-sheet-setup.gs
  past_shows: includes HISTORICAL_SHOWS const merged into the feed
              (currently: Mar 1 2025 Busters; Apr 18 2025 The Neighbourhood Pub)
  editors: Rob + Eugene

marquee:
  source: hardcoded array in includes/marquee.php (25 artists, edit to change)
  history: was BandPilot Mgmt API w/ 24h cache; switched to hardcoded session 22

drive_media_library:
  spec: see "Drive Media Library" section in HANDOFF.md
  roster_sheet: https://docs.google.com/spreadsheets/d/1dEuDPF1AuGS-4a0QW-JIBkzDysyEFNjPVa5nzGANIKk/edit
  apps_script: data/roster-sheet-setup.gs
  drive_access: Drive MCP connector authorized as robandtherockets@gmail.com.
                Read + copy operations work. No delete/move via MCP — manual cleanup needed.
```

## Section Status

| Section | Status |
|---------|--------|
| Hero | Complete (logo + tagline + grunge-loop.mp4 background + scroll cue; sleazy stamp removed) |
| Marquee | Complete (hardcoded 25-artist staggered list, no pause-on-hover) |
| About (4 cards) | Complete (real Stompers photos; B-sides copy; placeholder cites under each quote pending real ones — #25 captures one from @roseyxiphoto) |
| Band (4 cards) | Complete in markup; Max has placeholder bio + missing img/max.jpg (#23) |
| Tour | Complete (live CSV + HISTORICAL_SHOWS, chronological sort, featured map-background card, accordion no pre-expand, past-shows archive modal) |
| Watch | Complete (7 real YouTube IDs, facade-to-iframe; videos for Promo Videos pending YouTube upload #26) |
| EPK | Complete v1 (band photo + bio + tags + sets + tech rider + mission quote; Rob will provide deeper EPK direction) |
| Contact | Complete (real PHP handler + honeypot + status banner) |
| Footer | Complete (real socials + Booking link = #contact) |

## Recent Changes

### Session 22 (2026-05-27): Multi-round redesign + Drive integration

12-commit session. Rebuilt the entire site from JK design (single-page vanilla PHP/JS, no build step). Added Drive media library with Apps Script permission sync. Pulled 7 real band photos from Max's Drive Inbox and wired into About + EPK. Marquee artist list curated. Ticket modal got real CSS-mask perforations + restructured close-button positioning. Footer Booking link → #contact. Progress sidebar nav removed. 5 obsolete issues closed; 5 new follow-up issues created. Lineup change: Kurt → Max on bass.

### Session 21 (earlier): Google Sheets Tour Feed Live

Connected published CSV as the live tour-date source. Apps Script for tour sheet installed.

### Session 20 (earlier): Tour Date Updates

Added May 16 Cold Bear Brewery. Brauwerk Hoffman Jul 12 → Jul 18. Hard Rock Cafe → Hard Rock Casino with corrected coords.
