# Runbook Agent

**Bounded AI incident triage and Ansible remediation for Kubernetes.**

An open-source project by [Asif Draxi](https://asifad.github.io) — public proof that agentic AI in infra should be built with eval gates, policy guardrails, and human-in-the-loop approval — not unbounded shell access.

📖 **Documentation:** [asifad.github.io/runbook-agent](https://asifad.github.io/runbook-agent/)

## What it does

```
Alert → Investigate (read-only kubectl) → Select runbook → Policy check → Ansible dry-run → Approve → Execute → Verify
```

| Capability | Status |
|------------|--------|
| Phase 0 — Docs & scaffold | ✅ Live |
| Phase 1 — Alert classifier + evals | 🔵 In progress |
| Phase 2 — Incident investigator (kind) | 🔜 Planned |
| Phase 3 — Runbook Agent capstone | 🔜 Planned |
| Phase 4 — Agent ops platform | 🔜 Optional |

## Tech stack

Python · Pydantic AI · FastAPI · kind · kubectl · Ansible · pytest · OpenTelemetry · Grafana · GitHub Actions · Docusaurus

## Quick start (docs)

```bash
git clone https://github.com/AsifAd/runbook-agent.git
cd runbook-agent/website
npm install && npm start
```

## Repository layout

```
runbook-agent/
├── website/          # Docusaurus docs (GitHub Pages)
├── packages/         # Python agent packages (Phase 1+)
├── runbooks/         # Ansible playbooks + catalog
├── scenarios/        # Golden eval fixtures
└── infra/            # kind cluster + demo workloads
```

## Build phases

See full specs in the [documentation](https://asifad.github.io/runbook-agent/docs/plan/current-status):

0. **Scaffold** — docs, CI, scenario stubs (complete)
1. **Classifier** — structured alert → runbook ID mapping (in progress)
2. **Investigator** — read-only tool loop on kind (v0.1)
3. **Runbook Agent** — policy + Ansible execution (v1.0 capstone)
4. **Platform** — eval SLOs, MCP, or cloud deploy (v2.0 optional)

## License

MIT — see [LICENSE](LICENSE).

## Author

**Asif Draxi** — Site Reliability Engineer · [Portfolio](https://asifad.github.io) · [GitHub](https://github.com/AsifAd)
