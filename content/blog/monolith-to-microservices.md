---
title: From Monolith to Microservices — Lessons Learned
description: What actually happens when you split a 5-year-old Rails app into microservices. The good, the painful, and the stuff nobody warns you about.
date: 2026-03-20
category: Architecture
readTime: 12 min read
tags: [Microservices, Architecture, Rails, Migration]
---

# From Monolith to Microservices — Lessons Learned

We spent 18 months migrating a 200k-line Rails monolith to microservices. Here's the honest debrief.

## What We Got Right

**Strangler Fig pattern** — we never did a big bang rewrite. We extracted services one by one, routing traffic gradually.

**Domain boundaries first** — we spent 3 months on domain modeling before writing a single service. It paid off.

## What Hurt

### Distributed transactions are hard

What was a single `ActiveRecord` transaction became a multi-service choreography. We eventually adopted the Saga pattern, but only after two production incidents.

### Observability gap

In the monolith, a single log line told the story. In microservices, you need distributed tracing from day one. We retrofitted OpenTelemetry and it was brutal.

### Team cognitive load

Each engineer who previously knew the whole system now owned a slice. Onboarding new engineers got 3x harder.

## The Honest Take

Microservices are not inherently better than a monolith. If your team is fewer than 20 engineers, you probably don't need them yet. Start with a **modular monolith** — clean boundaries, independent modules, shared database — then extract when you hit real limits.
