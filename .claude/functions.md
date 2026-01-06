# Stompers Functions Reference

**File:** `js/main-master.js`
**Last Updated:** 2026-01-05

## Initialization

### `initLenis()`
Initializes Lenis smooth scroll with GSAP integration.

```javascript
// Called on DOMContentLoaded
// Syncs Lenis scroll with GSAP ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);
```

### `initGSAP()`
Registers GSAP plugins and calls all section initializers.

```javascript
// Registers ScrollTrigger plugin
// Calls:
//   - initProgressNav()
//   - initHeroAnimations()
//   - initAboutAnimations()
//   - initBandCardStack()
//   - initTourSection()
//   - initQuoteSection()
```

---

## Section Functions

### `initProgressNav()`
**Lines:** 71-131

MetaMask-style vertical progress indicator.

**Elements:**
- `.progress-nav` - Container
- `.progress-dot[data-section]` - Clickable dots
- `.progress-blob` - Animated gold indicator
- `.progress-tooltip` - Hover labels

**Behavior:**
- Blob moves between dots based on active section
- Click dot to scroll to section
- Stretch animation during transitions

---

### `initHeroAnimations()`
**Lines:** 137-217

Hero section entrance and scroll effects.

**Animations:**
1. Staggered entrance: meta → title → tagline → stats → scroll cue
2. Animated number counters for stats
3. Video scale 1 → 1.3 on scroll (scrub)

**Key Code:**
```javascript
gsap.to(video, {
  scale: 1.3,
  scrollTrigger: {
    trigger: hero,
    start: 'top top',
    end: 'bottom top',
    scrub: true
  }
});
```

---

### `initAboutAnimations()`
**Lines:** 243-257

Image reveal from center with clip-path.

**Animations:**
1. Image clip-path: `inset(50%)` → `inset(0%)`
2. Image scale: 1.4 → 1
3. Content slides in from right

**CSS Classes Used:**
- `.about-image-revealer` - Trigger element
- `.about-image-mask` - Animated element
- `.is-revealed` - State class added on reveal

---

### `initBandCardStack()`
**Lines:** ~260-320

Concom.tv-style stacking cards.

**Behavior:**
- Cards use `position: sticky` with staggered `top` values
- Each card scales down (1 → 0.9) when next card scrolls over
- Last card doesn't scale (nothing comes after)

**Key Code:**
```javascript
cards.forEach((card, i) => {
  if (i === cards.length - 1) return;

  gsap.to(card, {
    scale: 0.9,
    scrollTrigger: {
      trigger: cards[i + 1],
      start: 'top bottom',
      end: 'top top+=100',
      scrub: true,
    }
  });
});
```

---

### `initTourSection()`
**Lines:** 346-394

Two-phase tour display.

**Phase 1:** Immersive cards
- Full-page sticky cards for each show
- Giant date, venue, location

**Phase 2:** Accordion list
- Revealed after cards scroll
- Click to expand with map + details

---

### `initQuoteSection()`
**Lines:** ~400-470

Character fade-in + section shrink effect.

**Animations:**
1. Characters fade in with stagger (0.008s) when section enters at 60%
2. Section scales 1 → 0.9 with border-radius as user scrolls past

**Key Insight:** No pin used - pins create spacer elements that conflict with other ScrollTriggers.

**Key Code:**
```javascript
// Fade-in trigger
ScrollTrigger.create({
  trigger: section,
  start: 'top 60%',
  onEnter: () => {
    allChars.forEach((el, i) => {
      gsap.to(el, {
        y: 0, opacity: 1,
        duration: 0.6,
        delay: 0.2 + i * 0.008,
        ease: 'power2.out',
      });
    });
  },
});

// Shrink effect
gsap.to(section, {
  scale: 0.9,
  borderRadius: '24px',
  scrollTrigger: {
    trigger: section,
    start: 'top top',
    end: 'bottom top',
    scrub: true,
  },
});
```

---

## Utility Patterns

### ScrollTrigger Scrub Pattern
For scroll-linked animations:

```javascript
gsap.to(element, {
  // properties to animate
  scrollTrigger: {
    trigger: triggerElement,
    start: 'top bottom',  // when trigger top hits viewport bottom
    end: 'bottom top',    // when trigger bottom hits viewport top
    scrub: true,          // links to scroll position
  }
});
```

### ScrollTrigger Toggle Pattern
For enter/leave animations:

```javascript
ScrollTrigger.create({
  trigger: element,
  start: 'top 60%',
  onEnter: () => { /* animate in */ },
  onLeaveBack: () => { /* reset */ },
});
```

### Staggered Animation Pattern
For sequential element animations:

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

---

## External Dependencies

### Lenis
```javascript
import Lenis from '@studio-freight/lenis';
// or via CDN: https://unpkg.com/@studio-freight/lenis
```

### GSAP + ScrollTrigger
```javascript
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
// or via CDN: https://cdnjs.cloudflare.com/ajax/libs/gsap/3.x.x/
```
