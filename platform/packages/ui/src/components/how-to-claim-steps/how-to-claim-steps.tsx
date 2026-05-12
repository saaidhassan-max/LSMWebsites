import type React from 'react';
import Image from 'next/image';
import { Button } from '../button/button';
import type { HowToClaimStepsProps } from './how-to-claim-steps.types';

export function HowToClaimSteps({
    heading = 'How to claim',
    steps,
    termsText,
    imageSrc,
    imageAlt,
    ctaText,
    ctaHref
}: HowToClaimStepsProps): React.ReactElement {
    return (
        <section className="w-full bg-surface-container px-4 py-8 md:px-16 md:py-12">
            <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 md:flex-row md:items-start md:gap-14">
                <div className="order-1 relative aspect-video w-full rounded-lg overflow-hidden md:hidden">
                    <Image src={imageSrc} alt={imageAlt} fill className="object-cover" />
                </div>

                <div className="order-2 flex w-full flex-col gap-8 md:order-1 md:flex-1 md:gap-12">
                    <div className="flex flex-col gap-4">
                        <h2 className="text-[22px] font-medium leading-7 tracking-[0] text-on-surface-dark">
                            {heading}
                        </h2>

                        <div className="flex flex-col gap-4">
                            {steps.map((step, i) => (
                                <p
                                    key={i}
                                    className="text-base font-medium leading-6 tracking-[0.5px] text-on-surface-dark"
                                >
                                    {step}
                                </p>
                            ))}
                        </div>
                    </div>

                    <p className="whitespace-pre-line text-[12px] leading-4 tracking-[0.4px] text-on-surface-dark">
                        {termsText}
                    </p>
                </div>

                <div className="order-3 flex w-full flex-col md:order-2 md:w-96 md:shrink-0 md:items-end md:gap-6">
                    <a
                        href={ctaHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full md:w-auto"
                    >
                        <Button variant="primary" className="w-full md:w-auto">
                            {ctaText}
                        </Button>
                    </a>

                    <div className="hidden relative aspect-video w-full rounded-lg overflow-hidden md:block">
                        <Image src={imageSrc} alt="" aria-hidden="true" fill className="object-cover" />
                    </div>
                </div>
            </div>
        </section>
    );
}
