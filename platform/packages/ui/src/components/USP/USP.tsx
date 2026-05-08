import React from 'react';
import type { UspProps } from './usp.types';

export function USP({ text }: UspProps): React.ReactElement {
    return (
        <div className="flex items-center justify-center w-full px-4 py-1 md:py-2 bg-tertiary overflow-hidden">
            <span className="font-['Futura_PT'] font-bold md:font-[900] text-sm md:text-[24px] leading-5 md:leading-[28px] tracking-[-0.019em] text-on-surface-light text-center">
                {text}
            </span>
        </div>
    );
}
