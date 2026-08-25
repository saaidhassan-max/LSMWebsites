'use client';

import type React from 'react';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { cn } from '../../lib/generic/cn';
import type { OfferCardTermsProps } from './offer-card-terms.types';

const TERMS_TEXT_CLASSES = 'text-[8px] leading-[9.6px] tracking-[0.4px] text-on-surface-dark';
const TOGGLE_CLASSES = 'font-bold underline';
const VISIBLE_LINES = 2;
const ELLIPSIS = '… ';
const MORE_LABEL = 'See More';

export function OfferCardTerms({ text }: OfferCardTermsProps): React.ReactElement {
    const measureRef = useRef<HTMLParagraphElement | null>(null);
    const [expanded, setExpanded] = useState(false);
    const [visibleText, setVisibleText] = useState<string | null>(null);

    const measure = useCallback((): void => {
        const node = measureRef.current;
        if (node === null || node.clientWidth === 0) return;

        const lineHeight = parseFloat(getComputedStyle(node).lineHeight);
        const maxHeight = lineHeight * VISIBLE_LINES + 1;

        const label = document.createElement('span');
        label.className = TOGGLE_CLASSES;
        label.textContent = MORE_LABEL;

        const fits = (candidate: string | null): boolean => {
            node.replaceChildren();
            if (candidate === null) {
                node.append(document.createTextNode(text));
            } else {
                node.append(document.createTextNode(candidate + ELLIPSIS), label);
            }
            return node.scrollHeight <= maxHeight;
        };

        if (fits(null)) {
            setVisibleText(null);
            return;
        }

        let low = 0;
        let high = text.length;
        while (low < high) {
            const middle = Math.ceil((low + high) / 2);
            if (fits(text.slice(0, middle).trimEnd())) low = middle;
            else high = middle - 1;
        }

        setVisibleText(text.slice(0, low).trimEnd());
    }, [text]);

    useLayoutEffect((): void => {
        if (!expanded) measure();
    }, [expanded, measure]);

    useEffect((): (() => void) | undefined => {
        const node = measureRef.current;
        if (node === null) return undefined;

        const observer = new ResizeObserver((): void => {
            if (!expanded) measure();
        });
        observer.observe(node);

        return (): void => observer.disconnect();
    }, [expanded, measure]);

    const truncated = visibleText !== null;

    return (
        <div className="relative flex flex-col gap-1 border-t border-outline-variant px-3 py-1">
            <p
                ref={measureRef}
                aria-hidden="true"
                className={cn(
                    TERMS_TEXT_CLASSES,
                    'pointer-events-none invisible absolute inset-x-3 top-0'
                )}
            />

            <p className={cn(TERMS_TEXT_CLASSES, expanded ? '' : 'line-clamp-2')}>
                {expanded || !truncated ? text : visibleText}
                {!expanded && truncated && (
                    <>
                        {ELLIPSIS}
                        <button
                            type="button"
                            onClick={(): void => setExpanded(true)}
                            className={TOGGLE_CLASSES}
                        >
                            {MORE_LABEL}
                        </button>
                    </>
                )}
            </p>

            {expanded && (
                <button
                    type="button"
                    onClick={(): void => setExpanded(false)}
                    className="w-full text-right text-[10px] font-bold leading-[14px] tracking-[0.4px] text-on-surface-dark"
                >
                    See Less
                </button>
            )}
        </div>
    );
}
