import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Heading from '@theme/Heading';
import {motion, useReducedMotion} from 'framer-motion';

import styles from './Hero.module.css';

const stats = [
  {label: 'Build phases', value: 5, suffix: ''},
  {label: 'Policy layers', value: 6, suffix: ''},
  {label: 'Golden evals', value: 20, suffix: ''},
  {label: 'Runbooks', value: 5, suffix: ''},
];

export default function Hero() {
  const {siteConfig} = useDocusaurusContext();
  const reduceMotion = useReducedMotion();

  return (
    <header className={styles.hero} data-testid="hero">
      <div className={styles.aurora} aria-hidden />
      <div className={styles.grid} aria-hidden />
      <div className={styles.noise} aria-hidden />

      <div className={clsx('container', styles.container)}>
        <motion.div
          className={styles.copy}
          initial={reduceMotion ? false : {opacity: 0, x: -24}}
          animate={{opacity: 1, x: 0}}
          transition={{duration: 0.7, ease: [0.4, 0, 0.2, 1]}}>
          <p className={styles.kicker}>
            <span className={styles.kickerDot} />
            Open source · Agentic SRE · By{' '}
            <a href="https://asifad.github.io" className={styles.kickerLink}>
              Asif Draxi
            </a>
          </p>

          <Heading as="h1" className={styles.title} data-testid="hero-title">
            {siteConfig.title}
          </Heading>

          <p className={styles.subtitle}>
            The first open-source incident agent you can{' '}
            <em>scrub through like a replay</em> — bounded tools, eval gates, and human approval
            baked in from day one.
          </p>

          <div className={styles.actions}>
            <Link className={clsx('button button--primary button--lg', styles.primaryBtn)} to="/docs/intro">
              Read the docs
            </Link>
            <Link
              className={clsx('button button--secondary button--lg', styles.secondaryBtn)}
              href="https://github.com/AsifAd/runbook-agent">
              GitHub
            </Link>
          </div>

          <div className={styles.stats}>
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                className={styles.stat}
                initial={reduceMotion ? false : {opacity: 0, y: 12}}
                animate={{opacity: 1, y: 0}}
                transition={{delay: 0.3 + i * 0.08, duration: 0.4}}>
                <span className={styles.statValue}>
                  {s.value}
                  {s.suffix}
                </span>
                <span className={styles.statLabel}>{s.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className={clsx(styles.preview, 'ra-glass')}
          initial={reduceMotion ? false : {opacity: 0, x: 24, rotateY: -8}}
          animate={{opacity: 1, x: 0, rotateY: 0}}
          transition={{duration: 0.8, delay: 0.15, ease: [0.4, 0, 0.2, 1]}}
          aria-hidden>
          <div className={styles.previewBar}>
            <span />
            <span />
            <span />
            <span className={styles.previewLabel}>incident replay · live</span>
          </div>
          <div className={styles.previewBody}>
            <div className={styles.previewLine}>
              <span className={styles.previewTag}>CRITICAL</span>
              KubePodCrashLooping · shop/checkout-api
            </div>
            <div className={styles.previewLineMuted}>→ classify · investigate · policy · fix</div>
            <div className={styles.previewCmd}>$ kubectl logs checkout-api --tail=3</div>
            <div className={styles.previewOut}>OOMKilled · heap space exceeded</div>
            <div className={styles.previewCmd}>$ ansible-playbook fix-oom.yml --check</div>
            <div className={styles.previewOk}>✓ RB-003 allowed · approval granted · pod Running</div>
          </div>
          <div className={styles.previewFooter}>
            <span>Scroll down to scrub the full theater</span>
            <span className={styles.previewArrow}>↓</span>
          </div>
        </motion.div>
      </div>
    </header>
  );
}
