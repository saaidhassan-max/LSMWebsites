'use client';

import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import { OfferCard } from '@lsm/ui/components/offer-card/offer-card';
import { ScrollFlowOfferCard } from './scroll-flow-offer-card';
import type { ScrollFlowOfferListProps } from './scroll-flow-offer-list.types';

const FOCUS_ANCHOR_RATIO = 0.38;
const FULL_DISTANCE_PX = 72;
const FLOW_DISTANCE_PX = 390;

const clamp = (value: number, min: number, max: number): number =>
    Math.max(min, Math.min(max, value));

const smoothstep = (value: number): number => value * value * (3 - 2 * value);

const progressForDistance = (distance: number): number => {
    const raw = 1 - (distance - FULL_DISTANCE_PX) / FLOW_DISTANCE_PX;
    return smoothstep(clamp(raw, 0, 1));
};

export function ScrollFlowOfferList({ offers }: ScrollFlowOfferListProps): React.ReactElement {
    const [progresses, setProgresses] = useState<number[]>(() =>
        offers.map((_, index) => (index === 0 ? 1 : 0))
    );
    const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
    const rafRef = useRef(0);

    useEffect((): (() => void) => {
        const measure = (): void => {
            const anchor = window.innerHeight * FOCUS_ANCHOR_RATIO;
            const nextProgresses = itemRefs.current.map((node) => {
                if (node === null) return 0;
                const rect = node.getBoundingClientRect();
                if (rect.height === 0) return 0;
                const distance = Math.abs(rect.top + rect.height / 2 - anchor);
                return progressForDistance(distance);
            });

            setProgresses((current) => {
                const changed = nextProgresses.some((progress, index) =>
                    Math.abs(progress - (current[index] ?? 0)) > 0.012
                );
                return changed ? nextProgresses : current;
            });
            rafRef.current = 0;
        };

        const scheduleMeasure = (): void => {
            if (rafRef.current !== 0) return;
            rafRef.current = window.requestAnimationFrame(measure);
        };

        scheduleMeasure();
        window.addEventListener('scroll', scheduleMeasure, { passive: true });
        window.addEventListener('resize', scheduleMeasure, { passive: true });

        return (): void => {
            window.removeEventListener('scroll', scheduleMeasure);
            window.removeEventListener('resize', scheduleMeasure);
            if (rafRef.current !== 0) window.cancelAnimationFrame(rafRef.current);
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
                        <ScrollFlowOfferCard offer={offer} progress={progresses[index] ?? 0} />
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
