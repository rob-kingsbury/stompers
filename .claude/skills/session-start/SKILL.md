---
name: session-start
description: Load all project context files and display current state at session start
disable-model-invocation: true
---

# Session Start

Initialize a new Stompers session by loading all required context.

## Step 1: Load Context Files

Read these files (in parallel):

1. `c:\xampp\htdocs\stompers-redesign\.claude\context.md` - Session history, YAML metadata
2. `c:\xampp\htdocs\stompers-redesign\handoff.md` - Section documentation

## Step 2: Check GitHub Issues

```bash
gh issue list --state open
```

## Step 3: Output Session Summary

Format output as:

```
================================================================================
STOMPERS SESSION [N+1] READY
================================================================================

Project: Swamp City Stompers (Immersive Redesign)
Status: [from context.md YAML frontmatter]
Last Session: [N] - [current_focus from context.md]

--------------------------------------------------------------------------------
OPEN ISSUES ([count])
--------------------------------------------------------------------------------
| #  | Title                                    | Labels     |
|----|------------------------------------------|------------|
| XX | [title]                                  | [labels]   |

--------------------------------------------------------------------------------
CURRENT FOCUS
--------------------------------------------------------------------------------
[next_priority from context.md frontmatter]

--------------------------------------------------------------------------------
CONTEXT LOADED
--------------------------------------------------------------------------------
- context.md (Session [N])
- handoff.md

--------------------------------------------------------------------------------
AVAILABLE SKILLS
--------------------------------------------------------------------------------
/fix-issue [number]     Work on a GitHub issue with full context
/simplify [file]        Run code-simplifier on modified code
/handoff                Execute full handoff workflow

--------------------------------------------------------------------------------
READY TO WORK
--------------------------------------------------------------------------------
Continue with: [next_priority from context.md]
```

## Step 4: Await Instructions

After displaying summary, wait for user to specify what to work on.

## Quick Actions

If user immediately specifies a task:
- Issue number: Run `/fix-issue [number]`
- "continue": Pick up from context.md next_priority
- "audit": Begin audit workflow
