# Stompers Functions Reference

**Last Updated:** 2026-02-09 (Session 8)
**File:** `js/main.js` (1,390 lines)

---

## Responsive & Accessibility Utilities
**Lines:** 20-83

### Constants & Device Detection

```javascript
const BREAKPOINTS = { mobile: 768, tablet: 1024, desktop: 1200 };

const isMobile = () => window.innerWidth <= BREAKPOINTS.mobile;
const isTablet = () => window.innerWidth > BREAKPOINTS.mobile && window.innerWidth <= BREAKPOINTS.tablet;
const isDesktop = () => window.innerWidth > BREAKPOINTS.tablet;
const isTouchDevice = () => 'ontouchstart' in window || navigator.maxTouchPoints > 0;
const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
```

### `getScrollTriggerConfig(section)`
**Lines:** 41-80

Returns responsive ScrollTrigger start/end values per section. Adjusts trigger points for mobile viewport sizes.

**Sections:** hero, about, quote, contact, tour

**Usage:**
```javascript
const config = getScrollTriggerConfig('hero');
// config.contentFade.start → mobile: '20% top', desktop: '30% top'
```

---

## Initialization
**Lines:** 89-113

### `init()`
Entry point. Routes to page-specific initializers based on `document.body.dataset.page`.

**Index page:** initProgressNav → initHeroAnimations → initAboutAnimations → initBandCardStack → initTourSection → initQuoteExplosion → initContactParallax

**Tour page:** initTourPage()

---

## Page Transitions (Barba.js)
**Lines:** 119-196

### `initPageTransitions()`
Creates a Barba.js lift transition with GSAP animations. Creates `.transition-overlay` element.

**Leave:** opacity 0, y -30, scale 0.98 (0.35s power2.in)
**Enter:** opacity 0→1, y 30→0, scale 0.98→1 (0.35s power2.out)

After enter: Reinitializes all page-specific animations via `afterEnter`.

---

## Site Navigation (Stomp Menu)
**Lines:** 198-448

### `resetStompMenu()`
**Lines:** 207-249

Resets menu state before page transitions. Clears GSAP transforms, removes classes, kills timeline.

### `initSiteNav()`
**Lines:** 251-407

Builds the Stomp menu with seismic shake effect. Creates `.menu-bg` and `.dust-container` elements if missing.

**Timeline sequence:**
1. Hamburger → X animation (0.2s)
2. Screen shake on page content (reduced on mobile: 4px/3 repeats vs 8px/6 repeats)
3. Menu background slides in from right (0.5s power4.out)
4. Dust particles spawn on impact
5. Menu links bounce in (0.8s elastic, 0.1s stagger)
6. Footer fades in

**Close:** Custom timeline (not reverse) for snappy exit with dust particles.

### `spawnDustParticles(container, count)`
**Lines:** 410-448

Creates and animates dust particle divs. Random position, size, trajectory. Self-cleaning (removes DOM elements on complete).

---

## Smooth Scroll (Lenis)
**Lines:** 454-505

### `initSmoothScroll()`
Configures Lenis with device-specific settings:
- Duration: mobile 1.0s, desktop 1.4s (0.01s for reduced motion)
- wheelMultiplier: mobile 1.0, desktop 0.8
- touchMultiplier: mobile 1.5, desktop 2.0

Syncs with GSAP ticker. Handles anchor links and resize events.

---

## Progress Nav
**Lines:** 511-620

### `initProgressNav()`
MetaMask-style vertical progress indicator with progress bars between dots.

**Elements:** `.progress-nav`, `.progress-dot[data-section]`, `.dot-bar`

**Behavior:**
- Calculates section boundaries from dot data-section attributes
- Updates progress bars via `--progress` CSS custom property
- Throttled via requestAnimationFrame
- Click dot to scroll to section via Lenis

---

## Hero Animations
**Lines:** 626-741

### `initHeroAnimations()`
**Lines:** 626-721

Staggered entrance animation + scroll effects.

**Entrance timeline:** meta → title lines → tagline → stats → scroll cue (class-based visibility)

**Scroll effects:**
- Video scale: 1 → 1.3 desktop / 1.15 mobile (scrub)
- Content fade: opacity 0, y -80 desktop / -40 mobile (scrub)
- Scroll cue fade (scrub)

### `animateStats()`
**Lines:** 723-741

Counter animation for `.stat-value` elements. Reads `data-count` attribute, increments over 40 frames at 30ms intervals.

