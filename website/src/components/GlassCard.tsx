import type {ReactNode} from 'react';
import clsx from 'clsx';
import {motion, useReducedMotion} from 'framer-motion';
import Link from '@docusaurus/Link';

import styles from './GlassCard.module.css';

type Props = {
  title: string;
  description: string;
  link: string;
  status: string;
  index: number;
  icon?: ReactNode;
};

export default function GlassCard({title, description, link, status, index, icon}: Props) {
  const reduceMotion = useReducedMotion();

  const card = (
    <article className={clsx(styles.card, 'ra-glass')}>
      <div className={styles.header}>
        <div className={styles.titleRow}>
          {icon && <span className={styles.icon}>{icon}</span>}
          <h3 className={styles.title}>{title}</h3>
        </div>
        <span className={styles.badge}>{status}</span>
      </div>
      <p className={styles.desc}>{description}</p>
      <Link className={styles.link} to={link}>
        Read phase spec
        <span aria-hidden className={styles.arrow}>
          →
        </span>
      </Link>
    </article>
  );

  if (reduceMotion) {
    return <div className={styles.wrapper}>{card}</div>;
  }

  return (
    <motion.div
      className={styles.wrapper}
      initial={{opacity: 0, y: 32}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true, margin: '-40px'}}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.4, 0, 0.2, 1],
      }}
      whileHover={{y: -6, transition: {duration: 0.25}}}>
      {card}
    </motion.div>
  );
}
