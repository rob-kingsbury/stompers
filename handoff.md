---
project: stompers
session: 23
last_updated: 2026-05-27
continue_with: "Max bio + photo (#23); deploy round-2 site to WHC + cross-device smoke test; capture @roseyxiphoto testimonial into copy (#25); upload promo videos to YouTube + wire watch section (#26); Drive Inbox cleanup (#27)"
blockers: "Max's bio + photo not yet provided. img/max.jpg renders as broken-image on the band card. Stage plot SVG + tech rider PDFs still reference Kurt (#24)."
---

# Stompers Redesign - Handoff

**Total Open Issues:** 11

---

## SESSION 22 (current): Multi-round redesign + Drive integration

The whole site was rebuilt this session. Major moves:

### Site rebuild (rounds 1-3)
- Archived the entire Vite/GSAP/Lenis/Barba multi-page site to `_archive/site-v2-pre-jk-redesign/` and rebuilt from `jeans-and-king` as a single-page vanilla PHP/JS site. No build step.
- Carried over: live Google Sheets CSV tour pipeline, Stompers logo, `grunge-loop.mp4`, PHP contact handler, 7 real YouTube facade videos.
- New: marquee with hardcoded artist list (25 artists, edit `includes/marquee.php` to change), past-shows archive modal with paginated fade-in, ticket-style show-details modal with real CSS-masked perforated edges, real Stompers photos replacing every Unsplash placeholder, "FOR FANS OF" line on each band card, Google Maps iframe as background of the featured next-show card, honeypot field on contact form, EPK section with band photo + tech rider folded in.
- Removed: Vite/GSAP/Lenis/Barba, sleazy-rock hero stamp, sticky sidebar progress-nav, EPK stat grid, "PRESS KIT V1" eyebrow, EPK genre tagline, About card numeric eyebrows, "MEMBER · 0N" band card label.

### Lineup change
Kurt left the band; Max joined on bass. Memory updated, band card swapped to placeholder, follow-up issue #23 tracks the photo + bio.

### Drive media library
Google Drive set up as the EPK/media store. Folder tree created and populated. Apps Script `data/roster-sheet-setup.gs` syncs Drive folder permissions from the band roster Google Sheet. First sync: 13 grants, 1 skip (Matt no email), 0 errors. Max uploaded 12 files to Inbox; I curated them into Band Photos (Hi-Res), Show Photos, and Promo Videos folders via the Drive MCP connector. Originals still in Inbox pending Rob's manual cleanup (#27).

### Round-4 photo pass
Pulled 7 band photos from Max's Inbox uploads, cropped the venue name out of the wide theatre shot, replaced all 4 About card images and the EPK sidebar photo. Real Stompers content everywhere now.

### Round-5 polish
Marquee artist list edited (remove Cake/Brooks-Dunn/Aretha/April Wine; replace Cash/Nelson with Johnny Cash; add Doobies/Hank Jr./SRV/Freddie King/JJ Cale/Georgia Satellites/Marvin Gaye; remove Brad Paisley; stagger order). Ticket secondary CLOSE button got a scoped visible style on parchment. Footer "Booking" link points to `#contact` not mailto.

Commits this session: `fe38b69`, `5f37a76`, `1e19d93`, `657761c`, `47bd3f9`, `4630576`, `8534cee`, `6359e99`, `43fd6e4`, `ed6d2f5`, `0ef37bb`, `999b14c` plus the session-23 handoff commit.

---

## SESSION 21: Google Sheets Tour Feed Live

Connected published Google Sheets CSV as the live tour-date source. Schema: Date | Hour | Minute | AM/PM | Venue | Location | Age | Note. PHP combines time columns into single `time` string. Apps Script installs Stompers menu + date picker + past-show conditional formatting.

---

## NEXT SESSION PRIORITIES

