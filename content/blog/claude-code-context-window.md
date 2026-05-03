---
title: The Context Window as Your Primary Resource in Claude Code
description: Context fills faster than you expect. Here's how to architect CLAUDE.md files, skills, and subagents to keep the right information accessible without burning tokens.
date: 2026-04-05
category: AI Tooling
readTime: 7 min read
tags: [Claude Code, Context, Performance, Developer Tools]
---

# The Context Window as Your Primary Resource

Every token Claude reads costs money and latency. The context window is finite — treat it like CPU cache, not disk.

## Where Context Goes

Context fills from multiple sources simultaneously:

- **Conversation history** — every message, tool call, and result
- **File reads** — full file contents land in context
- **CLAUDE.md** — loaded in full every session
- **Skill descriptions** — always loaded; full content only on invocation
- **Subagent reports** — summarized before returning to main context

A single large file read plus a long conversation can consume 30–40% of your window before you've done anything meaningful.

## CLAUDE.md: Keep It Under 200 Lines

CLAUDE.md loads completely every session. Long files don't just cost tokens — they dilute adherence. Rules buried in paragraph 15 get less attention than rules in paragraph 2.

Target under 200 lines. Be precise:

```markdown
# Build
- pnpm dev (port 3000), pnpm build, pnpm test

# Style
- No semicolons. Single quotes. 2-space indent.
- Prefer named exports over default exports.

# Architecture
- All DB queries go through /server/db — never query directly from components.
```

That's it. The rest belongs in the code or in skills.

## Path-Specific Rules

Use `.claude/rules/` for context that only matters for certain files:

```
.claude/rules/
  api-routes.md      # loads when editing /server/api/**
  components.md      # loads when editing /app/components/**
  migrations.md      # loads when editing /db/migrations/**
```

Claude loads only what's relevant to the current task.

## Skills: On-Demand Context

Skills live in `.claude/skills/<name>/SKILL.md`. Their descriptions are always in context; their full content loads only when invoked. This is the right place for:

- PR review checklists
- Deployment procedures
- Environment-specific setup steps

## Subagents: Context Isolation

When you need Claude to explore a large codebase, don't do it in the main context. Spawn a subagent:

- Subagent reads files in its own isolated window
- Reports a summary back to main context
- Main context sees the summary, not the raw files

This can save 60–70% of context for complex exploration tasks.

## The `/clear` Command

The single highest-leverage optimization. Between unrelated tasks, run `/clear` to reset the conversation. Carrying a debugging session into an architecture task wastes context and introduces noise.

## Auto-Compaction

When context approaches the limit, Claude Code auto-compacts. It preserves:

- CLAUDE.md content
- Recent skills (within 25KB budget)
- The last few turns of conversation

Older file reads and intermediate reasoning are dropped. Design your workflow to not depend on content from early in a long session.

## Summary

Context management is a first-class engineering discipline when working with LLMs. Keep CLAUDE.md tight, use path-specific rules, put procedures in skills, and isolate exploration in subagents. The reward is faster, cheaper, more coherent sessions.
