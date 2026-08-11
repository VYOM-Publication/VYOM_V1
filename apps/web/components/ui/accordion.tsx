'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: Parameters<typeof clsx>) {
  return twMerge(clsx(inputs));
}

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  /** Allow multiple panels open simultaneously */
  multiple?: boolean;
  className?: string;
}

export function Accordion({ items, multiple = false, className }: AccordionProps) {
  const [open, setOpen] = useState<Set<string>>(new Set());

  function toggle(id: string) {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (!multiple) next.clear();
        next.add(id);
      }
      return next;
    });
  }

  return (
    <div className={cn('flex flex-col divide-y divide-sand/30 rounded-xl border border-sand/30 bg-white overflow-hidden shadow-card', className)}>
      {items.map((item) => {
        const isOpen = open.has(item.id);
        return (
          <div key={item.id}>
            <button
              onClick={() => toggle(item.id)}
              aria-expanded={isOpen}
              aria-controls={`accordion-panel-${item.id}`}
              id={`accordion-btn-${item.id}`}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left hover:bg-forest-green/4 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gold"
            >
              <span className={cn(
                'font-display text-caption font-semibold transition-colors',
                isOpen ? 'text-forest-green' : 'text-text-primary'
              )}>
                {item.title}
              </span>
              <ChevronDown
                className={cn(
                  'h-5 w-5 shrink-0 text-text-secondary transition-transform duration-200',
                  isOpen && 'rotate-180 text-forest-green'
                )}
                aria-hidden="true"
              />
            </button>

            <div
              id={`accordion-panel-${item.id}`}
              role="region"
              aria-labelledby={`accordion-btn-${item.id}`}
              hidden={!isOpen}
            >
              <div className="px-6 pb-6 pt-1 text-body text-text-secondary leading-relaxed border-t border-sand/20">
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
