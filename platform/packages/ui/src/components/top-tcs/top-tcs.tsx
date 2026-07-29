import React from 'react';
import type { TopTcsProps } from './top-tcs.types';

const TEXT_SIZE_CLASSES: Record<NonNullable<TopTcsProps['variant']>, string> = {
    default: 'text-[11px] leading-[13px] md:text-[12px] md:leading-4',
    compact: 'text-[10px] leading-[13px]'
};

export function TopTCs({ text, variant = 'default' }: TopTcsProps): React.ReactElement {
    return (
        <div className="flex w-full items-center justify-center bg-surface py-1 md:py-2 px-4">
            <p className={TEXT_SIZE_CLASSES[variant] + ' tracking-[0.4px] text-white text-center'}>
                {text}
            </p>
        </div>
    );
}
