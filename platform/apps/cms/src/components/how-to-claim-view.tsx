'use client';

import type React from 'react';
import { Button } from '@lsm/ui/components/button/button';
import { HowToClaimSteps } from '@lsm/ui/components/how-to-claim-steps/how-to-claim-steps';
import { HtcUsp } from '@lsm/ui/components/htc-usp/htc-usp';
import { LogoSection } from '@lsm/ui/components/logo-section/logo-section';
import { SignupForm } from '@lsm/ui/components/signup-form/signup-form';
import { SfbFooter } from '@lsm/ui/components/sfb-footer/sfb-footer';
import { USP } from '@lsm/ui/components/usp/usp';
import { WebsiteDirectory } from '@lsm/ui/components/website-directory/website-directory';
import type { DirectoryItem } from '@lsm/ui/components/website-directory/website-directory.types';
import type { CmsOffer, CmsOperator } from '@/lib/cms-content.types';

const DIRECTORY_SITES: DirectoryItem[] = [
    { name: 'Betfair Casino' },
    { name: 'Ladbrokes' },
    { name: 'Buzz Bingo' },
    { name: 'Gala Bingo' },
    { name: 'MrQ' },
    { name: 'Sun Vegas' },
    { name: 'Sky Vegas' },
    { name: 'Glossy Bingo' },
    { name: 'Sun Bingo' },
    { name: 'Foxy Bingo' },
    { name: 'Heart Bingo' }
];

interface HowToClaimViewProps {
    offer: CmsOffer;
    operator: CmsOperator;
}

function noop(): void {
    void 0;
}

export function HowToClaimView({ offer, operator }: HowToClaimViewProps): React.ReactElement {
    const ctaText = 'CLICK TO CLAIM';
    const ctaHref = offer.ctaHref || '#';

    return (
        <main data-theme="bingo" className="flex flex-col w-full bg-surface">
            <LogoSection
                logoSrc="/sfb/logo-mobile.svg"
                logoDesktopSrc="/sfb/logo-desktop.svg"
                logoAlt="Super Free Bingo"
                logoHref="#"
                backgroundSrc="/sfb/LogoSection/Lego_Deco2.png"
                onMenuClick={noop}
            />
            <USP text="OVER 5,000,000 SUBSCRIBERS" />

            <HtcUsp
                logoSrc={operator.logoSrc}
                logoAlt={operator.name}
                headline={offer.headline}
                badges={offer.details}
            />

            <HowToClaimSteps
                steps={offer.howToClaimSteps}
                termsText={offer.termsText}
                imageSrc="/sfb/howtoclaim/landingpageimage.png"
                imageAlt={operator.name}
                ctaText={ctaText}
                ctaHref={ctaHref}
            />

            <div className="w-full pt-8">
                <div className="md:hidden flex flex-col gap-6 px-4">
                    {operator.reviewIntro && (
                        <p className="text-base font-bold text-on-surface-light">{operator.reviewIntro}</p>
                    )}
                    <p className="text-[14px] text-on-surface-light whitespace-pre-wrap">
                        {operator.reviewBody}
                    </p>
                    <Button variant="primary" className="w-full">
                        {ctaText}
                    </Button>
                    <WebsiteDirectory title="Super Free Bingo Directory" sites={DIRECTORY_SITES} splitAtDot />
                </div>

                <div className="hidden md:flex flex-col gap-6 max-w-[1440px] mx-auto">
                    <div className="flex flex-col gap-6 px-16">
                        {operator.reviewIntro && (
                            <p className="text-base font-bold text-on-surface-light">{operator.reviewIntro}</p>
                        )}
                        <p className="text-[14px] text-on-surface-light whitespace-pre-wrap">
                            {operator.reviewBody}
                        </p>
                        <div className="grid grid-cols-2 gap-[10px]">
                            <Button variant="primary" className="w-full">
                                {ctaText}
                            </Button>
                        </div>
                    </div>
                    <div className="flex px-16 py-8 gap-8">
                        <div className="flex-1">
                            <WebsiteDirectory
                                title="Super Free Bingo Directory"
                                sites={DIRECTORY_SITES}
                                splitAtDot
                            />
                        </div>
                        <div className="flex-1">
                            <SignupForm
                                variant="sfb-sfsg"
                                brandName="Super Free Bingo"
                                privacyPolicyUrl="/privacy-policy"
                                termsUrl="/terms"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <SfbFooter />
        </main>
    );
}
