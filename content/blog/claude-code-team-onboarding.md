---
title: Designing Effective CLAUDE.md for Team Onboarding at Scale
description: A systematic framework for what information deserves persistent context, how to structure it for teams, and how to keep it from rotting.
date: 2026-04-17
category: AI Tooling
readTime: 8 min read
tags: [Claude Code, Teams, CLAUDE.md, Developer Tools]
---

# Designing Effective CLAUDE.md for Team Onboarding

Most CLAUDE.md files are either too empty to be useful or too long to be effective. Here's the framework that finds the middle.

## The Core Question

Before adding anything to CLAUDE.md, ask: **would a competent senior engineer on this team need to know this to work effectively?**

If yes — add it. If it's something they'd find in the README, a standard library doc, or by running `git log` — skip it.

## What Earns a Place

**Non-obvious build steps**
```markdown
# Setup
Run `pnpm db:seed` before first `pnpm dev` — the app crashes without seed data.
After pulling, run `pnpm db:migrate` if migrations changed (check git status).
```

**Architectural constraints with reasons**
```markdown
# Architecture
- Never import from `@/server` in `app/components/` — causes SSR hydration errors.
- All external API calls go through `server/api/` — never call third-party APIs from components.
```

**Project-specific style (not standard conventions)**
```markdown
# Code Style
- Use `Result<T, E>` for all service layer functions — we don't throw.
- Prefer `satisfies` over `as` for type assertions.
```

**Common gotchas**
```markdown
# Watch Out
- The `useAuth()` composable is only available after the middleware runs — don't call it in plugins.
```

## What Doesn't Earn a Place

- TypeScript best practices — Claude knows them
- Generic "write clean code" instructions
- The tech stack (it's obvious from the code)
- Information that changes every sprint (feature flags, current OKRs)

## File Organization for Teams

```
CLAUDE.md              # top-level: build, architecture, style essentials
.claude/rules/
  api-routes.md        # loads when editing server/api/**
  components.md        # loads when editing app/components/**
  migrations.md        # loads when editing db/migrations/**
CLAUDE.local.md        # gitignored: personal overrides
```

Put shared rules in CLAUDE.md and rules/. Personal preferences in CLAUDE.local.md.

## Scope Layers in Practice

| Scope | File | Use Case |
|---|---|---|
| Org-wide | Managed policy | Security rules, company conventions |
| Project | CLAUDE.md + rules/ | Project-specific patterns |
| Personal | `~/.claude/CLAUDE.md` | Individual preferences |
| Local | CLAUDE.local.md | Machine-specific, gitignored |

## Generating a Starter with `/init`

```bash
claude /init
```

Claude reads your codebase and generates a starter CLAUDE.md. It's a first draft — review and trim before committing. Remove everything that's already obvious from the code.

## Maintenance Cadence

**Monthly:** Does Claude still need reminding about these rules, or does it follow them reliably now? Delete what's no longer needed.

**Quarterly:** Full review. Consolidate overlapping rules. Remove stale references to deprecated patterns. Add new architectural decisions made since last review.

**On incident:** If a Claude session caused a problem because it lacked context — add that context to CLAUDE.md within 24 hours.

## Measuring Effectiveness

A well-designed CLAUDE.md shows up in behavior: Claude follows the rules without being reminded, asks fewer clarifying questions about project conventions, and makes fewer architecture mistakes. If you find yourself correcting the same thing twice, it belongs in CLAUDE.md.

## Anti-Patterns

- **Rule inflation** — adding rules after every session without pruning
- **Conflicting rules** — project layer says one thing, user layer says another
- **Vague rules** — "write good code" tells Claude nothing actionable
- **Missing reasons** — rules without context get abandoned when they seem to conflict with the task

## Summary

CLAUDE.md is team documentation that Claude reads, not a configuration file you fill by default. Keep it precise, keep it short, and maintain it like you maintain any other critical document — on a schedule, with ownership, and with the discipline to delete what's no longer true.
