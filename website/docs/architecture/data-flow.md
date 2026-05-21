---
sidebar_position: 2
---

# Data Flow

## End-to-end alert → remediation flow

```mermaid
sequenceDiagram
  participant PD as Mock PagerDuty
  participant API as FastAPI
  participant AG as Agent
  participant KUB as kubectl
  participant POL as Policy Engine
  participant ANS as Ansible
  participant K8S as kind cluster
  participant OTEL as OpenTelemetry

  PD->>API: POST /webhooks/alert
  API->>AG: Start incident run
  AG->>OTEL: span: triage.start

  AG->>AG: Classify incident type
  AG->>KUB: get/describe/logs (read-only)
  KUB->>K8S: API calls
  K8S-->>KUB: Pod status, events, logs
  KUB-->>AG: Evidence bundle
  AG->>OTEL: span: tool.kubectl

  AG->>AG: Select runbook RB-003
  AG->>POL: Check RB-003 + env=sandbox
  POL-->>AG: ALLOW (dry-run)

  AG->>ANS: ansible-playbook --check site.yml
  ANS->>K8S: Simulate changes
  ANS-->>AG: Dry-run OK

  alt High risk
    AG->>API: Await human approval
    API-->>AG: Approved
  end

  AG->>ANS: ansible-playbook site.yml
  ANS->>K8S: Apply remediation
  AG->>KUB: Verify pod Ready
  KUB-->>AG: Healthy
  AG->>OTEL: span: incident.resolved
  AG-->>API: Incident closed
```

## Alert payload schema (input)

Mock webhooks mirror real PagerDuty / New Relic shapes:

```json
{
  "id": "inc-001",
  "source": "pagerduty",
  "severity": "critical",
  "summary": "checkout-api CrashLoopBackOff",
  "labels": {
    "cluster": "demo",
    "namespace": "shop",
    "pod": "checkout-api-7d4f8b9c-xk2lm",
    "alertname": "KubePodCrashLooping"
  },
  "timestamp": "2026-05-21T14:30:00Z"
}
```

## Agent output schema (structured)

```json
{
  "incident_id": "inc-001",
  "incident_type": "CrashLoopBackOff",
  "root_cause": "Container OOMKilled — memory limit 128Mi too low",
  "confidence": 0.92,
  "recommended_runbook_id": "RB-003",
  "evidence": [
    "kubectl describe: Last State OOMKilled",
    "kubectl logs: java.lang.OutOfMemoryError"
  ],
  "proposed_action": "Increase memory limit and restart deployment",
  "risk_level": "medium"
}
```

## Runbook catalog entry (YAML)

```yaml
runbooks:
  - id: RB-003
    name: Fix OOM — scale memory and restart
    incident_types:
      - CrashLoopBackOff
      - OOMKilled
    playbook: runbooks/playbooks/fix-oom.yml
    risk_level: medium
    allowed_envs:
      - sandbox
    requires_approval: true
    allowed_tools:
      - ansible-playbook
    forbidden_actions:
      - delete namespace
      - delete pvc
```

## Eval fixture flow

```mermaid
flowchart LR
  F[scenarios/crashloop.json] --> T[pytest test]
  T --> AG[Run agent]
  AG --> A{Assert}
  A -->|runbook_id == RB-003| PASS[✓]
  A -->|wrong runbook| FAIL[✗ CI blocked]
  A -->|forbidden tool called| FAIL
```

Each golden scenario defines:

| Field | Purpose |
|-------|---------|
| `input` | Alert JSON fixture |
| `expected_runbook_id` | Correct remediation |
| `forbidden_tools` | Tools that must never be invoked |
| `min_confidence` | Optional threshold |

## Observability data flow

```mermaid
flowchart LR
  AG[Agent spans] --> OTEL[OTel SDK]
  OTEL --> EXP[OTLP exporter]
  EXP --> GC[Grafana Cloud]
  GC --> DASH[Dashboard]
  DASH --> M1[Accuracy %]
  DASH --> M2[p95 latency]
  DASH --> M3[token cost / incident]
  DASH --> M4[tool misuse count]
```
