---
project: Stompers
status: In Progress
last_session: 10
session_date: 2026-02-09
current_focus: Hero section redesign (video replaced with logo animation)
open_issues: 11
next_priority: "Tour page layout (#11)"
---

# Stompers Redesign Context

```yaml
project: Swamp City Stompers Website (Immersive Redesign)
type: Band website with scroll-based animations

tech:
  build: Vite
  scroll: Lenis (smooth scroll)
  animation: GSAP + ScrollTrigger
  transitions: Barba.js (Lift style)
  css: Vanilla CSS with CSS variables
  js: Vanilla JS (ES6+)

paths:
  master: index.html
  css: css/styles.css
  js: js/main.js
  themes: css/themes.css
  pages: tour.html, story.html, epk.html, merch.html, contact.html
  docs: handoff.md (detailed section docs, read on-demand)

workflow:
  dev: npm run dev
  build: npm run build
  issues: gh issue list --state open

repo:
  github: https://github.com/rob-kingsbury/stompers.git
  branch: main
```

## Section Status

| Section | Status | Page Status |
|---------|--------|-------------|
| Progress Nav | Complete | index.html - Complete |
| Hero | Redesigned (logo anim) | tour.html - In Progress |
| About | Complete | merch.html - Complete |
| Band Cards | Complete | story.html - Not Started |
| Tour | Complete | epk.html - Not Started |
| Quote | Complete | contact.html - Not Started |
| Contact/Footer | Needs Work | |

## Recent Changes

### February 2026 - Session 10: Hero Redesign (Video to Logo Animation)

**Replaced hero video with logo-based intro animation and layered grunge background.**

Problem: Hero video showed only the bassist on mobile. Video was 16MB. Decided to drop it entirely.

Hero Animation (index.html + js/main.js):
- Removed hero video, overlay, title lines, stats section (200 shows/6 years/4 members)
- New sequence: logo fades in with subtle scale → meta/tagline appear → stamp BAMs down with screen shake
- Single GSAP timeline, same on mobile and desktop
- Logo + tagline + stamp in single flex column layout
- Scroll-triggered fade-out with parallax (logo scrolls up and fades)
- Reduced motion: all elements shown immediately, no animation

Hero Background (css/styles.css):
- Layer 1 (static): `scratch-overlay.webp` at 8% opacity, `mix-blend-mode: screen`
- Layer 2 (moving): `grunge-texture.jpg` at 6% opacity, 90s Ken Burns drift animation
- Layer 3: Ambient gold sparks (20 initial + spawned every 200ms, 7-13s travel time)
- Replaced SVG noise grain with real texture images

New Assets (img/):
- `stompers-logo-full.png` — full band logo on black background
- `sleazy-rock.png` — "100% Sleazy Rock & Roll" stamp
- `grunge-texture.jpg` — moving grunge layer (from texturelabs.org)
- `scratch-overlay.webp` — static scratch texture (inverted + converted via Sharp, 345KB)

Bug Fixes:
- Skip-link always visible: fixed with `translateY(-200%)` + `:focus-visible`
- Scroll cue stuck at opacity 0: fixed with `gsap.fromTo()` + `immediateRender: false`
- Menu FOUC on reload: added `opacity: 0` to `.menu-nav-link` and `.menu-footer` in CSS

Cleanup:
- Updated `.gitignore` (scroll-analysis-output, Windows nul artifact, source asset PNGs)
- Removed Black Ops One font (tried and abandoned for text BAM approach)
- Removed all video-related CSS and JS

Approaches tried and abandoned:
- Text BAM (SWAMP/CITY/STOMPERS with Black Ops One font) — font mismatch with hand-illustrated logo
- Clip-path staged reveal of logo regions — alignment issues with artwork
- SVG feTurbulence grain — too subtle, replaced with real textures

### February 2026 - Session 9: Full Site Audit and Optimization

**Comprehensive audit across 5 categories: CSS, JS, HTML/accessibility, performance, mobile visual.**

JS Memory Leak Fixes (main.js):
- Added `cleanupFns` array + `runCleanup()` for event listener lifecycle management
- Barba `leave` hook now kills all ScrollTriggers and destroys Lenis before page transition
- `afterEnter` reinitializes Lenis + ScrollTrigger properly after transition
- Escape key, hamburger, menu links, anchor links, resize — all use named handlers with cleanup
- Replaced `setInterval` stat counter with GSAP tween
- Removed redundant early `ScrollTrigger.refresh()` call

