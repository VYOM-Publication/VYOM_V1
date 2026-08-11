import * as React from 'react';
import { cn } from '@/lib/utils';

// ── Props ──────────────────────────────────────────────────────────────────────
export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Explicit width — accepts any valid CSS value, e.g. "200px", "100%", "12rem" */
  width?: React.CSSProperties['width'];
  /** Explicit height — accepts any valid CSS value, e.g. "20px", "1.5rem" */
  height?: React.CSSProperties['height'];
  /** Rounds the skeleton into a circle (useful for avatars) */
  circle?: boolean;
}

// ── Component ──────────────────────────────────────────────────────────────────
export function Skeleton({ width, height, circle, className, style, ...props }: SkeletonProps) {
  return (
    <div
      role="status"
      aria-label="Loading…"
      className={cn(
        // Shimmer gradient: ivory → sand → ivory cycling over 1500ms
        'shimmer',
        circle ? 'rounded-full' : 'rounded-md',
        className
      )}
      style={{ width, height, ...style }}
      {...props}
    />
  );
}

// ── Preset compositions ────────────────────────────────────────────────────────

/** Single-line text skeleton */
export function SkeletonText({ lines = 1, className }: { lines?: number; className?: string }) {
  return (
    <div className={cn('flex flex-col gap-2', className)} role="status" aria-label="Loading…">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          height="1rem"
          width={i === lines - 1 && lines > 1 ? '75%' : '100%'}
        />
      ))}
    </div>
  );
}

/** Book-card sized skeleton */
export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={cn('flex flex-col gap-3 p-4', className)} role="status" aria-label="Loading…">
      <Skeleton height="200px" width="100%" />
      <Skeleton height="1.25rem" width="80%" />
      <Skeleton height="1rem" width="60%" />
      <Skeleton height="1rem" width="40%" />
      <Skeleton height="2.5rem" width="100%" />
    </div>
  );
}
