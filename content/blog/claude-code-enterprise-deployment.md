---
title: Enterprise Deployment of Claude Code — Security, Compliance, and Scaling Across Teams
description: For senior engineers managing Claude Code adoption at organizations. Deployment architectures, managed settings, sandboxing, and the security boundaries that matter.
date: 2026-04-19
category: AI Tooling
readTime: 9 min read
tags: [Claude Code, Enterprise, Security, Developer Tools]
---

# Enterprise Deployment of Claude Code

Deploying Claude Code to a team of 5 is easy. Deploying it to 500 engineers with compliance requirements is an engineering problem.

## Deployment Architectures

| Mode | Use Case |
|---|---|
| Local CLI | Individual developer machines |
| Desktop App | Mac/Windows with GUI |
| Remote SSH | Developers SSHing into dev servers |
| Docker container | Sandboxed, isolated environments |
| Cloud (claude.ai/code) | Zero local install required |

For enterprise, Docker containers with OS-level isolation are the gold standard — Claude can't reach outside the container boundary.

## Sandboxing

Claude Code supports gVisor for reduced attack surface. gVisor intercepts system calls at the kernel level, preventing Claude from reaching host resources even if it tried.

For sensitive codebases: mount source code read-only, give write access only to a designated working directory.

```dockerfile
FROM claude-code:latest
VOLUME ["/src:ro", "/workspace:rw"]
# Claude reads from /src, writes only to /workspace
```

## Managed Settings

Enterprise admins deploy a managed policy file via MDM or Group Policy. Managed settings take precedence over all user configuration — users cannot override them.

**Managed-only settings (users cannot change these):**

- `forceLoginMethod` — enforce SSO, block personal accounts
- `forceLoginOrgUUID` — restrict to organization accounts only
- `disableAutoMode` — prevent auto permission mode across the org
- `disableBypassPermissionsMode` — enforce approval prompts always

## Permission Rules at Scale

Managed deny rules block operations regardless of what users configure:

```json
{
  "permissions": {
    "deny": [
      "bash(rm -rf *)",
      "bash(curl * | bash)",
      "write_file(~/.ssh/*)",
      "write_file(.env*)"
    ]
  }
}
```

These rules deploy with the policy file and can't be overridden by individual developers.

## API Provider Routing

Claude Code supports multiple API backends:

```json
{
  "apiProvider": "bedrock",
  "awsRegion": "us-east-1",
  "awsProfile": "claude-prod"
}
```

Options: Anthropic direct, AWS Bedrock, Google Vertex AI, Azure via proxy. Route to the provider that meets your data residency requirements.

## Zero-Data Retention (ZDR)

Available on Enterprise plans. With ZDR enabled, Anthropic does not store conversation content. For regulated industries (healthcare, finance, legal), this is often a compliance requirement.

ZDR is configured at the organization level in the Anthropic console — no per-developer setup needed.

## Audit Logging

Claude Code exports telemetry via OpenTelemetry:

- Session start/end
- Tool calls (read, write, bash, MCP)
- Permission decisions (approved, denied, auto-approved)
- Model used per session
- Token consumption

Route to your existing observability stack (Datadog, Grafana, Splunk). Build dashboards for:
- Adoption by team
- Most common operations
- Permission denial patterns (signals misconfigured rules)
- Cost per developer/team

## Network Access Controls

```json
{
  "network": {
    "proxy": "https://proxy.corp.internal:3128",
    "allowDomains": ["api.anthropic.com", "registry.npmjs.org"],
    "blockDomains": ["*"]
  }
}
```

Allowlist only the domains Claude needs. Block everything else. This prevents data exfiltration and limits blast radius if Claude is manipulated via prompt injection in untrusted content.

## MCP Server Governance

Approved MCP servers should be centrally managed:

```json
{
  "mcpAllowlist": ["github-enterprise", "jira-corp", "postgres-readonly"]
}
```

Prevent developers from connecting Claude to unapproved external services.

## Governance Checklist

- [ ] Authentication: enforce SSO via `forceLoginMethod`
- [ ] Dangerous operations: deploy `deny` rules for destructive commands
- [ ] MCP: allowlist approved servers only
- [ ] Sandboxing: Docker with gVisor for sensitive repos
- [ ] Audit: OpenTelemetry pipeline to observability stack
- [ ] Data retention: ZDR enabled if compliance requires
- [ ] CLAUDE.md: centrally maintained org-wide policy file
- [ ] Review cycle: quarterly policy review with security team

## Summary

Enterprise Claude Code deployment is an infrastructure problem, not a configuration problem. Treat it like deploying any other developer tool with production access to your codebase — with the same rigor you'd apply to CI/CD permissions, secret management, and network access controls.
