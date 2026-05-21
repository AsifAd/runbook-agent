import {type ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import AnimatedSection from '@site/src/components/AnimatedSection';
import Hero from '@site/src/components/Hero';
import IncidentCommandTheater from '@site/src/components/IncidentCommandTheater';
import PhaseOrbit from '@site/src/components/PhaseOrbit';
import TechStack from '@site/src/components/TechStack';

import styles from './index.module.css';

const differentiators = [
  {
    icon: '⬡',
    title: 'Eval-gated, not vibe-coded',
    desc: 'Golden scenarios fail CI before a bad runbook ships. Honest accuracy scores in the README.',
  },
  {
    icon: '◈',
    title: 'Policy before prompt',
    desc: 'Six deterministic layers gate every action. The LLM recommends — policy decides.',
  },
  {
    icon: '◎',
    title: 'Human-in-the-loop default',
    desc: 'High-risk remediations pause for approval. No "AI with root" theater.',
  },
];

export default function Home(): ReactNode {
  return (
    <Layout
      title="Bounded AI incident triage"
      description="Open-source agent for Kubernetes incident investigation and Ansible remediation with eval gates and policy guardrails.">
      <Hero />

      <main className={styles.main} data-testid="homepage-main">
        <IncidentCommandTheater />

        <AnimatedSection>
          <p className={styles.sectionLabel}>Philosophy</p>
          <Heading as="h2" className={styles.sectionTitle}>
            Built different on purpose
          </Heading>
          <div className={styles.diffGrid}>
            {differentiators.map((d, i) => (
              <div key={d.title} className={clsx(styles.diffCard, 'ra-glass')}>
                <span className={styles.diffIcon}>{d.icon}</span>
                <h3 className={styles.diffTitle}>{d.title}</h3>
                <p className={styles.diffDesc}>{d.desc}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.05}>
          <p className={styles.sectionLabel}>Roadmap</p>
          <Heading as="h2" className={styles.sectionTitle}>
            Phase orbit — one story, five gates
          </Heading>
          <p className={styles.sectionDesc}>
            Each phase has tests, stage checks, and rollback points before the next begins.{' '}
            <Link to="/docs/evals/phase-testing-gates">See testing gates →</Link>
          </p>
          <PhaseOrbit />
        </AnimatedSection>

        <TechStack />

        <AnimatedSection delay={0.1}>
          <div className={clsx(styles.ctaPanel, 'ra-glass')}>
            <p className={styles.ctaKicker}>Ready to dive in?</p>
            <Heading as="h2" className={styles.ctaTitle}>
              Specs first. Code follows.
            </Heading>
            <p className={styles.ctaDesc}>
              Architecture, security model, eval strategy, and week-by-week build plan — everything
              documented before a single agent line ships.
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
