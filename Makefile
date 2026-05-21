.PHONY: help docs docs-build cluster-up cluster-down demo demo-investigate eval eval-classifier test

help:
	@echo "Runbook Agent — available targets:"
	@echo ""
	@echo "  make docs              Start Docusaurus dev server"
	@echo "  make docs-build        Build documentation site"
	@echo ""
	@echo "  Phase 1+ (coming soon):"
	@echo "  make cluster-up        Create kind cluster + demo workloads"
	@echo "  make cluster-down      Tear down kind cluster"
	@echo "  make demo              Full alert → fix demo"
	@echo "  make demo-investigate  Investigation-only demo"
	@echo "  make eval              Run golden eval suite"
	@echo "  make eval-classifier   Run classifier evals only"
	@echo "  make test              Unit + policy tests (no LLM API)"

docs:
	cd website && npm start

docs-build:
	cd website && npm run build

test-e2e:
	cd website && npm run test:e2e

cluster-up:
	@echo "Phase 2 — not implemented yet. See docs/phases/phase-2-investigator"

cluster-down:
	@echo "Phase 2 — not implemented yet."

demo:
	@echo "Phase 3 — not implemented yet. See docs/phases/phase-3-runbook-agent"

demo-investigate:
	@echo "Phase 2 — not implemented yet."

eval:
	@echo "Phase 1 — not implemented yet. See docs/phases/phase-1-classifier"

eval-classifier:
	@echo "Phase 1 — not implemented yet."

test:
	@echo "Phase 1 — not implemented yet."
