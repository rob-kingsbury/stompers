---
project: Stompers
status: In Progress
last_session: 26
session: 27
session_date: 2026-10-09
last_updated: 2026-10-09
current_focus: "Site is LIVE at swampcitystompers.ca. Post-launch polish."
open_issues: 12
continue_with: "Swap in real Westfest group photos when Rob has them (#30); real testimonials (#15/#25)"
next_priority: "Real group photos (#30); real testimonials (#15/#25); tech rider PDF (#24)"
blockers: "Waiting on Westfest group photos and a real venue testimonial"
---

# Stompers Redesign Context

> **MAINTENANCE NOTE:** Keep this file under ~2000 tokens. Retain the 3 most recent session notes only. Older history: git log.

## To Resume

Session 27. main = prod (everything from s26 deployed and verified live). THIS WINDOW: when Rob brings Westfest group photos, replace the five placeholders in About + EPK (#30), then retire the old-lineup band-*.jpg files.

```yaml
project: Swamp City Stompers Website (JK-style redesign)
type: Single-page band site, vanilla PHP/JS. No build step.

tech:
  server: XAMPP Apache locally; WHC shared hosting in prod
  css: css/site.css (components) + css/colors_and_type.css (tokens). Oxblood/gold/parchment.
  js: js/site.js. IntersectionObserver reveals, no animation lib
  cache_bust: head.php / index.php append ?v=filemtime to site.css + site.js (.htaccess caches them 1 year)
  type_stack: Patua One + IM Fell English SC + Libre Caslon + Special Elite

paths:
  master: index.php (single page, all sections via includes)
  calendar: calendar.php?show=<id> serves one upcoming show as .ics (3h set, all-day if no time)
  includes: head, nav, hero, marquee, about, band, tour-section, tour-dates (data),
            watch, epk, contact, footer, ticket-modal, helpers
  config: config.php (gitignored) — legacy Supabase token; NOT required by live site (marquee is hardcoded)
  archive: _archive/site-v2-pre-jk-redesign/ (old Vite/GSAP site, frozen)

repo:
  github: https://github.com/rob-kingsbury/stompers.git  (branch: main)

band:
  Rob: Guitar/Vocals (co-founder) | Jeans (Eugene Johnson): Guitar/Vocals (co-founder)
  Kyle McKey: Bass/Vocals | Mich Smithers: Drums/Vocals (img/michel.jpg)
  Selling point: tight four-part harmonies + A-side and B-side favourites

tour_sheet:
  source: Google Sheets published CSV (SHEETS_CSV_URL in includes/tour-dates.php)
  schema: Date(YYYY-MM-DD) | Hour | Minute | AM/PM | Venue | Location | Age | Note
  cache_ttl: 60s (data/tour-cache.json). Sort is chronological in-code (usort), sheet order ignored.
  show_id: date + venue slug. Also the .ics UID.
  past_shows: HISTORICAL_SHOWS const merged into feed

marquee:
  source: hardcoded array in includes/marquee.php (edit to change)

deploy:
  host: WHC, ssh alias `whc-hellopebble` (72.251.7.108:27), creds in ../.credentials/whc-hosting.md
  prod_docroot: /home/debl4277/public_html  (swampcitystompers.ca is PARKED here)
  staging: /home/debl4277/staging.swampcitystompers.ca
  method: tar only the changed files + scp + extract over ssh; tar the live copies to ~/public_html-pre-<what>-<date>.tgz first.
          Write the tarball to a RELATIVE path: Git Bash tar reads "C:" as a remote host.
  preserved_in_public_html: cgi-bin, .well-known
  robkingsbury.com: separate site on VERCEL — NOT this server
```

## Section Status

All sections Complete and LIVE. Open follow-ups:
- **About:** Sound / Vibe / Road cards. The Mission card is hidden in an `if (false)` block. All 4 testimonial quotes are hidden in PHP comments with markup kept; swap in real text (#15/#25). Group photos are AI placeholders + a collage (#30); wide shots use `.about-card-img--wide` (16:9, no zoom) so end members aren't cropped.
- **EPK:** "From the rooms" quotes hidden (#15). PDF button pending (#19). Tech rider PDF pending (#24); stage plot SVG is current.
- **Tour:** subscribe feed filtered by area is #29.
- **Watch:** promo videos pending YouTube upload (#26)

## Recent sessions

### Session 26 (2026-10-09): New lineup live
Kyle McKey (bass) and Mich Smithers (drums) replaced Max and Michel/Matt on the band cards and stage plot; Rob and Jeans both "Co-founder". Copy across hero, About, EPK and meta now pushes four-part harmonies and A/B-side favourites. Hid the made-up testimonials and The Mission card. Group photos replaced with two Gemini group shots and a collage of the band cards. Decided: AI can't reliably hold four real faces; only Gemini Pro (not the Flash fallback) got close, from one tight face file per person. Placeholders only, real Westfest shots next (#30). All deployed and verified live.

### Session 25 (2026-10-05): Michel on drums
Lineup change started: drummer card + img/michel.jpg, held from prod until the bassist's info arrived (done s26).

### Session 24 (2026-10-02): Add-to-calendar
Shipped an .ics link for every upcoming show (calendar.php). Decided: plain .ics, not a subscription feed or email invites. Filed #29. Added filemtime cache-busting to site.css/site.js. 5-session memory audit ran.

## Gotchas
- No `overflow:hidden` on html/body (breaks sticky). Use `overflow-x:clip` on a wrapper.
- Prod deploys are blocked by the classifier unless Rob says "deploy" in that message.
- Clear `data/tour-cache.json` on server after a tour-dates.php change to force rebuild (else 60s wait).
- Headless Chrome screenshots: the hero is 100vh and fills any tall window; use Rob's Chrome and scrollIntoView instead. Window won't go below ~500px.
- Can't nest PHP `/* */` comments: hide a block that already contains one with `<?php if (false): ?>`.
