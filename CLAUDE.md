# Stompers Project Rules

## Model Usage

**Default to Sonnet** for routine tasks:
- File cleanup, organization
- Simple edits and refactors
- Git operations (commit, push, branch)
- Reading/exploring code
- Creating issues
- Documentation updates

**Use Opus** for complex tasks:
- Architectural decisions
- Complex GSAP/animation logic
- Debugging tricky scroll behavior
- Multi-file refactors with dependencies
- Planning new features

**When spawning agents (Task tool):** Always specify `model: "haiku"` or `model: "sonnet"` for simple subtasks to save tokens.

## Project Context

- **Main file:** index-immersive-master.html
- **Styles:** css/immersive-master.css, css/themes.css
- **Animations:** js/main-master.js (GSAP + Lenis)
- **Docs:** .claude/context.md, handoff.md

## Quick Reference

```bash
npm run dev          # Start dev server
gh issue list        # View open issues
```

## See Also

- `.claude/context.md` - Full project context
- `.claude/workflows.yaml` - Automated workflows (handoff, status, audit)
- `.claude/rules/` - Development standards
