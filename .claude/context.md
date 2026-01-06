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
  css: Vanilla CSS with CSS variables
  js: Vanilla JS (ES6+)

paths:
  master: index-immersive-master.html
  css: css/immersive-master.css
  js: js/main-master.js
  themes: css/themes.css
  experiments: index-immersive-v1.html through v10.html
  rules: .claude/rules/

workflow:
  dev: npm run dev (opens master design)
  build: npm run build
  test: http://localhost:5173/index-immersive-master.html

repo:
  github: https://github.com/rob-kingsbury/stompers.git
  branch: main
```

## Key Rules

1. **GSAP Patterns**: Check existing animation code before writing new ScrollTriggers
2. **CSS Variables**: Use `--color-*` from themes.css, never hardcode colors
3. **Mobile First**: Base styles for mobile, min-width queries to enhance
4. **GitHub Issues**: All tasks, bugs, and features tracked in Issues
5. **No Emojis**: Keep code and commits clean

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
3. Master design is at `/index-immersive-master.html`
4. Check `handoff.md` for detailed section documentation

## Recent Changes

### January 2026
- Initial GitHub repo setup
- Quote section overhauled from explosion to shrink reveal
- Created GitHub issues for known TODOs

## See Also

- `handoff.md` - Detailed section-by-section documentation
- `.claude/rules/css-architecture.md` - CSS standards
- `.claude/rules/development-workflow.md` - How we work together
- `.claude/style-guide.json` - Design tokens
- `.claude/functions.md` - GSAP/Lenis function reference
