import React, { useMemo } from 'react';
import useScrollTrigger from '../utils/useScrollTrigger';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  direction?: 'up' | 'left' | 'right' | 'scale' | 'fade';
  delay?: number;
  duration?: number;
  start?: string;
  once?: boolean;
  as?: 'div' | 'ul' | 'section' | 'article' | 'span' | 'li';
}

const directionMap: Record<string, { y: number; x: number; scale: number }> = {
  up: { y: 60, x: 0, scale: 1 },
  left: { y: 0, x: -60, scale: 1 },
  right: { y: 0, x: 60, scale: 1 },
  scale: { y: 0, x: 0, scale: 0.9 },
  fade: { y: 0, x: 0, scale: 1 },
};

export default function AnimatedSection({
  children,
  className = '',
  direction = 'up',
  delay = 0,
  duration = 0.8,
  start,
  once,
  as: Tag = 'div',
}: AnimatedSectionProps) {
  const { x, y, scale } = directionMap[direction];

  const fromVars = useMemo(
    () => ({ opacity: 0, y, x, scale }),
    [y, x, scale]
  );
  const toVars = useMemo(
    () => ({ opacity: 1, y: 0, x: 0, scale: 1, duration, delay }),
    [duration, delay]
  );
  const options = useMemo(
    () => ({ start, once, self: Tag === 'li' || Tag === 'span' }),
    [start, once, Tag]
  );

  const ref = useScrollTrigger(fromVars, toVars, options);

  const Comp = Tag as React.ElementType;
  return <Comp ref={ref} className={className}>{children}</Comp>;
}
