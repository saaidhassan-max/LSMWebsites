'use client';

import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import { cn } from '../../lib/generic/cn';
import type { OfferCardTermsProps } from './offer-card-terms.types';

export function OfferCardTerms({ text }: OfferCardTermsProps): React.ReactElement {
    const textRef = useRef<HTMLParagraphElement | null>(null);
    const [expanded, setExpanded] = useState(false);
    const [truncated, setTruncated] = useState(false);

    useEffect((): (() => void) | undefined => {
        const node = textRef.current;
        if (node === null || expanded) return undefined;

        const measure = (): void => setTruncated(node.scrollHeight > node.clientHeight + 1);
        measure();

        const observer = new ResizeObserver(measure);
        observer.observe(node);

        return (): void => observer.disconnect();
    }, [text, expanded]);

    return (
        <div className="flex flex-col gap-1 border-t border-outline-variant px-3 py-1">
            <p
                ref={textRef}
                className={cn(
                    'text-[8px] leading-[9.6px] tracking-[0.4px] text-on-surface-dark',
                    expanded ? '' : 'line-clamp-2'
                )}
            >
                {text}
            </p>
            {(expanded || truncated) && (
                <button
                    type="button"
                    onClick={(): void => setExpanded(!expanded)}
                    className="w-full text-right text-[10px] font-bold leading-[14px] tracking-[0.4px] text-on-surface-dark"
                >
                    {expanded ? 'See Less' : 'See More'}
                </button>
            )}
        </div>
    );
}
