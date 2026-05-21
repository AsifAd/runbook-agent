---
sidebar_position: 2
---

# Local Setup

## Clone the repository

```bash
git clone https://github.com/AsifAd/runbook-agent.git
cd runbook-agent
```

## Documentation site (available now)

```bash
cd website
npm install
npm start
```

Open [http://localhost:3000/runbook-agent/](http://localhost:3000/runbook-agent/) — docs with live reload.

Build for production:

```bash
npm run build
npm run serve
```

## Agent packages (Phase 1+ — coming soon)

Implementation begins in Phase 1. Planned setup:

```bash
# From repo root (when available)
python3 -m venv .venv
source .venv/bin/activate
pip install -e packages/classifier
pip install -e packages/investigator
pip install -e packages/executor

export ANTHROPIC_API_KEY="your-key-here"
```

## Environment variables (planned)

| Variable | Required | Description |
|----------|----------|-------------|
| `ANTHROPIC_API_KEY` | Phase 1+ | LLM provider key |
| `RUNBOOK_AGENT_ENV` | Phase 3+ | `sandbox` (default) |
| `OTEL_EXPORTER_OTLP_ENDPOINT` | Phase 2+ | OTel collector URL |
| `KUBECONFIG` | Phase 2+ | kind cluster config path |

## Makefile targets (planned)

```bash
make help           # Show all commands
make cluster-up     # Create kind cluster + deploy broken apps
make cluster-down   # Tear down cluster
make demo           # Full end-to-end demo (Phase 3)
make demo-investigate  # Investigation only (Phase 2)
make eval           # Run all golden evals
make eval-classifier   # Phase 1 evals only
make test           # Unit + policy tests (no LLM API)
```

:::info Current status
**Phase 0 complete** — repo scaffold, documentation, GitHub Pages.  
**Phase 1 starting next** — classifier package and eval fixtures.
:::

## kind cluster (Phase 2+)

```bash
make cluster-up
kubectl get pods -A
# Expected: broken workloads in namespace 'shop'

make cluster-down
```

## Running evals (Phase 1+)

```bash
# Unit tests only (no API key needed)
make test

# Full golden evals (requires API key)
export ANTHROPIC_API_KEY="..."
make eval
```

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Docker not running | Start Docker Desktop |
| kind cluster fails | `kind delete cluster --name runbook-agent` then retry |
| Docs 404 on localhost | Use baseUrl path: `/runbook-agent/` |
| npm install fails | Node 20+ required: `node --version` |

## Next steps

1. Read [Phase 1 — Classifier](../phases/phase-1-classifier) spec
2. Check [Milestones](../roadmap/milestones) for current checklist
3. Watch repo for `phase-1/classifier` branch
