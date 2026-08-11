import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

// ── Utility ────────────────────────────────────────────────────────────────────
// Re-export from the shared utility to avoid duplicating the cn() helper
export { cn } from '@/lib/utils';

// ── Variants ───────────────────────────────────────────────────────────────────
const buttonVariants = cva(
  // Base styles
  [
    'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2',
    'disabled:pointer-events-none',
  ],
  {
    variants: {
      variant: {
        primary:
          'bg-forest-green text-ivory hover:bg-deep-green active:bg-deep-green disabled:opacity-40',
        secondary:
          'border border-gold text-gold bg-transparent hover:bg-gold/10 active:bg-gold/20 disabled:opacity-40',
        ghost:
          'bg-transparent text-text-primary hover:bg-sand/20 active:bg-sand/30 disabled:opacity-40',
        link:
          'bg-transparent text-forest-green underline-offset-4 hover:underline disabled:opacity-40 p-0 h-auto',
      },
      size: {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4 text-sm',
        lg: 'h-12 px-6 text-base',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

// ── Props ──────────────────────────────────────────────────────────────────────
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
}

// ── Component ──────────────────────────────────────────────────────────────────
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading, disabled, children, ...props }, ref) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={isDisabled}
        aria-disabled={isDisabled ? 'true' : undefined}
        aria-busy={loading ? 'true' : undefined}
        {...props}
      >
        {loading && (
          <Loader2
            className="h-4 w-4 animate-spin shrink-0"
            aria-hidden="true"
          />
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { buttonVariants };
