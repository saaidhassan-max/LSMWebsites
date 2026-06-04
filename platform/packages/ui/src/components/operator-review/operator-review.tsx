import type React from 'react';
import { Check } from 'lucide-react';
import { Button } from '../button/button';
import type { OperatorReviewProps } from './operator-review.types';

export function OperatorReview({
    operatorName,
    trustBadges,
    features,
    ctaText,
    ctaHref,
}: OperatorReviewProps): React.ReactElement {
    return (
        <div className="w-full bg-surface-inverse-new p-4 md:py-16 md:px-0">
            <div className="w-full md:max-w-[1440px] md:mx-auto md:px-16 flex flex-col gap-4 md:flex-row md:items-start md:gap-8">

                <div className="flex flex-col gap-4 md:flex-1 md:gap-6">
                    <h2 className="text-[45px] font-bold leading-[52px] tracking-[0px] text-on-surface-dark md:text-[57px] md:leading-[64px] md:tracking-[-0.25px] md:text-primary">
                        {operatorName}
                    </h2>
                    <div className="flex flex-row flex-wrap gap-2 md:gap-4">
                        {trustBadges.map((badge) => (
                            <span
                                key={badge}
                                className="rounded-full bg-surface-container-low px-4 py-4 text-[14px] font-medium leading-[20px] tracking-[0.25px] text-primary"
                            >
                                {badge}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-2 md:flex-1 md:gap-6">
                    {features.map((feature) => (
                        <div key={feature} className="flex flex-row items-center gap-4">
                            <div className="w-7 h-7 shrink-0 rounded-full bg-tertiary p-0.5 flex items-center justify-center">
                                <Check size={24} className="text-on-surface-dark" strokeWidth={2} />
                            </div>
                            <span className="text-[14px] font-medium leading-[20px] tracking-[0.25px] text-on-surface-dark md:text-[16px] md:leading-[24px] md:tracking-[0.5px] md:text-primary">
                                {feature}
                            </span>
                        </div>
                    ))}
                </div>

                <a href={ctaHref} className="w-full md:w-auto md:shrink-0">
                    <Button variant="tertiary" className="w-full md:w-auto text-on-surface-dark">
                        {ctaText}
                    </Button>
                </a>

            </div>
        </div>
    );
}
