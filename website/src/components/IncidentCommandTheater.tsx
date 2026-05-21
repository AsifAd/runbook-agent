import {useCallback, useEffect, useState} from 'react';
import clsx from 'clsx';
import {motion, AnimatePresence, useReducedMotion} from 'framer-motion';

import styles from './IncidentCommandTheater.module.css';

type StageId =
  | 'alert'
  | 'investigate'
  | 'runbook'
  | 'policy'
  | 'dryrun'
  | 'approve'
  | 'execute'
  | 'verify';

type Stage = {
  id: StageId;
  label: string;
  status: string;
  statusTone: 'critical' | 'warn' | 'info' | 'ok';
  lines: string[];
  metric?: string;
};

const STAGES: Stage[] = [
  {
    id: 'alert',
    label: 'Alert ingested',
    status: 'CRITICAL',
    statusTone: 'critical',
    lines: [
      'POST /webhooks/pagerduty → 202 Accepted',
      '{"alertname":"KubePodCrashLooping","pod":"checkout-api-7d4f"}',
      'severity: critical · namespace: shop',
    ],
    metric: 'incident_id: inc-7f2a',
  },
  {
    id: 'investigate',
    label: 'Investigating',
    status: 'INVESTIGATING',
    statusTone: 'warn',
    lines: [
      '$ kubectl describe pod checkout-api-7d4f -n shop',
      'Last State: Terminated · Reason: Error · Exit Code: 137',
      '$ kubectl logs checkout-api-7d4f --tail=20',
      'java.lang.OutOfMemoryError: Java heap space',
    ],
    metric: 'confidence: 0.92',
  },
  {
    id: 'runbook',
    label: 'Runbook selected',
    status: 'CLASSIFIED',
    statusTone: 'info',
    lines: [
      'incident_type: OOMKilled',
      'recommended_runbook_id: RB-003',
      'Fix OOM — increase memory limit + rolling restart',
    ],
    metric: 'catalog match: RB-003',
  },
  {
    id: 'policy',
    label: 'Policy gate',
    status: 'POLICY CHECK',
    statusTone: 'info',
    lines: [
      'runbook RB-003 · env: sandbox · risk: medium',
      'allowed_tools: [ansible-playbook]',
      'forbidden: kubectl delete, shell_exec',
      '→ DECISION: ALLOW (approval required)',
    ],
    metric: '6 layers passed',
  },
  {
    id: 'dryrun',
    label: 'Ansible dry-run',
    status: 'DRY-RUN',
    statusTone: 'info',
    lines: [
      '$ ansible-playbook fix-oom.yml --check',
      'TASK [Increase memory limit to 512Mi] ***',
      'changed: 1 · failed: 0 · skipped: 0',
      'preview: deployment/checkout-api would be updated',
    ],
    metric: 'blast radius: 1 deploy',
  },
  {
    id: 'approve',
    label: 'Human approval',
    status: 'AWAITING HITL',
    statusTone: 'warn',
    lines: [
      'risk_level: medium · requires_approval: true',
      'POST /incidents/inc-7f2a/approve',
      'approved_by: human · timestamp: now',
    ],
    metric: 'approval: granted',
  },
  {
    id: 'execute',
    label: 'Executing fix',
    status: 'REMEDIATING',
    statusTone: 'info',
    lines: [
      '$ ansible-playbook fix-oom.yml',
      'TASK [Patch deployment memory] *** changed',
      'TASK [Rolling restart checkout-api] *** changed',
      'PLAY RECAP: ok=4 changed=2',
    ],
    metric: 'mttr: 2m 14s',
  },
  {
    id: 'verify',
    label: 'Verified healthy',
    status: 'RESOLVED',
    statusTone: 'ok',
    lines: [
      '$ kubectl get pods -n shop -l app=checkout-api',
      'checkout-api-7d4f-new   1/1   Running   0   42s',
      'golden eval: PASS · forbidden tools: 0',
      'incident closed · trace exported to OTel',
    ],
    metric: 'eval score: 17/20',
  },
];

const STAGE_MS = 4200;

