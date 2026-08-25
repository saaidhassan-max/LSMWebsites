import type React from 'react';
import { cn } from '../../lib/generic/cn';
import type { UspProps } from './usp.types';

export function USP({
    text,
    variant = 'default',
    textClassName = ''
}: UspProps): React.ReactElement {
    return (
        <div className="flex items-center justify-center w-full px-4 py-1 md:py-2 bg-tertiary overflow-hidden">
            {variant === 'ssm' ? (
                <span
                    className={cn(
                        'font-futura font-bold md:font-[900] text-sm md:text-[24px] leading-5 md:leading-[28px] tracking-[-0.019em] text-on-surface-dark text-center',
                        textClassName
                    )}
                >
                    {text}
                </span>
            ) : (
                <span
                    className={cn(
                        'text-sm md:text-[24px] leading-5 md:leading-8 text-center',
                        variant === 'bingo'
                            ? "font-['HelveticaNeue-CondensedBold','Helvetica_Neue_Condensed','Helvetica_Neue'] [font-stretch:condensed] font-bold tracking-[-0.019em] text-on-surface-light"
                            : "font-['Helvetica_Neue'] font-bold tracking-[0.1px] md:tracking-[0] text-on-surface-dark",
                        textClassName
                    )}
                >
                    {text}
                </span>
            )}
        </div>
    );
}
