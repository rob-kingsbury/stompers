# CSS Architecture Rules

**Values Reference:** See `.claude/style-guide.json` for colors, spacing, z-index scale.

```yaml
principles:
  - Mobile-first: base styles for mobile, min-width queries to enhance
  - CSS variables: all colors, spacing, z-index from themes.css
  - DRY: Don't Repeat Yourself - define values once, reference via variables
  - No !important: refactor specificity instead (exceptions for GSAP overrides)
  - Single source: component defined once, modifiers for variations

files:
  themes.css: CSS variables (colors, spacing, z-index, typography, easing)
  immersive-master.css: Components, layout, animations

naming:
  block: .section, .hero, .stack-card
  element: .hero-title, .stack-card-content
  modifier: .section--quote, .btn--primary
  state: .is-active, .is-revealed, .is-flipped

required-variables:
  colors: var(--color-*) never hardcode hex
  spacing: var(--spacing-*) never hardcode px/rem
  z-index: var(--z-*) never hardcode numbers (except card stacking)
  typography: var(--font-*), var(--letter-spacing-*) for consistency
  timing: var(--duration-*), var(--ease-*) for animations
```

## Color Palette (from themes.css)

```css
--color-bg: #0a0a0a;       /* Main background */
--color-bg-alt: #111111;   /* Section backgrounds */
--color-text: #f5f5f0;     /* Primary text */
--color-accent: #c9a227;   /* Gold accent */
```

## Z-Index Scale

Use variables from themes.css (never hardcode z-index):

```css
/* Base layers */
--z-base: 0;               /* Default */
--z-raised: 10;            /* Above siblings */
--z-dropdown: 100;         /* Dropdowns */
--z-sticky: 200;           /* Sticky elements */

/* Navigation */
--z-nav: 900;              /* Progress nav, sticky headers */
--z-nav-above: 910;        /* Elements above nav */

/* Menu system (layered back to front) */
--z-menu-bg: 1000;         /* Menu background panel */
--z-menu-content: 1010;    /* Menu links, footer */
--z-menu-effects: 1020;    /* Dust particles, flash */
--z-menu-trigger: 1030;    /* Hamburger button */

/* Overlays */
--z-overlay: 1100;         /* Generic overlays */
--z-modal: 1200;           /* Modal dialogs */
--z-tooltip: 1300;         /* Tooltips */
--z-max: 9999;             /* Page transitions */
```

**Exception:** Sequential stacking (1, 2, 3, 4) is allowed for card/layer ordering within a component (e.g., stacking cards) - add a comment explaining why.

## Component Template

```css
/* Base (mobile-first) */
.component { }

/* Elements */
.component-header { }
.component-body { }

/* Modifiers */
.component--variant { }

/* States */
.component.is-active { }

/* Responsive (consolidated at end) */
@media (min-width: 768px) { .component { } }
@media (min-width: 992px) { .component { } }
```

## GSAP Animation Styles

When GSAP controls properties, set initial state in CSS:

```css
/* Initial state for GSAP animation */
.animated-element {
  opacity: 0;
  transform: translateY(40px);
  will-change: transform, opacity;
}

/* GSAP animates to final state via JS */
```

Use `will-change` sparingly - only on elements that will animate.

## Scroll-Triggered Sections Pattern

```css
.section--animated {
  position: relative;
  overflow: hidden;
  will-change: transform;
  transform-origin: center top; /* For shrink effects */
}
```

## Sticky Positioning

**CRITICAL**: Never use `overflow: hidden` or `overflow-x: hidden` on `html` or `body` - it breaks `position: sticky` throughout the entire page.

```css
/* BAD - breaks sticky */
body { overflow-x: hidden; }

/* GOOD - use clip on a wrapper instead */
.immersive { overflow-x: clip; }
```

Also avoid applying `transform` directly to sticky elements - it breaks their sticky behavior. Apply transforms to an inner wrapper instead.

## Checklist

Before committing CSS changes:
- [ ] Using CSS variables for colors
- [ ] Mobile-first (min-width queries)
- [ ] No !important (unless overriding third-party)
- [ ] Media queries at component end
- [ ] Z-index from scale
- [ ] will-change only on animated elements
- [ ] Tested at mobile, tablet, desktop widths
