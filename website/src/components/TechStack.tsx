import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {motion, useReducedMotion} from 'framer-motion';

import AnimatedSection from './AnimatedSection';
import styles from './TechStack.module.css';

const stack = [
  'Python',
  'Pydantic AI',
  'FastAPI',
  'kind',
  'kubectl',
  'Ansible',
  'pytest',
  'OpenTelemetry',
  'Grafana',
  'GitHub Actions',
];

export default function TechStack() {
  const reduceMotion = useReducedMotion();

  return (
    <AnimatedSection className={styles.section}>
      <div className={clsx(styles.panel, 'ra-glass')}>
        <p className={styles.label}>Technology</p>
        <h2 className={styles.title}>Built with production-grade tooling</h2>
        <div className={styles.pills}>
          {stack.map((tech, i) => (
            <motion.span
              key={tech}
              className={styles.pill}
              initial={reduceMotion ? false : {opacity: 0, scale: 0.92}}
              whileInView={{opacity: 1, scale: 1}}
              viewport={{once: true}}
              transition={{
                delay: i * 0.04,
                duration: 0.35,
                ease: [0.4, 0, 0.2, 1],
              }}
              whileHover={reduceMotion ? {} : {y: -3, scale: 1.04}}>
              {tech}
            </motion.span>
          ))}
        </div>
        <Link className={styles.cta} to="/docs/tech-stack">
          Full stack rationale & tradeoffs
          <span aria-hidden> →</span>
        </Link>
      </div>
    </AnimatedSection>
  );
}
