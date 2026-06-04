import type React from 'react';
import { cn } from '../../lib/generic/cn';
import type { GoodChoiceLabelProps } from './good-choice-label.types';

export function GoodChoiceLabel({ className }: GoodChoiceLabelProps): React.ReactElement {
    return (
        <div
            className={cn(
                'w-full flex items-center justify-center',
                'bg-primary',
                'py-1 px-4',
                className
            )}
        >
            <span className="text-sm font-bold leading-5">
                <span className="text-on-primary">the </span>
                <span className="text-tertiary">Good.</span>
                <span className="text-on-primary">Choice</span>
            </span>
        </div>
    );
}
