import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import AnimatedSection from '@site/src/components/AnimatedSection';
import GlassCard from '@site/src/components/GlassCard';
import Hero from '@site/src/components/Hero';
import TechStack from '@site/src/components/TechStack';

import styles from './index.module.css';

const phases = [
  {
    title: 'Phase 0 — Scaffold',
    desc: 'GitHub repo, Docusaurus docs, GitHub Pages, monorepo layout, and phase specifications.',
    link: '/docs/roadmap/milestones',
    status: 'Complete',
    icon: '✓',
  },
  {
    title: 'Phase 1 — Classifier',
    desc: 'Structured alert classification and golden eval fixtures. Internal scaffold before tool use.',
    link: '/docs/phases/phase-1-classifier',
    status: 'Next',
    icon: '01',
  },
  {
    title: 'Phase 2 — Investigator',
    desc: 'Read-only kubectl tools on kind. Root cause with evidence. Target: v0.1 public publish.',
    link: '/docs/phases/phase-2-investigator',
    status: 'Planned',
    icon: '02',
  },
  {
    title: 'Phase 3 — Runbook Agent',
    desc: 'Policy-gated Ansible remediation with human approval. Portfolio capstone — v1.0 featured.',
    link: '/docs/phases/phase-3-runbook-agent',
    status: 'Planned',
    icon: '03',
  },
  {
    title: 'Phase 4 — Platform',
    desc: 'Agent SLOs, MCP server, or cloud deploy. Optional v2 depth after capstone ships.',
    link: '/docs/phases/phase-4-platform',
    status: 'Future',
    icon: '04',
  },
];

const flow = [
  'Alert',
  'Investigate',
  'Select runbook',
  'Policy check',
  'Dry-run',
  'Approve',
  'Execute',
  'Verify',
];

export default function Home(): ReactNode {
  return (
    <Layout
      title="Bounded AI incident triage"
      description="Open-source agent for Kubernetes incident investigation and Ansible remediation with eval gates and policy guardrails.">
      <Hero />

      <main className={styles.main}>
        <AnimatedSection className={styles.flowSection}>
          <p className={styles.sectionLabel}>Pipeline</p>
          <Heading as="h2" className={styles.sectionTitle}>
            From alert to verified fix
          </Heading>
          <div className={clsx(styles.flow, 'ra-glass')}>
            {flow.map((step, i) => (
              <div key={step} className={styles.flowStep}>
                <span className={styles.flowDot}>{i + 1}</span>
                <span className={styles.flowLabel}>{step}</span>
                {i < flow.length - 1 && <span className={styles.flowArrow} aria-hidden>→</span>}
              </div>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.05}>
          <p className={styles.sectionLabel}>Roadmap</p>
          <Heading as="h2" className={styles.sectionTitle}>
            Four phases, one portfolio story
          </Heading>
          <p className={styles.sectionDesc}>
            Documentation ships first. Code follows the spec — each phase has exit gates, eval
            criteria, and architecture diagrams before implementation begins.
          </p>
          <div className={styles.grid}>
            {phases.map((p, i) => (
              <GlassCard key={p.title} {...p} index={i} />
            ))}
          </div>
        </AnimatedSection>

        <TechStack />

        <AnimatedSection delay={0.1}>
          <div className={clsx(styles.ctaPanel, 'ra-glass')}>
            <Heading as="h2" className={styles.ctaTitle}>
              Start with the documentation
            </Heading>
            <p className={styles.ctaDesc}>
              Architecture, security model, eval strategy, and week-by-week build plan — everything
              needed before writing agent code.
            </p>
            <div className={styles.ctaActions}>
              <Link className="button button--primary button--lg" to="/docs/intro">
                Introduction
              </Link>
              <Link className="button button--secondary button--lg" to="/docs/phases/phase-3-runbook-agent">
                Phase 3 capstone
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </main>
    </Layout>
  );
}
