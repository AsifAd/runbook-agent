---
sidebar_position: 0
---

# Phase 0 — Docs & Scaffold

**Duration:** ~3 days · **Visibility:** GitHub Pages live · **Status:** ✅ Complete

## Goal

Ship the **plan before the code**: documentation site, monorepo layout, CI for docs, and phase specs so every subsequent phase has a clear contract.

## Deliverables

| Item | Path | Status |
|------|------|--------|
| GitHub repo | `AsifAd/runbook-agent` | ✅ |
| Docusaurus docs | `website/` | ✅ |
| GitHub Pages deploy | `.github/workflows/deploy-docs.yml` | ✅ |
| Docs CI + E2E | `.github/workflows/ci.yml`, Playwright | ✅ |
| Monorepo layout | `packages/`, `runbooks/`, `scenarios/`, `infra/` | ✅ |
| Runbook catalog | `runbooks/catalog.yaml` | ✅ |
| Scenario stubs | `scenarios/*.json` | ✅ |
| Phase specs | `website/docs/phases/` | ✅ |
| Plan docs | `website/docs/plan/` | ✅ |
| Makefile placeholders | `Makefile` | ✅ |

## What Phase 0 is not

- No LLM API calls
- No kind cluster
- No agent packages beyond directory placeholders
- No public `v0.1.0` tag (that's Phase 2)

## Exit gate → Phase 1

Phase 1 starts when:

1. Docs build passes: `cd website && npm run build`
2. E2E suite passes: `cd website && npm run test:e2e`
3. [Current status](../plan/current-status) page reflects Phase 1 as active
4. [Scenario matrix](../plan/scenario-matrix) and fixtures are aligned
5. [LLM provider ADR](../decisions/llm-provider) is locked

See [Phase Testing Gates](../evals/phase-testing-gates#phase-0--docs--scaffold) for full test suite and rollback points.

## Next

→ [Phase 1 — Alert Classifier](./phase-1-classifier)
