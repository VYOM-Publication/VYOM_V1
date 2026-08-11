import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// ── Variants ───────────────────────────────────────────────────────────────────
const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors select-none',
  {
    variants: {
      variant: {
        // bg-sand/20 (#B8A891 @ 20%) on ivory → text #111111 → contrast ✓
        default: 'bg-sand/30 text-text-primary',
        // bg-success/15 on ivory → text #2E7D32 → contrast ✓
        success: 'bg-success/15 text-success',
        // bg-warning/15 on ivory → text #0B1311 (dark neutral) → contrast ✓
        warning: 'bg-warning/15 text-dark-neutral',
        // bg-error/15 on ivory → text #C62828 → contrast ✓
        error: 'bg-error/15 text-error',
        // bg-forest-green/10 on ivory → text #18362F → contrast ✓
        info: 'bg-forest-green/10 text-forest-green',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

// ── Props ──────────────────────────────────────────────────────────────────────
export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  label?: string;
}

// ── Component ──────────────────────────────────────────────────────────────────
export function Badge({ className, variant, label, children, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props}>
      {label ?? children}
    </span>
  );
}

export { badgeVariants };
