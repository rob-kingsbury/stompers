# CSS Architecture Rules

**Values Reference:** See `.claude/style-guide.json` for colors, spacing, z-index scale.

```yaml
principles:
  - Mobile-first: base styles for mobile, min-width queries to enhance
  - CSS variables: all colors/spacing from themes.css
  - No !important: refactor specificity instead (exceptions for GSAP overrides)
  - Single source: component defined once, modifiers for variations

files:
  themes.css: CSS variables (colors only currently)
  immersive-master.css: Components, layout, animations

naming:
  block: .section, .hero, .stack-card
  element: .hero-title, .stack-card-content
  modifier: .section--quote, .btn--primary
  state: .is-active, .is-revealed, .is-flipped

required-variables:
  colors: var(--color-*) never hardcode hex
  accent: var(--color-accent) for gold highlights
  backgrounds: var(--color-bg), var(--color-bg-alt)
  text: var(--color-text)
```

## Color Palette (from themes.css)

```css
--color-bg: #0a0a0a;       /* Main background */
--color-bg-alt: #111111;   /* Section backgrounds */
--color-text: #f5f5f0;     /* Primary text */
--color-accent: #c9a227;   /* Gold accent */
```

## Z-Index Scale

Use consistent z-index values:

```css
--z-base: 1;        /* Default stacking */
--z-sticky: 9;      /* Sticky elements */
--z-nav: 99;        /* Navigation */
--z-modal: 999;     /* Modals, overlays */
--z-critical: 9999; /* Above everything */
```

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

## Checklist

Before committing CSS changes:
- [ ] Using CSS variables for colors
- [ ] Mobile-first (min-width queries)
- [ ] No !important (unless overriding third-party)
- [ ] Media queries at component end
- [ ] Z-index from scale
- [ ] will-change only on animated elements
- [ ] Tested at mobile, tablet, desktop widths
