# Stompers Design System & Brand Guide

**Last Updated:** 2026-03-27 (Session 14)
**Audited by:** Morgan (patterns) + Atlas (architecture)

---

## Typography Rules

| Element | Font | Size | Weight | Letter-Spacing | Case |
|---------|------|------|--------|----------------|------|
| Page Title | Mono | `clamp(3rem, 10vw, 6rem)` | 700 | `wider` (0.05em) | UPPER |
| Section Title | Mono | `clamp(2.5rem, 6vw, 5rem)` | 700 | `wider` | UPPER |
| Card Title | Mono | `clamp(2rem, 6vw, 4rem)` | 700 | `wide` (0.025em) | UPPER |
| Eyebrow/Label | Mono | `xs` (12px) | 700 | `extreme` (0.3em) | UPPER |
| Body Copy | Serif | `md`-`lg` (16-20px) | 400 | `normal` | Sentence |
| Body Muted | Serif | `md` (16px) | 400 | `normal` | Sentence |
| Quote | Serif | `lg`-`2xl` | 400 | `normal` | Sentence, italic |
| Button | Mono | `sm` (14px) | 400 | `wider` (0.05em) | UPPER |
| Tag/Pill | Mono | `xs` (12px) | 600 | `wide` (0.025em) | UPPER |
| Small Label | Mono | `xs` (12px) | 500 | `widest` (0.1em) | UPPER |

### Font Families
- **Mono** (`--font-mono`): IBM Plex Mono -- headings, labels, buttons, UI elements
- **Serif** (`--font-serif`): Source Serif Pro -- body copy, quotes, descriptions

### Rule: Never mix fonts within a single UI component.

---

## Color Usage

| Purpose | Variable | Value |
|---------|----------|-------|
| Background | `--color-bg` | `#0a0a0a` |
| Alt Background | `--color-bg-alt` | `#111111` |
| Surface | `--color-surface` | `#1a1a1a` |
| Primary Text | `--color-text` | `#f5f5f0` |
| Secondary Text | `--color-text-secondary` | `rgba(255,255,255,0.8)` |
| Muted Text | `--color-text-muted` | `rgba(255,255,255,0.6)` |
| Accent (Gold) | `--color-accent` | `#c9a227` |
| Border | `--color-border` | `rgba(255,255,255,0.1)` |

**Rule:** Never hardcode hex. Always use CSS variables.

---

## Component Patterns

### Page Hero
```html
<section class="page-hero page-hero--{variant}">
  <div class="page-hero-content">
    <span class="section-number">EYEBROW LABEL</span>
    <h1 class="page-title">Title</h1>
  </div>
</section>
```
- Min height: `40vh`
- Background: 135deg gradient with page-specific tint
- Centered, padded `--spacing-3xl` / `--spacing-xl`

### Eyebrow Label (`.section-number`)
- Mono, `xs`, `extreme` letter-spacing (0.3em), gold accent, UPPER
- Always block-level, `margin-bottom: --spacing-sm`

### Section Header
```html
<header class="section-header section-header--center">
  <h2 class="section-title">Title</h2>
</header>
```
- `margin-bottom: --spacing-2xl` (48px)

### Buttons
```html
<a class="btn btn-primary">Primary Action</a>
<a class="btn btn-outline">Secondary Action</a>
```
- Padding: `--spacing-md` / `--spacing-xl` (16px 32px)
- Font: Mono, `sm`, `wider` letter-spacing
- Border: `1px solid --color-accent`
- Primary: Gold bg, dark text. Hover: inverts to outline
- Outline: Transparent, gold text. Hover: fills gold

### Tags/Pills
```html
<span class="epk-split-tag epk-split-tag--gold">Genre</span>
<span class="epk-split-tag">For Fans Of</span>
```
- Padding: `--spacing-xs` / `--spacing-md`
- Mono, `xs`, `wide` letter-spacing, UPPER
- Gold variant: accent border, accent text, 8% accent bg

### Quote Block (with border)
```html
<div class="epk-split-quote">
  <blockquote>"Quote text"</blockquote>
  <cite>-- Attribution</cite>
</div>
```
- Left border: 3px gold
- Background: 4% accent tint
- Serif, italic, `lg`
- Citation: Mono, `xs`, muted

### CTA Section
```html
<section class="cta-section">
  <div class="cta-content">
    <h2>Heading</h2>
    <p>Description</p>
    <a class="btn btn-primary">Action</a>
  </div>
</section>
```
- Padding: `--spacing-5xl` / `--spacing-xl` (128px 32px)
- Background: `--color-bg-alt`
- Content max-width: 600px, centered
- H2: Mono, `clamp(1.5rem, 4vw, 2.5rem)`

