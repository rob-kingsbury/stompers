---
project: Stompers
status: In Progress
last_session: 23
session: 24
session_date: 2026-07-10
current_focus: "Site is LIVE at swampcitystompers.ca (new rebuild deployed to WHC). Post-launch polish."
open_issues: 12
next_priority: "Remove orphaned audit.php from public_html (#28); Max 'For Fans Of' bands (#23); real testimonials (#15/#25)"
blockers: none
---

# Stompers Redesign Context

> **MAINTENANCE NOTE:** Keep this file under ~2000 tokens. Retain the 3 most recent session notes only. Older history: git log.

```yaml
project: Swamp City Stompers Website (JK-style redesign)
type: Single-page band site, vanilla PHP/JS. No build step.

tech:
  server: XAMPP Apache locally; WHC shared hosting in prod
  css: css/site.css (components) + css/colors_and_type.css (tokens). Oxblood/gold/parchment.
  js: js/site.js. IntersectionObserver reveals, no animation lib
  type_stack: Patua One + IM Fell English SC + Libre Caslon + Special Elite

paths:
  master: index.php (single page, all sections via includes)
  includes: head, nav, hero, marquee, about, band, tour-section, tour-dates (data),
            watch, epk, contact, footer, ticket-modal, helpers
  config: config.php (gitignored) — legacy Supabase token; NOT required by live site (marquee is hardcoded)
  archive: _archive/site-v2-pre-jk-redesign/ (old Vite/GSAP site, frozen)

repo:
  github: https://github.com/rob-kingsbury/stompers.git  (branch: main)

band:
  Rob: Guitar/Vocals (founder) | Jeans: Guitar/Vocals | Max: Bass/Vocals | Matt: Drums

tour_sheet:
  source: Google Sheets published CSV (SHEETS_CSV_URL in includes/tour-dates.php)
  schema: Date(YYYY-MM-DD) | Hour | Minute | AM/PM | Venue | Location | Age | Note
  cache_ttl: 60s (data/tour-cache.json). Sort is chronological in-code (usort), sheet order ignored.
  minute note: sheet stores minute as int (0 not 00); code zero-pads (fixed s23).
  past_shows: HISTORICAL_SHOWS const merged into feed

marquee:
  source: hardcoded array in includes/marquee.php (edit to change)

deploy:  # NEW as of session 23 — site is LIVE
  host: WHC, ssh alias `whc-hellopebble` (72.251.7.108:27), creds in ../.credentials/whc-hosting.md
  prod_docroot: /home/debl4277/public_html  (swampcitystompers.ca is PARKED here)
  staging: /home/debl4277/staging.swampcitystompers.ca (own docroot, real staging URL)
  method: tar bundle + scp + extract over ssh (no rsync on local Win). Bundle =
          index.php contact-handler.php includes/ css/ js/ img/ data/geo-cache.json + clean .htaccess.
          Exclude config.php, .claude, _archive, *.md, caches, .git.
  preserved_in_public_html: audit.php family (orphaned, #28), cgi-bin, .well-known
  backups_on_server: ~/public_html-backup-20260710.tgz, ~/staging-scs-backup-20260710.tgz
  robkingsbury.com: separate site on VERCEL (76.76.21.21) — NOT this server, unaffected by deploys
```

## Section Status

All sections Complete and LIVE. Open follow-ups per section:
- **Band:** Max photo + bio live; "For Fans Of" still "(coming soon)" (#23)
- **About:** 4 testimonial cites are `[Venue]/[Year]` placeholders (fabricated ones pulled s23; real ones #15/#25)
- **EPK:** "EPK PDF · coming soon" button — real PDF pending (#19); genre tags final (Southern rock gold)
- **Watch:** promo videos pending YouTube upload (#26)

## Recent sessions

### Session 23 (2026-07-10): DEPLOYED — site is live
Max bass bio (real, "Lady Soul" run) + photo shipped. **Pulled fabricated venue testimonials** (invented names/venues) from About + EPK back to placeholders. EPK dead PDF link → "coming soon". Southern rock restored to gold tag. Verified tour feed sorts chronologically. **Deployed the full rebuild to WHC**: staged to staging.swampcitystompers.ca first (verified live PHP render), then cut over prod by deploying into public_html (swampcitystompers.ca is parked there). Discovered robkingsbury.com is on Vercel, not entangled — earlier "shared docroot" assumption was wrong. Fixed tour times `7:0 PM`→`7:00 PM` (minute zero-pad). Filed #28 (orphaned audit.php cleanup).

### Session 22 (2026-05-27): Rebuild + Drive integration
12-commit session. Rebuilt entire site from JK design (single-page vanilla PHP, no build). Drive media library + Apps Script permission sync. 7 real band photos into About + EPK. Ticket modal perforations. Lineup: Kurt → Max on bass.

### Session 21: Google Sheets tour feed live
Connected published CSV as live tour source. Apps Script for tour sheet installed.

## Gotchas
- No `overflow:hidden` on html/body (breaks sticky). Use `overflow-x:clip` on a wrapper.
- Deploy needs SSH auth into WHC prod — classifier requires the user to name the host/action.
- Clear `data/tour-cache.json` on server after a tour-dates.php change to force rebuild (else 60s wait).
