import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {motion, useReducedMotion} from 'framer-motion';

import styles from './PhaseOrbit.module.css';

const phases = [
  {n: 0, title: 'Scaffold', status: 'Complete', link: '/docs/roadmap/milestones', active: false, done: true},
  {n: 1, title: 'Classifier', status: 'Next', link: '/docs/phases/phase-1-classifier', active: true, done: false},
  {n: 2, title: 'Investigator', status: 'Planned', link: '/docs/phases/phase-2-investigator', active: false, done: false},
  {n: 3, title: 'Runbook Agent', status: 'Capstone', link: '/docs/phases/phase-3-runbook-agent', active: false, done: false},
  {n: 4, title: 'Platform', status: 'Future', link: '/docs/phases/phase-4-platform', active: false, done: false},
];

export default function PhaseOrbit() {
  const reduceMotion = useReducedMotion();

  return (
    <div className={styles.orbitWrap} data-testid="phase-orbit">
      <svg className={styles.orbitPath} viewBox="0 0 800 120" aria-hidden preserveAspectRatio="none">
        <path
          d="M 20 90 Q 200 10, 400 50 T 780 70"
          fill="none"
          stroke="var(--ra-rule)"
          strokeWidth="2"
          strokeDasharray="6 6"
        />
        <motion.path
          d="M 20 90 Q 200 10, 400 50 T 780 70"
          fill="none"
          stroke="var(--ifm-color-primary)"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{pathLength: reduceMotion ? 1 : 0}}
          whileInView={{pathLength: 1}}
          viewport={{once: true}}
          transition={{duration: 1.8, ease: [0.4, 0, 0.2, 1]}}
        />
      </svg>

      <div className={styles.nodes} data-testid="phase-grid">
        {phases.map((p, i) => (
          <motion.div
            key={p.n}
            className={styles.nodeWrap}
            initial={reduceMotion ? false : {opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true}}
            transition={{delay: i * 0.1, duration: 0.45}}>
            <Link to={p.link} className={clsx(styles.node, 'ra-glass', p.active && styles.nodeActive, p.done && styles.nodeDone)}>
              <span className={styles.nodeNum}>{p.done ? '✓' : `0${p.n}`.slice(-2)}</span>
              <span className={styles.nodeTitle}>{p.title}</span>
              <span className={styles.nodeStatus}>{p.status}</span>
              {p.active && <span className={styles.pulse} aria-hidden />}
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
