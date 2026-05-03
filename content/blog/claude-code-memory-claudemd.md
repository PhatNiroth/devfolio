---
title: Building Persistent Memory Without Repetition — CLAUDE.md Architecture and Auto Memory
description: Master the two-part memory system that makes Claude effective across sessions — compact CLAUDE.md files and self-learning auto memory.
date: 2026-04-09
category: AI Tooling
readTime: 7 min read
tags: [Claude Code, CLAUDE.md, Memory, Developer Tools]
---

# Building Persistent Memory Without Repetition

The biggest productivity leak with AI coding assistants is re-explaining context at the start of every session. Claude Code's two-layer memory system eliminates that.

## Layer 1: CLAUDE.md — What You Write

CLAUDE.md is your curated, intentional context. It loads every session before Claude does anything else.

### What Belongs Here

- Non-obvious build commands (`pnpm db:migrate` before `pnpm dev`)
- Project-specific code style that differs from defaults
- Architectural decisions and the reasoning behind them
- Common gotchas ("never import from `@/server` in components — causes SSR issues")

### What Doesn't Belong Here

- Standard conventions Claude already knows (don't explain what TypeScript is)
- Generic best practices
- Information that changes frequently (feature flags, current sprint tickets)
- Long documentation — link to it, don't paste it

### The Import Syntax

Break large CLAUDE.md files into modules:

```markdown
@.claude/rules/api.md
@.claude/rules/db.md
@docs/architecture.md
```

Imported files are resolved and loaded — they count toward context, but stay organized on disk.

## Layer 2: Auto Memory — What Claude Learns

Auto memory lives at `~/.claude/projects/<project>/memory/`. Claude writes to it as it discovers things: build quirks it ran into, debugging patterns that worked, preferences it inferred from your corrections.

### MEMORY.md — The Index

The first 200 lines of `MEMORY.md` load every session. Each line is a pointer to a topic file:

```markdown
- [Build quirks](build_quirks.md) — pnpm vs npm edge cases in this monorepo
- [Feedback](feedback_testing.md) — don't mock the database in integration tests
- [User preferences](user.md) — prefers named exports, no trailing semicolons
```

Topic files load on-demand. The index stays tight; detail lives in files.

### What Claude Saves

- Corrections you give it ("no, don't do it that way")
- Approaches you confirm ("yes, exactly like that")
- Non-obvious facts it discovered during a session

## Scope Precedence

When rules conflict, this order wins:

1. Managed policy (org-wide, set by admin)
2. Project CLAUDE.md
3. User CLAUDE.md (`~/.claude/CLAUDE.md`)
4. Local CLAUDE.md (gitignored overrides)

## Path-Specific Rules

```
.claude/rules/
  migrations.md   # loads when editing db/migrations/**
  components.md   # loads when editing app/components/**
```

Context loads only when relevant. No token waste on rules that don't apply to the current task.

## Maintenance

- Review CLAUDE.md quarterly — delete rules Claude already follows reliably
- Consolidate overlapping rules from different sources
- Watch for conflicts between project and user layers

## Summary

CLAUDE.md and auto memory are complementary, not competing. CLAUDE.md is intentional, curated, reviewed. Auto memory is emergent, discovered, growing. Together they eliminate the cold-start problem and let you build on momentum across sessions.
