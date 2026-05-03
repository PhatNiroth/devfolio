---
title: The Agentic Loop and Extended Thinking — How Claude Code Reasons Through Hard Problems
description: Understand how Claude Code's decision loop works, when extended thinking pays off, and how to tune reasoning effort for complex engineering tasks.
date: 2026-04-15
category: AI Tooling
readTime: 7 min read
tags: [Claude Code, AI, Extended Thinking, Developer Tools]
---

# The Agentic Loop and Extended Thinking

Knowing how Claude reasons helps you give it better tasks — and know when to let it think longer.

## The Agentic Loop

Claude Code doesn't generate a single response and stop. It runs a loop:

```
1. Claude reads context (conversation + files + tool results)
2. Claude proposes an action (write file, run command, read file)
3. Action executes (with your permission)
4. Result enters context
5. Claude decides: done, or next action?
6. Repeat
```

Each iteration consumes context. A 50-step task can fill 40% of your window with tool results before writing a single line of production code. Plan accordingly.

## Checkpoints and Rewinding

Claude Code creates automatic checkpoints before destructive tool calls (file writes, shell commands that modify state). If a direction goes wrong, `/rewind` rolls back to the last checkpoint — including undoing file changes.

This makes long agentic tasks recoverable. Let Claude work; rewind if needed.

## Extended Thinking

Standard Claude responses come from a single forward pass. Extended thinking adds a scratchpad phase — Claude reasons through the problem before producing output.

Enable it when the cost of a wrong answer is high:

- Ambiguous requirements with multiple valid interpretations
- Architectural decisions with long-term consequences
- Security review of sensitive code paths
- Debugging an issue with no obvious cause

## Effort Levels

| Level | Relative Cost | Best For |
|---|---|---|
| `low` | 1x | Simple, well-defined tasks |
| `medium` | 3x | Most coding tasks |
| `high` | 8x | Architecture, complex debugging |
| `xhigh` | 20x | Critical decisions, security reviews |
| `max` | 40x+ | Highest-stakes reasoning |

`xhigh` and `max` are expensive. Use them deliberately, not as a default.

## When Extended Thinking Doesn't Help

- Tasks with clear, unambiguous specs — more thinking doesn't add value
- Simple CRUD operations — standard reasoning is fine
- Tasks where you'll review the output immediately — you catch mistakes anyway

Extended thinking shines when Claude is likely to miss a non-obvious constraint or make a subtle architectural mistake.

## Parallel Tool Execution

The agentic loop can batch independent tool calls:

```
Instead of:
  read file A → read file B → read file C (sequential)

Claude batches:
  [read file A, read file B, read file C] (parallel)
```

This is automatic when Claude recognizes independence. Structure your requests to make independence obvious: "Read these three files and compare their approaches."

## Model Selection

| Model | Speed | Cost | Reasoning Depth |
|---|---|---|---|
| Haiku 4.5 | Fastest | Lowest | Basic |
| Sonnet 4.6 | Balanced | Medium | Strong |
| Opus 4.7 | Slowest | Highest | Deepest |

Use Haiku for subagents doing simple exploration. Use Opus for the rare task where maximum reasoning matters. Sonnet handles 90% of real work.

## Prompt Caching

Claude Code uses prompt caching automatically. Repeated setup (CLAUDE.md, skills, system prompt) hits cache on subsequent turns — dramatically reducing cost on long sessions with stable context.

## Summary

The agentic loop is Claude's core mechanism. Understanding it helps you write better tasks, know when to use checkpoints, and decide when extended thinking is worth the cost. Most tasks don't need it. The ones that do really benefit from it.
