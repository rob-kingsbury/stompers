# Stompers Project Rules

## Communication Style

Facts only. No fluff. Direct disagreement when something won't work.

- Do NOT hype animation/UX ideas - evaluate performance and feasibility first
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
| section, hero, band, tour, watch, epk, contact, about, marquee | `handoff.md` |
| tour csv, sheets, geocoding, tour-dates | `includes/tour-dates.php` |
| roster, drive, permissions, apps script | `data/roster-sheet-setup.gs` |
| issue, fix, bug | `gh issue view [number]` |

## Project Scope

**What Stompers IS (session 22 onward):** A single-page band website for the Swamp City Stompers. Vanilla PHP + CSS + JS. Vintage southern-rock aesthetic (oxblood + gold + parchment). Live tour data via Google Sheets CSV. Bandpilot-driven artist marquee. No build step.

**What Stompers IS NOT:** A web app, a CMS, a SaaS product. No client-side framework. No Vite, no GSAP, no Lenis, no Barba. Keep it simple, plumbing-grade.

## Stack

- **Server:** XAMPP Apache locally; WHC shared hosting in prod
- **Templating:** Plain PHP includes from `includes/*.php`
- **CSS:** `css/site.css` (components) + `css/colors_and_type.css` (tokens)
- **JS:** `js/site.js`. IntersectionObserver for reveals, no animation library
- **Live data:** Tour CSV (Google Sheets) + Marquee artists (BandPilot Supabase via Mgmt API)
- **Email:** PHP `mail()` via `contact-handler.php`

## Model Usage

**Default to Sonnet** for routine tasks:
- File cleanup, simple edits, git operations, reading/exploring code, documentation

**Use Opus** for complex tasks:
- Multi-file refactors, architectural decisions, planning
- Debugging cross-section bugs
- New section design

**When spawning agents (Task tool):** Always specify `model: "haiku"` or `model: "sonnet"` for subtasks unless complexity demands Opus.

## Project Layout

- **Entry:** `index.php` (single page, all sections included)
- **Sections:** `includes/{hero,marquee,about,band,tour-section,watch,epk,contact,footer}.php`
- **Data layer:** `includes/{tour-dates,marquee}.php`, `data/*.json`, `data/*.gs`
- **Archive:** `_archive/site-v2-pre-jk-redesign/` (old Vite/GSAP build, frozen)
- **Config:** `config.php` (gitignored) holds Supabase mgmt token

## Quick Reference

```bash
# Local dev - just hit XAMPP, no build step
open http://localhost/stompers-redesign/

# Tour CSV cache clear (forces re-fetch)
rm data/tour-cache.json

# Marquee artist cache clear
rm data/marquee-cache.json

gh issue list --state open
```

## Available Skills

```
/session-start          Load context, check issues, display summary
/handoff                End session: update docs, commit, push
/fix-issue [number]     Work on a GitHub issue with full context
/simplify [file]        Run code-simplifier on recent changes
```

## Before Pushing

- Verify renders correctly at mobile (375px), tablet (768px), desktop (1200px+)
- No console.log left behind
- Commit message follows format in development-workflow.md

## See Also

- `.claude/context.md` - Project state and session history
- `.claude/rules/` - Development standards
- Legacy GSAP/Vite reference: `_archive/site-v2-pre-jk-redesign/` (frozen, do not edit)
