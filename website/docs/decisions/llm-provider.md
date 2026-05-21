---
sidebar_position: 1
---

# ADR-001: LLM Provider for v1

**Status:** Accepted · **Date:** 2026-05-21 · **Deciders:** Asif Draxi

## Context

Phase 1+ requires an LLM with reliable **tool use** and **structured JSON output**. The tech stack listed Anthropic or OpenAI without picking one. CI, cost estimates, and prompt tuning need a single provider for v1.

## Decision

Use **Anthropic Claude** (`claude-sonnet-4-20250514` or latest Sonnet at implementation time) via the Anthropic API, wrapped with **Pydantic AI**.

| Setting | Value |
|---------|-------|
| Provider | Anthropic |
| SDK | `anthropic` + Pydantic AI |
| Env var | `ANTHROPIC_API_KEY` |
| CI secret | `ANTHROPIC_API_KEY` in GitHub repo secrets |
| Default model | Claude Sonnet (balance of cost + tool-use quality) |

## Rationale

| Factor | Anthropic | OpenAI |
|--------|-----------|--------|
| Tool use maturity | Strong native tool blocks | Strong; either works |
| Structured output | JSON mode + Pydantic AI | JSON mode + Pydantic AI |
| Cost (Sonnet tier) | ~$3/M input, ~$15/M output | Comparable for GPT-4o class |
| Existing docs/examples | CI examples already use `ANTHROPIC_API_KEY` | Would require doc rewrites |
| Portfolio narrative | "Picked one, measured cost" | Same |

**One provider for v1.** OpenAI remains a documented fallback if Anthropic API is unavailable during development.

## Consequences

### Positive
- Single secret to manage in CI and local dev
- Consistent eval baselines across phases
- Prompt versions tagged per provider (`classifier-v1-anthropic`)

### Negative
- Vendor lock-in for v1 (mitigated: Pydantic AI abstracts provider)
- Eval cost tied to Anthropic pricing

## Cost controls

| Control | Implementation |
|---------|----------------|
| Budget alert | $20/month in Anthropic dashboard |
| PR CI | Unit + policy tests only — **no LLM calls** |
| `main` push | Full golden evals (~$0.50–2.00 per run) |
| Local dev | Run golden evals intentionally, not on every save |

See [CI & secrets](../evals/ci-and-secrets) for GitHub Actions setup.

## Fallback plan

If Anthropic API fails or costs spike:

1. Switch model to Haiku for classifier-only (Phase 1)
2. Or implement OpenAI adapter behind Pydantic AI (same interface)
3. Document change in ADR-002

## References

- [Tech stack](../tech-stack)
- [Phase 1 classifier](../phases/phase-1-classifier)
- [Testing strategy](../evals/testing-strategy)
