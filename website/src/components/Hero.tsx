import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Heading from '@theme/Heading';
import {motion, useReducedMotion} from 'framer-motion';

import styles from './Hero.module.css';

const stats = [
  {label: 'Build phases', value: '4'},
  {label: 'Runbooks cataloged', value: '5'},
  {label: 'Golden evals (target)', value: '20'},
  {label: 'Policy layers', value: '6'},
];

export default function Hero() {
  const {siteConfig} = useDocusaurusContext();
  const reduceMotion = useReducedMotion();

  const container = {
    hidden: {},
    show: {
      transition: {staggerChildren: reduceMotion ? 0 : 0.12},
    },
  };

  const item = {
    hidden: {opacity: 0, y: reduceMotion ? 0 : 24},
    show: {
      opacity: 1,
      y: 0,
      transition: {duration: 0.6, ease: [0.4, 0, 0.2, 1]},
    },
  };

  return (
    <header className={styles.hero}>
      <div className={styles.glow} aria-hidden />
      <div className={styles.grid} aria-hidden />

      <div className="container">
        <motion.div
          className={clsx(styles.panel, 'ra-glass')}
          variants={container}
          initial="hidden"
          animate="show">
          <motion.p className={styles.kicker} variants={item}>
            Open source · Agentic SRE · By{' '}
            <a href="https://asifad.github.io" className={styles.kickerLink}>
              Asif Draxi
            </a>
          </motion.p>

          <motion.div variants={item}>
            <Heading as="h1" className={styles.title}>
              {siteConfig.title}
            </Heading>
          </motion.div>

          <motion.p className={styles.subtitle} variants={item}>
            {siteConfig.tagline}. Eval gates, policy guardrails, and human-in-the-loop
            remediation — not unbounded shell access.
          </motion.p>

          <motion.div className={styles.actions} variants={item}>
            <Link className={clsx('button button--primary button--lg', styles.primaryBtn)} to="/docs/intro">
              Read the documentation
            </Link>
            <Link
              className={clsx('button button--secondary button--lg', styles.secondaryBtn)}
              href="https://github.com/AsifAd/runbook-agent">
              View on GitHub
            </Link>
          </motion.div>

          <motion.div className={styles.stats} variants={item}>
            {stats.map((s) => (
              <div key={s.label} className={styles.stat}>
                <span className={styles.statValue}>{s.value}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </header>
  );
}
