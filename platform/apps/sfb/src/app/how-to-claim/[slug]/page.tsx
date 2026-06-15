import type React from 'react';
import { notFound } from 'next/navigation';
import { Button } from '@lsm/ui/components/button/button';
import { HowToClaimSteps } from '@lsm/ui/components/how-to-claim-steps/how-to-claim-steps';
import { HtcUsp } from '@lsm/ui/components/htc-usp/htc-usp';
import { SignupForm } from '@lsm/ui/components/signup-form/signup-form';
import { SfbFooter } from '@lsm/ui/components/sfb-footer/sfb-footer';
import { USP } from '@lsm/ui/components/usp/usp';
import { WebsiteDirectory } from '@lsm/ui/components/website-directory/website-directory';
import { SfbNav } from '../../../components/sfb-nav';
import { getCmsOfferPage, getCmsSiteSettings } from '../../../data/cms-content';
import { getCasino } from '../../../data/casinos';

export const dynamic = 'force-dynamic';

export default async function HowToClaimPage({
    params
}: {
    params: Promise<{ slug: string }>;
}): Promise<React.ReactElement> {
    const { slug } = await params;
    const [cmsOffer, settings] = await Promise.all([getCmsOfferPage(slug), getCmsSiteSettings()]);
    const casino = getCasino(slug);
    const page = cmsOffer ?? casino;

    if (page === undefined) {
        notFound();
    }

    const reviewSections = 'reviewSections' in page ? page.reviewSections : undefined;
    const midpoint = Math.ceil((reviewSections?.length ?? 0) / 2);
    const leftSections = reviewSections?.slice(0, midpoint) ?? [];
    const rightSections = reviewSections?.slice(midpoint) ?? [];

    return (
        <main className="flex flex-col w-full bg-surface">
            <SfbNav items={settings.navItems} />
            <USP text={settings.howToClaimUspText} />
            <HtcUsp
                logoSrc={page.logoSrc}
                logoAlt={page.logoAlt}
                headline={page.offerHeadline}
                badges={page.trustBadges}
            />
            <HowToClaimSteps
                steps={page.howToSteps}
                termsText={page.howToTermsText}
                imageSrc={page.howToImageSrc}
                imageAlt={page.howToImageAlt}
                ctaText={page.ctaText}
                ctaHref={page.ctaHref}
            />
            <div className="w-full pt-8">
                <div className="md:hidden flex flex-col gap-6 px-4">
                    <p className="text-[14px] text-on-surface-light whitespace-pre-wrap">
                        {page.reviewBody}
                    </p>

                    <a
                        href={page.ctaHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full"
                    >
                        <Button variant="primary" className="w-full">
                            {page.ctaText}
                        </Button>
                    </a>

                    <WebsiteDirectory
                        title={settings.directoryTitle}
                        sites={settings.directorySites}
                        splitAtDot
                    />
                </div>
                <div className="hidden md:flex flex-col gap-6 max-w-[1440px] mx-auto">
                    <div className="flex flex-col gap-6 px-16">
                        {page.reviewIntro && (
                            <p className="text-base font-bold text-on-surface-light">
                                {page.reviewIntro}
                            </p>
                        )}

                        {reviewSections && reviewSections.length > 0 && (
                            <div className="grid grid-cols-2 gap-8">
                                <div className="flex flex-col gap-8">
                                    {leftSections.map((section, i) => (
                                        <div key={i} className="flex flex-col gap-2">
                                            <h3 className="text-base font-bold text-tertiary">
                                                {section.heading}
                                            </h3>
                                            <p className="text-[14px] text-on-surface-light">
                                                {section.body}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex flex-col gap-8">
                                    {rightSections.map((section, i) => (
                                        <div key={i} className="flex flex-col gap-2">
                                            <h3 className="text-base font-bold text-tertiary">
                                                {section.heading}
                                            </h3>
                                            <p className="text-[14px] text-on-surface-light">
                                                {section.body}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        <div className="grid grid-cols-2 gap-[10px]">
                            <a
                                href={page.ctaHref}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block"
                            >
                                <Button variant="primary" className="w-full">
                                    {page.ctaText}
                                </Button>
                            </a>
                        </div>
                    </div>
                    <div className="flex px-16 py-8">
                        <div className="flex-1">
                            <WebsiteDirectory
                                title={settings.directoryTitle}
                                sites={settings.directorySites}
                                splitAtDot
                            />
                        </div>
                        <div className="flex-1">
                            <SignupForm variant="sfb-sfsg" brandName="Super Free Bingo" privacyPolicyUrl="/privacy-policy" termsUrl="/terms" />
                        </div>
                    </div>
                </div>
            </div>
            <SfbFooter legalText={settings.footerLegalText} />
        </main>
    );
}
