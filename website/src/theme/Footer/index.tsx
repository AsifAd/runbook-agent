import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {motion, useReducedMotion} from 'framer-motion';

import styles from './styles.module.css';

type LinkItem = {label: string; to?: string; href?: string};

type LinkGroup = {title: string; items: LinkItem[]};

const EXTRA_GROUPS: LinkGroup[] = [
  {
    title: 'Quality',
    items: [
      {label: 'Testing gates', to: '/docs/evals/phase-testing-gates'},
      {label: 'Eval strategy', to: '/docs/evals/testing-strategy'},
      {label: 'Policy guardrails', to: '/docs/security/policy-guardrails'},
    ],
  },
];

const PHASE_PROGRESS = [
  {label: 'Phase 0', status: 'done' as const},
  {label: 'Phase 1', status: 'next' as const},
  {label: 'Phase 2', status: 'upcoming' as const},
  {label: 'Phase 3', status: 'upcoming' as const},
];

function FooterLink({item}: {item: LinkItem}) {
  const external = Boolean(item.href);

  if (external) {
    return (
      <Link className={styles.link} href={item.href} target="_blank" rel="noopener noreferrer">
        <span>{item.label}</span>
        <span className={styles.external} aria-hidden>
          ↗
        </span>
      </Link>
    );
  }

  return (
    <Link className={styles.link} to={item.to!}>
      {item.label}
    </Link>
  );
}

export default function Footer(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  const footer = siteConfig.themeConfig.footer as {
    links?: LinkGroup[];
    copyright?: string;
  };
  const logoUrl = useBaseUrl('/img/logo.svg');
  const year = new Date().getFullYear();
  const groups = [...(footer?.links ?? []), ...EXTRA_GROUPS];
  const reduceMotion = useReducedMotion();

  const fadeUp = (delay = 0) =>
    reduceMotion
      ? {}
      : {
          initial: {opacity: 0, y: 16},
          whileInView: {opacity: 1, y: 0},
          viewport: {once: true, margin: '-40px'},
          transition: {duration: 0.55, delay, ease: [0.4, 0, 0.2, 1]},
        };

  return (
    <footer className={styles.footer} role="contentinfo" data-testid="site-footer">
      <div className={styles.aurora} aria-hidden />
      <div className={styles.grid} aria-hidden />
      <div className={styles.rule} aria-hidden />

      <div className="container">
        <motion.div className={styles.top} {...fadeUp()}>
          <div className={styles.brand}>
            <Link to="/" className={styles.brandLink}>
              <img src={logoUrl} alt="" className={styles.logo} width={36} height={36} />
              <div>
                <span className={styles.brandName}>{siteConfig.title}</span>
                <span className={styles.brandTag}>Agentic SRE · Open source</span>
              </div>
            </Link>
            <p className={styles.tagline}>{siteConfig.tagline}</p>

            <div className={styles.phaseTrack} aria-label="Build progress">
              {PHASE_PROGRESS.map((phase) => (
                <span
                  key={phase.label}
                  className={styles.phaseChip}
                  data-status={phase.status}
                  title={phase.label}>
                  {phase.label}
                </span>
              ))}
            </div>

            <div className={styles.status}>
              <span className={styles.statusDot} aria-hidden />
              <span>Phase 0 complete · Phase 1 next</span>
            </div>

            <div className={styles.social}>
              <Link
                href="https://github.com/AsifAd/runbook-agent"
                className={styles.socialBtn}
                aria-label="GitHub repository">
                GitHub
              </Link>
              <Link href="https://asifad.github.io" className={styles.socialBtn} aria-label="Portfolio">
                Portfolio
              </Link>
            </div>
          </div>

          <div className={styles.columns}>
            {groups.map((group, i) => (
              <motion.div
                key={group.title}
                className={styles.column}
                {...fadeUp(0.06 + i * 0.04)}>
                <p className={styles.columnTitle}>{group.title}</p>
                <ul className={styles.linkList}>
                  {group.items.map((item) => (
                    <li key={item.label}>
                      <FooterLink item={item} />
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div className={styles.bottom} {...fadeUp(0.2)}>
          <p className={styles.copyright}>
            © {year} Asif Draxi · Built with bounded agents, not unbounded hope
          </p>
          <div className={styles.bottomLinks}>
            <Link to="/docs/intro" className={styles.bottomLink}>
              Docs
            </Link>
            <span className={styles.sep} aria-hidden>
              ·
            </span>
            <Link to="/docs/phases/phase-3-runbook-agent" className={styles.bottomLink}>
              Runbook Agent capstone
            </Link>
            <span className={styles.sep} aria-hidden>
              ·
            </span>
            <span className={styles.nominal}>
              <span className={styles.nominalDot} aria-hidden />
              systems nominal
            </span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
