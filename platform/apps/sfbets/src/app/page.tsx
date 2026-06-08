import type React from 'react';
import { OfferCard } from '@lsm/ui/components/offer-card/offer-card';
import { OperatorBanner } from '@lsm/ui/components/operator-banner/operator-banner';
import { SignupForm } from '@lsm/ui/components/signup-form/signup-form';
import { SfbetsFooter } from '@lsm/ui/components/sfbets-footer/sfbets-footer';
import { USP } from '@lsm/ui/components/usp/usp';
import { WebsiteDirectory } from '@lsm/ui/components/website-directory/website-directory';
import { WelcomeBanner } from '@lsm/ui/components/welcome-banner/welcome-banner';
import { SfbetsNav } from '../components/sfbets-nav';
import { directorySites, offers } from '../data/site-content';

export default function HomePage(): React.ReactElement {
    return (
        <main className="flex flex-col w-full bg-surface">
            <SfbetsNav />

            <USP text="OVER 150,000 OFFERS CLAIMED" />

            <WelcomeBanner
                textHighlight="TOP "
                text="CASINO DEALS "
                textSuffix="2026"
                features={['⭐ Super Offers', '✅ Super Simple', '🛡️ Super Secure']}
                imageLeftSrc="/sfbets/welcome-images/image-left.png"
                imageRightSrc="/sfbets/welcome-images/image-right.png"
                imageLeftWidthMobile={92}
                imageLeftWidthDesktop={224}
            />

<div className="w-full max-w-[1440px] mx-auto">
                <div className="flex flex-col gap-2 p-4 md:px-16 md:py-4">
                    <OfferCard {...offers[0]} />
                    <OfferCard {...offers[1]} />
                    <OperatorBanner
                        mobileSrc="/sfbets/banners/operator-banner-mobile.jpg"
                        desktopSrc="/sfbets/banners/operator-banner-desktop.jpg"
                        alt="Operator promotion"
                        href="https://example.com"
                    />
                    <OfferCard {...offers[2]} />
                    <OfferCard {...offers[3]} />
                    <div className="md:hidden">
                        <SignupForm
                            variant="sfbets"
                            brandName="Super Free Bets MI"
                            privacyPolicyUrl="/privacy-policy"
                            termsUrl="/terms"
                        />
                    </div>
                    <OfferCard {...offers[4]} />
                    <OfferCard {...offers[5]} />
                    <OfferCard {...offers[6]} />
                    <OfferCard {...offers[7]} />
                </div>
            </div>

            <div className="md:hidden w-full">
                <WebsiteDirectory title="Super Free Bets MI Directory" splitAtDot sites={directorySites} />
            </div>

            <div className="hidden md:flex w-full max-w-[1440px] mx-auto px-16 py-4 gap-8">
                <div className="flex-1">
                    <WebsiteDirectory title="Super Free Bets MI Directory" splitAtDot sites={directorySites} />
                </div>
                <div className="flex-1">
                    <SignupForm
                        variant="sfbets"
                        brandName="Super Free Bets MI"
                        privacyPolicyUrl="/privacy-policy"
                        termsUrl="/terms"
                    />
                </div>
            </div>

            <SfbetsFooter state="mi" />
        </main>
    );
}
