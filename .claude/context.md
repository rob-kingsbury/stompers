---
project: Stompers
status: In Progress
last_session: 22
session_date: 2026-05-27
current_focus: "JK-redesign rebuild + Drive media library wired up"
open_issues: 11
next_priority: "Max bio + photo; sweep stage plot / tech rider for Kurt -> Max; deploy + cross-device smoke test"
---

# Stompers Redesign Context

> **MAINTENANCE NOTE:** Keep this file under 200 lines. Only retain the 3 most recent session notes. For older history, see git log.

```yaml
project: Swamp City Stompers Website (JK-style redesign)
type: Single-page band site, vanilla PHP/JS

tech:
  build: NONE (no Vite, no GSAP, no Lenis, no Barba). Plain PHP + CSS + JS.
  server: XAMPP Apache (PHP pages)
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
            helpers.php (defines e())
  config: config.php (gitignored - Supabase mgmt token for marquee)
  archive: _archive/site-v2-pre-jk-redesign/ (previous Vite/GSAP site, frozen)
  docs: HANDOFF.md, .claude/context.md

workflow:
  dev: just hit http://localhost/stompers-redesign/ via XAMPP. No build step.
  deploy: SFTP includes/, css/, js/, img/, index.php, contact-handler.php to WHC
  issues: gh issue list --state open

repo:
  github: https://github.com/rob-kingsbury/stompers.git
  branch: main

band:
  Rob:  Guitar / Vocals (founder)
  Jeans: Guitar / Vocals (Eugene)
  Max:  Bass / Vocals (joined session 22, replaced Kurt)
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
  cache_ttl: 60s
  apps_script: data/tour-sheet-setup.gs
  editors: Rob + Eugene

marquee:
  source: bandpilot Supabase songs table (Stompers' top artists by song count)
  api: Supabase Management API SQL endpoint (server-side PHP fetch)
  cache: data/marquee-cache.json, 24h TTL
  fallback: hardcoded curated artist list (Skynyrd, Allmans, Petty, etc.)
  config: config.php holds Supabase access token + Stompers band UUID
  todo: replace with public read endpoint on bandpilot side (cleaner than mgmt API)

drive_media_library:
  spec: see "Drive Media Library" section below
  sheet: https://docs.google.com/spreadsheets/d/1dEuDPF1AuGS-4a0QW-JIBkzDysyEFNjPVa5nzGANIKk/edit
  apps_script: data/roster-sheet-setup.gs (installed in sheet)
```

## Section Status

| Section | Status |
|---------|--------|
| Hero | Complete (logo + tagline + grunge-loop.mp4 background + scroll cue) |
| Marquee (under hero) | Complete (live from bandpilot, 24h cache, fallback) |
| About (4 cards) | Complete (B-sides angle copy; 2 cards still using Unsplash placeholders) |
| Band (4 cards) | Complete in markup; Max has placeholder bio + missing `img/max.jpg` |
| Tour | Complete (live CSV; featured + accordion; show-details modal) |
| Watch | Complete (7 real YouTube IDs, facade -> iframe on click) |
| EPK | Complete (band photo + bio + tags + sets + tech rider folded in) |
| Contact | Complete (real PHP handler, status banner on redirect) |
| Footer | Complete (real socials + booking email) |

## Drive Media Library (session 22)

Decided on Google Drive (not Piwigo, not custom) as the EPK/media layer. Migration to Piwigo is straightforward later if Drive feels limiting.

Structure under "Stompers Band/":
- EPK Press Kit/ (anyone-with-link Viewer; contains Band Photos, Logos, One-Sheet, Stage Plot, Tech Rider, Bio + Quotes, Posters, Promo Videos)
- Show Photos/ (band Viewer)
- Set Lists and Charts/ (band Viewer)
- Inbox - Upload Here/ (band Editor — only upload spigot)
- Admin (Rob Only)/

Access driven by `Stompers - Band Access Roster` Google Sheet + bound Apps Script (`data/roster-sheet-setup.gs`). Roster tab + Tier Rules tab + Sync Log tab. "Stompers" menu has Sync + Dry Run options.

Roster session 22:
- Rob: Admin, robandtherockets@gmail.com
- Jeans (Eugene): Band, eugenejohnson_55@hotmail.com (needs Google account on this address)
- Max: Band, maxlauzon33@gmail.com
- Matt: Band, no email (skipped by sync until provided)

## Recent Changes

### May 2026 - Session 22: JK-Style Rebuild + Drive Media Library + Lineup Change

**Site rebuild.** Archived the entire Vite/GSAP/Lenis/Barba multi-page site to `_archive/site-v2-pre-jk-redesign/` and rebuilt from the `jeans-and-king` design as a single-page vanilla PHP/JS site. Brought forward: live CSV tour pipeline, Stompers logo + grunge video, real YouTube facade with 7 video IDs, real socials + booking email, PHP contact handler. New: marquee pulls live from bandpilot Supabase via Mgmt API + 24h cache, EPK folds in the tech rider, no build step.

**Lineup change.** Kurt left the band; Max joined on bass. Band card swapped (placeholder bio + missing photo flagged). Memory updated. Stage plot SVG and tech rider PDF still reference Kurt — sweep pending.

**Drive media library.** Google Drive set up as the EPK/media store. Folder tree created (EPK Press Kit, Show Photos, Set Lists, Inbox, Admin). Apps Script (`data/roster-sheet-setup.gs`) syncs permissions from the roster sheet to folders. First sync run: 13 grants, 1 skip (Matt, no email), 0 errors.

### May 2026 - Session 21: Google Sheets Tour Feed Live

Connected published Google Sheets CSV as the live tour-date source. Schema: Date | Hour | Minute | AM/PM | Venue | Location | Age | Note. PHP combines time columns into single `time` string. Apps Script installs Stompers menu + date picker + past-show conditional formatting. #22 closed.

### April 2026 - Session 20: Tour Date Updates

Added May 16 Cold Bear Brewery. Brauwerk Hoffman Jul 12 -> Jul 18. Hard Rock Cafe -> Hard Rock Casino with corrected coords.
