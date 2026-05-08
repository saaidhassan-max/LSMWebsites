import React from 'react';
import type { LabelProps } from './label.types';

export function Label({
    children,
    variant = 'mobile',
    className = ''
}: LabelProps): React.ReactElement {
    const radiusClass = variant === 'desktop' ? 'rounded-br-lg' : 'rounded-t-lg';

    return (
        <div
            className={[
                'flex items-center justify-center',
                'bg-secondary',
                radiusClass,
                'text-on-surface-light text-base font-bold leading-6 tracking-[0.15px]',
                className
            ].join(' ')}
        >
            {children}
        </div>
    );
}
