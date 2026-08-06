'use client';

import type React from 'react';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { OfferCard } from '@lsm/ui/components/offer-card/offer-card';
import { ScrollFocusOfferCard } from './scroll-focus-offer-card';
import type { ScrollFocusDirection, ScrollFocusTier } from './scroll-focus-offer-card.types';
import type { ScrollFocusOfferListProps } from './scroll-focus-offer-list.types';

const FOCUS_ANCHOR_RATIO = 0.38;
const FOCUS_SWITCH_MARGIN = 56;
const DIRECTION_SWITCH_MARGIN = 12;
const LAYOUT_TRANSITION_MS = 360;
const SCROLL_IDLE_MS = 70;

const tierFor = (
    index: number,
    focusIndex: number,
    scrollDirection: ScrollFocusDirection
): ScrollFocusTier => {
    const distance = Math.abs(index - focusIndex);
    if (distance === 0) return 'full';
    if (distance === 1) return 'medium';
    if (scrollDirection === 'down' && index === focusIndex + 2) return 'medium';
    if (scrollDirection === 'up' && index === focusIndex - 2) return 'medium';
    return 'compact';
};

export function ScrollFocusOfferList({ offers }: ScrollFocusOfferListProps): React.ReactElement {
    const [focusIndex, setFocusIndex] = useState(0);
    const [scrollDirection, setScrollDirection] = useState<ScrollFocusDirection>('down');
    const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
    const focusRef = useRef(0);
    const lastScrollYRef = useRef(0);
    const directionRef = useRef<ScrollFocusDirection>('down');
    const pendingDirectionRef = useRef<ScrollFocusDirection>('down');
    const previousTopsRef = useRef<number[] | null>(null);
    const layoutAnimationFrameRef = useRef(0);
    const scrollIdleTimerRef = useRef(0);

    const captureTops = (): void => {
        previousTopsRef.current = itemRefs.current.map((node) =>
            node === null ? Number.NaN : node.getBoundingClientRect().top
        );
    };

    useLayoutEffect((): void => {
        const previousTops = previousTopsRef.current;
        if (previousTops === null) return;
        previousTopsRef.current = null;

        if (layoutAnimationFrameRef.current !== 0) {
            window.cancelAnimationFrame(layoutAnimationFrameRef.current);
            layoutAnimationFrameRef.current = 0;
        }

        itemRefs.current.forEach((node, index) => {
            if (node === null) return;
            const previousTop = previousTops[index];
            if (!Number.isFinite(previousTop)) return;
            const nextTop = node.getBoundingClientRect().top;
            const delta = previousTop - nextTop;
            if (Math.abs(delta) < 1) return;

            node.style.transition = 'none';
            node.style.transform = `translateY(${delta}px)`;
            node.style.willChange = 'transform';
        });

        layoutAnimationFrameRef.current = window.requestAnimationFrame((): void => {
            itemRefs.current.forEach((node) => {
                if (node === null) return;
                node.style.transition = `transform ${LAYOUT_TRANSITION_MS}ms cubic-bezier(0.4,0,0.2,1)`;
                node.style.transform = 'translateY(0)';
            });
            layoutAnimationFrameRef.current = 0;
        });
    }, [focusIndex, scrollDirection]);

    useEffect(() => {
        const settleFocus = (): void => {
            const anchor = window.innerHeight * FOCUS_ANCHOR_RATIO;
            let best = 0;
            let bestDistance = Number.POSITIVE_INFINITY;
            let currentDistance = Number.POSITIVE_INFINITY;

            itemRefs.current.forEach((node, index) => {
                if (node === null) return;
                const rect = node.getBoundingClientRect();
                if (rect.height === 0) return;
                const distance = Math.abs(rect.top + rect.height / 2 - anchor);
                if (index === focusRef.current) currentDistance = distance;
                if (distance < bestDistance) {
                    bestDistance = distance;
                    best = index;
                }
            });

            const shouldChangeFocus =
                best !== focusRef.current && bestDistance + FOCUS_SWITCH_MARGIN <= currentDistance;
            const shouldChangeDirection = pendingDirectionRef.current !== directionRef.current;
            if (!shouldChangeFocus && !shouldChangeDirection) return;

            captureTops();

            if (shouldChangeDirection) {
                directionRef.current = pendingDirectionRef.current;
                setScrollDirection(pendingDirectionRef.current);
            }

            if (shouldChangeFocus) {
                focusRef.current = best;
                setFocusIndex(best);
            }
        };

        const kick = (): void => {
            const nextScrollY = window.scrollY;
            const scrollDelta = nextScrollY - lastScrollYRef.current;
            lastScrollYRef.current = nextScrollY;

            if (Math.abs(scrollDelta) >= DIRECTION_SWITCH_MARGIN) {
                pendingDirectionRef.current = scrollDelta < 0 ? 'up' : 'down';
            }

            if (scrollIdleTimerRef.current !== 0) {
                window.clearTimeout(scrollIdleTimerRef.current);
            }

            scrollIdleTimerRef.current = window.setTimeout((): void => {
                scrollIdleTimerRef.current = 0;
                settleFocus();
            }, SCROLL_IDLE_MS);
        };

        lastScrollYRef.current = window.scrollY;
        window.addEventListener('scroll', kick, { passive: true });
        window.addEventListener('resize', kick, { passive: true });

        return (): void => {
            window.removeEventListener('scroll', kick);
            window.removeEventListener('resize', kick);
            if (scrollIdleTimerRef.current !== 0) {
                window.clearTimeout(scrollIdleTimerRef.current);
            }
            if (layoutAnimationFrameRef.current !== 0) {
                window.cancelAnimationFrame(layoutAnimationFrameRef.current);
            }
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
                            tier={tierFor(index, focusIndex, scrollDirection)}
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