export default function IncidentCommandTheater() {
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const stage = STAGES[activeIndex];

  const advance = useCallback(() => {
    setActiveIndex((i) => (i + 1) % STAGES.length);
  }, []);

  useEffect(() => {
    if (reduceMotion || paused) return;
    const t = setInterval(advance, STAGE_MS);
    return () => clearInterval(t);
  }, [advance, paused, reduceMotion]);

  const selectStage = (index: number) => {
    setActiveIndex(index);
    setPaused(true);
  };

  return (
    <section
      className={clsx(styles.theater, 'ra-glass')}
      data-testid="incident-theater"
      aria-label="Live incident command replay">
      <div className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Incident Command Theater</p>
          <h2 className={styles.title}>Watch an alert become a verified fix</h2>
          <p className={styles.subtitle}>
            Auto-replaying demo of the Runbook Agent loop — click any stage to scrub. This is the
            story recruiters see in 30 seconds.
          </p>
        </div>
        <div className={styles.liveBadge} aria-live="polite">
          <span className={styles.liveDot} />
          {paused ? 'Paused' : 'Live replay'}
        </div>
      </div>

      <div className={styles.rail}>
        {STAGES.map((s, i) => (
          <button
            key={s.id}
            type="button"
            className={clsx(styles.railStep, i === activeIndex && styles.railStepActive, i < activeIndex && styles.railStepDone)}
            onClick={() => selectStage(i)}
            aria-current={i === activeIndex ? 'step' : undefined}>
            <span className={styles.railNum}>{i + 1}</span>
            <span className={styles.railLabel}>{s.label}</span>
          </button>
        ))}
      </div>

      <div className={styles.stage}>
        <div className={styles.sidePanel}>
          <p className={styles.panelLabel}>Incident status</p>
          <AnimatePresence mode="wait">
            <motion.span
              key={stage.status}
              className={clsx(styles.statusPill, styles[`tone_${stage.statusTone}`])}
              initial={{opacity: 0, scale: 0.9}}
              animate={{opacity: 1, scale: 1}}
              exit={{opacity: 0}}
              transition={{duration: 0.25}}>
              {stage.status}
            </motion.span>
          </AnimatePresence>
          <div className={styles.progressRing} aria-hidden>
            <svg viewBox="0 0 36 36">
              <circle className={styles.ringBg} cx="18" cy="18" r="15.9" />
              <circle
                className={styles.ringFill}
                cx="18"
                cy="18"
                r="15.9"
                style={{
                  strokeDashoffset: `${100 - ((activeIndex + 1) / STAGES.length) * 100}`,
                }}
              />
            </svg>
            <span className={styles.ringText}>{Math.round(((activeIndex + 1) / STAGES.length) * 100)}%</span>
          </div>
          {stage.metric && <p className={styles.metric}>{stage.metric}</p>}
        </div>

        <div className={styles.terminal}>
          <div className={styles.terminalBar}>
            <span className={styles.dot} />
            <span className={styles.dot} />
            <span className={styles.dot} />
            <span className={styles.terminalTitle}>runbook-agent · sandbox</span>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={stage.id}
              className={styles.terminalBody}
              initial={{opacity: 0, y: 8}}
              animate={{opacity: 1, y: 0}}
              exit={{opacity: 0, y: -8}}
              transition={{duration: 0.35, ease: [0.4, 0, 0.2, 1]}}>
              {stage.lines.map((line, i) => (
                <motion.div
                  key={line}
                  className={clsx(styles.line, line.startsWith('$') && styles.lineCmd, line.startsWith('{') && styles.lineJson)}
                  initial={reduceMotion ? false : {opacity: 0, x: -8}}
                  animate={{opacity: 1, x: 0}}
                  transition={{delay: i * 0.08, duration: 0.3}}>
                  {line}
                </motion.div>
              ))}
              {!reduceMotion && <span className={styles.cursor} aria-hidden />}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className={styles.policyPanel}>
          <p className={styles.panelLabel}>Policy layers</p>
          {['Schema', 'Tools', 'Catalog', 'Engine', 'HITL', 'Dry-run'].map((layer, i) => (
            <motion.div
              key={layer}
              className={clsx(styles.shield, activeIndex >= 3 && i <= activeIndex - 2 && styles.shieldLit)}
              animate={{
                opacity: activeIndex >= 3 && i <= Math.min(activeIndex, 5) ? 1 : 0.35,
                scale: activeIndex >= 3 && i === Math.min(activeIndex - 2, 5) ? 1.02 : 1,
              }}
              transition={{duration: 0.3}}>
              <span className={styles.shieldIcon}>{activeIndex >= 3 && i <= activeIndex - 2 ? '◆' : '◇'}</span>
              {layer}
            </motion.div>
          ))}
        </div>
      </div>

      {!paused && !reduceMotion && (
        <button type="button" className={styles.pauseHint} onClick={() => setPaused(true)}>
          Click a stage to pause &amp; explore
        </button>
      )}
      {paused && (
        <button type="button" className={styles.pauseHint} onClick={() => setPaused(false)}>
          Resume live replay →
        </button>
      )}
    </section>
  );
}