### Lists (Key-Value)
```html
<ul class="epk-split-sets">
  <li><span>Label</span><span>Description</span></li>
</ul>
```
- `display: flex; justify-content: space-between`
- Border-bottom separators
- Mono, `sm`
- First span: `--color-text`, medium weight
- Second span: `--color-text-secondary`

### Download Links
```html
<a class="epk-dl-link"><svg>...</svg> Label</a>
```
- Flex, center-aligned, `gap: --spacing-sm`
- Mono, `xs`, muted
- SVG stroke: accent
- Hover: text becomes accent

### Footer
```html
<footer class="site-footer">
  <img src="img/logo-goon.png" class="footer-logo">
  <p>&copy; 2026 Swamp City Stompers</p>
  <p>Eastern Ontario, Canada</p>
</footer>
```
- Border-top, centered, Mono, muted
- Logo: 80px, grayscale, 60% opacity

---

## Spacing Rhythm

| Context | Value |
|---------|-------|
| Between major sections | `--spacing-3xl` to `--spacing-4xl` (64-96px) |
| Section internal padding | `--spacing-3xl` / `--spacing-xl` (64px 32px) |
| Between components | `--spacing-xl` to `--spacing-2xl` (32-48px) |
| Between elements | `--spacing-md` to `--spacing-lg` (16-24px) |
| Tight gaps (tags, pills) | `--spacing-sm` (8px) |

---

## Animation Patterns

### Scroll Reveal (Default)
```css
/* Initial state in CSS */
.element { opacity: 0; transform: translateY(20px); will-change: transform, opacity; }

/* Animated via GSAP ScrollTrigger */
gsap.to('.element', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out',
  scrollTrigger: { trigger: '.element', start: 'top 85%' }
});
```

### Hover Interactions (CSS only)
- Buttons: background/color swap, `--duration-slow` (300ms)
- Cards: `border-color` change, optional `translateY(-4px)` lift
- Links: color change to accent
- Images: `scale(1.02)`, `filter` shift

### Page Transitions (Barba.js)
- Leave: fade out + translate up (-30px) + scale(0.98), 350ms
- Enter: fade in + translate down (30px) + scale(0.98) to normal, 350ms
- `enter()` must be async (wait for completion before `afterEnter`)

---

## Responsive Rules

1. **Mobile-first**: base styles for mobile, `min-width` queries to enhance
2. **Breakpoints**: 768px (tablet), 992px (desktop)
3. **Font sizing**: Always `clamp()` for fluid scaling
4. **Grids**: 1fr mobile -> multi-column tablet+
5. **Sticky elements**: unstick on mobile (position: relative)

---

## Brand Voice & Tone

### Identity
The Stompers are "the B-side guys." They play familiar favorites people forgot they loved.

### Voice Rules
1. **Honest & gritty** -- no marketing fluff
2. **Human & accessible** -- speak to venue owners AND fans
3. **No ego** -- confidence without arrogance
4. **Direct** -- short sentences, active voice, contractions OK
5. **Sensory** -- paint scenes, reference real details

### Words to Use
- "grit," "swamp," "blues," "soul," "roots," "honest"
- "B-side," "deep cut," "familiar favorite," "deserved a bigger stage"
- "the kind of music that makes strangers buy each other rounds"

### Words to Avoid
- "loud," "aggressive," "intense," "epic"
- "legendary," "iconic," "revolutionary," "world-class"
- "experience," "journey," "transcendent"
- Exclamation marks (one per page max)

### Tone by Audience
- **Venue owners**: reliable, professional, crowd-moving, easy to book
- **Fans**: fun, real, no-pretense, make-you-feel-something
- **Press/EPK**: factual, positioned, quotable

---

## Do's and Don'ts

### Do
- Use CSS variables for every value
- Mobile-first CSS
- `clamp()` for fluid typography
- Semantic HTML (`section`, `article`, `nav`, `footer`)
- Test at 375px, 768px, 1200px
- `loading="lazy"` on images
- `:focus-visible` on all interactive elements

### Don't
- Hardcode hex colors
- Use `!important`
- Apply `transform` to sticky elements
- Use `overflow: hidden` on body (breaks sticky)
- Create arbitrary z-index values
- Animate `width`/`height`/`top`/`left`
- Say "legendary" or "iconic"
