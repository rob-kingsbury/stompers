# Development Workflow Rules

**DO NOT REMOVE** - These rules define how we develop and maintain Stompers together.

## Core Principles

1. **You direct, Claude builds**: You set priorities and make decisions, I implement and maintain
2. **GitHub Issues for tracking**: All features, bugs, and tasks go in GitHub Issues
3. **Test locally**: Run `npm run dev` and verify before committing
4. **Incremental progress**: Small commits, clear descriptions

## Working Patterns

### Starting a New Feature

1. Create GitHub Issue with clear scope
2. I explore existing code and understand context
3. Implement with frequent saves/commits
4. Test locally before showing you
5. You verify and approve or request changes

### Making Changes

1. Read existing files first (never guess at structure)
2. Prefer editing over creating new files
3. Keep changes focused on the task
4. No over-engineering or unnecessary refactoring
5. Commit with clear messages describing what and why

### When Stuck or Unsure

1. Ask clarifying questions
2. Present options with trade-offs
3. Wait for your decision
4. Never make assumptions about preferences

## File Organization

```
stompers-redesign/
├── index.html                     # Master design (main file)
├── css/
│   ├── styles.css                 # Master styles
│   └── themes.css                 # CSS variables
├── js/
│   └── main.js                    # GSAP/Lenis/Barba animations
├── img/
│   └── vid-header-mute.mp4        # Hero video
├── .claude/
│   ├── context.md                 # Project context (YAML frontmatter)
│   ├── workflows.yaml             # Automated workflows
│   ├── functions.md               # GSAP function reference
│   ├── style-guide.json           # Design tokens
│   ├── skills/                    # Custom skills
│   │   ├── session-start/         # /session-start
│   │   ├── handoff/               # /handoff
│   │   ├── fix-issue/             # /fix-issue [number]
│   │   └── simplify/              # /simplify [file]
│   └── rules/
│       ├── development-workflow.md  # This file
│       ├── css-architecture.md      # CSS standards
│       └── thinking-mode.md         # When to use deep analysis
└── handoff.md                     # Detailed section docs
```

## Commit Messages

Format:
```
Short description of change

- Detail 1
- Detail 2

Fixes #123

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
```

### Auto-Close Issues in Commits

When a commit completes a GitHub issue, include:
- `Fixes #123` - Closes the issue when pushed
- `Closes #123` - Same as Fixes
- `Resolves #123` - Same as Fixes

No emojis. Keep it clean and professional.

## Before Every Commit

Checklist:
- [ ] Changes match the task scope
- [ ] Tested locally with `npm run dev`
- [ ] Commit message is clear
- [ ] No console.log statements left behind

## Before Every Push

Checklist:
- [ ] Review `git diff` for any accidental changes
- [ ] Ensure all tests pass visually in browser
- [ ] Check that animations work on scroll

## GitHub Issues

### Labels to Use
- `bug` - Something broken
- `enhancement` - New feature
- `animation` - GSAP/scroll animations
- `css` - Styling issues
- `mobile` - Responsive/mobile issues
- `priority-high` - Urgent

### Workflow
```bash
# View open issues
gh issue list --state open

# Create issue
gh issue create --title "Title" --body "Description" --label "enhancement"

# Close via commit (preferred)
# Include "Fixes #123" in commit message - auto-closes on push

# Manual close (if needed)
gh issue close <number> --comment "Completed in <commit>"
```

## Sessions and Context

### Starting a Session

Use `/session-start` skill, or respond to "Ready?" the same way:
1. Read `.claude/context.md` and `handoff.md` in parallel
2. Run `gh issue list --state open`
3. Output formatted session summary

Read `handoff.md` for section-specific work, `functions.md` for animation work.

### Ending a Session

Use `/handoff` skill:
1. Persist incomplete todos as GitHub Issues
2. Update context.md with session notes
3. Commit and push

### Available Skills

```
/session-start          Load context, check issues, display summary
/handoff                End session: update docs, commit, push
/fix-issue [number]     Work on a GitHub issue with full context
/simplify [file]        Run code-simplifier on modified code
```

### During a Session

- Run `npm run dev` to start development
- Check issues with `gh issue list`
- Use keyword triggers (see CLAUDE.md) for auto-loading relevant docs

## Your Preferences (Learned)

- No emojis in code or commits
- Simple solutions over complex ones
- Explain trade-offs, let you decide
- Test animations thoroughly before committing

---

*These rules evolve as we work together. Update as needed.*
