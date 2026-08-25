import type React from 'react';
import { cn } from '../../lib/generic/cn';
import { ctaSurfaceClass, ctaTextClass } from '../../lib/generic/cta-color';
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
    ctaColor,
    className = ''
}: LabelProps): React.ReactElement {
    const radiusClass = variant === 'desktop' ? 'rounded-br-lg' : 'rounded-t-lg';
    const surfaceClass = ctaColor === undefined ? colorClass[color] : ctaSurfaceClass(ctaColor);
    const textColorClass = ctaColor === undefined ? 'text-on-surface-light' : ctaTextClass(ctaColor);

    return (
        <div
            className={cn(
                'flex items-center justify-center',
                surfaceClass,
                radiusClass,
                textColorClass,
                'text-base font-bold leading-6 tracking-[0.15px]',
                className
            )}
        >
            {children}
        </div>
    );
}
