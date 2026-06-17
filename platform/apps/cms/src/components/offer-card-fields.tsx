'use client';

import type React from 'react';
import { useEffect, useState } from 'react';
import type { CmsLabelColor, CmsOffer } from '@/lib/cms-content.types';

interface OfferCardFieldsProps {
    offer: CmsOffer;
    onChange: (patch: Partial<CmsOffer>) => void;
}

const inputClass =
    'w-full rounded-md border border-m3-outline-variant bg-m3-surface-low px-3 py-2 text-[13px] text-m3-on-surface focus:outline-none focus:border-m3-gold';
const labelClass = 'flex flex-col gap-1.5 text-[12px] font-medium';

function toLines(value: string): string[] {
    return value
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean);
}

export function OfferCardFields({ offer, onChange }: OfferCardFieldsProps): React.ReactElement {
    const [detailsText, setDetailsText] = useState(offer.details.join('\n'));
    const [stepsText, setStepsText] = useState(offer.howToClaimSteps.join('\n'));

    useEffect(() => {
        setDetailsText(offer.details.join('\n'));
        setStepsText(offer.howToClaimSteps.join('\n'));
    }, [offer.id]);

    return (
        <div className="flex flex-col gap-3">
            <label className={labelClass}>
                Headline
                <input
                    value={offer.headline}
                    onChange={(e) => onChange({ headline: e.target.value })}
                    className={inputClass}
                />
            </label>
            <div className="grid grid-cols-2 gap-3">
                <label className={labelClass}>
                    Label
                    <input
                        value={offer.label}
                        onChange={(e) => onChange({ label: e.target.value })}
                        className={inputClass}
                    />
                </label>
                <label className={labelClass}>
                    Label colour
                    <select
                        value={offer.labelColor}
                        onChange={(e) => onChange({ labelColor: e.target.value as CmsLabelColor })}
                        className={inputClass}
                    >
                        <option value="blue">Blue</option>
                        <option value="red">Red</option>
                        <option value="orange">Orange</option>
                    </select>
                </label>
            </div>
            <label className={labelClass}>
                Detail bullets
                <span className="text-[11px] font-normal text-m3-on-surface-variant">One per line.</span>
                <textarea
                    value={detailsText}
                    onChange={(e) => {
                        setDetailsText(e.target.value);
                        onChange({ details: toLines(e.target.value) });
                    }}
                    rows={4}
                    className={inputClass + ' resize-y leading-5'}
                />
            </label>
            <label className={labelClass}>
                How to claim steps
                <span className="text-[11px] font-normal text-m3-on-surface-variant">
                    One step per line. Shown on this offer&apos;s how-to-claim page.
                </span>
                <textarea
                    value={stepsText}
                    onChange={(e) => {
                        setStepsText(e.target.value);
                        onChange({ howToClaimSteps: toLines(e.target.value) });
                    }}
                    rows={4}
                    className={inputClass + ' resize-y leading-5'}
                />
            </label>
            <label className={labelClass}>
                CTA link
                <input
                    value={offer.ctaHref}
                    onChange={(e) => onChange({ ctaHref: e.target.value })}
                    className={inputClass}
                />
            </label>
            <label className={labelClass}>
                Terms
                <textarea
                    value={offer.termsText}
                    onChange={(e) => onChange({ termsText: e.target.value })}
                    rows={6}
                    className={inputClass + ' resize-y leading-5'}
                />
            </label>
        </div>
    );
}
