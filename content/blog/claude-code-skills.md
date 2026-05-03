---
title: Skills as Reusable Knowledge Artifacts in Claude Code
description: Skills let you package procedures, templates, and dynamic context into on-demand modules — without bloating CLAUDE.md or repeating yourself across sessions.
date: 2026-04-13
category: AI Tooling
readTime: 7 min read
tags: [Claude Code, Skills, Reusability, Developer Tools]
---

# Skills as Reusable Knowledge Artifacts

CLAUDE.md is always-on context. Skills are on-demand context — loaded only when needed, keeping your token budget available for actual work.

## Anatomy of a Skill

Skills live in `.claude/skills/<name>/SKILL.md`:

```
.claude/skills/
  pr-review/
    SKILL.md           # the skill definition
    checklist.md       # supporting reference file
    examples/          # example PRs for reference
  deploy/
    SKILL.md
    runbook.md
```

## Frontmatter Fields

```yaml
---
name: pr-review
description: Review a pull request for security, performance, and readability
allowed-tools: [read_file, search_files, bash]
user-invocable: true
---
```

- **description** — used by Claude to decide when to auto-invoke the skill
- **allowed-tools** — pre-approved tools for this skill (no permission prompts)
- **user-invocable** — shows up in `/` command menu if true

## Dynamic Context Injection

The most powerful skill feature: inject live shell output before Claude sees the skill content.

```markdown
## Current PR Diff
!`gh pr diff $PR_NUMBER`

## Current Branch
!`git branch --show-current`

## Review Checklist
@checklist.md
```

The `` !`command` `` syntax runs before Claude reads the skill. Claude sees the resolved output — always fresh, never stale.

## Argument Substitution

```markdown
---
arguments:
  - name: environment
    description: Target deployment environment (staging/production)
---

Deploying to: $environment
```

Invoke with `/deploy environment=production` — Claude receives the substituted content.

## User vs. Claude Invocation

```yaml
user-invocable: true          # appears in / menu, Claude can also use it
user-invocable: false         # hidden from menu, Claude still auto-invokes
disable-model-invocation: true # only user can invoke, Claude cannot
```

Use `disable-model-invocation: true` for sensitive procedures you want explicit human trigger on — deploy runbooks, incident response steps.

## Context Isolation with `context: fork`

```yaml
---
context: fork
---
```

Runs the skill in a subagent with its own isolated context. The main conversation sees only the result. Use for heavy exploration skills that would otherwise consume your main window.

## Skill Preloading in Subagents

When a subagent is defined with a skill, the full skill content is injected at subagent startup — not lazy-loaded. Design subagent skills to be complete and self-contained.

## Monorepo Support

Skills in subdirectories load based on path:

```
packages/api/.claude/skills/    # available when working in packages/api/
packages/web/.claude/skills/    # available when working in packages/web/
```

Each package can have its own skill set without polluting siblings.

## Practical Skills Worth Building

| Skill | What It Does |
|---|---|
| `pr-review` | Runs checklist with live diff injected |
| `deploy` | Deployment runbook with env argument |
| `incident` | Incident response steps with Sentry MCP |
| `db-migration` | Migration safety checklist |
| `release-notes` | Generates release notes from git log |

## Summary

Skills are the middle layer between "always loaded" (CLAUDE.md) and "run it yourself" (raw commands). They're the right place for anything you do more than twice — packaged, reproducible, and token-efficient.
