import * as React from 'react';
import { cn } from '@/lib/utils';

// ── Props ──────────────────────────────────────────────────────────────────────
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  /** Pass a unique id; one is auto-generated if omitted */
  id?: string;
  containerClassName?: string;
  labelClassName?: string;
  /** Slot for suffix element (e.g. show/hide password button) */
  suffix?: React.ReactNode;
}

// ── Component ──────────────────────────────────────────────────────────────────
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      hint,
      id: idProp,
      className,
      containerClassName,
      labelClassName,
      disabled,
      suffix,
      ...props
    },
    ref
  ) => {
    // Generate stable id for accessibility linkage
    const generatedId = React.useId();
    const id = idProp ?? generatedId;
    const errorId = `${id}-error`;
    const hintId  = `${id}-hint`;

    const describedBy = [
      error ? errorId : null,
      hint  ? hintId  : null,
    ]
      .filter(Boolean)
      .join(' ') || undefined;

    return (
      <div className={cn('flex flex-col gap-1', containerClassName)}>
        {/* Label */}
        {label && (
          <label
            htmlFor={id}
            className={cn(
              'text-sm font-medium text-text-primary',
              disabled && 'opacity-50',
              labelClassName
            )}
          >
            {label}
          </label>
        )}

        {/* Input wrapper (allows suffix slot) */}
        <div className="relative flex items-center">
          <input
            ref={ref}
            id={id}
            disabled={disabled}
            aria-disabled={disabled ? 'true' : undefined}
            aria-describedby={describedBy}
            aria-invalid={error ? 'true' : undefined}
            className={cn(
              // Base
              'w-full rounded-md border bg-transparent px-3 py-2 text-sm text-text-primary',
              'placeholder:text-sand',
              // Border colours
              error
                ? 'border-error focus-visible:ring-error/50'
                : 'border-sand focus-visible:ring-gold/50',
              // Focus ring (gold)
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1',
              // Disabled
              disabled && 'cursor-not-allowed opacity-50',
              // Room for suffix
              suffix && 'pr-10',
              className
            )}
            {...props}
          />

          {/* Suffix slot (e.g. show/hide toggle) */}
          {suffix && (
            <span className="absolute right-3 flex items-center">
              {suffix}
            </span>
          )}
        </div>

        {/* Hint */}
        {hint && !error && (
          <p id={hintId} className="text-metadata text-text-secondary">
            {hint}
          </p>
        )}

        {/* Error */}
        {error && (
          <p
            id={errorId}
            role="alert"
            aria-live="polite"
            className="text-caption text-error"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
