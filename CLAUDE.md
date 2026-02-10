# Stompers Project Rules

## Communication Style

Facts only. No fluff. Direct disagreement when something won't work.

- Do NOT hype animation ideas - evaluate performance and feasibility first
- Do NOT say "this is novel" when CodePen/Awwwards has prior art
- ALWAYS estimate realistic browser performance, especially on mobile
- When in doubt about a visual effect, prototype it before committing

## Session Protocol

**Start every session** with `/session-start` (or respond to "Ready?" the same way).
**End every session** with `/handoff`.

Never begin work without loading context. Never end without updating it.

## Keyword Triggers

When a message contains these keywords, auto-load the relevant file BEFORE responding:

| Keywords | Auto-Load |
|----------|-----------|
| gsap, animation, scroll, lenis, scrolltrigger, timeline | `.claude/functions.md` |
| css, style, theme, color, spacing, z-index, font | `.claude/style-guide.json` |
| section, hero, band, tour, quote, merch, contact, about | `handoff.md` |
| issue, fix, bug | `gh issue view [number]` |

## Project Scope

**What Stompers IS:** A band website for the Swamp City Stompers with scroll-driven animations, immersive page transitions, and a dark/gold aesthetic. Static site, Vite build, GSAP + Lenis.

**What Stompers IS NOT:** A web app, a CMS, a SaaS product. No database, no auth, no server-side logic. Keep it simple.

## Model Usage

**Default to Sonnet** for routine tasks:
- File cleanup, simple edits, git operations, reading/exploring code, documentation

**Use Opus** for complex tasks:
- GSAP animation logic, ScrollTrigger timing, multi-section coordination
- Debugging scroll behavior, performance issues
- Multi-file refactors, architectural decisions, planning

**When spawning agents (Task tool):** Always specify `model: "haiku"` or `model: "sonnet"` for subtasks unless complexity demands Opus.

## Multi-Agent Patterns

Use these Opus 4.6 capabilities when appropriate:
- **Explore agents** for investigating animation bugs across HTML/CSS/JS
- **Plan agents** for designing new section animations
- **scroll-analyzer MCP** for visual testing of scroll behavior
- **Parallel agents** for independent research tasks (e.g., checking multiple sections)

## Project Context

- **Main file:** index.html
- **Styles:** css/styles.css, css/themes.css
- **Animations:** js/main.js (GSAP + Lenis + Barba.js)
- **Pages:** tour.html, story.html, epk.html, merch.html, contact.html
- **Docs:** .claude/context.md, handoff.md

## Quick Reference

```bash
npm run dev          # Start dev server
gh issue list        # View open issues
```

## Available Skills

```
/session-start          Load context, check issues, display summary
/handoff                End session: update docs, commit, push
/fix-issue [number]     Work on a GitHub issue with full context
/simplify [file]        Run code-simplifier on recent changes
```

## Before Pushing

- Verify animations work at mobile (375px), tablet (768px), desktop (1200px+)
- No console.log left behind
- Commit message follows format in development-workflow.md

## See Also

- `.claude/context.md` - Project state and session history
- `.claude/workflows.yaml` - Automated workflows (audit, handoff, status)
- `.claude/rules/` - Development standards
- `.claude/functions.md` - GSAP/Lenis function reference
- `.claude/style-guide.json` - Design tokens
