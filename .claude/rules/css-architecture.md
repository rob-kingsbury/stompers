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

## Z-Index Scale (Power of 9)

Simple 4-tier scale using powers of 9. Count the 9s to know the layer depth.

```css
--z-base: auto;      /* Default stacking */
--z-raised: 9;       /* Above siblings: cards, sticky nav, tooltips */
--z-fixed: 99;       /* Fixed elements: dropdowns, progress nav */
--z-overlay: 999;    /* Overlays: menu, modals, notifications */
--z-critical: 9999;  /* Page transitions only */
```

**Shim values** - when you need to stack between layers:
- Between 9 and 99: use 91, 92, 93...
- Between 99 and 999: use 991, 992, 993...
- Between 999 and 9999: use 9991, 9992, 9993...

**Rules:**
1. Never use arbitrary values like 10000, 99999, 100000
2. Count the 9s to know the layer (one 9 = raised, two 9s = fixed, etc.)
3. Use shim values only when necessary
4. Document any new z-index additions

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
