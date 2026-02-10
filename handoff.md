# Stompers Redesign - Immersive Master Handoff

## Latest Session Changes (February 2026 - Session 10)

### Hero Section Redesign: Video Replaced with Logo Animation

**Problem:** Hero video (16MB) showed only the bassist on mobile. Poor framing and heavy file size.

**Solution:** Replaced video with logo-based intro animation and layered grunge background.

**New Hero Structure:**
1. **Background Layer 1 (static):** `scratch-overlay.webp` at 8% opacity, `mix-blend-mode: screen`
2. **Background Layer 2 (moving):** `grunge-texture.jpg` at 6% opacity, 90s Ken Burns drift
3. **Ambient Sparks:** Gold particles floating upward (20 initial, spawned every 200ms)
4. **Content:** Logo fade-in → meta/tagline appear → stamp BAMs with screen shake

**Bug Fixes:**
- Skip-link always visible → `translateY(-200%)` + `:focus-visible`
- Scroll cue opacity locked → `gsap.fromTo()` + `immediateRender: false`
- Menu FOUC on reload → `opacity: 0` on `.menu-nav-link` and `.menu-footer`

---

## Earlier Session Changes

<details>
<summary>Session 4 (January 2026) - Sticky positioning fixes</summary>

### Fixed: Sticky Positioning Broken by overflow-x: hidden

**Root Cause:** `overflow-x: hidden` on `html` or `body` breaks `position: sticky` throughout the entire page.

