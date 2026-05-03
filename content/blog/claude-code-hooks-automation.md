---
title: Building Scalable Automation with Claude Code Hooks
description: Hooks give you deterministic control over Claude's actions — format enforcement, permission delegation, and team workflow standardization without relying on model judgment.
date: 2026-04-03
category: AI Tooling
readTime: 9 min read
tags: [Claude Code, Hooks, Automation, Developer Tools]
---

# Building Scalable Automation with Claude Code Hooks

CLAUDE.md tells Claude what to do. Hooks *guarantee* it happens regardless of what Claude decides.

## Hooks vs. CLAUDE.md

CLAUDE.md is advisory — Claude reads it and tries to follow it. Hooks are deterministic — they fire as shell commands, HTTP calls, or MCP tool invocations at specific lifecycle events, with no model judgment in between.

If you need "always run `prettier` after every file write," a hook is the only reliable way to express that.

## Hook Events

Claude Code exposes over 20 hook points:

- `PreToolUse` / `PostToolUse` — fires before/after any tool call
- `SessionStart` / `SessionEnd`
- `FileChanged` — after a file is written
- `PermissionRequest` — intercept and auto-approve/deny permissions
- `PreCompact` — inject context before the conversation compresses
- `ConfigChange`

## A Practical Example — Auto-Format on Save

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": { "tool": "write_file", "args": { "path": ".*\\.ts$" } },
        "handler": {
          "type": "command",
          "command": "pnpm prettier --write $CLAUDE_TOOL_ARG_PATH"
        }
      }
    ]
  }
}
```

Every `.ts` write triggers Prettier automatically. No reminders in CLAUDE.md needed.

## Controlling Permissions Programmatically

Exit code `2` from a hook handler signals Claude to block the action. You can build arbitrarily complex logic:

```bash
#!/bin/bash
# Block writes to the migrations/ directory unless ALLOW_MIGRATIONS=1
if [[ "$CLAUDE_TOOL_ARG_PATH" == migrations/* ]] && [[ "$ALLOW_MIGRATIONS" != "1" ]]; then
  echo "Migration writes require ALLOW_MIGRATIONS=1"
  exit 2
fi
exit 0
```

## Dynamic Context Injection

Use `` !`command` `` syntax inside hook commands to inject live shell output:

```json
{
  "command": "echo 'Current branch: !`git branch --show-current`'"
}
```

Claude sees the resolved value, not the template.

## Common Patterns

| Goal | Hook Event | Handler |
|---|---|---|
| Auto-format files | `PostToolUse` (write_file) | `prettier --write` |
| Block protected paths | `PermissionRequest` | exit 2 script |
| Slack notification on task end | `SessionEnd` | curl to webhook |
| Re-inject context after compaction | `PreCompact` | inject summary file |
| Run tests after code changes | `PostToolUse` (write_file) | `pnpm test --changed` |

## Performance Notes

Hooks run synchronously in the default mode. Keep them fast — shell commands under 500ms are ideal. For heavy tasks (full test suite), use async hooks and write results to a file Claude can read later.

## Summary

Hooks are the enforcement layer that makes Claude Code suitable for team environments. Once your hooks are in place, you stop worrying about whether Claude remembered the rules — it's enforced at the infrastructure level.
