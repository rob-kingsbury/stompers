---
name: fix-issue
description: Work on a GitHub issue with full project context loaded automatically
disable-model-invocation: true
argument-hint: "[issue number]"
allowed-tools: Bash(gh *), Read, Grep, Glob, Edit, Write, Task
---

# Fix GitHub Issue

Work on GitHub issue #$ARGUMENTS with full project context.

## Step 1: Load Issue Context

```bash
gh issue view $ARGUMENTS
```

Read the issue title, description, labels, and any comments.

## Step 2: Load Relevant Context

Based on issue labels, load the appropriate reference files:

| Label | Auto-Load |
|-------|-----------|
| `animation` | `.claude/functions.md` |
| `css` | `.claude/style-guide.json` |
| `mobile` | `.claude/functions.md` (responsive utilities section) |
| Any section work | `handoff.md` |

Always load:
- `c:\xampp\htdocs\stompers-redesign\.claude\context.md` - Current state

## Step 3: Understand Requirements

Based on the issue:
1. Identify what needs to change
2. Find relevant files (search codebase)
3. Review related code patterns
4. Check handoff.md for section-specific documentation

## Step 4: Implementation

Follow these rules from `.claude/rules/`:

**CSS Architecture:**
- CSS variables for colors, spacing, z-index (never hardcode)
- Mobile-first (min-width queries)
- No !important
- Z-index from power-of-9 scale

**GSAP/Animation:**
- will-change only on animated elements
- immediateRender: false on gsap.from() with ScrollTrigger
- Responsive configs via getScrollTriggerConfig()
- prefersReducedMotion() support

**General:**
- No console.log left behind
- Test at mobile, tablet, desktop widths

## Step 5: Verify

1. Run `npm run dev` and verify visually
2. Check animation at multiple viewport widths
3. Confirm the issue is resolved

## Step 6: Commit (if requested)

Only commit when user explicitly asks. Follow commit format:

```bash
git add [specific files]
git commit -m "$(cat <<'EOF'
Fix #$ARGUMENTS: [short description]

- [Detail 1]
- [Detail 2]

Fixes #$ARGUMENTS

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
EOF
)"
```

## Issue Categories

| Label | Approach |
|-------|----------|
| `bug` | Find root cause first, then fix |
| `enhancement` | Check existing patterns, extend |
| `animation` | Load functions.md, check ScrollTrigger patterns |
| `css` | Load style-guide.json, check variable compliance |
| `mobile` | Test at 375px, check responsive utilities |