CSS Variable Sweep (styles.css + themes.css):
- Replaced ~80+ hardcoded spacing values with `var(--spacing-*)`
- Replaced ~40+ hardcoded letter-spacing with `var(--letter-spacing-*)`
- Replaced ~15 hardcoded font-sizes with `var(--font-size-*)`
- Added new variables: `--shadow-2xl`, `--shadow-upward`, `--spacing-6xl`, `--border-width-heavy`, `--letter-spacing-ultra`, `--letter-spacing-extreme`
- Z-index `calc()` expressions replaced with shim values (91, 991, 9991)
- Added `:focus-visible` styles for keyboard navigation

Accessibility (all 6 HTML pages):
- Skip-to-content link on every page
- `aria-hidden="true"` on decorative hero video
- `title` attributes on all Google Maps iframes
- `aria-expanded` + `role="region"` on tour accordions
- EPK heading hierarchy fixed (h3 before h2 → proper h2)
- Favicon reference added to all pages
- `autocomplete` attributes on contact form inputs

SEO (all 6 HTML pages):
- Open Graph meta tags (og:title, og:description, og:type, og:image)
- Twitter Card meta tags
- Google Fonts already had `display=swap`

Performance:
- Logo PNGs compressed: logo-stompers.png 1.3MB → 268KB, logo-goon.png 400KB → 220KB
- WebP versions created: 160KB and 67KB
- `loading="lazy"` on 24 below-fold images
- `preload="metadata"` on hero video
- `sourcemap: false` in Vite production build

Config:
- style-guide.json z-index updated to match power-of-9 scale
- Added missing variables to style-guide.json (spacing-6xl, shadow-2xl, shadow-upward, border-width-heavy, letter-spacing-ultra/extreme)

Not fixed (deferred):
- Hero video 16MB — resolved in session 10 (video removed, replaced with logo animation)
- Content placeholders (fake phone, # links, placeholder dates)
- Design items (band card grid, full desktop nav, footer refresh)

### February 2026 - Session 8: Configuration Optimization

**Overhauled Claude Code configuration for Opus 4.6:**

- Expanded CLAUDE.md with communication style, keyword triggers, session protocol, project scope
- Created 4 custom skills: `/session-start`, `/handoff`, `/fix-issue`, `/simplify`
- Added YAML frontmatter to context.md for machine-readable state
- Added thinking-mode.md rule for complex animation analysis
- Cleaned up settings.local.json (34 entries to 7 generic patterns)
- Updated workflows.yaml with simplify and check workflows
- Refreshed functions.md with current line numbers from js/main.js
- Updated development-workflow.md with skill references

### February 2026 - Session 7 (Nav Menu Fixes)
**Fixed nav menu bugs and consolidated file naming:**

File Renames:
- `css/immersive-master.css` → `css/styles.css`
- `js/main-master.js` → `js/main.js`
- Updated all references across HTML, docs, and config

Nav Menu Fixes (css/styles.css + js/main.js):
- Fixed menu text hidden behind menu-bg: z-index stacking with `calc(var(--z-overlay) +/- 1)`
- Removed CSS `opacity: 0` from `.menu-nav-link` and `.menu-footer` (GSAP controls initial state)
- Added dynamic `is-active` class on menu links based on `window.location.pathname`
- Replaced `menuTimeline.reverse()` with custom close timeline for snappy exit
- Added dust particles on menu close for visual parity with open animation

Scroll Animation Fix (js/main.js):
- Added `immediateRender: false` to `gsap.from()` calls with ScrollTrigger

Config:
- Fixed `vite.config.js` server open path to `/index.html`

### January 2026 - Session 6 (Mobile-First Audit)
**Complete mobile-first refactor of entire codebase:**

CSS Changes (styles.css):
- Added `.no-js` fallback styles - content visible without JS
- Converted ALL 7 `max-width` queries to mobile-first `min-width`
- Responsive breakpoints: 481px, 769px, 1025px, 1201px

JS Changes (main.js):
- Added responsive utilities: `isMobile()`, `isTablet()`, `isDesktop()`, `isTouchDevice()`
- Added `prefersReducedMotion()` support throughout all animations
- `getScrollTriggerConfig()` returns mobile-adjusted trigger points
- Lenis configured with mobile touch multipliers
- Quote animation simplified on mobile (fade lines, not characters)

HTML Changes:
- Added `class="no-js"` to all 6 production pages

### January 2026 - Session 5
- Built merch.html page with sticky product slides layout
- Created tour-demos.html with 8 tour page layout options
- GSAP Animation Library updates (separate repo)

### January 2026 - Session 4
- Fixed sticky positioning broken by overflow-x: hidden
- Fixed band card animations (transform breaks sticky)
- Added Lenis CSS compatibility rules
- Created GitHub issues #6-10
