'use client';

import type React from 'react';
import Image from 'next/image';
import { Button } from '@lsm/ui/components/button/button';
import type { ScrollFlowOfferCardProps } from './scroll-flow-offer-card.types';

const SHORT_TERMS_TEXT = 'Terms and Conditions apply';
const LABEL_COLOR_CLASS = {
    blue: 'bg-secondary',
    red: 'bg-accent-red',
    orange: 'bg-accent-orange'
};

const clamp = (value: number, min: number, max: number): number =>
    Math.max(min, Math.min(max, value));

const lerp = (from: number, to: number, progress: number): number =>
    from + (to - from) * progress;

export function ScrollFlowOfferCard({
    offer,
    progress
}: ScrollFlowOfferCardProps): React.ReactElement {
    const p = clamp(progress, 0, 1);
    const details = offer.details ?? [];
    const detailLine = details.map((detail) => detail.text).join(' & ');
    const expandedDetailsOpacity = clamp((p - 0.46) / 0.34, 0, 1);
    const compactDetailsOpacity = 1 - clamp((p - 0.16) / 0.28, 0, 1);
    const termsOpacity = clamp((p - 0.62) / 0.28, 0, 1);
    const height = lerp(98, 286, p);
    const logoWidth = lerp(64, 120, p);
    const logoHeight = lerp(36, 68, p);
    const headlineSize = lerp(15, 26, p);
    const headlineLineHeight = lerp(18, 30, p);
    const ribbonHeight = lerp(22, 32, p);
    const ribbonTextSize = lerp(11, 15, p);
    const bodyPaddingX = lerp(8, 12, p);
    const bodyPaddingY = lerp(8, 12, p);
    const ctaInset = lerp(8, 44, p);
    const ctaHeight = lerp(32, 48, p);
    const ctaText = p < 0.34 ? 'CLAIM' : offer.ctaText ?? 'PLAY NOW';

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

    return (
        <div
            style={{ height }}
            className="w-full overflow-hidden rounded-lg bg-white transition-[height] duration-75 ease-linear"
        >
            {offer.showLabel !== false && (
                <div
                    style={{ height: ribbonHeight, fontSize: ribbonTextSize }}
                    className={[
                        'flex w-full items-center justify-center rounded-t-lg',
                        'font-bold leading-none text-on-surface-light',
                        LABEL_COLOR_CLASS[offer.labelColor ?? 'blue']
                    ].join(' ')}
                >
                    {offer.label ?? 'HOT DEAL'}
                </div>
            )}

            <div
                className="flex items-center gap-3"
                style={{ padding: `${bodyPaddingY}px ${bodyPaddingX}px` }}
            >
                <div
                    className="relative shrink-0"
                    style={{ width: logoWidth, height: logoHeight }}
                >
                    {logo}
                </div>

                <div className="min-w-0 flex-1">
                    <div
                        className="border-outline-variant"
                        style={{
                            borderBottomWidth: p > 0.58 ? 1 : 0,
                            paddingBottom: lerp(0, 4, p)
                        }}
                    >
                        <p
                            className="font-bold text-on-surface-dark"
                            style={{
                                fontSize: headlineSize,
                                lineHeight: `${headlineLineHeight}px`
                            }}
                        >
                            {offer.offerMain}
                        </p>
                    </div>

                    <p
                        className="truncate text-[11px] leading-[14px] text-on-surface-dark"
                        style={{
                            opacity: compactDetailsOpacity,
                            height: compactDetailsOpacity > 0 ? 16 : 0
                        }}
                    >
                        {detailLine}
                    </p>

                    <div
                        className="flex flex-col gap-1 overflow-hidden"
                        style={{
                            opacity: expandedDetailsOpacity,
                            height: lerp(0, details.length * 24, expandedDetailsOpacity)
                        }}
                    >
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
            </div>

            <div style={{ padding: `0 ${ctaInset}px 8px` }}>
                <a href={offer.ctaHref} target="_blank" rel="noopener noreferrer" className="block">
                    <Button
                        variant={offer.ctaVariant ?? 'primary'}
                        className="w-full min-w-0! px-3! py-0!"
                        style={{ minHeight: ctaHeight }}
                    >
                        {ctaText}
                    </Button>
                </a>
            </div>

            <div className="px-2 pb-2" style={{ opacity: termsOpacity }}>
                <p className="text-[10px] leading-[13px] tracking-[0.4px] text-on-surface-dark">
                    {p > 0.7 ? offer.termsText ?? SHORT_TERMS_TEXT : SHORT_TERMS_TEXT}
                </p>
            </div>
        </div>
    );
}
