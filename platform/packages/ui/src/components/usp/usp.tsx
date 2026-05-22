import type React from 'react';
import type { UspProps } from './usp.types';

export function USP({ text, variant = 'default' }: UspProps): React.ReactElement {
    return (
        <div className="flex items-center justify-center w-full px-4 py-1 md:py-2 bg-tertiary overflow-hidden">
            {variant === 'ssm' ? (
                <span className="font-['Futura_PT'] font-bold md:font-[900] text-sm md:text-[24px] leading-5 md:leading-[28px] tracking-[-0.019em] text-on-surface-light text-center">
                    {text}
                </span>
            ) : (
                <span className="font-['Helvetica_Neue'] font-bold text-sm md:text-[24px] leading-5 md:leading-8 tracking-[0.1px] md:tracking-[0] text-on-surface-light text-center">
                    {text}
                </span>
            )}
        </div>
    );
}
