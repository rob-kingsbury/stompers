# Stompers Redesign - Handoff

**Last Updated:** 2026-05-27 (Session 22)
**Total Open Issues: 11**

---

## SESSION 22: JK-Style Rebuild + Drive Media Library + Lineup Change

### Site rebuild
Archived the entire Vite/GSAP/Lenis/Barba multi-page site to `_archive/site-v2-pre-jk-redesign/` and rebuilt from the `jeans-and-king` design as a single-page vanilla PHP/JS site. No build step.

Carried over from the old site:
- Live Google Sheets CSV tour pipeline (`includes/tour-dates.php`)
- Stompers logo, `grunge-loop.mp4`, band photos
- 7 real YouTube video IDs in the watch section (facade -> iframe pattern)
- Real socials + `booking@swampcitystompers.ca`
- PHP contact handler (`contact-handler.php`), now with name/email/venue/date/message fields

New:
- Marquee under the hero pulls live from BandPilot's Supabase via the Management API SQL endpoint (server-side, 24h cache in `data/marquee-cache.json`, curated fallback). Top ~20 artists Stompers cover.
- EPK section folds the tech rider in (vocals/guitars/bass/drums/monitors/stage/power/backline) and includes a band photo placeholder instead of the JK stat grid.
- Contact form does a real POST and shows a status banner from `?status=sent|error`.
- `config.php` (gitignored) holds the Supabase mgmt token. `config.example.php` checked in.
- `_archive/` no longer in .gitignore — the previous site is version controlled inside the repo.

### Lineup change
Kurt left, Max joined on bass. Band card swapped (placeholder bio, `img/max.jpg` not yet provided so currently shows broken image). Memory updated. Stage plot SVG + tech rider PDF still mention Kurt — sweep pending.

### Drive media library
Google Drive set up as the EPK/media store. Folder tree: EPK Press Kit (public link), Show Photos, Set Lists and Charts, Inbox - Upload Here, Admin (Rob Only). Posters + Promo Videos moved inside EPK Press Kit.

