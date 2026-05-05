import React from 'react';

export type LabelVariant = 'mobile' | 'desktop';

export interface LabelProps {
  children: React.ReactNode;
  variant?: LabelVariant;
  className?: string;
}

export function Label({ children, variant = 'mobile', className = '' }: LabelProps) {
  // mobile: rounded top corners (sits at top of card, full width)
  // desktop: rounded bottom-right only (sits as a tab at top-left of card)
  const radiusClass = variant === 'desktop' ? 'rounded-br-lg' : 'rounded-t-lg';

  return (
    <div
      className={[
        'flex items-center justify-center',
        'bg-secondary',
        radiusClass,
        'text-on-surface-light text-base font-bold leading-6 tracking-[0.15px]',
        className,
      ].join(' ')}
    >
      {children}
    </div>
  );
}