**Fix Applied:**
1. Removed `overflow-x: hidden` from `body` and menu section CSS
2. Added `overflow-x: clip` to `.immersive` wrapper instead (clip doesn't break sticky)
3. Added Lenis compatibility CSS (`html.lenis { height: auto; }`)

### Fixed: Transform Breaking Sticky on Band Cards

Changed `initBandCardStack()` to scale `.stack-card-inner` instead of `.stack-card`.

</details>

<details>
<summary>Session 3 (January 2026) - Quote section overhaul</summary>

### Quote Section Overhaul
Reworked from "explosion" effect to **concom.tv-style shrink reveal**:

1. Staggered character fade-in animation when section enters viewport
2. Section shrinks (scale 1 → 0.9) with border-radius as user scrolls past
3. Removed pin behavior (caused duplicate elements and conflicted with shrink)

**Key Insight:** GSAP ScrollTrigger's pin creates spacer elements that interfere with other ScrollTriggers on the same element.

</details>

---

## Project Overview
Building an immersive website for **Swamp City Stompers**, a southern rock/swamp blues band from Eastern Ontario. The project includes 10 experimental versions (v1-v10) and a **master design** combining the best elements.

## Tech Stack
- **Vite** - Build tool
- **Lenis** - Smooth scroll
- **GSAP + ScrollTrigger** - Scroll-based animations
- **Playwright** - Site analysis (for reference sites)

## Running the Project
```bash
npm run dev          # Starts dev server, opens to master design
npm run build        # Production build
```

---

## Master Design Implementation

### Files
| File | Purpose |
|------|---------|
| `index.html` | Main HTML structure |
| `css/styles.css` | All styles (~1470 lines) |
| `js/main.js` | GSAP/Lenis animations (~570 lines) |
| `vite.config.js` | Build config, opens to master by default |

---

## Section-by-Section Breakdown

### 1. Progress Nav (MetaMask Style)
**Reference:** https://metamask.io/en-GB/

**Implementation:**
- Vertical pill container (`#242628` background, `border-radius: 999px`)
- Gold blob (`.progress-blob`) animates between dots
- Blob has stretch animation during transitions (`blobStretch` keyframes)
- Tooltips appear on hover showing section names
- Click dots to scroll to sections

**Key CSS:**
```css
.progress-pill { background: #242628; border-radius: 999px; }
.progress-blob { background: linear-gradient(135deg, #c9a227, #a07d1c); }
```

**Key JS:** `initProgressNav()` in main.js:71-131

---

### 2. Hero Section (Redesigned Session 10)
**What it does:**
- Two-layer grunge background: static scratch texture + moving grunge with Ken Burns
- Ambient gold floating sparks
- Logo fades in with subtle scale (1.15 → 1)
- Meta + tagline appear, then stamp BAMs down with screen shake
- Content fades out with parallax on scroll

**Background Layers:**
```css
/* Layer 1: Static scratch — no animation */
.hero-grain { background: url('scratch-overlay.webp'); opacity: 0.08; mix-blend-mode: screen; }

/* Layer 2: Moving grunge — 90s Ken Burns */
.hero-grain::before { background: url('grunge-texture.jpg'); opacity: 0.06; animation: kenBurns 90s; }
```

**Key JS:** `initHeroAnimations()` + `initHeroSparks()` in main.js
```javascript
// Stamp BAM with screen shake
tl.to(stamp, { opacity: 1, scale: 1, rotation: -12, duration: 0.15, ease: 'power4.out' });
tl.to(hero, { x: 4, yoyo: true, repeat: 5, duration: 0.03, ease: 'none' });
```

**Assets:**
- `img/stompers-logo-full.png` — full band logo
- `img/sleazy-rock.png` — "100% Sleazy Rock & Roll" stamp
- `img/grunge-texture.jpg` — moving grunge layer
- `img/scratch-overlay.webp` — static scratch texture

---

### 3. About Section
**What it does:**
- Image reveals from center using `clip-path: inset()`
- Image scales down from 1.4 → 1 during reveal
- Content slides in from right after image reveals
- Sticky container for scroll experience

**Key CSS:**
```css
.about-image-mask {
  clip-path: inset(50% 50% 50% 50%);
  transform: scale(1.4);
}
.about-image-revealer.is-revealed .about-image-mask {
  clip-path: inset(0% 0% 0% 0%);
  transform: scale(1);
}
```

**Key JS:** `initAboutAnimations()` - lines 243-257

---

### 4. Band Cards (Stacking Cards - concom.tv Style)
**Reference:** https://concom.tv/ (services section - "full event management", "crew sourcing" cards)

**What it does:**
- Wide cards using `position: sticky` to create stacking effect
- Cards scale DOWN from 1 → 0.9 as the next card scrolls over them
- Staggered `top` positions (30px offset) so previous card headers remain visible
- Each card pins at its `top` value while content scrolls
- GSAP ScrollTrigger animates scale based on scroll progress

**Key CSS:**
```css
.stack-container {
  /* Extra padding at bottom for scroll distance */
  padding-bottom: 50vh;
}

.stack-card {
  position: sticky;
  width: calc(100% - 4rem);
  min-height: 70vh;
  border-radius: 1rem;
  transform-origin: center top;
  will-change: transform;
}

/* Staggered top positions */
.stack-card[data-index="0"] { top: 2rem; z-index: 1; }
.stack-card[data-index="1"] { top: calc(2rem + 30px); z-index: 2; }
.stack-card[data-index="2"] { top: calc(2rem + 60px); z-index: 3; }
```

**Key JS:** `initBandCardStack()` - uses GSAP ScrollTrigger
```javascript
// Each card scales down as the next one scrolls over
cards.forEach((card, i) => {
  if (i === cards.length - 1) return; // Last card doesn't scale

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

**Reusable Library:** This animation is available in the GSAP Animation Library at `gsap-animation-library/` as Animation #1. Use `data-anim="1"` or import `StackingCards` directly.

---

### 5. Tour Section
**What it does:**
1. **Phase 1:** Full-page immersive cards for each show (sticky stack)
   - Giant date numbers, venue name, location
   - Cards stack on top of each other as you scroll
2. **Phase 2:** After all cards pass, reveals accordion list
   - Click to expand shows map + details
   - "Get Tickets" button

**Key JS:** `initTourSection()` - lines 346-394

---

### 6. Quote Section (Concom.tv Style Shrink)
**Reference:** https://concom.tv/ (section shrink effect)

**What it does:**
1. **Fade-in Animation:** Quote text (split into character spans) fades in with staggered timing when section enters viewport (at 60%)
2. **Shrink Effect:** As user scrolls past, the entire section scales from 1 → 0.9 with border-radius, revealing the black body background behind it
3. **No Pin:** Removed pin behavior (caused duplicate elements and conflicted with shrink)

**Key CSS:**
```css
.section--quote {
  position: relative;
  background: var(--color-bg-alt);
  overflow: hidden;
  z-index: 2;
  will-change: transform;
  transform-origin: center top;
}
```

**Key JS:** `initQuoteSection()` in main.js
```javascript
// 1. Text is pre-split into .char spans in HTML
const allChars = section.querySelectorAll('.char');

// 2. Set initial state
allChars.forEach((el) => {
  el.style.transform = 'translateY(-40px)';
  el.style.opacity = '0';
});

// 3. Fade-in when section enters (no pin - simpler approach)
let hasFadedIn = false;
ScrollTrigger.create({
  trigger: section,
  start: 'top 60%',
  onEnter: () => {
    if (hasFadedIn) return;
    hasFadedIn = true;
    allChars.forEach((el, i) => {
      gsap.to(el, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        delay: 0.2 + i * 0.008,
        ease: 'power2.out',
      });
    });
  },
  onLeaveBack: () => {
    hasFadedIn = false;
    allChars.forEach((el) => {
      gsap.set(el, { y: -40, opacity: 0 });
    });
  },
});

