'use client';

import type React from 'react';
import { useLayoutEffect, useRef, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@lsm/ui/components/button/button';
import { OfferCard } from '@lsm/ui/components/offer-card/offer-card';
import { ScrollFocusOfferCard } from './scroll-focus-offer-card';
import type { ScrollFocusTier } from './scroll-focus-offer-card.types';
import type { ScrollArrowOfferListProps } from './scroll-arrow-offer-list.types';

const CARD_TOP_OFFSET = 88;
const SCROLL_FOLLOW_MS = 620;
const SCROLL_EASING = 0.24;
const ARROW_CLASS =
    'min-w-0! size-14 shrink-0 rounded-full! p-0! shadow-lg disabled:opacity-40 disabled:pointer-events-none';

const tierFor = (distance: number): ScrollFocusTier =>
    distance === 0 ? 'full' : distance === 1 ? 'medium' : 'compact';

export function ScrollArrowOfferList({ offers }: ScrollArrowOfferListProps): React.ReactElement {
    const [focusIndex, setFocusIndex] = useState(0);
    const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
    const hasSteppedRef = useRef(false);

    useLayoutEffect((): (() => void) => {
        if (!hasSteppedRef.current) return () => undefined;

        let raf = 0;
        const until = performance.now() + SCROLL_FOLLOW_MS;

        const follow = (): void => {
            const node = itemRefs.current[focusIndex];
            if (node !== null && node !== undefined) {
                const current = window.scrollY;
                const target = Math.max(0, current + node.getBoundingClientRect().top - CARD_TOP_OFFSET);
                window.scrollTo(0, current + (target - current) * SCROLL_EASING);
            }
            raf = performance.now() < until ? window.requestAnimationFrame(follow) : 0;
        };

        raf = window.requestAnimationFrame(follow);

        return (): void => {
            if (raf !== 0) window.cancelAnimationFrame(raf);
        };
    }, [focusIndex]);

    const step = (delta: number): void => {
        hasSteppedRef.current = true;
        setFocusIndex((current) => Math.min(offers.length - 1, Math.max(0, current + delta)));
    };

    return (
        <div className="w-full max-w-[1440px] mx-auto p-4 md:px-16 md:py-4">
            <div className="flex flex-col gap-2 pb-24 md:hidden">
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

            <div className="fixed bottom-6 right-4 z-40 flex flex-col gap-3 md:hidden">
                <Button
                    variant="tertiary"
                    className={ARROW_CLASS}
                    aria-label="Previous offer"
                    disabled={focusIndex === 0}
                    onClick={() => step(-1)}
                >
                    <ChevronUp className="size-7" aria-hidden />
                </Button>
                <Button
                    variant="tertiary"
                    className={ARROW_CLASS}
                    aria-label="Next offer"
                    disabled={focusIndex === offers.length - 1}
                    onClick={() => step(1)}
                >
                    <ChevronDown className="size-7" aria-hidden />
                </Button>
            </div>

            <div className="hidden md:flex md:flex-col md:gap-2">
                {offers.map((offer, index) => (
                    <OfferCard key={index} {...offer} />
                ))}
            </div>
        </div>
    );
}
