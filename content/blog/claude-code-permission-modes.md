---
title: Mastering Claude Code Permission Modes — From Default to Auto Mode Security
description: A deep dive into Claude Code's five permission modes, when to use each, and how the auto-mode classifier keeps agentic work safe.
date: 2026-04-01
category: AI Tooling
readTime: 8 min read
tags: [Claude Code, AI, Security, Developer Tools]
---

# Mastering Claude Code Permission Modes

Claude Code ships with five distinct permission modes, and picking the right one is the difference between a smooth agentic workflow and an anxious one.

## The Five Modes

- **default** — Claude proposes every file write and shell command; you approve each one. Maximum oversight, slowest flow.
- **acceptEdits** — File edits auto-approve; shell commands still prompt. Great for iteration-heavy refactoring sessions.
- **plan** — Claude maps out what it intends to do before touching anything. Ideal for exploration and architecture work.
- **auto** — A background classifier decides whether each action is safe enough to run without a prompt. Requires Sonnet 4.6+, and a Max, Team, or Enterprise plan via the Anthropic API.
- **bypassPermissions** — No prompts at all. Use only inside isolated sandboxes where the blast radius is contained.

## How the Auto Mode Classifier Works

When auto mode is active, every proposed action goes through a decision stack:

1. Explicit allow/deny rules you've configured — checked first, no classifier overhead.
2. Read-only operations — always allowed without a prompt.
3. The safety classifier — evaluates intent, file paths, and conversation context.

The classifier respects scope. If you told Claude "only touch files in `src/`," it will block writes to `scripts/` even if the action looks safe in isolation.

### Protected Paths

Certain paths never auto-approve regardless of mode:

- `.git/`
- `.claude/`
- `.vscode/` and `.idea/`
- `~/.ssh/`, `~/.aws/`, credential files

## Choosing the Right Mode

| Situation | Recommended Mode |
|---|---|
| Unfamiliar codebase | `plan` |
| Fast iteration, known codebase | `acceptEdits` |
| Long uninterrupted task | `auto` |
| CI / sandboxed container | `bypassPermissions` |
| Any doubt | `default` |

## Performance Considerations

Auto mode adds latency per action — the classifier runs a lightweight model call. For short tasks with few tool calls, `acceptEdits` is often faster end-to-end. Save `auto` for tasks with 20+ steps where prompt fatigue is the real bottleneck.

## Summary

Permission modes are not a binary "safe vs. fast" tradeoff. They're a spectrum you should tune per task. Start strict, loosen as trust builds with the codebase, and let the classifier handle ambiguity when you need hands-free throughput.