Apps Script `data/roster-sheet-setup.gs` reads the Roster + Tier Rules tabs on the [Stompers - Band Access Roster sheet](https://docs.google.com/spreadsheets/d/1dEuDPF1AuGS-4a0QW-JIBkzDysyEFNjPVa5nzGANIKk/edit) and syncs Drive folder permissions. Stompers menu in the sheet has Sync + Dry Run. First run: 13 grants, 1 skip (Matt has no email), 0 errors.

---

## NEXT SESSION PRIORITIES

1. **Max's bio + photo.** I need from Rob: gear list, personality angle, signature quote, and a `max.jpg` for `img/`. Then update `includes/band.php` (currently has a placeholder line).
2. **Sweep Kurt -> Max** in `img/stage-plot.svg` and any tech rider PDFs.
3. **Deploy** the new site to WHC and cross-device smoke test (iOS Safari, Android Chrome, desktop).
4. **Replace remaining Unsplash placeholders** in the About cards (cards 2-4 still use Unsplash hotlinks).
5. **Public artist endpoint on bandpilot** to replace the Management API approach for the marquee (cleaner, less privileged).
6. **Backfill tour-sheet start times** (carried over from session 21 - Rob/Eugene need to fill Hour/Minute/AM/PM dropdowns).

---

## OPEN ISSUES (11)

| # | Title | Category |
|---|-------|----------|
| 1 | Mobile: Progress nav hidden on screens < 768px | note (by design) |
| 2 | Band cards: flip animation tuning | animation (legacy; may be obsolete with new design) |
| 5 | Static/lite version of site | enhancement |
| 6 | Hardcoded colors on band cards | css (likely obsolete with new design) |
| 7 | Tour panels: persistent label | enhancement (obsolete - tour panels gone) |
| 8 | Consolidate tour to tour page | enhancement (closed by session 22 — single page) |
| 9 | Gradient blends at image edges | css |
| 10 | JSON config for dynamic content | enhancement |
| 15 | EPK: Add real venue testimonial | enhancement |
| 18 | EPK: Review genre tags and expand For Fans Of | enhancement |
| 19 | EPK: Generate downloadable assets | enhancement |

Several of these (#2, #6, #7, #8) were tied to the old multi-page Vite/GSAP site. Worth a triage pass to close anything obsolete.

---

## KEY FILES

| File | Purpose |
|------|---------|
| `index.php` | Single-page entrypoint, includes all sections |
| `contact-handler.php` | PHP mailer endpoint for the contact form |
| `config.php` | Gitignored. Holds Supabase mgmt token + Stompers band UUID |
| `config.example.php` | Template for above |
| `.htaccess` | Clean URL rewrites + cache headers + gzip (carried over) |
| `includes/helpers.php` | `e()` helper (htmlspecialchars wrapper) |
| `includes/head.php` | <head> meta + fonts + stylesheets |
| `includes/nav.php` | Top nav + mobile menu overlay + progress dots |
| `includes/hero.php` | Logo + tagline + grunge video + scroll cue |
| `includes/marquee.php` | Bandpilot-driven artist marquee with cache + fallback |
| `includes/about.php` | 4 narrative cards (B-sides angle) |
| `includes/band.php` | 4 member cards (Rob/Jeans/Max/Matt) |
| `includes/tour-dates.php` | CSV pipeline (Sheets fetch, geocoding, future-only filter) |
| `includes/tour-section.php` | Featured next show + accordion of upcoming |
| `includes/watch.php` | 7 YouTube videos, facade pattern |
| `includes/epk.php` | Press kit (bio, tags, set lengths, tech rider, mission quote) |
| `includes/contact.php` | Booking form + status display |
| `includes/footer.php` | Logo + socials + booking email |
| `includes/ticket-modal.php` | Show-details modal (Date/Venue/Time/Age/Note/Map) |
| `css/site.css` | All styles. Includes Stompers additions at the bottom. |
| `css/colors_and_type.css` | Design tokens (palette, type, spacing) |
| `js/site.js` | Smooth scroll, scroll-spy, hamburger, accordion, modal, watch facade |
| `data/tour-cache.json` | 60s CSV cache (gitignored, auto-created) |
| `data/marquee-cache.json` | 24h artist cache (gitignored, auto-created) |
| `data/geo-cache.json` | Permanent venue coords (DO NOT delete) |
| `data/tour-sheet-setup.gs` | Apps Script for the tour sheet |
| `data/roster-sheet-setup.gs` | Apps Script for the band roster + Drive sync |
| `_archive/site-v2-pre-jk-redesign/` | Frozen previous site (Vite/GSAP/Lenis/Barba) |

---

## TOUR SHEET — OPERATIONS NOTE

- Published CSV URL is in `includes/tour-dates.php` (`SHEETS_CSV_URL`)
- Edits in the sheet appear on the site within ~60 seconds (cache TTL)
- New venues geocode once via Nominatim on first fetch, then cache permanently in `data/geo-cache.json`

## DRIVE ROSTER — OPERATIONS NOTE

- Sheet: [Stompers - Band Access Roster](https://docs.google.com/spreadsheets/d/1dEuDPF1AuGS-4a0QW-JIBkzDysyEFNjPVa5nzGANIKk/edit)
- Apps Script: `data/roster-sheet-setup.gs` (pasted into the sheet's Extensions -> Apps Script)
- To add a band member: add a row in Roster tab, set Access Tier (Admin/Band), Status Active, then Stompers menu -> Sync Drive Permissions
- Add-only sync: never revokes. Set Status=Inactive to stop adding; manually revoke in Drive for removal.

---

**Continue with:** Max's bio + photo from Rob. Then sweep stage plot / tech rider for Kurt -> Max. Then deploy + cross-device smoke test.
