import type React from 'react';
import { cn } from '../../lib/generic/cn';
import type { LabelProps } from './label.types';

const colorClass: Record<NonNullable<LabelProps['color']>, string> = {
    blue:   'bg-secondary',
    red:    'bg-accent-red',
    orange: 'bg-accent-orange',
};

export function Label({
    children,
    variant = 'mobile',
    color = 'blue',
    className = ''
}: LabelProps): React.ReactElement {
    const radiusClass = variant === 'desktop' ? 'rounded-br-lg' : 'rounded-t-lg';

    return (
        <div
            className={cn(
                'flex items-center justify-center',
                colorClass[color],
                radiusClass,
                'text-on-surface-light text-base font-bold leading-6 tracking-[0.15px]',
                className
            )}
        >
            {children}
        </div>
    );
}
