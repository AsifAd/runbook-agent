---
sidebar_position: 1
---

# Prerequisites

## Required tools

| Tool | Version | Install (macOS) | Purpose |
|------|---------|-----------------|---------|
| **Git** | 2.x+ | Xcode CLI or `brew install git` | Version control |
| **Python** | 3.11+ | `brew install python@3.13` | Agent runtime |
| **Node.js** | 20+ | `brew install node` | Docusaurus docs site |
| **Docker** | latest | [Docker Desktop](https://www.docker.com/products/docker-desktop/) | kind cluster |
| **kind** | 0.20+ | `brew install kind` | Local Kubernetes |
| **kubectl** | 1.28+ | `brew install kubectl` | Cluster interaction |
| **Ansible** | 2.15+ | `brew install ansible` | Runbook execution (Phase 3) |
| **Make** | — | pre-installed on macOS | Developer commands |

## API keys

| Key | Required when | Get it |
|-----|---------------|--------|
| `ANTHROPIC_API_KEY` or `OPENAI_API_KEY` | Phase 1+ | Provider dashboard |
| `GITHUB_TOKEN` | CI evals (optional) | GitHub Settings → Secrets |

:::tip Cost control
Use one provider consistently. Set a monthly budget alert ($20) in the provider dashboard. Golden evals on every PR can get expensive — run full evals on `main` only.
:::

## Optional tools (Phase 2+)

| Tool | Purpose |
|------|---------|
| **Helm** | v2 demo chart packaging |
| **Terraform** | Phase 4 cloud deploy |
| **grafana-cli** | Local dashboard setup |

## Verify installation

```bash
git --version
python3 --version      # 3.11+
node --version         # 20+
docker --version
kind --version
kubectl version --client
ansible --version
```

## System requirements

| Resource | Minimum | Recommended |
|----------|---------|-------------|
| RAM | 8 GB | 16 GB (kind + Docker) |
| Disk | 5 GB free | 10 GB |
| CPU | 4 cores | Apple Silicon or 4+ cores |

## Knowledge prerequisites

| Topic | Level needed | Resource |
|-------|-------------|----------|
| Kubernetes basics | Intermediate | pods, deployments, events, logs |
| Ansible basics | Intermediate | playbooks, `--check`, inventory |
| Python | Intermediate | async, typing, pytest |
| LLM APIs | Beginner | structured outputs, tool use |
| OpenTelemetry | Beginner | spans, attributes (docs provided) |

No ML training knowledge required. This is an **engineering** project, not a research project.
