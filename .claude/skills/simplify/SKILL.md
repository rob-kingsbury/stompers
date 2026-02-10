---
name: simplify
description: Run code-simplifier patterns on recently modified code - preserves functionality while improving clarity
disable-model-invocation: true
argument-hint: "[file path or 'recent' for git-modified files]"
allowed-tools: Read, Edit, Bash(git diff *)
---

# Code Simplifier

Simplify and refine code for clarity, consistency, and maintainability while **preserving all functionality**.

Based on: [Anthropic Code-Simplifier Agent](https://github.com/anthropics/claude-plugins-official/blob/main/plugins/code-simplifier/agents/code-simplifier.md)

## Target Files

**If `$ARGUMENTS` is "recent" or empty:**
```bash
git diff --name-only HEAD~1
```

**If `$ARGUMENTS` is a specific file:**
Read and analyze that file.

## Core Principles

### 1. Preserve Functionality
- NEVER change what the code does - only how it does it
- All animations, scroll behavior, and interactions MUST remain intact
- If unsure, don't change it

### 2. Apply Stompers Project Standards

**CSS:**
- Use CSS variables from themes.css (never hardcode colors, spacing, z-index)
- Mobile-first: base styles for mobile, min-width queries to enhance
- BEM naming: .block, .block-element, .block--modifier
- No !important (unless overriding GSAP inline styles)
- will-change only on animated elements

**JavaScript:**
- Use responsive utilities (isMobile(), isDesktop(), prefersReducedMotion())
- Use getScrollTriggerConfig() for responsive trigger points
- immediateRender: false on gsap.from() with ScrollTrigger
- Clean ScrollTrigger references (kill on cleanup)
- Descriptive function names

**HTML:**
- Semantic elements
- data-section attributes for ScrollTrigger targeting
- No inline styles (unless GSAP sets them)
- No inline scripts

### 3. Enhance Clarity

**DO:**
- Reduce unnecessary complexity and nesting
- Eliminate redundant code
- Improve variable/function names
- Consolidate related logic
- Remove obvious comments (code should be self-documenting)

**DON'T:**
- Use nested ternaries
- Create "clever" one-liners that sacrifice readability
- Remove helpful abstractions
- Combine unrelated concerns

## Simplification Checklist

### CSS Files
- [ ] Using CSS variables for all colors, spacing, z-index
- [ ] Mobile-first media queries (min-width)
- [ ] No duplicate property declarations
- [ ] Consistent BEM naming
- [ ] will-change only on elements that animate

### JavaScript Files
- [ ] Using responsive utility functions
- [ ] Guard clauses at function start (early returns)
- [ ] No deeply nested callbacks
- [ ] ScrollTrigger configs use getScrollTriggerConfig()
- [ ] prefersReducedMotion() checks present

### HTML Files
- [ ] No hardcoded inline styles
- [ ] Semantic elements used appropriately
- [ ] data-section attributes present for scroll targeting

## Output Format

After simplifying, report:

```markdown
## Simplified: [filename]

### Changes Made
1. [Change 1] - [reason]
2. [Change 2] - [reason]

### Preserved
- [Functionality that was not changed and why]

### Verification
- [ ] Functionality unchanged
- [ ] Follows project standards
- [ ] Tested visually at mobile/desktop
```

## When NOT to Simplify

- Code that's already clear and follows standards
- Third-party code or vendor files
- GSAP timeline sequences (timing is intentional)
- Code with known technical debt flagged in GitHub Issues
