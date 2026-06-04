import type React from 'react';
import { USP } from '@lsm/ui/components/usp/usp';
import { PageHeader } from '@lsm/ui/components/page-header/page-header';
import { OntarioOfferCard } from '@lsm/ui/components/ontario-offer-card/ontario-offer-card';
import { OperatorBanner } from '@lsm/ui/components/operator-banner/operator-banner';
import { SignupForm } from '@lsm/ui/components/signup-form/signup-form';
import { WebsiteDirectory } from '@lsm/ui/components/website-directory/website-directory';
import { OntarioFooter } from '@lsm/ui/components/ontario-footer/ontario-footer';
import { OntarioNav } from '../components/ontario-nav';
import {
    offers,
    directorySites,
    AFFILIATE_DISCLOSURE,
    PAGE_HEADER_SUBTITLE,
    PAGE_HEADER_BADGES
} from '../data/site-content';

export default function HomePage(): React.ReactElement {
    const [cardsPre, cardsPost] = [offers.slice(0, 3), offers.slice(3)];

    return (
        <main className="flex flex-col w-full bg-surface">
            <OntarioNav />

            <USP text="OVER 10,000 OFFERS CLAIMED" />

            <PageHeader
                titlePrefix="GOOD."
                titleSuffix="DEPOSITS 🏦"
                subtitle={PAGE_HEADER_SUBTITLE}
                badges={PAGE_HEADER_BADGES}
            />

            <div className="w-full max-w-[1440px] mx-auto px-4 md:px-14 py-[10px] flex flex-col gap-1">
                <p className="text-[11px] leading-[13px] tracking-[0.4px] text-on-surface-light">
                    {AFFILIATE_DISCLOSURE}
                </p>

                {cardsPre.map((offer, i) => (
                    <OntarioOfferCard
                        key={offer.slug}
                        variant={i === 0 ? 'primary' : 'secondary'}
                        logoSrc={offer.logoSrc}
                        logoAlt={offer.logoAlt}
                        offerHeadline={offer.offerHeadline}
                        usps={offer.usps}
                        ctaHref={offer.ctaHref}
                        learnMoreHref={offer.learnMoreHref}
                        disclaimerText={offer.disclaimerText}
                    />
                ))}

                <div className="md:hidden">
                    <SignupForm
                        brandName="Good.Choice"
                        privacyPolicyUrl="/privacy-policy"
                        termsUrl="/terms"
                        nameEmailMode
                    />
                </div>

                <div className="hidden md:block">
                    <OperatorBanner
                        mobileSrc="/ontario/banners/operator-banner-mobile.jpg"
                        desktopSrc="/ontario/banners/operator-banner-desktop.jpg"
                        alt="Ontario casino promotion"
                    />
                </div>

                {cardsPost.map((offer) => (
                    <OntarioOfferCard
                        key={offer.slug}
                        variant="secondary"
                        logoSrc={offer.logoSrc}
                        logoAlt={offer.logoAlt}
                        offerHeadline={offer.offerHeadline}
                        usps={offer.usps}
                        ctaHref={offer.ctaHref}
                        learnMoreHref={offer.learnMoreHref}
                        disclaimerText={offer.disclaimerText}
                    />
                ))}

                <div className="md:hidden mt-1">
                    <WebsiteDirectory
                        title="Good.Choice Directory"
                        sites={directorySites}
                        splitAtDot
                    />
                </div>

                <div className="hidden md:flex gap-6 pt-8">
                    <div className="flex-1">
                        <WebsiteDirectory
                            title="Good.Choice Directory"
                            sites={directorySites}
                            splitAtDot
                        />
                    </div>
                    <div className="flex-1">
                        <SignupForm
                            brandName="Good.Choice"
                            privacyPolicyUrl="/privacy-policy"
                            termsUrl="/terms"
                            nameEmailMode
                        />
                    </div>
                </div>
            </div>

            <OntarioFooter />
        </main>
    );
}
