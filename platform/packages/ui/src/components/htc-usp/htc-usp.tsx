import type React from 'react';
import Image from 'next/image';
import type { HtcUspProps } from './htc-usp.types';

const GRADIENT_BG = {
    background: 'linear-gradient(to bottom, #001F3F 0%, #011463 50%, #001F3F 100%)'
} as const;

const pillBase = 'bg-surface-container-low text-on-surface-dark rounded-full px-6 font-medium whitespace-nowrap';

export function HtcUsp({ logoSrc, logoAlt, headline, badges }: HtcUspProps): React.ReactElement {
    return (
        <section style={GRADIENT_BG} className="w-full">
            <div className="md:hidden w-full px-4 py-8 flex flex-col items-center gap-4">
                <Image src={logoSrc} alt={logoAlt} width={144} height={77} className="object-contain" />
                <p className="w-full text-center text-[45px] font-bold leading-[52px] text-on-surface-light">
                    {headline}
                </p>
                <div className="flex flex-row justify-center items-center gap-2 flex-wrap">
                    {badges.map(badge => (
                        <span key={badge} className={`${pillBase} py-4 text-sm leading-5 tracking-[0.25px]`}>
                            {badge}
                        </span>
                    ))}
                </div>
            </div>

            <div className="hidden md:flex w-full px-16 py-8">
                <div className="w-full max-w-[1440px] mx-auto flex flex-row justify-between items-center">
                    <div className="flex flex-col gap-2.5">
                        <Image src={logoSrc} alt={logoAlt} width={144} height={77} className="object-contain" />
                        <p className="text-[45px] font-bold leading-[52px] text-on-surface-light">
                            {headline}
                        </p>
                    </div>
                    <div className="flex flex-col items-end gap-5">
                        {badges.map(badge => (
                            <span key={badge} className={`${pillBase} py-5 text-[22px] leading-7`}>
                                {badge}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
