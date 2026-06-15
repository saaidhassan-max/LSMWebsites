import type React from 'react';
import { Fragment } from 'react';
import { OfferCard } from '@lsm/ui/components/offer-card/offer-card';
import { OperatorBanner } from '@lsm/ui/components/operator-banner/operator-banner';
import { SignupForm } from '@lsm/ui/components/signup-form/signup-form';
import { SfbFooter } from '@lsm/ui/components/sfb-footer/sfb-footer';
import { TopTCs } from '@lsm/ui/components/top-tcs/top-tcs';
import { USP } from '@lsm/ui/components/usp/usp';
import { WebsiteDirectory } from '@lsm/ui/components/website-directory/website-directory';
import { WelcomeBanner } from '@lsm/ui/components/welcome-banner/welcome-banner';
import { SfbNav } from '../components/sfb-nav';
import { offers } from '../data/site-content';
import { getCmsHomeOfferCards, getCmsHomeWelcomeContent, getCmsSiteSettings } from '../data/cms-content';

export const dynamic = 'force-dynamic';

export default async function HomePage(): Promise<React.ReactElement> {
    const [cmsOffers, cmsWelcome, settings] = await Promise.all([
        getCmsHomeOfferCards(),
        getCmsHomeWelcomeContent(),
        getCmsSiteSettings()
    ]);
    const pageOffers = cmsOffers ?? offers;
    const welcome = cmsWelcome ?? {
        textHighlight: 'TOP',
        text: ' BINGO DEALS 2026',
        textSuffix: '',
        features: ['⭐ Super Offers', '✅ Super Simple', '🛡️ Super Secure'],
        imageLeftSrc: '/sfb/welcome-images/image-left.png',
        imageRightSrc: '/sfb/welcome-images/image-right.png',
        imageLeftWidthMobile: 83,
        imageLeftWidthDesktop: 204
    };

    return (
        <main className="flex flex-col w-full bg-surface">
            <SfbNav items={settings.navItems} />

            <USP text={settings.uspText} />

            <WelcomeBanner
                textHighlight={welcome.textHighlight}
                text={welcome.text}
                textSuffix={welcome.textSuffix === '' ? undefined : welcome.textSuffix}
                features={welcome.features}
                imageLeftSrc={welcome.imageLeftSrc}
                imageRightSrc={welcome.imageRightSrc}
                imageLeftWidthMobile={welcome.imageLeftWidthMobile}
                imageLeftWidthDesktop={welcome.imageLeftWidthDesktop}
            />

            <TopTCs text='Special terms apply – including age verification. Click "How To Claim" for full details.' />

            <div className="w-full max-w-[1440px] mx-auto">
                <div className="flex flex-col gap-2 p-4 md:px-16 md:py-4">
                    {pageOffers.map((offer, index) => (
                        <Fragment key={offer.secondaryCtaHref ?? offer.offerMain + index}>
                            <OfferCard {...offer} />
                            {index === 1 && (
                                <OperatorBanner
                                    mobileSrc="/sfb/banners/operator-banner-mobile.jpg"
                                    desktopSrc="/sfb/banners/operator-banner-desktop.jpg"
                                    alt="Operator promotion"
                                    href="https://example.com"
                                />
                            )}
                            {index === 3 && (
                                <div className="md:hidden">
                                    <SignupForm
                                        variant="sfb-sfsg"
                                        brandName="Super Free Bingo"
                                        privacyPolicyUrl="/privacy-policy"
                                        termsUrl="/terms"
                                    />
                                </div>
                            )}
                        </Fragment>
                    ))}
                    {pageOffers.length < 4 && (
                        <div className="md:hidden">
                            <SignupForm
                                variant="sfb-sfsg"
                                brandName="Super Free Bingo"
                                privacyPolicyUrl="/privacy-policy"
                                termsUrl="/terms"
                            />
                        </div>
                    )}
                </div>
            </div>

            <div className="md:hidden w-full">
                <WebsiteDirectory
                    title={settings.directoryTitle}
                    sites={settings.directorySites}
                    splitAtDot
                />
            </div>

            <div className="hidden md:flex w-full max-w-[1440px] mx-auto px-16 py-4 gap-8">
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

            <SfbFooter legalText={settings.footerLegalText} />
        </main>
    );
}