// 4. Concom.tv style: Section shrinks as it scrolls up, revealing black bg
gsap.to(section, {
  scale: 0.9,
  borderRadius: '24px',
  ease: 'none',
  scrollTrigger: {
    trigger: section,
    start: 'top top',
    end: 'bottom top',
    scrub: true,
  },
});
```

**Important Notes:**
- Quote text must be pre-split into `.char` spans in HTML (each character wrapped)
- The shrink effect relies on body background (`--color-bg: #0a0a0a`) showing through
- Contact section background must match body (`--color-bg`) for seamless reveal

---

### 7. Contact/Footer Section
**What it does:**
- Contact section sits below quote with matching black background (`--color-bg`)
- When quote section shrinks, black background shows through margins creating "shrink reveal" effect
- Simple design - footer content inside contact section

**Key CSS:**
```css
.section--contact {
  position: relative;
  min-height: 100vh;
  background: var(--color-bg); /* Match body bg so shrink reveals black */
  z-index: 1;
}
```

**Future Enhancement:** User mentioned footer design is "bland" and could use a refresh in future iterations

---

## Analysis Tools Created

### analyze-sites.js
Playwright script for analyzing reference sites:
- Takes screenshots at scroll positions
- Detects animation libraries (GSAP, ScrollTrigger, Lenis)
- Extracts CSS transform/transition properties
- Screenshots saved to `./analysis-screenshots/`

### analyze-progress.js
Focused analysis of MetaMask's progress indicator:
- Found: `scroll-progress_scroll-progress__cJKnl` class
- Position: fixed, right: 32px, border-radius: 999px
- Dots are ~10.65px with gap of ~10.67px

---

## Reference Sites Analyzed
| Site | Feature Studied |
|------|-----------------|
| metamask.io | Progress nav (vertical pill with dots) |
| concom.tv | Card stacking animation |
| slap-apps.de | 3D transforms (preserve-3d) |
| mantis.works | Services list |
| shopify.supply | Product scroll |

---

## Future Features Mentioned
1. **Story Page** - Documentary style (v7/v8 inspiration)
2. **EPK Section** - Electronic Press Kit
3. **Merch Section** - Printify integration with vertical scroll product cards

---

## File Structure
```
stompers-redesign/
├── index-immersive-master.html    # Master design
├── index-immersive-v1.html        # Version 1-10 experiments
├── ...
├── css/
│   ├── styles.css       # Master styles
│   ├── themes.css                 # Color themes
│   └── ...
├── js/
│   ├── main.js             # Master animations
│   └── ...
├── img/
│   └── vid-header-mute.mp4        # Hero video
├── analysis-screenshots/          # Playwright captures
├── analyze-sites.js               # Site analysis script
├── analyze-progress.js            # MetaMask analysis
├── vite.config.js                 # Build config
└── package.json
```

---

## Known Issues / TODOs (GitHub Issues)
- #1 Mobile: Progress nav hidden on screens < 768px
- #2 Band cards: Scroll-triggered flip animation needs tuning
- #3 Footer design needs refresh
- #4 Quote section: Pin behavior removed due to GSAP conflicts (note)
- #6 Fix hardcoded colors on band cards
- #7 Tour panels persistent label ("See Us Soon")
- #8 Consolidate tour section (move list to tour page)
- #9 Gradient blends at image edges
- #10 JSON config for dynamic content

---

## Color Palette
```css
--color-bg: #0a0a0a;
--color-bg-alt: #111111;
--color-text: #f5f5f0;
--color-accent: #c9a227;  /* Gold */
```

## Fonts
- **IBM Plex Mono** - Headers, UI elements
- **Source Serif Pro** - Body text, quotes
