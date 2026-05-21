import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

const phases = [
  {
    title: 'Phase 1 — Classifier',
    desc: 'Structured alert classification + golden eval fixtures. Internal scaffold.',
    link: '/docs/phases/phase-1-classifier',
    status: 'Planned',
  },
  {
    title: 'Phase 2 — Investigator',
    desc: 'Read-only kubectl tools on kind. Root cause with evidence. v0.1 publish.',
    link: '/docs/phases/phase-2-investigator',
    status: 'Planned',
  },
  {
    title: 'Phase 3 — Runbook Agent',
    desc: 'Policy-gated Ansible remediation. The portfolio capstone. v1.0 featured.',
    link: '/docs/phases/phase-3-runbook-agent',
    status: 'Planned',
  },
  {
    title: 'Phase 4 — Platform',
    desc: 'Agent SLOs, MCP server, or cloud deploy. Optional v2 depth.',
    link: '/docs/phases/phase-4-platform',
    status: 'Future',
  },
];

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link className="button button--primary button--lg" to="/docs/intro">
            Read the docs
          </Link>
          <Link
            className="button button--secondary button--lg"
            href="https://github.com/AsifAd/runbook-agent">
            View on GitHub
          </Link>
        </div>
      </div>
    </header>
  );
}

function PhaseCard({title, desc, link, status}: (typeof phases)[0]) {
  return (
    <div className={clsx('col col--6', styles.phaseCard)}>
      <div className="card margin-bottom--md">
        <div className="card__header">
          <h3>{title}</h3>
          <span className={styles.badge}>{status}</span>
        </div>
        <div className="card__body">
          <p>{desc}</p>
        </div>
        <div className="card__footer">
          <Link to={link}>Phase spec →</Link>
        </div>
      </div>
    </div>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout
      title="Bounded AI incident triage"
      description="Open-source agent for Kubernetes incident investigation and Ansible remediation with eval gates and policy guardrails.">
      <HomepageHeader />
      <main className="container margin-vert--lg">
        <section className="margin-bottom--xl">
          <Heading as="h2">Build phases</Heading>
          <p>
            One monorepo, four internal phases, one portfolio story. Documentation ships first —
            code follows the spec.
          </p>
          <div className="row">
            {phases.map((p) => (
              <PhaseCard key={p.title} {...p} />
            ))}
          </div>
        </section>
        <section className={styles.stack}>
          <Heading as="h2">Tech stack</Heading>
          <p className={styles.stackLine}>
            Python · Pydantic AI · FastAPI · kind · kubectl · Ansible · pytest · OpenTelemetry ·
            Grafana · GitHub Actions
          </p>
          <Link to="/docs/tech-stack">Full stack rationale →</Link>
        </section>
      </main>
    </Layout>
  );
}
