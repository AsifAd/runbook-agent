import type {ReactNode} from 'react';
import {motion, useReducedMotion} from 'framer-motion';

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  'data-testid'?: string;
};

export default function AnimatedSection({children, className, delay = 0, 'data-testid': testId}: Props) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <div className={className} data-testid={testId}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      data-testid={testId}
      initial={{opacity: 0, y: 28}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true, margin: '-60px'}}
      transition={{
        duration: 0.55,
        delay,
        ease: [0.4, 0, 0.2, 1],
      }}>
      {children}
    </motion.div>
  );
}
