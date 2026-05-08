import React from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { Button } from '../button/button';
import { Label } from '../label/label';
import type { OfferCardProps } from './offer-card.types';

export function OfferCard({
    label = 'HOT DEAL',
    logoSrc,
    logoAlt = 'Casino logo',
    offerMain,
    details = ['No Deposit', 'No Wagering'],
    ctaText = 'PLAY NOW',
    ctaHref,
    secondaryCtaText,
    secondaryCtaHref,
    termsText
}: OfferCardProps): React.ReactElement {
    const logoImg = (className: string) =>
        logoSrc ? (
            <img src={logoSrc} alt={logoAlt} className={className} />
        ) : (
            <div className="w-full h-full bg-disabled-container rounded" />
        );

    const ctaButton = (
        <a href={ctaHref} target="_blank" rel="noopener noreferrer" className="block">
            <Button variant="primary" trailingIcon={<ArrowRight size={24} />} className="w-full">
                {ctaText}
            </Button>
        </a>
    );

    const secondaryCta =
        secondaryCtaText && secondaryCtaHref ? (
            <a
                href={secondaryCtaHref}
                className={[
                    'inline-flex w-full items-center justify-center gap-2',
                    'rounded-lg px-6 py-2',
                    'text-base font-bold leading-6 text-primary-text underline',
                    'transition-colors duration-150',
                    'hover:text-primary-text focus:text-primary-text focus:outline-none'
                ].join(' ')}
            >
                {secondaryCtaText}
            </a>
        ) : null;

    return (
        <div className="w-full rounded-lg overflow-hidden bg-white">
            <div className="md:hidden">
                <Label variant="mobile" className="w-full">
                    {label}
                </Label>

                <div className="grid grid-cols-[144px_1fr] gap-4 p-2 items-center">
                    <div className="col-start-1 row-start-1 flex h-[72px] items-center justify-center">
                        {logoImg('h-full w-auto max-w-full object-contain')}
                    </div>

                    <div className="col-start-2 row-start-1 flex flex-col gap-1">
                        <div className="py-2">
                            <p className="text-[28px] font-bold leading-[36px] tracking-[0] text-on-surface-dark">
                                {offerMain}
                            </p>
                        </div>
                        {details.map((detail, i) => (
                            <div key={i} className="flex items-center gap-1">
                                <Check size={20} className="text-primary-focused shrink-0" />
                                <span className="text-base leading-6 tracking-[0.5px] text-on-surface-dark">
                                    {detail}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="px-2 py-3 flex flex-col gap-1">
                    {ctaButton}
                    {secondaryCta}
                </div>

                {termsText && (
                    <div className="p-2">
                        <p className="text-[11px] leading-[13px] tracking-[0.4px] text-on-surface-dark">
                            {termsText}
                        </p>
                    </div>
                )}
            </div>

            <div className="hidden md:block">
                <Label variant="desktop" className="w-[280px]">
                    {label}
                </Label>

                <div className="flex items-center px-5 py-6 gap-4">
                    <div className="w-[224px] h-[112px] flex items-center justify-center shrink-0">
                        {logoImg('h-full w-auto max-w-full object-contain')}
                    </div>

                    <div className="flex-1 flex items-center px-3 gap-1">
                        <div className="flex-1">
                            <p className="text-[45px] font-bold leading-[52px] tracking-[0] text-on-surface-dark">
                                {offerMain}
                            </p>
                        </div>
                        <div className="flex-1 flex flex-col gap-3">
                            {details.map((detail, i) => (
                                <div key={i} className="flex items-center gap-1">
                                    <div className="w-10 h-10 flex items-center justify-center shrink-0">
                                        <Check size={32} className="text-primary-focused" />
                                    </div>
                                    <span className="text-[24px] leading-[32px] tracking-[0] text-on-surface-dark">
                                        {detail}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="w-64 shrink-0 flex flex-col gap-2">
                        {ctaButton}
                        {secondaryCta}
                    </div>
                </div>

                {termsText && (
                    <div className="p-2 border-t border-outline-variant">
                        <p className="text-[11px] leading-[13px] tracking-[0.4px] text-on-surface-dark">
                            {termsText}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