---

## About Animations
**Lines:** 747-789

### `initAboutAnimations()`
Story chapters with parallax. For each `.about-card`:
- Content children: opacity 0→1, y 50→0 with stagger (0.15s)
- Image parallax: yPercent 0→15 (scrub)
- Uses `immediateRender: false` to prevent content flash

---

## Band Card Stack
**Lines:** 795-825

### `initBandCardStack()`
Concom.tv-style stacking cards. Cards use `position: sticky`.

**Key:** Scales `.stack-card-inner` (not the card itself) because transforms break sticky positioning.

Scale: 1 → 0.9 as next card scrolls over. Last card doesn't scale.

---

## Tour Section (Index Page)
**Lines:** 831-939

### `initTourSection()`
Full-page cards + accordion list with pagination.

**Phase 1:** Fullpage cards activate/deactivate via ScrollTrigger (is-active class)
**Phase 2:** Accordion list with click-to-expand
**Pagination:** 8 items per page, prev/next buttons

---

## Quote Explosion
**Lines:** 945-1140

### `initQuoteExplosion()`
**Lines:** 945-972

Routes to simplified (mobile) or full (desktop) version.

### `initQuoteSimplified(section, quoteLines, attribution, config)`
**Lines:** 975-1028

Mobile: Fade in quote lines with stagger (0.15s each). Section shrinks to 0.95 scale with 16px border-radius.

### `initQuoteFull(section, quoteContent, quoteLines, attribution, config)`
**Lines:** 1031-1140

Desktop: Splits text into individual `<span class="char">` elements. Characters fade in with 0.008s stagger. Pre-calculates explosion vectors from center. Section shrinks to 0.9 scale with 24px border-radius.

---

## Contact Section
**Lines:** 1146-1178

### `initContactParallax()`
Simple scroll-triggered reveal. Contact blocks and footer get `is-visible` class.

---

## Tour Page (Dedicated)
**Lines:** 1184-1374

### `initTourPage()`
**Lines:** 1184-1189

Orchestrator for tour page. Calls hero, horizontal scroll, past shows, CTA.

### `initTourHeroAnimations()`
**Lines:** 1191-1242

Tour page hero with parallax background (scale 1→1.2) and content fade-out on scroll.

### `initTourHorizontalScroll()`
**Lines:** 1244-1324

Horizontal scroll carousel pinned with ScrollTrigger. Progress bar tracks scroll. Card content (date, info, button, number) fades in as cards enter center of viewport.

### `initTourPastShows()`
**Lines:** 1326-1351

Past shows list. Items fade in with stagger (0.1s delay per item) on scroll enter.

### `initTourCTA()`
**Lines:** 1353-1374

CTA section. Content children animate with stagger. Uses `immediateRender: false`.

---

## Boot
**Lines:** 1380-1390

Initializes on DOMContentLoaded (or immediately if already loaded). Refreshes ScrollTrigger on window load for accurate position calculations.

---

## External Dependencies

- **Lenis** - `import Lenis from 'lenis'`
- **GSAP** - `import gsap from 'gsap'`
- **ScrollTrigger** - `import { ScrollTrigger } from 'gsap/ScrollTrigger'`
- **ScrollToPlugin** - `import { ScrollToPlugin } from 'gsap/ScrollToPlugin'`
- **Barba.js** - `import barba from '@barba/core'`

## Utility Patterns

### ScrollTrigger Scrub Pattern
```javascript
gsap.to(element, {
  // properties to animate
  scrollTrigger: {
    trigger: triggerElement,
    start: 'top bottom',
    end: 'bottom top',
    scrub: true,
  }
});
```

### ScrollTrigger Toggle Pattern
```javascript
ScrollTrigger.create({
  trigger: element,
  start: 'top 60%',
  onEnter: () => { /* animate in */ },
  onLeaveBack: () => { /* reset */ },
});
```

### Staggered Animation Pattern
```javascript
elements.forEach((el, i) => {
  gsap.to(el, {
    opacity: 1,
    duration: 0.6,
    delay: baseDelay + i * staggerAmount,
    ease: 'power2.out',
  });
});
```

### Responsive Animation Pattern
```javascript
const mobile = isMobile();
const reducedMotion = prefersReducedMotion();
const config = getScrollTriggerConfig('section');

if (reducedMotion) { /* show immediately */ return; }
if (mobile) { /* simplified animation */ return; }
/* full desktop animation */
```
