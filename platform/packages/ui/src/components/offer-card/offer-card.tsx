import type React from 'react';
import Image from 'next/image';
import { cn } from '../../lib/generic/cn';
import { Button } from '../button/button';
import type { ButtonSize } from '../button/button.types';
import { Label } from '../label/label';
import { OfferCardTerms } from '../offer-card-terms/offer-card-terms';
import type { OfferCardProps } from './offer-card.types';

const buttonWidthClass = (size: ButtonSize): string =>
    size === 'small' ? 'w-full min-w-0! px-3!' : 'w-full';

export function OfferCard({
    label = 'HOT DEAL',
    labelColor,
    showLabel = true,
    logoSrc,
    logoAlt = 'Casino logo',
    offerMain,
    details = [
        { emoji: '💸', text: 'No Deposit' },
        { emoji: '✅', text: 'No Wagering' }
    ],
    ctaText = 'Play ➜',
    ctaHref,
    ctaVariant = 'primary',
    secondaryCtaText,
    secondaryCtaHref,
    termsText
}: OfferCardProps): React.ReactElement {
    const logoImg = (className: string): React.ReactElement =>
        logoSrc !== undefined ? (
            <Image src={logoSrc} alt={logoAlt} fill className={className} />
        ) : (
            <div className="w-full h-full bg-disabled-container rounded" />
        );

    const detailLine = details.map((detail) => detail.text).join(' & ');

    const ctaButton = (size: ButtonSize): React.ReactElement => (
        <a href={ctaHref} target="_blank" rel="noopener noreferrer" className="block">
            <Button variant={ctaVariant} size={size} className={buttonWidthClass(size)}>
                {ctaText}
            </Button>
        </a>
    );

    const secondaryCta = (size: ButtonSize): React.ReactElement | null =>
        secondaryCtaText !== undefined && secondaryCtaHref !== undefined ? (
            <a href={secondaryCtaHref} target="_blank" rel="noopener noreferrer" className="block">
                <Button
                    variant="text"
                    color="light"
                    size={size}
                    className={cn(buttonWidthClass(size), 'underline')}
                >
                    {secondaryCtaText}
                </Button>
            </a>
        ) : null;

    return (
        <div className="w-full rounded-lg overflow-hidden bg-white">
            <div className="md:hidden">
                {showLabel && (
                    <Label variant="mobile" color={labelColor} className="w-full h-6">
                        {label}
                    </Label>
                )}

                <div className="grid grid-cols-[1fr_1.5fr] gap-4 px-3 pb-3">
                    <div className="flex h-full items-center justify-center">
                        <div className="relative h-[75px] w-full">{logoImg('object-contain')}</div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <div className="flex flex-col">
                            <div className="py-2 border-b border-outline-variant">
                                <p className="text-xl font-bold leading-7 tracking-[0] text-on-surface-dark">
                                    {offerMain}
                                </p>
                            </div>
                            <div className="py-1">
                                <p className="text-sm font-bold leading-5 tracking-[0.1px] text-on-surface-dark">
                                    {detailLine}
                                </p>
                            </div>
                        </div>

                        {ctaButton('small')}
                        {secondaryCta('small')}
                    </div>
                </div>

                {termsText !== undefined && <OfferCardTerms text={termsText} />}
            </div>

            <div className="hidden md:block">
                {showLabel && (
                    <Label variant="desktop" color={labelColor} className="w-[280px]">
                        {label}
                    </Label>
                )}

                <div className="flex items-center px-5 py-6 gap-4">
                    <div className="relative w-[224px] h-[120px] flex items-center justify-center shrink-0">
                        {logoImg('object-contain')}
                    </div>

                    <div className="flex-1 flex items-center px-3 gap-2">
                        <div className="flex-1">
                            <p className="text-[45px] font-bold leading-[52px] tracking-[0] text-on-surface-dark">
                                {offerMain}
                            </p>
                        </div>
                        <div className="w-px self-stretch shrink-0 rounded-full bg-outline-variant" />
                        <div className="flex-1 flex flex-col gap-3">
                            {details.map((detail, i) => (
                                <div key={i} className="flex items-center gap-1">
                                    <div className="w-10 h-10 flex items-center justify-center shrink-0 text-[24px] leading-[32px]">
                                        {detail.emoji}
                                    </div>
                                    <span className="text-[24px] leading-[32px] tracking-[0] text-on-surface-dark">
                                        {detail.text}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="w-64 shrink-0 flex flex-col gap-2">
                        {ctaButton('big')}
                        {secondaryCta('big')}
                    </div>
                </div>

                {termsText !== undefined && (
                    <div className="p-2 border border-outline-variant">
                        <p className="text-[11px] leading-[13px] tracking-[0.4px] text-on-surface-dark">
                            {termsText}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
