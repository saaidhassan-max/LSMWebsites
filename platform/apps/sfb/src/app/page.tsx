import type React from 'react';
import { OfferCard } from '@lsm/ui/components/offer-card/offer-card';
import { SignupForm } from '@lsm/ui/components/signup-form/signup-form';
import { SfbFooter } from '@lsm/ui/components/sfb-footer/sfb-footer';
import { WebsiteDirectory } from '@lsm/ui/components/website-directory/website-directory';
import { WelcomeBanner } from '@lsm/ui/components/welcome-banner/welcome-banner';
import { ctaColors } from '@lsm/ui/lib/generic/cta-color';
import { SfbNav } from '../components/sfb-nav';
import { getStaticSiteSettings } from '../data/cms-content';
import { homeOffers } from '../data/home-offers';
import type { CmsSiteSettings } from '../data/cms-content.types';
import type { CtaColor } from '@lsm/ui/lib/generic/cta-color';

export const dynamic = 'force-dynamic';

function ctaColorFor(seed: string): CtaColor {
    const hash = Array.from(seed).reduce(
        (total, character) => ((total << 5) - total + character.charCodeAt(0)) | 0,
        2166136261
    );
    return ctaColors[Math.abs(hash) % ctaColors.length];
}

function renderSignup(heading: string | undefined, desktop = false): React.ReactElement {
    return (
        <div
            className={
                (desktop ? 'flex-1 ' : 'w-full max-w-[720px] mx-auto p-4 ') + 'flex flex-col gap-4'
            }
        >
            {heading !== undefined && heading !== '' && (
                <h2
                    className={
                        (desktop ? 'text-[28px]' : 'text-[22px] md:text-[28px]') +
                        ' font-bold text-on-surface-light text-center'
                    }
                >
                    {heading}
                </h2>
            )}
            <SignupForm
                variant="sfb-sfsg"
                brandName="Super Free Bingo"
                privacyPolicyUrl="/privacy-policy"
                termsUrl="/terms"
            />
        </div>
    );
}

function renderDirectorySignupTemplate(settings: CmsSiteSettings): React.ReactElement {
    return (
        <div className="w-full">
            <div className="md:hidden flex flex-col">
                <WebsiteDirectory
                    title={settings.directoryTitle}
                    sites={settings.directorySites}
                    splitAtDot
                />
                {renderSignup(undefined)}
            </div>
            <div className="hidden md:flex w-full max-w-[1440px] mx-auto px-16 py-4 gap-8">
                <div className="flex-1">
                    <WebsiteDirectory
                        title={settings.directoryTitle}
                        sites={settings.directorySites}
                        splitAtDot
                    />
                </div>
                {renderSignup(undefined, true)}
            </div>
        </div>
    );
}

export default function HomePage(): React.ReactElement {
    const settings = getStaticSiteSettings();

    return (
        <main className="flex flex-col w-full bg-surface">
            <SfbNav />

            <WelcomeBanner
                uspText={settings.uspText}
                textPrefix="TOP"
                textHighlight=" DEALS"
                text=" AWAIT YOU..."
                features={['⭐ Super Offers', '✅ Super Simple', '🛡️ Super Secure']}
                imageLeftSrc="/sfb/welcome-images/left_sfb_welcome.png"
                imageRightSrc="/sfb/welcome-images/right_sfb_welcome.png"
                variant="merged"
            />

            <div className="flex w-full max-w-[1440px] mx-auto flex-col gap-[10px] px-4 py-4 md:px-16 md:py-8">
                {homeOffers.map((offer, index) => (
                    <OfferCard
                        key={index}
                        {...offer}
                        ctaColor={ctaColorFor(offer.logoAlt + offer.offerMain + index)}
                    />
                ))}
            </div>

            {renderDirectorySignupTemplate(settings)}

            <SfbFooter legalText={settings.footerLegalText} />
        </main>
    );
}
