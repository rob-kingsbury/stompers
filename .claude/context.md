# Stompers Redesign Context

```yaml
project: Swamp City Stompers Website (Immersive Redesign)
type: Band website with scroll-based animations

# Work tracking: GitHub Issues
# See: gh issue list --state open

tech:
  build: Vite
  scroll: Lenis (smooth scroll)
  animation: GSAP + ScrollTrigger
  transitions: View Transitions API (Lift style)
  css: Vanilla CSS with CSS variables
  js: Vanilla JS (ES6+)

paths:
  master: index.html
  css: css/immersive-master.css
  js: js/main-master.js
  themes: css/themes.css
  pages: tour.html, story.html, epk.html, merch.html, contact.html
  demos: demos/view-transitions/, demos/transitions.html
  archive: _archive/ (gitignored)
  rules: .claude/rules/

workflow:
  dev: npm run dev
  build: npm run build
  test: http://localhost:5173/

repo:
  github: https://github.com/rob-kingsbury/stompers.git
  branch: main
```

## Key Rules

1. **DRY (Don't Repeat Yourself)**: Define values once, reference via CSS variables
2. **CSS Variables**: All colors, spacing, z-index, typography from themes.css
3. **GSAP Patterns**: Check existing animation code before writing new ScrollTriggers
4. **Mobile First**: Base styles for mobile, min-width queries to enhance
5. **GitHub Issues**: All tasks, bugs, and features tracked in Issues
6. **No Emojis**: Keep code and commits clean

## Quick Commands

```bash
# Development
npm run dev          # Start Vite dev server
npm run build        # Production build

# View open issues
gh issue list --state open

# Create issue
gh issue create --title "Title" --body "Description"

# Close when done (via commit preferred)
# Include "Fixes #123" in commit message
```

## Current Open Issues

Run `gh issue list --state open` for current status.

| # | Title | Priority |
|---|-------|----------|
| 1 | Mobile: Progress nav hidden on screens < 768px | Medium |
| 2 | Band cards: Scroll-triggered flip animation needs tuning | Medium |
| 3 | Footer design needs refresh | Low |
| 4 | Quote section: Pin behavior removed due to GSAP conflicts | Note |

## Section Implementation Status

| Section | Status | Notes |
|---------|--------|-------|
| Progress Nav | Complete | MetaMask-style, hidden on mobile |
| Hero | Complete | Video grows on scroll, animated stats |
| About | Complete | Clip-path image reveal |
| Band Cards | Complete | Stacking cards, click-to-flip works |
| Tour | Complete | Sticky stack + accordion |
| Quote | Complete | Character fade-in + shrink effect |
| Contact/Footer | Needs Work | Design is "bland" |

## Animation Reference

### GSAP ScrollTrigger Patterns Used

```javascript
// Scrub animation (follows scroll position)
gsap.to(element, {
  scale: 0.9,
  scrollTrigger: {
    trigger: element,
    start: 'top top',
    end: 'bottom top',
    scrub: true,
  }
});

// Enter/Leave triggers (one-time or toggle)
ScrollTrigger.create({
  trigger: section,
  start: 'top 60%',
  onEnter: () => { /* animate in */ },
  onLeaveBack: () => { /* reset */ },
});
```

### Key Insight: Pin Conflicts

GSAP ScrollTrigger's pin creates spacer elements that interfere with other ScrollTriggers on the same element. If you need both pin and other effects, use separate elements or alternative approaches.

## Session Handoff Notes

When continuing work:
1. Run `npm run dev` to start dev server
2. Run `gh issue list` to see current priorities
3. Main site is at `http://localhost:5173/`
4. Check `handoff.md` for detailed section documentation

## Recent Changes

### January 2026 - Session 3
- Implemented Stomp hamburger menu with seismic shake effect
- Major CSS refactoring for DRY compliance:
  - Added comprehensive z-index scale to themes.css (--z-nav, --z-menu-*, --z-overlay)
  - Added RGB variants for rgba() usage (--color-bg-rgb, --color-text-rgb)
  - Replaced all hardcoded colors with CSS variables
  - Replaced hardcoded spacing, typography, timing with variables
- Removed duplicate CSS variables from immersive-master.css (now in themes.css only)
- Updated css-architecture.md rules with DRY principle and updated z-index scale
- Fixed hamburger z-index layering issues with menu
- Fixed scrollbar layout shift with scrollbar-gutter: stable
- Cleaned up PHP files (multi-page approach abandoned)

### January 2026 - Session 2
- Added View Transitions API for multi-page navigation
- Created demos/view-transitions/ with 5 transition styles (slide, fade, scale, lift, flip)
- Chose "Lift" transition for production (scale + 3D tilt)
- Cleaned up project: archived 52 experimental files to _archive/
- Created .claude/ configuration directory with workflows, rules, style-guide
- Created claude-project-template repo for future projects

### January 2026 - Session 1
- Initial GitHub repo setup
- Quote section overhauled from explosion to shrink reveal
- Created GitHub issues for known TODOs

## See Also

- `handoff.md` - Detailed section-by-section documentation
- `.claude/rules/css-architecture.md` - CSS standards
- `.claude/rules/development-workflow.md` - How we work together
- `.claude/style-guide.json` - Design tokens
- `.claude/functions.md` - GSAP/Lenis function reference
