'use client';

import { useEffect, useRef, useState } from 'react';

interface Props {
  value: number;
  suffix: string;
  label: string;
}

export default function StatisticsBlock({ value, suffix, label }: Props) {
  const [count, setCount] = useState(0);
  const [animated, setAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated) {
          setAnimated(true);
          const duration = 1200;
          const start = performance.now();
          const tick = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // ease-out: 1 - (1 - t)^3
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * value));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold: 0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, animated]);

  return (
    <div ref={ref} className="flex flex-col items-center text-center">
      <span className="font-display text-section text-gold">
        {count.toLocaleString()}{suffix}
      </span>
      <span className="mt-1 text-caption text-ivory/70">{label}</span>
    </div>
  );
}
