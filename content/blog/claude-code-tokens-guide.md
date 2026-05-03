---
title: Understanding Tokens in Claude Code — Cost, Context, and Optimization
description: Tokens are the currency of every Claude Code session. Learn how they're counted, what drives costs up, and practical strategies to get more done for less.
date: 2026-04-21
category: AI Tooling
readTime: 8 min read
tags: [Claude Code, Tokens, Cost Optimization, Developer Tools]
---

# Understanding Tokens in Claude Code

Every character Claude reads or writes costs tokens. Every file you open, every command output, every message — all tokens. Understanding this makes you a dramatically more effective Claude Code user.

## What Is a Token?

A token is roughly 3–4 characters of English text. Code tends to be denser — special characters, long identifiers, and indentation all tokenize less efficiently than prose.

Rough estimates:
- 1,000 tokens ≈ 750 words of prose
- 1,000 tokens ≈ 500–600 lines of typical TypeScript
- A 200-line component: ~400–600 tokens
- A 1,000-line file: ~2,000–3,000 tokens

## What Consumes Tokens in a Session

| Source | Typical Cost |
|---|---|
| System prompt + CLAUDE.md | 500–2,000 tokens (every turn) |
| Conversation history | Grows ~200–500 tokens per exchange |
| File reads | Full file content every time |
| Bash/command output | Can be very large — logs, test output |
| Tool call overhead | ~50–100 tokens per tool call |
| Claude's response | 200–2,000 tokens depending on task |

The session burns tokens on both input (everything Claude reads) and output (everything Claude writes). Input is cheaper; output is more expensive per token.

## Input vs. Output Pricing

Anthropic prices input and output tokens differently. As of 2025:

- **Input tokens** (what Claude reads) — lower cost
- **Output tokens** (what Claude writes) — 3–5x more expensive than input
- **Cache hits** — up to 90% cheaper than regular input tokens

This means long reasoning responses and generated code are the most expensive parts of a session — not reading files.

## Prompt Caching — The Biggest Win

Claude Code enables prompt caching automatically. When the same prefix appears across multiple turns (system prompt, CLAUDE.md, loaded skills), it hits cache instead of re-encoding.

In a long session with stable context:
- First turn: full input cost
- Subsequent turns: 80–90% of input is cached, at a fraction of the price

**Implication:** Long sessions on the same task are more token-efficient than many short sessions. The cache amortizes the fixed cost of loading context.

## What Drives Costs Up

**Large file reads.** Reading a 2,000-line file costs the same every time — it's not cached between turns unless it's in the system prompt. If Claude re-reads the same file five times, you pay five times.

**Verbose command output.** `pnpm test` with full stack traces can produce 10,000+ tokens of output. Pipe through `head` or summarize when you don't need everything.

**Long conversation history.** Each turn carries the full conversation. A 50-turn session has 49 turns of history at every step.

**Extended thinking.** Thinking tokens are billed at the same rate as output. A single `max` effort response can cost more than an entire short session.

## Practical Optimization Strategies

### 1. Use `/clear` Between Unrelated Tasks
Clearing the conversation resets history to zero. The session starts fresh — no accumulated history cost.

### 2. Be Specific About File Reads
Instead of "read the entire codebase and find the bug," say "check `server/api/auth.ts` lines 45–80 for the session handling logic." Targeted reads cost far less.

### 3. Summarize Command Output
```bash
pnpm test 2>&1 | tail -30    # last 30 lines only
pnpm build 2>&1 | grep -E "error|warning"   # only what matters
```

### 4. Keep CLAUDE.md Tight
CLAUDE.md loads every turn. Every 100 lines you add costs tokens on every single exchange in the session. Ruthlessly prune it.

### 5. Use Subagents for Heavy Exploration
A subagent that reads 20 files and returns a 300-token summary costs far less than reading those 20 files in main context and carrying them through 30 more turns.

### 6. Match Model to Task
Haiku is 10–15x cheaper than Opus. For subagents doing simple searches, file reads, and summarization — use Haiku. Reserve Sonnet and Opus for actual reasoning and code generation.

## Reading Your Usage

Claude Code surfaces token usage in the `/usage` command. Check it after complex sessions to understand where tokens went:

```
Session total: 48,230 tokens
  Input:  31,400 (cache hits: 22,100 — 70%)
  Output: 16,830
Estimated cost: $0.18
```

A 70%+ cache hit rate is healthy for a long session. If cache hits are low, you're restarting sessions too frequently or changing context too often.

## Token Budget for Extended Thinking

Extended thinking consumes a separate "thinking budget" before producing output. This is configured per model:

```json
{
  "thinkingBudget": 10000
}
```

Thinking tokens are billed as output tokens. At `max` effort, thinking can dwarf the final response. Set a budget ceiling for tasks where you want deep reasoning but not unlimited cost.

## Summary

Tokens are finite and priced. The developers who get the most from Claude Code are the ones who treat token efficiency as a first-class concern — targeted reads, clean context, right model for the task, and cache-friendly session patterns. The difference between a $0.05 session and a $2.00 session doing the same work is almost always avoidable waste, not inherent complexity.
