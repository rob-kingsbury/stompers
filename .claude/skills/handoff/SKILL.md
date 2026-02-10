---
name: handoff
description: Execute full session handoff workflow - update docs, commit, push
disable-model-invocation: true
---

# Session Handoff

Execute the complete handoff workflow to preserve session state.

## Pre-Flight Check

```bash
git status
```

**STOP if uncommitted code changes exist** without explicit user approval. Documentation-only changes are fine to proceed with.

## Step 1: Persist Todos to GitHub Issues

For any incomplete work discovered during session:

```bash
gh issue create --title "[title]" --body "[description]" --label "[label]"
```

Labels: `enhancement`, `bug`, `animation`, `css`, `mobile`

For completed work that had an issue:

```bash
gh issue close [number] --comment "Completed in session [N]"
```

## Step 2: Update context.md

Update the YAML frontmatter:

```yaml
---
project: Stompers
status: [current status]
last_session: [N]
session_date: [YYYY-MM-DD]
current_focus: [what was worked on]
open_issues: [count]
next_priority: "[next task]"
---
```

Add session notes:

```markdown
### [Month] [Year] - Session [N]: [Title]

**What was done:**
- [Item 1]
- [Item 2]

**Files Modified:**
- [file1]
- [file2]

**Issues Created:** #XX, #YY
**Issues Closed:** #ZZ
```

**Keep only last 5 sessions in Recent Changes.** Prune oldest first. Old content is in git history.

## Step 3: Commit and Push

```bash
git add .claude/context.md
git commit -m "$(cat <<'EOF'
Update context.md with session [N] handoff notes

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
EOF
)"
git push
```

## Step 4: Output Summary

```
================================================================================
SESSION [N] COMPLETE
================================================================================

Completed:
- [Item 1]
- [Item 2]

Issues Created: #XX, #YY
Issues Closed: #ZZ

Files Updated:
- .claude/context.md

Commit: [short hash]
Pushed: Yes

--------------------------------------------------------------------------------
NEXT SESSION
--------------------------------------------------------------------------------
Continue with: [next priority]
================================================================================
```

## Critical Rules

1. **NEVER skip documentation updates** - Next session depends on accurate state
2. **NEVER commit without user approval** if there are unexpected code changes
3. **ALWAYS include Co-Authored-By** in commit message
4. **ALWAYS verify push succeeded**
