---
title: Subagents and Agent Teams — Parallel Work and Context Isolation in Claude Code
description: Learn when to use subagents vs. agent teams, how to architect parallel work, and the real token cost tradeoffs of each approach.
date: 2026-04-11
category: AI Tooling
readTime: 8 min read
tags: [Claude Code, Agents, Parallel, Developer Tools]
---

# Subagents and Agent Teams

One Claude instance working sequentially is powerful. Multiple instances working in parallel is a different category of capability.

## Subagents: Focused, Isolated, Cheap

A subagent is a separate Claude instance with its own context window. You send it a task; it works independently; it reports back a summary.

**When to use subagents:**
- Exploring a large codebase without polluting main context
- Running parallel research on independent questions
- Verifying a PR with different reviewers simultaneously

**Token cost:** Low. The subagent's full context never enters the main window — only the summary does.

```
Main context: "Explore the auth module and summarize its structure"
→ Subagent spins up, reads 15 files, returns 200-word summary
→ Main context receives 200 words, not 15 files worth of tokens
```

## Agent Teams: Coordinated, Persistent, Expensive

Agent teams are multiple Claude instances running as peers, sharing a task list and communicating directly. One instance acts as team lead; others claim subtasks and report results to the shared list.

**When to use agent teams:**
- Complex parallel work with dependencies between subtasks
- Multi-perspective code review (security reviewer + performance reviewer + readability reviewer)
- Large features split across frontend, backend, and tests

**Token cost:** High. Each teammate runs a full session. Budget accordingly.

## Subagent Configuration

Subagents are defined in YAML frontmatter in skill files:

```yaml
---
name: explore
description: Read-only codebase exploration agent
scope: project
model: claude-haiku-4-5
tools: [read_file, list_directory, search_files]
---
```

Restrict tools to what the subagent actually needs. A read-only exploration agent should never have write access.

## Agent Team Patterns

### Parallel Code Review

```
Team Lead: "Review this PR for security, performance, and readability"
├── Agent A: Security review → finds SQL injection risk
├── Agent B: Performance review → finds N+1 query
└── Agent C: Readability review → suggests clearer naming
```

Three perspectives in the time of one.

### Competing Hypotheses Debugging

When a bug has multiple plausible causes, assign each hypothesis to a different agent. The first one to reproduce it wins; others abort.

### Feature Split

```
Team Lead: orchestrates
├── Frontend Agent: builds UI components
├── Backend Agent: builds API endpoints
└── Test Agent: writes tests as the other two ship code
```

## Display Modes

- **In-process** — teammates appear inline, cycle with keyboard shortcuts
- **Split-pane** — each teammate gets its own terminal pane (tmux/iTerm2)

## Task List with Dependencies

```json
{
  "tasks": [
    { "id": "schema", "description": "Design DB schema" },
    { "id": "api", "description": "Build API", "dependsOn": ["schema"] },
    { "id": "ui", "description": "Build UI", "dependsOn": ["api"] }
  ]
}
```

Agents claim available tasks. Blocked tasks wait until dependencies complete.

## Choosing the Right Pattern

| Need | Pattern |
|---|---|
| Explore without polluting context | Subagent |
| Verify from multiple angles | Subagent (parallel) |
| Ship a large feature fast | Agent team |
| Complex debugging | Agent team (competing hypotheses) |

## Summary

Start with subagents — they're cheap and simple. Graduate to agent teams when the work is genuinely parallel and the coordination overhead pays off. Never use agent teams for tasks a single focused instance handles well.
