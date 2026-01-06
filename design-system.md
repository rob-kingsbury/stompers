# Swamp City Stompers Design System

**Version:** 1.0
**Last Updated:** January 2026

---

## Table of Contents

1. [Design Philosophy](#design-philosophy)
2. [Color System](#color-system)
3. [Typography](#typography)
4. [Layout & Grid](#layout--grid)
5. [Components](#components)
6. [Texture & Visual Treatment](#texture--visual-treatment)
7. [Imagery Guidelines](#imagery-guidelines)
8. [Motion & Interaction](#motion--interaction)
9. [Accessibility](#accessibility)
10. [Do's and Don'ts](#dos-and-donts)

---

## Design Philosophy

### The Core Idea

This design system channels the soul of 1970s southern rock—swamp blues, roots Americana, and the raw energy of a live bar show—through a modern, disciplined visual language. Think of it as **"a 1974 tour poster redesigned by Pentagram."**

### Guiding Principles

1. **Heritage, Not Nostalgia**
   We reference the past without cosplaying it. The aesthetic is informed by vinyl sleeves, letterpress posters, and dimly-lit juke joints—but executed with contemporary clarity.

2. **Analog Soul, Digital Precision**
   Warmth and texture coexist with clean grids and systematic thinking. The imperfections are intentional and controlled.

3. **Typography Leads**
   Type does the heavy lifting. Strong, confident letterforms establish brand presence before any imagery or texture.

4. **Restraint is Strength**
   Every texture, every ornament, every color must earn its place. If it doesn't serve communication, it goes.

5. **Accessible to All**
   This is a real website for real fans. Readability, usability, and performance are non-negotiable.

### Brand Personality

| Trait | Expression |
|-------|------------|
| Gritty | Textured surfaces, imperfect edges, warm shadows |
| Soulful | Rich typography, generous spacing, editorial pacing |
| Confident | Bold headlines, strong color blocks, decisive layouts |
| Raw | Honest photography, minimal polish, authentic moments |
| Warm | Earthy palette, soft contrasts, inviting tones |

---

## Color System

### Philosophy

The palette is rooted in the natural world of the American South: swamp water, Spanish moss, weathered wood, river mud, and sun-bleached paper. Colors are muted, warm, and never synthetic.

### Primary Palette

| Token | Name | HEX | RGB | Usage |
|-------|------|-----|-----|-------|
| `--color-primary` | Swamp Green | `#4A5D4C` | 74, 93, 76 | Primary brand color, CTAs, key accents |
| `--color-primary-dark` | Dark Moss | `#2D3B2E` | 45, 59, 46 | Headlines, navigation, emphasis |
| `--color-primary-light` | Faded Sage | `#6B7D6D` | 107, 125, 109 | Secondary buttons, hover states |

### Secondary Palette

| Token | Name | HEX | RGB | Usage |
|-------|------|-----|-----|-------|
| `--color-secondary` | River Mud | `#6B5344` | 107, 83, 68 | Accents, borders, dividers |
| `--color-secondary-dark` | Tobacco | `#4A3728` | 74, 55, 40 | Dark backgrounds, footer |
| `--color-secondary-light` | Worn Leather | `#8B7355` | 139, 115, 85 | Tertiary accents, metadata |

### Neutral Palette

| Token | Name | HEX | RGB | Usage |
|-------|------|-----|-----|-------|
| `--color-neutral-900` | Charcoal | `#1C1C1A` | 28, 28, 26 | Body text, headings on light |
| `--color-neutral-800` | Deep Gray | `#2E2E2A` | 46, 46, 42 | Secondary text |
| `--color-neutral-600` | Weathered Gray | `#5C5C54` | 92, 92, 84 | Tertiary text, borders |
| `--color-neutral-400` | Stone | `#9C9C8C` | 156, 156, 140 | Disabled states, placeholders |
| `--color-neutral-200` | Dusty Cream | `#D9D5C8` | 217, 213, 200 | Borders on dark, dividers |
| `--color-neutral-100` | Parchment | `#EDE9DC` | 237, 233, 220 | Primary light background |
| `--color-neutral-50` | Aged White | `#F5F3EC` | 245, 243, 236 | Cards, elevated surfaces |

### Semantic Colors

| Token | Name | HEX | Usage |
|-------|------|-----|-------|
| `--color-success` | Bayou Green | `#4A6B4A` | Success states, confirmations |
| `--color-warning` | Amber Dust | `#B8863B` | Warnings, important notices |
| `--color-error` | Rust Red | `#8B4A4A` | Errors, destructive actions |
| `--color-info` | Slate Blue | `#4A5B6B` | Informational elements |

### Dark Mode Palette

In dark mode, the palette inverts while maintaining warmth:

| Token | Light Mode | Dark Mode |
|-------|------------|-----------|
| `--color-bg-primary` | `#EDE9DC` | `#1C1C1A` |
| `--color-bg-secondary` | `#F5F3EC` | `#2E2E2A` |
| `--color-text-primary` | `#1C1C1A` | `#EDE9DC` |
| `--color-text-secondary` | `#5C5C54` | `#9C9C8C` |
| `--color-primary` | `#4A5D4C` | `#6B7D6D` |
| `--color-border` | `#D9D5C8` | `#3E3E3A` |

### Color Usage Rules

1. **Never use pure black (`#000000`) or pure white (`#FFFFFF`)**
2. **Maintain minimum 4.5:1 contrast for body text** (WCAG AA)
3. **Maintain minimum 3:1 contrast for large text and UI elements**
4. **Limit accent colors to 10-15% of any composition**
5. **When in doubt, reduce saturation**

### Contrast Reference

| Combination | Contrast Ratio | WCAG |
|-------------|----------------|------|
| Charcoal on Parchment | 12.4:1 | AAA |
| Charcoal on Aged White | 13.8:1 | AAA |
| Swamp Green on Parchment | 4.7:1 | AA |
| Aged White on Dark Moss | 11.2:1 | AAA |
| Parchment on Tobacco | 7.8:1 | AAA |

---

## Typography

### Philosophy

Typography carries the brand's soul. Headlines evoke vintage concert posters and album covers. Body text prioritizes readability and warmth. The system is restrained—three typefaces maximum, each with a clear purpose.

### Type Stack

#### Display / Headlines: Clarendon or Sentinel

**Primary:** Clarendon URW (or Sentinel as alternative)
**Fallback:** Georgia, "Times New Roman", serif

A bold slab-serif with strong vertical stress and confident presence. Feels like it belongs on a gig poster or album spine.

```css
--font-display: "Clarendon URW", "Sentinel", Georgia, serif;
```

#### Body / Editorial: Source Serif Pro

**Primary:** Source Serif Pro
**Fallback:** Georgia, "Times New Roman", serif

A warm, readable serif designed for long-form content. Editorial character without stuffiness.

```css
--font-body: "Source Serif Pro", Georgia, serif;
```

#### Utility / Metadata: IBM Plex Mono

**Primary:** IBM Plex Mono
**Fallback:** "Courier New", monospace

A humanist monospace for dates, venues, setlists, and technical metadata. Adds texture without distraction.

```css
--font-mono: "IBM Plex Mono", "Courier New", monospace;
```

### Type Scale

Based on a 1.25 ratio (Major Third), with a 16px base:

| Token | Size | Line Height | Weight | Usage |
|-------|------|-------------|--------|-------|
| `--text-xs` | 12px / 0.75rem | 1.5 | 400 | Captions, legal |
| `--text-sm` | 14px / 0.875rem | 1.5 | 400 | Metadata, labels |
| `--text-base` | 16px / 1rem | 1.6 | 400 | Body text |
| `--text-lg` | 20px / 1.25rem | 1.5 | 400 | Lead paragraphs |
| `--text-xl` | 24px / 1.5rem | 1.4 | 600 | Section subheads |
| `--text-2xl` | 32px / 2rem | 1.3 | 700 | Section headers |
| `--text-3xl` | 40px / 2.5rem | 1.2 | 700 | Page titles |
| `--text-4xl` | 48px / 3rem | 1.1 | 700 | Hero subheads |
| `--text-5xl` | 64px / 4rem | 1.05 | 800 | Hero headlines |
| `--text-6xl` | 80px / 5rem | 1.0 | 800 | Display text |

### Typographic Treatments

#### Headlines (Display)
```css
.headline {
  font-family: var(--font-display);
  font-weight: 700;
  letter-spacing: -0.02em;
  text-transform: uppercase; /* Optional, use sparingly */
}
```

#### Body Text
```css
.body {
  font-family: var(--font-body);
  font-weight: 400;
  line-height: 1.6;
  letter-spacing: 0.01em;
}
```

#### Metadata / Utility
```css
.meta {
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  font-weight: 400;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}
```

### Hierarchy Examples

**Hero Section:**
- Eyebrow: `--text-sm`, mono, uppercase, `--color-secondary`
- Headline: `--text-5xl`, display, `--color-neutral-900`
- Subhead: `--text-lg`, body, `--color-neutral-600`

**Article/Bio:**
- Title: `--text-3xl`, display
- Body: `--text-base`, body
- Captions: `--text-sm`, body italic

**Show Listing:**
- Date: `--text-sm`, mono, uppercase
- Venue: `--text-xl`, display
- Location: `--text-base`, body, `--color-neutral-600`

### Typography Rules

1. **Never use more than 3 typefaces on a single page**
2. **Headlines are display font only**
3. **Body text is body font only**
4. **Monospace is for metadata, dates, and utility text only**
5. **Limit uppercase to short strings (3 words max)**
6. **Minimum body text size: 16px**
7. **Maximum line length: 65-75 characters**
8. **Paragraph spacing: 1em minimum**

---

## Layout & Grid

### Philosophy

Modern grid discipline creates the structure that allows vintage elements to breathe. Clean alignment and generous whitespace signal professionalism while leaving room for texture and warmth.

### Base Unit

All spacing derives from an **8px base unit**.

```css
--space-1: 8px;    /* 0.5rem */
--space-2: 16px;   /* 1rem */
--space-3: 24px;   /* 1.5rem */
--space-4: 32px;   /* 2rem */
--space-5: 40px;   /* 2.5rem */
--space-6: 48px;   /* 3rem */
--space-8: 64px;   /* 4rem */
--space-10: 80px;  /* 5rem */
--space-12: 96px;  /* 6rem */
--space-16: 128px; /* 8rem */
```

### Grid System

**12-column grid** with responsive breakpoints:

| Breakpoint | Token | Width | Columns | Gutter |
|------------|-------|-------|---------|--------|
| Mobile | `--bp-sm` | 0–639px | 4 | 16px |
| Tablet | `--bp-md` | 640–1023px | 8 | 24px |
| Desktop | `--bp-lg` | 1024–1279px | 12 | 24px |
| Wide | `--bp-xl` | 1280–1535px | 12 | 32px |
| Ultra | `--bp-2xl` | 1536px+ | 12 | 32px |

### Container Widths

```css
--container-sm: 640px;   /* Narrow content, forms */
--container-md: 768px;   /* Article content */
--container-lg: 1024px;  /* Standard content */
--container-xl: 1280px;  /* Full layouts */
--container-max: 1440px; /* Maximum width */
```

### Section Spacing

| Section Type | Top Padding | Bottom Padding |
|--------------|-------------|----------------|
| Hero | `--space-16` | `--space-12` |
| Primary Content | `--space-12` | `--space-12` |
| Secondary Content | `--space-8` | `--space-8` |
| Compact | `--space-6` | `--space-6` |

### Layout Patterns

#### Hero Section
```
┌────────────────────────────────────────────┐
│                                            │
│              [EYEBROW TEXT]                │
│                                            │
│         MAIN HEADLINE HERE                 │
│         ACROSS FULL WIDTH                  │
│                                            │
│         Supporting subhead text            │
│                                            │
│              [CTA BUTTON]                  │
│                                            │
└────────────────────────────────────────────┘
```

#### Two-Column Content
```
┌──────────────────┬─────────────────────────┐
│                  │                         │
│    [IMAGE]       │   Headline              │
│                  │                         │
│                  │   Body text flows       │
│                  │   here with proper      │
│                  │   line length...        │
│                  │                         │
└──────────────────┴─────────────────────────┘
```

#### Card Grid (Shows/Merch)
```
┌──────────┬──────────┬──────────┬──────────┐
│  Card 1  │  Card 2  │  Card 3  │  Card 4  │
│          │          │          │          │
└──────────┴──────────┴──────────┴──────────┘
```

### Alignment Rules

1. **Left-align body text** (never justify)
2. **Center headlines sparingly** (hero sections only)
3. **Maintain consistent gutters** across all elements
4. **Align elements to grid lines** religiously
5. **Use asymmetry intentionally** for visual interest

---

## Components

### Buttons

#### Primary Button
```css
.btn-primary {
  background: var(--color-primary);
  color: var(--color-neutral-50);
  font-family: var(--font-display);
  font-size: var(--text-sm);
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  padding: var(--space-2) var(--space-4);
  border: none;
  border-radius: 2px;
  cursor: pointer;
  transition: background 200ms ease, transform 150ms ease;
}

.btn-primary:hover {
  background: var(--color-primary-dark);
}

.btn-primary:active {
  transform: translateY(1px);
}

.btn-primary:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
```

#### Secondary Button
```css
.btn-secondary {
  background: transparent;
  color: var(--color-primary);
  border: 2px solid var(--color-primary);
  /* ...same typography as primary */
}

.btn-secondary:hover {
  background: var(--color-primary);
  color: var(--color-neutral-50);
}
```

#### Ghost Button
```css
.btn-ghost {
  background: transparent;
  color: var(--color-neutral-900);
  border: none;
  text-decoration: underline;
  text-underline-offset: 4px;
}

.btn-ghost:hover {
  color: var(--color-primary);
}
```

### Navigation

#### Desktop Navigation
```css
.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-3) var(--space-6);
  background: var(--color-neutral-50);
  border-bottom: 1px solid var(--color-neutral-200);
}

.nav-link {
  font-family: var(--font-display);
  font-size: var(--text-sm);
  font-weight: 600;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  color: var(--color-neutral-800);
  text-decoration: none;
  padding: var(--space-1) var(--space-2);
  transition: color 150ms ease;
}

.nav-link:hover {
  color: var(--color-primary);
}

.nav-link.active {
  color: var(--color-primary);
  border-bottom: 2px solid var(--color-primary);
}
```

### Cards

#### Show Card
```css
.show-card {
  background: var(--color-neutral-50);
  border: 1px solid var(--color-neutral-200);
  border-radius: 4px;
  padding: var(--space-4);
  transition: box-shadow 200ms ease, transform 200ms ease;
}

.show-card:hover {
  box-shadow: 0 4px 12px rgba(28, 28, 26, 0.08);
  transform: translateY(-2px);
}

.show-card__date {
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  color: var(--color-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: var(--space-1);
}

.show-card__venue {
  font-family: var(--font-display);
  font-size: var(--text-xl);
  font-weight: 700;
  color: var(--color-neutral-900);
  margin-bottom: var(--space-1);
}

.show-card__location {
  font-family: var(--font-body);
  font-size: var(--text-base);
  color: var(--color-neutral-600);
}
```

#### Media Card (Album/Video)
```css
.media-card {
  position: relative;
  overflow: hidden;
  border-radius: 4px;
}

.media-card__image {
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  filter: saturate(0.9);
  transition: filter 300ms ease, transform 300ms ease;
}

.media-card:hover .media-card__image {
  filter: saturate(1);
  transform: scale(1.02);
}

.media-card__overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: var(--space-4);
  background: linear-gradient(transparent, rgba(28, 28, 26, 0.8));
}

.media-card__title {
  font-family: var(--font-display);
  font-size: var(--text-lg);
  font-weight: 700;
  color: var(--color-neutral-50);
}
```

### Forms

```css
.form-group {
  margin-bottom: var(--space-4);
}

.form-label {
  display: block;
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  font-weight: 500;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  color: var(--color-neutral-800);
  margin-bottom: var(--space-1);
}

.form-input {
  width: 100%;
  padding: var(--space-2) var(--space-3);
  font-family: var(--font-body);
  font-size: var(--text-base);
  color: var(--color-neutral-900);
  background: var(--color-neutral-50);
  border: 1px solid var(--color-neutral-400);
  border-radius: 2px;
  transition: border-color 150ms ease, box-shadow 150ms ease;
}

.form-input:hover {
  border-color: var(--color-neutral-600);
}

.form-input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(74, 93, 76, 0.15);
}

.form-input::placeholder {
  color: var(--color-neutral-400);
}

.form-textarea {
  min-height: 120px;
  resize: vertical;
}
```

### Section Headers

```css
.section-header {
  text-align: center;
  margin-bottom: var(--space-8);
}

.section-header__eyebrow {
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  color: var(--color-secondary);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: var(--space-2);
}

.section-header__title {
  font-family: var(--font-display);
  font-size: var(--text-3xl);
  font-weight: 700;
  color: var(--color-neutral-900);
}

/* Optional decorative divider */
.section-header__divider {
  width: 60px;
  height: 3px;
  background: var(--color-primary);
  margin: var(--space-4) auto 0;
}
```

### Dividers

```css
/* Simple line divider */
.divider {
  border: none;
  border-top: 1px solid var(--color-neutral-200);
  margin: var(--space-8) 0;
}

/* Decorative divider with ornament */
.divider-ornament {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  margin: var(--space-8) 0;
}

.divider-ornament::before,
.divider-ornament::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--color-neutral-200);
}

.divider-ornament__symbol {
  font-size: var(--text-lg);
  color: var(--color-secondary);
}
```

---

## Texture & Visual Treatment

### Philosophy

Texture is seasoning, not the main dish. It should create subconscious warmth without demanding attention. When in doubt, leave it out.

### Approved Textures

#### Paper Grain
```css
.texture-paper {
  background-image: url('textures/paper-grain.png');
  background-size: 200px 200px;
  opacity: 0.03;
  pointer-events: none;
  mix-blend-mode: multiply;
}
```

- Tile size: 200-400px
- Opacity: 2-5% maximum
- Use on: Light backgrounds, hero sections

#### Noise Overlay
```css
.texture-noise {
  background-image: url('textures/noise.svg');
  opacity: 0.02;
  mix-blend-mode: overlay;
}
```

- Opacity: 1-3% maximum
- Use on: Solid color blocks, cards

#### Vignette
```css
.texture-vignette {
  box-shadow: inset 0 0 100px rgba(28, 28, 26, 0.05);
}
```

- Use sparingly on hero images
- Keep subtle—should be barely perceptible

### Texture Rules

1. **Never exceed 5% opacity** for any texture
2. **Textures must not reduce contrast** below WCAG requirements
3. **Test without textures** to ensure design still works
4. **One texture per element maximum**
5. **No textures on interactive elements** (buttons, inputs)
6. **Textures should tile seamlessly** at any viewport size

### Image Treatments

#### Standard Photo Treatment
```css
.img-treatment {
  filter: saturate(0.85) contrast(1.05);
  border-radius: 4px;
}
```

#### Warm Duotone (for feature images)
```css
.img-duotone {
  filter: sepia(0.15) saturate(0.9) contrast(1.1);
}
```

#### Black & White (for performance shots)
```css
.img-bw {
  filter: grayscale(1) contrast(1.1);
}
```

### Borders & Shadows

#### Default Border
```css
border: 1px solid var(--color-neutral-200);
```

#### Subtle Shadow
```css
box-shadow: 0 2px 8px rgba(28, 28, 26, 0.06);
```

#### Elevated Shadow
```css
box-shadow: 0 4px 16px rgba(28, 28, 26, 0.1);
```

#### Deep Shadow (modals, dropdowns)
```css
box-shadow: 0 8px 32px rgba(28, 28, 26, 0.15);
```

---

## Imagery Guidelines

### Photography Style

**The ideal image feels like:**
- A snapshot from a dimly-lit bar gig
- A candid moment on the tour bus
- A weathered Polaroid found in a guitar case
- Film stock from the 1970s discovered today

### Characteristics

| Quality | Target |
|---------|--------|
| Lighting | Warm, natural, low-light preferred |
| Contrast | Medium-high, crushed blacks acceptable |
| Saturation | Slightly muted, warm tones |
| Focus | Sharp subject, soft background |
| Grain | Light film grain acceptable |
| Framing | Rule of thirds, imperfect compositions welcome |

### Color Grading Reference

```
Highlights: Warm (toward amber)
Midtones: Neutral to warm
Shadows: Cool or neutral (not blue)
Overall: Faded blacks, warm whites
```

### Image Don'ts

- No HDR or hyper-processed images
- No heavy Instagram-style filters
- No pure white or pure black backgrounds
- No stock photo "band playing" clichés
- No selfie-style documentation
- No Dutch angles or extreme effects

### Image Formats

| Use Case | Format | Max Size |
|----------|--------|----------|
| Hero backgrounds | WebP/AVIF | 400KB |
| Content images | WebP/AVIF | 200KB |
| Thumbnails | WebP | 50KB |
| Album art | WebP | 150KB |

---

## Motion & Interaction

### Philosophy

Motion should feel like a vinyl record reaching speed—gradual, weighted, analog. Nothing should bounce, spring, or feel digital. Every animation serves communication, never decoration.

### Timing Tokens

```css
--duration-fast: 150ms;    /* Micro-interactions */
--duration-normal: 200ms;  /* Standard transitions */
--duration-slow: 300ms;    /* Reveals, fades */
--duration-slower: 500ms;  /* Page transitions */
```

### Easing Functions

```css
/* Standard ease - most interactions */
--ease-standard: cubic-bezier(0.4, 0.0, 0.2, 1);

/* Ease out - entrances */
--ease-out: cubic-bezier(0.0, 0.0, 0.2, 1);

/* Ease in - exits */
--ease-in: cubic-bezier(0.4, 0.0, 1, 1);

/* Smooth - long animations */
--ease-smooth: cubic-bezier(0.25, 0.1, 0.25, 1);
```

### Approved Animations

#### Fade In
```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.fade-in {
  animation: fadeIn var(--duration-slow) var(--ease-out);
}
```

#### Slide Up
```css
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.slide-up {
  animation: slideUp var(--duration-slow) var(--ease-out);
}
```

#### Button Press
```css
.btn:active {
  transform: translateY(1px);
  transition: transform var(--duration-fast) var(--ease-standard);
}
```

### Interaction States

| Element | Hover | Active | Focus |
|---------|-------|--------|-------|
| Button | Darken 10% | Translate Y 1px | 2px outline offset |
| Card | Lift 2px, shadow | Scale 0.99 | 2px outline |
| Link | Color change | Underline | Outline |
| Input | Border darken | — | Ring shadow |

### Motion Rules

1. **No spring physics** (no bounce, no overshoot)
2. **No parallax beyond 10% differential**
3. **Maximum animation duration: 500ms**
4. **Respect `prefers-reduced-motion`**
5. **Never animate layout properties** (width, height, top, left)
6. **Transform and opacity only** for smooth performance

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Accessibility

### Standards

This design system targets **WCAG 2.1 Level AA** compliance minimum.

### Color Contrast

| Element | Minimum Ratio | Target |
|---------|---------------|--------|
| Body text | 4.5:1 | 7:1+ |
| Large text (24px+) | 3:1 | 4.5:1 |
| UI components | 3:1 | 4.5:1 |
| Focus indicators | 3:1 | 4.5:1 |

### Focus States

All interactive elements must have visible focus states:

```css
:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

/* Remove default outline, rely on custom */
:focus:not(:focus-visible) {
  outline: none;
}
```

### Keyboard Navigation

- All interactive elements reachable via Tab
- Logical tab order following visual hierarchy
- Skip links for main content
- Escape closes modals and dropdowns
- Arrow keys navigate within components

### Typography Accessibility

- Minimum body text: 16px
- Minimum line height: 1.5 for body text
- Maximum line length: 75 characters
- Sufficient paragraph spacing
- No text in images for essential content

### Touch Targets

- Minimum touch target: 44x44px
- Spacing between targets: 8px minimum
- Adequate padding on mobile navigation

### Screen Reader Support

- Semantic HTML structure
- ARIA labels where needed
- Alt text for all images
- Form labels associated with inputs
- Status messages announced

### Testing Checklist

- [ ] Color contrast passes automated testing
- [ ] Keyboard navigation complete
- [ ] Screen reader announces content logically
- [ ] Focus states visible
- [ ] Touch targets adequate
- [ ] Reduced motion respected
- [ ] Text resizes without breaking layout

---

## Do's and Don'ts

### Color

| Do | Don't |
|----|-------|
| Use muted, earthy tones | Use bright, saturated colors |
| Maintain warm undertones | Use cold blues or purples |
| Ensure sufficient contrast | Sacrifice readability for aesthetics |
| Use dark mode thoughtfully | Simply invert all colors |

### Typography

| Do | Don't |
|----|-------|
| Let headlines command attention | Use display fonts for body text |
| Maintain consistent hierarchy | Mix more than 3 typefaces |
| Use uppercase sparingly | Set long passages in uppercase |
| Keep body text 16px minimum | Sacrifice readability for style |

### Layout

| Do | Don't |
|----|-------|
| Use generous whitespace | Crowd elements together |
| Align to grid consistently | Break grid without purpose |
| Prioritize mobile experience | Design desktop-first |
| Create clear visual hierarchy | Give everything equal weight |

### Texture

| Do | Don't |
|----|-------|
| Apply textures at 2-5% opacity | Use heavy grunge overlays |
| Test designs without texture | Rely on texture for visual interest |
| Use texture to add warmth | Let texture reduce legibility |
| Keep textures tileable | Use low-resolution textures |

### Imagery

| Do | Don't |
|----|-------|
| Embrace imperfect moments | Use polished stock photography |
| Apply warm color grading | Over-process with HDR |
| Accept film grain and noise | Use artificial vintage filters |
| Capture authentic performances | Stage unnatural scenes |

### Motion

| Do | Don't |
|----|-------|
| Use subtle, purposeful animation | Add animation for decoration |
| Keep durations under 500ms | Use bouncy or spring physics |
| Respect reduced motion preferences | Force animation on all users |
| Animate transforms and opacity | Animate layout properties |

### Components

| Do | Don't |
|----|-------|
| Make buttons feel weighty | Use flashy hover effects |
| Keep forms simple and clear | Over-design input fields |
| Use cards for scannable content | Create card soup |
| Provide clear feedback states | Leave users guessing |

### Overall

| Do | Don't |
|----|-------|
| Channel heritage through discipline | Create a vintage parody |
| Let the system breathe | Over-design every element |
| Trust the typography | Compensate with ornament |
| Build for real users | Prioritize aesthetics over function |

---

## Implementation Notes

### CSS Custom Properties

All design tokens should be implemented as CSS custom properties at the `:root` level for easy theming and dark mode support.

```css
:root {
  /* Colors */
  --color-primary: #4A5D4C;
  --color-primary-dark: #2D3B2E;
  /* ... etc */

  /* Typography */
  --font-display: "Clarendon URW", Georgia, serif;
  --font-body: "Source Serif Pro", Georgia, serif;
  --font-mono: "IBM Plex Mono", monospace;

  /* Spacing */
  --space-1: 8px;
  --space-2: 16px;
  /* ... etc */

  /* Motion */
  --duration-normal: 200ms;
  --ease-standard: cubic-bezier(0.4, 0.0, 0.2, 1);
}

[data-theme="dark"] {
  --color-bg-primary: #1C1C1A;
  --color-text-primary: #EDE9DC;
  /* ... dark mode overrides */
}
```

### File Structure

Following DRY principles and CSS architecture rules, the system uses two files:

```
css/
├── themes.css    # All CSS custom properties (colors, spacing, fonts, shadows)
└── styles.css    # Components, layout, utilities (BEM naming)

img/
├── logo-stompers.png
├── logo-goon.png
└── overlay_filmgrain.gif
```

**HTML includes:**
```html
<link rel="stylesheet" href="css/themes.css">
<link rel="stylesheet" href="css/styles.css">
```

### Naming Conventions (BEM)

```yaml
block: .card, .btn, .tour-item
element: .card-body, .tour-item-date      # part of block (hyphen, not underscore)
modifier: .btn--primary, .btn--sm         # variation (double hyphen)
state: .is-active, .is-open, .has-error   # dynamic state
```

### CSS Variable Rules

All values must reference theme variables - never hardcode:

```css
/* Required variables */
colors: var(--color-*)        /* never hex */
spacing: var(--spacing-*)     /* never px */
fonts: var(--font-size-*)     /* never rem/px directly */
radius: var(--radius-*)
shadows: var(--shadow-*)
```

---

## Interactive Tour Dates Component

A key feature is the interactive tour dates list with map integration. When users hover or tap a venue, the embedded Google Map updates to show that location.

### HTML Structure

```html
<div class="tour-section">
  <!-- Map -->
  <div class="tour-map">
    <iframe id="tour-map-frame" src="..." loading="lazy" allowfullscreen></iframe>
  </div>

  <!-- Tour List -->
  <div class="tour-list-container">
    <ul class="tour-list">
      <li class="tour-item is-active" data-venue="Venue Name" data-location="City, ST">
        <div class="tour-item-date">
          <span class="tour-item-date-month">Jan</span>
          <span class="tour-item-date-day">15</span>
        </div>
        <div class="tour-item-venue">
          <h3 class="tour-item-venue-name">
            <a href="https://venue-website.com">Venue Name</a>
          </h3>
          <p class="tour-item-location">City, ST</p>
        </div>
        <div class="tour-item-actions">
          <a href="#" class="tour-item-tag">Tickets</a>
          <span class="tour-item-tag">21+</span>
        </div>
      </li>
    </ul>
  </div>
</div>
```

### JavaScript Behavior

```javascript
// Generate Google Maps embed URL from data attributes
const generateMapUrl = (item) => {
  const venue = item.dataset.venue || '';
  const location = item.dataset.location || '';
  const query = venue.includes('private') ? location : `${venue} ${location}`;
  return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
};

// Update map on hover/click
tourItems.forEach((item) => {
  item.addEventListener('mouseenter', () => setActiveTourItem(item));
  item.addEventListener('click', (e) => {
    if (e.target.tagName !== 'A') setActiveTourItem(item);
  });
});
```

### Key Features

- **Hover/tap to update map** - Intuitive interaction pattern
- **Venue links preserved** - Links to external venue pages still work
- **Private events** - Use location-only search for private gigs
- **Mobile-first** - Map shows below list on mobile, side-by-side on desktop
- **Sticky map** - Map stays visible while scrolling through long lists

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.1 | January 2026 | Added interactive tour dates, BEM refactor, DRY file structure |
| 1.0 | January 2026 | Initial release |

---

*"A southern rock band that takes their craft seriously—musically and visually."*
