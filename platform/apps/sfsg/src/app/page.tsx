import type React from 'react';
import { OfferCard } from '@lsm/ui/components/offer-card/offer-card';
import { OperatorBanner } from '@lsm/ui/components/operator-banner/operator-banner';
import { SignupForm } from '@lsm/ui/components/signup-form/signup-form';
import { SfsgFooter } from '@lsm/ui/components/sfsg-footer/sfsg-footer';
import { TopTCs } from '@lsm/ui/components/top-tcs/top-tcs';
import { USP } from '@lsm/ui/components/usp/usp';
import { WebsiteDirectory } from '@lsm/ui/components/website-directory/website-directory';
import { WelcomeBanner } from '@lsm/ui/components/welcome-banner/welcome-banner';
import { SfsgNav } from '../components/sfsg-nav';
import { ctaColorForLogo } from '../data/operator-cta-colors';
import { directorySites, offers } from '../data/site-content';

export default function HomePage(): React.ReactElement {
    return (
        <main className="flex flex-col w-full bg-surface">
            <SfsgNav />

            <USP text="OVER 150,000 OFFERS CLAIMED" />

            <WelcomeBanner
                textHighlight="TOP"
                text=" SLOT DEALS 2026"
                features={['⭐ Super Offers', '✅ Super Simple', '🛡️ Super Secure']}
                imageLeftSrc="/sfsg/welcome-images/image-left.png"
                imageRightSrc="/sfsg/welcome-images/image-right.png"
                variant="modern"
            />

            <TopTCs text='Special terms apply – including age verification. Click "How To Claim" for full details.' />

            <div className="w-full max-w-[1440px] mx-auto">
                <div className="flex flex-col gap-2 p-4 md:px-16 md:py-4">
                    {offers.slice(0, 2).map((offer, index) => (
                        <OfferCard key={index} {...offer} ctaColor={ctaColorForLogo(offer.logoSrc)} />
                    ))}
                    <OperatorBanner
                        mobileSrc="/sfsg/banners/operator-banner-mobile.jpg"
                        desktopSrc="/sfsg/banners/operator-banner-desktop.jpg"
                        alt="Operator promotion"
                        href="https://example.com"
                    />
                    {offers.slice(2, 4).map((offer, index) => (
                        <OfferCard key={index} {...offer} ctaColor={ctaColorForLogo(offer.logoSrc)} />
                    ))}
                    <div className="md:hidden">
                        <SignupForm variant="sfb-sfsg" brandName="Super Free Slot Games" privacyPolicyUrl="/privacy-policy" termsUrl="/terms" />
                    </div>
                    {offers.slice(4).map((offer, index) => (
                        <OfferCard key={index} {...offer} ctaColor={ctaColorForLogo(offer.logoSrc)} />
                    ))}
                </div>
            </div>

            <div className="md:hidden w-full">
                <WebsiteDirectory title="SFSG Slots Directory" sites={directorySites} />
            </div>

            <div className="hidden md:flex w-full max-w-[1440px] mx-auto px-16 py-4 gap-8">
                <div className="flex-1">
                    <WebsiteDirectory title="SFSG Slots Directory" sites={directorySites} />
                </div>
                <div className="flex-1">
                    <SignupForm variant="sfb-sfsg" brandName="Super Free Slot Games" privacyPolicyUrl="/privacy-policy" termsUrl="/terms" />
                </div>
            </div>

            <SfsgFooter />
        </main>
    );
}
