'use client';

import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Button } from '@lsm/ui/components/button/button';
import { Label } from '@lsm/ui/components/label/label';
import type { ScrollFocusOfferCardProps, ScrollFocusTier } from './scroll-focus-offer-card.types';

const RIBBON_CLASS: Record<ScrollFocusTier, string> = {
    full: 'w-full h-8 text-[15px] leading-none',
    medium: 'w-full h-7 text-[13px] leading-none',
    compact: 'w-full h-[22px] text-[11px] leading-none'
};

const SHORT_CTA_TEXT = 'CLAIM';
const SHORT_TERMS_TEXT = 'Terms and Conditions apply';

export function ScrollFocusOfferCard({
    offer,
    tier
}: ScrollFocusOfferCardProps): React.ReactElement {
    const innerRef = useRef<HTMLDivElement | null>(null);
    const [height, setHeight] = useState<number | null>(null);

    useEffect(() => {
        const node = innerRef.current;
        if (node === null) return;

        const observer = new ResizeObserver((entries) => {
            const entry = entries[0];
            if (entry !== undefined) setHeight(entry.contentRect.height);
        });
        observer.observe(node);

        return (): void => observer.disconnect();
    }, []);

    const details = offer.details ?? [];
    const detailLine = details.map((detail) => detail.text).join(' & ');

    const logo =
        offer.logoSrc !== undefined ? (
            <Image
                src={offer.logoSrc}
                alt={offer.logoAlt ?? 'Casino logo'}
                fill
                className="object-contain"
            />
        ) : (
            <div className="h-full w-full rounded bg-disabled-container" />
        );

    const cta = (className: string, text: string): React.ReactElement => (
        <a href={offer.ctaHref} target="_blank" rel="noopener noreferrer" className="block">
            <Button variant={offer.ctaVariant ?? 'primary'} className={className}>
                {text}
            </Button>
        </a>
    );

    const body = (): React.ReactElement => {
        if (tier === 'compact') {
            return (
                <div className="flex h-14 items-center gap-2 px-2">
                    <div className="relative h-9 w-16 shrink-0">{logo}</div>
                    <div className="min-w-0 flex-1">
                        <p className="truncate text-[15px] font-bold leading-[18px] text-on-surface-dark">
                            {offer.offerMain}
                        </p>
                        <p className="truncate text-[11px] leading-[14px] text-on-surface-dark">
                            {detailLine}
                        </p>
                    </div>
                    {cta(
                        'min-w-0! shrink-0 h-8 px-3! py-0! rounded-md! text-[12px]!',
                        SHORT_CTA_TEXT
                    )}
                </div>
            );
        }

        if (tier === 'medium') {
            return (
                <>
                    <div className="flex items-center gap-3 px-3 py-2">
                        <div className="relative h-14 w-[104px] shrink-0">{logo}</div>
                        <div className="min-w-0 flex-1">
                            <p className="text-[20px] font-bold leading-6 text-on-surface-dark">
                                {offer.offerMain}
                            </p>
                            <p className="mt-1 truncate text-[13px] leading-4 text-on-surface-dark">
                                {detailLine}
                            </p>
                        </div>
                    </div>
                    <div className="px-6 pb-2">
                        {cta(
                            'w-full min-w-0! px-4! py-2.5! text-[15px]!',
                            offer.ctaText ?? 'PLAY NOW'
                        )}
                    </div>
                </>
            );
        }

        return (
            <>
                <div className="flex items-center gap-3 px-3 py-3">
                    <div className="relative h-[68px] w-[120px] shrink-0">{logo}</div>
                    <div className="flex min-w-0 flex-1 flex-col gap-1">
                        <div className="border-b border-outline-variant pb-1">
                            <p className="text-[26px] font-bold leading-[30px] text-on-surface-dark">
                                {offer.offerMain}
                            </p>
                        </div>
                        {details.map((detail, index) => (
                            <div key={index} className="flex items-center gap-1">
                                <span className="flex size-5 shrink-0 items-center justify-center text-sm leading-5">
                                    {detail.emoji}
                                </span>
                                <span className="truncate text-sm leading-5 tracking-[0.5px] text-on-surface-dark">
                                    {detail.text}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="px-11 pb-2">
                    {cta('w-full min-w-0!', offer.ctaText ?? 'PLAY NOW')}
                </div>
            </>
        );
    };

    return (
        <div
            style={height === null ? undefined : { height }}
            className="w-full overflow-hidden rounded-lg bg-white transition-[height] duration-300 ease-out motion-reduce:transition-none"
        >
            <div ref={innerRef}>
                {offer.showLabel !== false && (
                    <Label variant="mobile" color={offer.labelColor} className={RIBBON_CLASS[tier]}>
                        {offer.label ?? 'HOT DEAL'}
                    </Label>
                )}

                {body()}

                <div className="px-2 pb-2">
                    <p className="text-[10px] leading-[13px] tracking-[0.4px] text-on-surface-dark">
                        {tier === 'full' ? offer.termsText ?? SHORT_TERMS_TEXT : SHORT_TERMS_TEXT}
                    </p>
                </div>
            </div>
        </div>
    );
}
