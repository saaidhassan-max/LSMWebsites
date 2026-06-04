import type React from 'react';
import Image from 'next/image';
import { Check, ArrowRight } from 'lucide-react';
import { Button } from '../button/button';
import { GoodChoiceLabel } from '../good-choice-label/good-choice-label';
import type { OntarioOfferCardProps } from './ontario-offer-card.types';
import { cn } from '../../lib/generic/cn';

const cardBodyBg: Record<NonNullable<OntarioOfferCardProps['variant']>, string> = {
    primary: 'bg-tertiary',
    secondary: 'bg-surface-container-low'
};

export function OntarioOfferCard({
    variant = 'primary',
    logoSrc,
    logoAlt = 'Casino logo',
    offerHeadline,
    usps,
    ctaHref,
    learnMoreHref,
    disclaimerText
}: OntarioOfferCardProps): React.ReactElement {
    const logoImage = (
        <div className="relative w-[224px] h-[112px]">
            {logoSrc !== undefined ? (
                <Image src={logoSrc} alt={logoAlt} fill className="object-contain" />
            ) : (
                <div className="w-full h-full bg-disabled-container rounded" />
            )}
        </div>
    );

    const playNowButton = (
        <a
            href={ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full"
        >
            <Button
                variant="primary"
                trailingIcon={<ArrowRight size={24} />}
                className="w-full"
            >
                PLAY NOW
            </Button>
        </a>
    );

    const learnMoreButton = learnMoreHref !== undefined ? (
        <a
            href={learnMoreHref}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full"
        >
            <Button variant="text" color="light" className="w-full underline">
                Learn More
            </Button>
        </a>
    ) : null;

    return (
        <div className={cn('w-full rounded overflow-hidden', cardBodyBg[variant])}>
            <div className="md:hidden">
                {variant === 'primary' && <GoodChoiceLabel />}

                <div className="px-4 flex flex-col gap-2">
                    <div className="py-[2px] flex items-center justify-center">
                        {logoImage}
                    </div>

                    <div className="flex flex-col gap-0">
                        {usps.map((usp, i) => (
                            <div key={i} className="flex items-start gap-2 min-h-5">
                                <Check size={18} className="text-on-surface-dark shrink-0 mt-[1px]" />
                                <span className="text-sm font-normal leading-5 text-on-surface-dark">
                                    {usp}
                                </span>
                            </div>
                        ))}
                    </div>

                    <p className="text-2xl font-bold leading-7 text-on-surface-dark text-center tracking-[-0.019em]">
                        {offerHeadline}
                    </p>

                    <div className="flex flex-col gap-1">
                        {playNowButton}
                        {learnMoreButton}
                        {disclaimerText !== undefined && (
                            <div className="border-t border-outline py-2 flex items-center">
                                <p className="text-[11px] leading-[13px] text-on-surface-dark">
                                    {disclaimerText}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="hidden md:flex md:flex-col">
                <div className="flex">
                    <div className="flex flex-col w-[288px] shrink-0">
                        {variant === 'primary' && <GoodChoiceLabel />}
                        <div className="flex-1 flex items-center justify-center px-8 py-4">
                            {logoImage}
                        </div>
                    </div>

                    <div className="flex-1 flex items-start px-4 py-4 gap-1 flex-col justify-center border-l border-outline">
                        {usps.map((usp, i) => (
                            <div key={i} className="flex items-start gap-2 w-full">
                                <Check size={24} className="text-on-surface-dark shrink-0 mt-[1px]" />
                                <span className="text-sm font-normal leading-5 text-on-surface-dark">
                                    {usp}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="flex-1 flex items-center justify-center px-4 py-4 border-l border-outline">
                        <p className="text-[36px] font-bold leading-[44px] text-primary text-center">
                            {offerHeadline}
                        </p>
                    </div>

                    <div className="flex-1 flex flex-col items-center justify-center px-4 py-4 gap-2 border-l border-outline">
                        {playNowButton}
                        {learnMoreButton}
                    </div>
                </div>

                {disclaimerText !== undefined && (
                    <div className="flex items-center px-4 py-2 border-t border-outline">
                        <p className="text-[11px] leading-[13px] text-on-surface-dark">
                            {disclaimerText}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
