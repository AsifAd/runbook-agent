---
sidebar_position: 1
---

# Timeline

## Overall schedule (~10 weeks part-time)

Assumes **8–10 hours/week** alongside full-time SRE work.

```mermaid
gantt
  title Runbook Agent Build Timeline
  dateFormat YYYY-MM-DD
  axisFormat %b %d

  section Docs & scaffold
  GitHub repo + Docusaurus     :done, d1, 2026-05-21, 3d
  Phase specs on Pages         :done, d2, 2026-05-21, 3d

  section Phase 1
  Classifier + eval fixtures   :p1, 2026-05-24, 14d

  section Phase 2
  kind cluster + investigator  :p2, 2026-06-07, 21d
  v0.1 public publish          :milestone, m1, 2026-06-28, 0d

  section Phase 3
  Policy + Ansible executor    :p3, 2026-06-28, 35d
  v1.0 portfolio featured      :milestone, m2, 2026-08-02, 0d

  section Phase 4
  Agent ops platform           :p4, 2026-08-02, 42d
  v2.0 optional                :milestone, m3, 2026-09-13, 0d
```

## Week-by-week breakdown

| Week | Phase | Deliverables |
|------|-------|-------------|
| **W0** | Setup | GitHub repo, Docusaurus on Pages, monorepo scaffold, this docs site |
| **W1–2** | Phase 1 | 5 alert fixtures, runbook catalog YAML, classifier + pytest, ≥90% golden accuracy |
| **W3–4** | Phase 2 | kind cluster, 3 broken apps, read-only kubectl tools, investigator agent loop |
| **W5** | Phase 2 | OTel traces, adversarial evals, **v0.1 publish** to GitHub |
| **W6–7** | Phase 3 | Ansible playbooks, policy engine, `--check` default, 3 runbooks wired |
| **W8–9** | Phase 3 | Human approval flow, `make demo`, 15–20 golden scenarios, CI gate |
| **W10** | Phase 3 | Demo video, portfolio update, resume bullet — **v1.0 featured** |
| **W11+** | Phase 4 | Eval dashboard, MCP server, or Cloud Run deploy — optional |

## Phase → public visibility

```mermaid
flowchart LR
  P1[Phase 1 Classifier] -->|internal only| P2[Phase 2 Investigator]
  P2 -->|v0.1 tag| PUB1[GitHub public]
  P2 --> P3[Phase 3 Executor]
  P3 -->|v1.0 tag| PUB2[Portfolio featured]
  P3 --> P4[Phase 4 Platform]
  P4 -->|v2.0 tag| PUB3[Optional depth]
```

| Milestone | Tag | Portfolio action |
|-----------|-----|-----------------|
| Docs live | — | Link from OSS hub |
| Phase 2 complete | `v0.1.0` | Add "in progress" project card |
| Phase 3 complete | `v1.0.0` | **Featured project** + resume bullet |
| Phase 4 complete | `v2.0.0` | Staff-level depth if needed |

## If actively job hunting (accelerated)

Skip publishing Phase 1 separately. Combine Phase 2 + 3 into a **6-week sprint**:

| Weeks | Focus |
|-------|-------|
| 1–2 | kind + investigator + 5 evals |
| 3–4 | Ansible executor + policy + 10 evals |
| 5–6 | Demo polish + portfolio + video |

Ship `v1.0.0` with fewer scenarios (10 instead of 20) rather than delay for perfection.
