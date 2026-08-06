'use client';

import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import { OfferCard } from '@lsm/ui/components/offer-card/offer-card';
import { ScrollFocusOfferCard } from './scroll-focus-offer-card';
import type { ScrollFocusTier } from './scroll-focus-offer-card.types';
import type { ScrollFocusOfferListProps } from './scroll-focus-offer-list.types';

const FOCUS_ANCHOR_RATIO = 0.38;
const SETTLE_MS = 1100;
const FOCUS_LOCK_MS = 400;
const TRANSITION_MS = 900;

const tierFor = (distance: number): ScrollFocusTier =>
    distance === 0 ? 'full' : distance === 1 ? 'medium' : 'compact';

export function ScrollFocusOfferList({ offers }: ScrollFocusOfferListProps): React.ReactElement {
    const [focusIndex, setFocusIndex] = useState(0);
    const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
    const focusRef = useRef(0);
    const lastChangeRef = useRef(0);

    useEffect(() => {
        let raf = 0;
        let settleUntil = 0;

        const measure = (): void => {
            const anchor = window.innerHeight * FOCUS_ANCHOR_RATIO;
            let best = 0;
            let bestDistance = Number.POSITIVE_INFINITY;

            itemRefs.current.forEach((node, index) => {
                if (node === null) return;
                const rect = node.getBoundingClientRect();
                if (rect.height === 0) return;
                const distance = Math.abs(rect.top + rect.height / 2 - anchor);
                if (distance < bestDistance) {
                    bestDistance = distance;
                    best = index;
                }
            });

            const now = performance.now();
            if (best === focusRef.current) return;
            if (now - lastChangeRef.current < FOCUS_LOCK_MS) return;

            focusRef.current = best;
            lastChangeRef.current = now;
            settleUntil = Math.max(settleUntil, now + TRANSITION_MS);
            setFocusIndex(best);
        };

        const loop = (): void => {
            measure();
            raf = performance.now() < settleUntil ? window.requestAnimationFrame(loop) : 0;
        };

        const kick = (): void => {
            settleUntil = performance.now() + SETTLE_MS;
            if (raf === 0) raf = window.requestAnimationFrame(loop);
        };

        kick();
        window.addEventListener('scroll', kick, { passive: true });
        window.addEventListener('resize', kick, { passive: true });

        return (): void => {
            window.removeEventListener('scroll', kick);
            window.removeEventListener('resize', kick);
            if (raf !== 0) window.cancelAnimationFrame(raf);
        };
    }, []);

    return (
        <div className="w-full max-w-[1440px] mx-auto p-4 md:px-16 md:py-4">
            <div className="flex flex-col gap-2 md:hidden">
                {offers.map((offer, index) => (
                    <div
                        key={index}
                        ref={(node) => {
                            itemRefs.current[index] = node;
                        }}
                    >
                        <ScrollFocusOfferCard
                            offer={offer}
                            tier={tierFor(Math.abs(index - focusIndex))}
                        />
                    </div>
                ))}
            </div>

            <div className="hidden md:flex md:flex-col md:gap-2">
                {offers.map((offer, index) => (
                    <OfferCard key={index} {...offer} />
                ))}
            </div>
        </div>
    );
}