1. **Max bio + photo** (#23) — drop `img/max.jpg`, fill bio + favourite bands in `includes/band.php`
2. **WHC SFTP deploy** of the new site + cross-device smoke test (iOS Safari, Android Chrome, desktop)
3. **Sweep Kurt → Max** in `img/stage-plot.svg` + tech rider PDFs (#24)
4. **Capture @roseyxiphoto testimonial** into About copy (#25)
5. **Upload promo videos to YouTube** + add to `includes/watch.php` (#26)
6. **Drive Inbox cleanup** — delete originals after verifying copies (#27)
7. **EPK content pass** — Rob will provide direction soon (full EPK addressed shortly per Rob)

---

## OPEN ISSUES (11)

| # | Title | Category |
|---|-------|----------|
| 5 | Static/lite version of site | enhancement |
| 9 | Gradient blends at image edges | css |
| 10 | JSON config for dynamic content | enhancement |
| 15 | EPK: Add real venue testimonial | enhancement |
| 18 | EPK: Review genre tags and expand For Fans Of | enhancement |
| 19 | EPK: Generate downloadable assets | enhancement |
| 23 | Band card: Max photo + bio + favourite bands | enhancement |
| 24 | Stage plot + tech rider Kurt → Max sweep | enhancement |
| 25 | EPK: capture @roseyxiphoto testimonial | enhancement |
| 26 | Watch: pull promo videos from YouTube once uploaded | enhancement |
| 27 | Drive Inbox cleanup: delete originals | enhancement |

Closed this session: #1, #2, #6, #7, #20 (all obsolete after the rebuild).

---

## KEY FILES

| File | Purpose |
|------|---------|
| `index.php` | Single-page entrypoint, includes all sections |
| `contact-handler.php` | PHP mailer endpoint + honeypot reject |
| `config.php` | Gitignored. Holds Supabase mgmt token (legacy — marquee now hardcoded, may remove later) |
| `config.example.php` | Template for above |
| `.htaccess` | Clean URL rewrites + cache headers + gzip |
| `includes/helpers.php` | `e()` helper |
| `includes/head.php` | Head meta + fonts + stylesheets |
| `includes/nav.php` | Top nav + mobile menu overlay (progress-nav removed) |
| `includes/hero.php` | Logo + tagline + grunge video + scroll cue |
| `includes/marquee.php` | Hardcoded artist marquee (25 names, edit array to change) |
| `includes/about.php` | 4 narrative cards with real Stompers photos + B-sides angle |
| `includes/band.php` | 4 member cards (Rob/Jeans/Max/Matt) with For-fans-of lines |
| `includes/tour-dates.php` | CSV pipeline + HISTORICAL_SHOWS + chronological sort + past_shows split |
| `includes/tour-section.php` | Featured next show (map background) + accordion + past-shows archive modal trigger |
| `includes/watch.php` | 7 YouTube videos, facade pattern |
| `includes/epk.php` | Press kit (bio, tags, set lengths, tech rider, mission quote) |
| `includes/contact.php` | Booking form with honeypot + status display |
| `includes/footer.php` | Logo + socials + Booking link (#contact) |
| `includes/ticket-modal.php` | Show-details modal (.ticket-frame wrapper + perforated .ticket inside) |
| `css/site.css` | All styles |
| `css/colors_and_type.css` | Design tokens |
| `js/site.js` | Smooth scroll, scroll-spy, hamburger, accordion, modal, watch facade, archive modal |
| `data/tour-cache.json` | 60s CSV cache (gitignored, auto) |
| `data/marquee-cache.json` | Legacy 24h cache (gitignored, may remove) |
| `data/geo-cache.json` | Permanent venue coords (DO NOT delete) |
| `data/tour-sheet-setup.gs` | Apps Script for the tour sheet |
| `data/roster-sheet-setup.gs` | Apps Script for the band roster + Drive sync |
| `_archive/site-v2-pre-jk-redesign/` | Frozen previous site |

---

## DRIVE STRUCTURE (Google Drive)

```
Stompers Band/
├── EPK Press Kit/                  (public link = Viewer; band = Viewer; Rob = Editor)
│   ├── Band Photos (Hi-Res)/       (5 marquee variants)
│   ├── Logos/                      (empty)
│   ├── One-Sheet/                  (empty)
│   ├── Stage Plot/                 (empty)
│   ├── Tech Rider/                 (empty)
│   ├── Bio and Quotes/             (empty)
│   ├── Posters/                    (empty)
│   └── Promo Videos/               (5 video files)
├── Show Photos/                    (2 Busters live shots)
├── Set Lists and Charts/           (empty)
├── Inbox - Upload Here/            (band Editor) — originals pending cleanup (#27)
└── Admin (Rob Only)/               (Rob only)
```

Roster sheet: https://docs.google.com/spreadsheets/d/1dEuDPF1AuGS-4a0QW-JIBkzDysyEFNjPVa5nzGANIKk/edit
Apps Script source: `data/roster-sheet-setup.gs`. Stompers menu → Sync Drive Permissions. Add-only; manual revoke in Drive.

---

**Continue with:** Max bio + photo (#23). Then deploy + cross-device smoke test. Then EPK content pass.
