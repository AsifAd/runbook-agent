---
sidebar_position: 2
---

# Milestones & Checklists

## Milestone 0 — Project scaffold ✅

**Target:** Week 0 (May 2026)

- [x] GitHub repo `AsifAd/runbook-agent`
- [x] Docusaurus docs site
- [x] GitHub Pages deployment workflow
- [x] Monorepo directory layout
- [x] Phase-by-phase specifications
- [ ] Root `Makefile` with placeholder targets
- [ ] `LICENSE` (MIT)

## Milestone 1 — Phase 1 complete (internal)

**Target:** Week 2

- [ ] `packages/classifier/` with Pydantic models
- [ ] 5+ alert fixtures in `scenarios/`
- [ ] `runbooks/catalog.yaml` with runbook IDs
- [ ] Classifier prompt versioned in git
- [ ] pytest golden tests: ≥90% accuracy
- [ ] GitHub Actions CI for classifier tests

**Exit criteria:** `make eval-classifier` passes locally and in CI.

## Milestone 2 — Phase 2 complete (v0.1)

**Target:** Week 5

- [ ] kind cluster config in `infra/kind/`
- [ ] 3 broken workloads deployed via `infra/k8s/`
- [ ] Read-only kubectl tool wrapper with policy middleware
- [ ] Investigator agent loop (Pydantic AI)
- [ ] 10 golden scenarios with root cause assertions
- [ ] OpenTelemetry spans for tool calls
- [ ] Grafana dashboard screenshot in docs
- [ ] Git tag `v0.1.0`

**Exit criteria:** `make demo-investigate` resolves root cause for CrashLoop scenario.

## Milestone 3 — Phase 3 complete (v1.0) 🎯

**Target:** Week 10 — **primary portfolio deliverable**

- [ ] 3 Ansible playbooks wired to catalog
- [ ] Policy engine blocks forbidden tools/actions
- [ ] Ansible `--check` as default execution mode
- [ ] Human approval for `risk_level: high`
- [ ] 15–20 golden eval scenarios
- [ ] Adversarial test cases (misleading logs)
- [ ] `make demo` — full alert → fix in under 5 minutes
- [ ] 3-minute demo video (asciinema or Loom)
- [ ] Featured on [asifad.github.io](https://asifad.github.io)
- [ ] Resume bullet added
- [ ] Git tag `v1.0.0`

**Exit criteria:** A recruiter can clone, run `make demo`, and watch an incident get fixed.

## Milestone 4 — Phase 4 complete (v2.0)

**Target:** Week 16+ — optional

Pick **one** focus:

### Option A — Eval-driven reliability
- [ ] Nightly eval cron (50+ scenarios)
- [ ] Regression dashboard with agent SLOs
- [ ] Auto-file GitHub issue on eval regression

### Option B — MCP platform
- [ ] Publish MCP server for safe infra tools
- [ ] Document integration with Cursor / Claude

### Option C — Cloud deploy
- [ ] Terraform module for GCP Cloud Run
- [ ] Remote demo (not laptop-only)

**Exit criteria:** v2 adds measurable depth beyond v1, not just features.

## Capability checklist by phase

| Capability | Ph1 | Ph2 | Ph3 | Ph4 |
|------------|-----|-----|-----|-----|
| Structured outputs | ✅ | ✅ | ✅ | ✅ |
| Tool use / agent loop | | ✅ | ✅ | ✅ |
| Policy / guardrails | | ✅ | ✅ | ✅ |
| Human-in-the-loop | | | ✅ | ✅ |
| Eval harness + CI | ✅ | ✅ | ✅ | ✅ |
| Observability (OTel) | | ✅ | ✅ | ✅ |
| Infra / K8s / Ansible | | ✅ | ✅ | ✅ |
| Cost / SLO tracking | | | ✅ | ✅ |
| MCP / platform | | | | ✅ |

## Demo failure scenarios (all phases)

| ID | Scenario | Expected runbook | Phase |
|----|----------|-----------------|-------|
| S-001 | CrashLoopBackOff (bad image) | RB-001 Rollback image | 3 |
| S-002 | OOMKilled (memory limit) | RB-003 Increase memory | 3 |
| S-003 | Bad ConfigMap (app 502) | RB-002 Rollback config | 3 |
| S-004 | ImagePullBackOff | RB-004 Fix image pull secret | 3 |
| S-005 | High latency (no crash) | RB-005 Scale replicas | 3 |
| S-006 | Misleading logs (adversarial) | Escalate, no execution | 2+ |
