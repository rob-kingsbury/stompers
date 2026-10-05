---
project: Stompers
status: In Progress
last_session: 25
session: 26
session_date: 2026-10-05
last_updated: 2026-10-05
current_focus: "Site is LIVE at swampcitystompers.ca. Post-launch polish."
open_issues: 12
continue_with: "Band re-jig once new bass player info arrives (#23); then deploy Michel card"
next_priority: "Band re-jig once new bass player info arrives (#23); real testimonials (#15/#25)"
blockers: "Waiting on Rob for new bass player name, photo, bio, faves"
---

# Stompers Redesign Context

> **MAINTENANCE NOTE:** Keep this file under ~2000 tokens. Retain the 3 most recent session notes only. Older history: git log.

## To Resume

Session 26. main is AHEAD of prod: Michel (drums/vocals, replaces Matt) card + img/michel.jpg committed but NOT deployed (Rob: hold). New bass player also coming (replaces Max). THIS WINDOW: when Rob brings the bassist's info, re-jig the band cards (#23), then deploy both changes together.

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
  Rob: Guitar/Vocals (founder) | Jeans: Guitar/Vocals | Bass: new player TBD (Max on site) | Michel Smithers: Drums/Vocals (local only)

tour_sheet:
  source: Google Sheets published CSV (SHEETS_CSV_URL in includes/tour-dates.php)
  schema: Date(YYYY-MM-DD) | Hour | Minute | AM/PM | Venue | Location | Age | Note
  cache_ttl: 60s (data/tour-cache.json). Sort is chronological in-code (usort), sheet order ignored.
  show_id: date + venue slug (tour-dates.php). Also the .ics UID, so re-adding a changed show
           overwrites the old entry. Changing date or venue makes a new id.
  past_shows: HISTORICAL_SHOWS const merged into feed

marquee:
  source: hardcoded array in includes/marquee.php (edit to change)

deploy:
  host: WHC, ssh alias `whc-hellopebble` (72.251.7.108:27), creds in ../.credentials/whc-hosting.md
  prod_docroot: /home/debl4277/public_html  (swampcitystompers.ca is PARKED here)
  staging: /home/debl4277/staging.swampcitystompers.ca (own docroot, real staging URL)
  method: tar bundle + scp + extract over ssh (no rsync on local Win). Bundle =
          index.php calendar.php contact-handler.php includes/ css/ js/ img/ data/geo-cache.json + clean .htaccess.
          Exclude config.php, .claude, _archive, *.md, caches, .git.
          Write the tarball to a RELATIVE path: Git Bash tar reads "C:" as a remote host.
  preserved_in_public_html: cgi-bin, .well-known
  backups_on_server: ~/public_html-backup-20260710.tgz, ~/staging-scs-backup-20260710.tgz,
                     ~/public_html-pre-calendar-20261002.tgz, ~/audit-tool-backup-20261002.tgz
  robkingsbury.com: separate site on VERCEL (76.76.21.21) — NOT this server, unaffected by deploys
```

## Section Status

All sections Complete and LIVE. Open follow-ups per section:
- **Tour:** "Add to calendar" on featured show + every accordion row (s24). Not in the show-details modal. Subscribe feed filtered by area is #29.
- **Band:** Prod still shows Max + Matt. Local main has Michel replacing Matt (photo denoised, face still motion-blurred; a sharper shot would beat it). Bass card waits on the new player (#23).
- **About:** 4 testimonial cites are `[Venue]/[Year]` placeholders (real ones #15/#25)
- **EPK:** "EPK PDF · coming soon" button — real PDF pending (#19)
- **Watch:** promo videos pending YouTube upload (#26)

## Recent sessions

### Session 25 (2026-10-05): Michel on drums
Lineup change: Michel Smithers (drums/vocals) replaces Matt; a new bass player replaces Max, details pending. Added Michel's card locally (first name only, like the others; bio written from his faves, Rob to check) and a cropped, denoised img/michel.jpg. Not deployed on Rob's say: band gets re-jigged once in one go when the bassist's info lands.

### Session 24 (2026-10-02): Add-to-calendar
Shipped an .ics link for every upcoming show (calendar.php), deployed to prod and verified live. Decided: plain .ics, not a subscription feed (lands as a separate calendar) and not email invites (only route to true auto-update; needs a fan email list, a sheet-change cron and reliable mail from WHC, parked until a mailing list exists). Filed #29 for a subscribe feed filterable by area. Deleted the orphaned audit tool from prod (backed up first), closing #28. Added filemtime cache-busting to site.css/site.js after finding returning visitors never got CSS changes. 5-session memory audit ran.

### Session 23 (2026-07-10): DEPLOYED — site is live
Max bio + photo shipped. Pulled fabricated venue testimonials back to placeholders. Deployed the full rebuild to WHC via staging first. Fixed tour time zero-pad. Filed #28.

## Gotchas
- No `overflow:hidden` on html/body (breaks sticky). Use `overflow-x:clip` on a wrapper.
- Deploy needs SSH auth into WHC prod — classifier requires the user to name the host/action.
- Clear `data/tour-cache.json` on server after a tour-dates.php change to force rebuild (else 60s wait).
- Chrome window resize won't go below ~500px; check 375px with a same-origin 375px iframe instead.
