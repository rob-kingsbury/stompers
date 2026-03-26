---
project: Stompers
status: In Progress
last_session: 13
session_date: 2026-03-26
current_focus: "About images, quote, mobile, EPK scaffold"
open_issues: 10
next_priority: "EPK page design (pick layout from demos), weave B-sides angle into homepage copy"
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
  includes: includes/head.php, includes/nav.php
  pages: tour.php, story.php, epk.php, merch.php, contact.php
  docs: handoff.md (section docs, read on-demand)

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
```

## Section Status

| Section | Status | Page Status |
|---------|--------|-------------|
| Progress Nav | Complete | index.php - Complete |
| Hero | Complete (logo anim + grunge video) | tour.php - In Progress |
| About | Complete | merch.php - Complete |
| Band Cards | Complete | story.php - Not Started |
| Tour | Updated (real dates) | epk.php - Not Started |
| Quote | Complete | contact.php - Not Started |
| Contact/Footer | Needs Work | |

## Recent Changes

### March 2026 - Session 13: About Images, Quote, Mobile, EPK Scaffold

Replaced all 4 about section images. Locked in: Sound (guitarist low light), Vibe (packed dark venue crowd), Mission (boot on pedalboard), Road (neon Cold Beer sign with contain fit). New Vibe copy ("strangers buy each other rounds"). New Road copy (softer tone). New closing quote: "We find the songs that deserved a bigger stage and we give them one." Mobile fixes: hero text bump, quote section 70vh. Hard Rock Cafe address corrected to Gloucester, ON (all files). EPK page scaffolded with scroll animations. Demo pages created for EPK layout options (5 designs) and vibe image selection.

Key brand insight from Rob: The Stompers are "the B-side guys" — they play familiar favorites people forgot they loved, not the obvious hits. This angle needs to be woven throughout the site (The Sound, The Mission, EPK bio).

### March 2026 - Session 12: PHP Conversion + Content Overhaul

PHP conversion, bug fixes, content rewrite, deployed to staging.

Early session: Converted to PHP includes, fixed hero bugs (logo fade, menu flash), updated tour dates, corrected band members, slimmed docs. Dropped .html files — PHP is canonical, Vite builds JS only. Deployed to staging.swampcitystompers.ca.

Late session: Fixed menu overlay flash (visibility:hidden in CSS). Fixed progress nav bar (scrollRange divide-by-zero). Est. 2025 sitewide. Removed section numbers. Grittier about images. Rewrote Mission (no "loud"), band bios (swapped Rob/Jeans, new Kurt+Matt), quote (less pretentious). Tour cards use OSM maps. Removed "Get Tickets". Created #13 (footer overhaul).

### February 2026 - Session 11: Hero Background Rework

Replaced static grunge textures with looping grunge video + single scratch overlay.

### February 2026 - Session 10: Hero Redesign

Replaced 16MB hero video with logo animation. Two-layer grunge background. Ambient gold sparks.

### February 2026 - Session 10: Hero Redesign (Video to Logo Animation)

Replaced 16MB hero video with logo-based intro animation. Sequence: logo fade-in with scale → meta/tagline → stamp BAM with screen shake. Two-layer grunge background (static scratch + moving Ken Burns). Ambient gold sparks.
