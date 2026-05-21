---
sidebar_position: 4
---

# Phase 4 — Agent Ops Platform

**Duration:** ~6–8 weeks · **Visibility:** v2.0 optional · **Only after v1.0 ships**

## Goal

Operate the agent like a **production service**: SLOs, nightly eval regression, cost tracking, and optional platform extensibility (MCP). This is Staff-level depth — valuable but **not required** for a strong portfolio.

## Pick one focus

Do not attempt all three. Choose based on target roles:

```mermaid
flowchart TD
  V1[v1.0 Runbook Agent shipped] --> CHOOSE{Pick one}
  CHOOSE --> A[Option A: Eval reliability]
  CHOOSE --> B[Option B: MCP platform]
  CHOOSE --> C[Option C: Cloud deploy]
```

| Option | Best for | Effort |
|--------|----------|--------|
| **A — Eval-driven reliability** | SRE / reliability roles | Medium |
| **B — MCP tool server** | Platform / AI infra roles | Medium–High |
| **C — Cloud deploy (Terraform)** | GCP / platform roles | Medium |

---

## Option A — Eval-driven agent reliability

### Architecture

```mermaid
flowchart LR
  CRON[Nightly GitHub cron] --> EV[Run 50+ scenarios]
  EV --> SC[Score results]
  SC --> DASH[Eval dashboard]
  SC -->|regression| ISS[Auto GitHub issue]
  DASH --> SLO[Agent SLOs]
```

### Deliverables
- [ ] Expand scenarios to 50+ (include synthetic alert variations)
- [ ] Nightly eval workflow in GitHub Actions
- [ ] Eval results stored as JSON artifacts
- [ ] Simple dashboard (GitHub Pages or Grafana)
- [ ] Agent SLOs defined and tracked:
  - Runbook selection accuracy ≥ 95%
  - p95 triage latency &lt; 30s
  - Forbidden tool rate = 0%
  - Cost per incident &lt; $0.05
- [ ] Auto-file GitHub issue when SLO breached

### Why this matters
Shows you think about **AI system reliability** the same way you think about service reliability — SLOs, regression detection, automated escalation.

---

## Option B — MCP tool server

### Architecture

```mermaid
flowchart LR
  CUR[Cursor / Claude] --> MCP[MCP Server]
  MCP --> POL[Policy layer]
  POL --> KUB[kubectl read-only]
  POL --> ANS[Ansible --check]
  POL --> CAT[Runbook catalog]
```

### Deliverables
- [ ] MCP server exposing safe infra tools
- [ ] Policy layer shared with Runbook Agent
- [ ] Documentation for Cursor / Claude Desktop integration
- [ ] Eval tests for MCP tool boundaries
- [ ] Published to GitHub with example config

### Why this matters
MCP is the emerging standard for agent tooling. Publishing a **safe infra MCP server** is rare and credible for platform engineering roles.

---

## Option C — Cloud deploy with Terraform

### Architecture

```mermaid
flowchart TB
  TF[Terraform] --> CR[Cloud Run]
  TF --> AR[Artifact Registry]
  CR --> AG[Runbook Agent]
  CR --> SM[Secret Manager]
  kind2[Remote kind or GKE autopilot] --> AG
```

### Deliverables
- [ ] Terraform module: `platform/terraform/gcp/`
- [ ] Cloud Run service for agent API
- [ ] Secret Manager for LLM API key
- [ ] Remote demo environment (not laptop-only)
- [ ] Cost estimate documented (&lt; $10/month)

### Why this matters
Demonstrates GCP skills (Professional Cloud Architect cert) applied to AI workloads.

---

## Phase 4 non-goals

| Skip | Why |
|------|-----|
| Full autonomous remediation | Already rejected in v1 |
| Multi-agent orchestration | Complexity without eval benefit |
| Fine-tuning custom models | Out of scope for SRE portfolio |
| Replacing Phase 3 demo | v1 must remain the primary story |

## Exit criteria (v2.0)

- [ ] Chosen option fully implemented and documented
- [ ] Eval SLOs published in docs (Option A) OR MCP integration demo (Option B) OR cloud demo URL (Option C)
- [ ] Git tag `v2.0.0`
- [ ] Blog post on agent operations learnings

## Decision guide

| If your target role is… | Build |
|-------------------------|-------|
| SRE / on-call / reliability | Option A |
| Platform / developer experience | Option B |
| Cloud / GCP platform engineer | Option C |
| Job hunting in &lt; 2 months | **Skip Phase 4** — v1.0 is enough |

See [Phase Testing Gates](../evals/phase-testing-gates#phase-4--agent-ops-platform) for full test suite, stage checks, and rollback points.
