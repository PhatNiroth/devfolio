---
title: Building Scalable APIs with Node.js and PostgreSQL
description: A practical guide to designing APIs that handle millions of requests without falling apart — covering connection pooling, query optimization, and caching strategies.
date: 2026-04-15
category: Backend
readTime: 9 min read
tags: [Node.js, PostgreSQL, API, Performance]
---

# Building Scalable APIs with Node.js and PostgreSQL

Scaling an API isn't just about throwing more servers at the problem. It starts with getting the fundamentals right: efficient queries, connection management, and smart caching.

## Connection Pooling

Never open a raw connection per request. Use `pg-pool` or Prisma's built-in pooler.

```typescript
import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 2_000
})
```

## Query Optimization

Always `EXPLAIN ANALYZE` before shipping. The most common mistakes:

- **Missing indexes** on foreign keys and filter columns
- **N+1 queries** — use `JOIN` or batched lookups, not loops
- **SELECT \*** — always select only the columns you need

## Caching with Redis

Put a caching layer in front of expensive reads:

```typescript
async function getUser(id: string) {
  const cached = await redis.get(`user:${id}`)
  if (cached) return JSON.parse(cached)

  const user = await db.query('SELECT id, name, email FROM users WHERE id = $1', [id])
  await redis.setEx(`user:${id}`, 300, JSON.stringify(user.rows[0]))
  return user.rows[0]
}
```

## What's Next

In the follow-up, I'll cover horizontal scaling with read replicas and how to handle database migrations without downtime.
