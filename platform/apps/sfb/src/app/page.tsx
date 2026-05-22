import type React from 'react';
import { OfferCard } from '@lsm/ui/components/offer-card/offer-card';
import { OperatorBanner } from '@lsm/ui/components/operator-banner/operator-banner';
import { SignupForm } from '@lsm/ui/components/signup-form/signup-form';
import { SfbFooter } from '@lsm/ui/components/sfb-footer/sfb-footer';
import { TopTCs } from '@lsm/ui/components/top-tcs/top-tcs';
import { USP } from '@lsm/ui/components/usp/usp';
import { WebsiteDirectory } from '@lsm/ui/components/website-directory/website-directory';
import { WelcomeBanner } from '@lsm/ui/components/welcome-banner/welcome-banner';
import { SfbNav } from '../components/sfb-nav';
import { directorySites, offers } from '../data/site-content';

export default function HomePage(): React.ReactElement {
    return (
        <main className="flex flex-col w-full bg-surface">
            <div className="w-full max-w-[1440px] mx-auto">
                <SfbNav />
            </div>

            <USP text="OVER 5,000,000 BINGO PLAYERS" />

            <WelcomeBanner
                textHighlight="TOP"
                text=" BINGO DEALS 2026"
                features={['⭐ Super Offers', '✅ Super Simple', '🛡️ Super Secure']}
                imageLeftSrc="/sfb/welcome-images/image-left.png"
                imageRightSrc="/sfb/welcome-images/image-right.png"
            />

            <TopTCs text='Special terms apply – including age verification. Click "How To Claim" for full details.' />

            <div className="w-full max-w-[1440px] mx-auto">
                <div className="flex flex-col gap-2 p-4 md:px-16 md:py-4">
                    <OfferCard {...offers[0]} />
                    <OfferCard {...offers[1]} />
                    <OperatorBanner
                        mobileSrc="/sfb/banners/operator-banner-mobile.jpg"
                        desktopSrc="/sfb/banners/operator-banner-desktop.jpg"
                        alt="Operator promotion"
                        href="https://example.com"
                    />
                    <OfferCard {...offers[2]} />
                    <OfferCard {...offers[3]} />
                    <div className="md:hidden">
                        <SignupForm brandName="Super Free Bingo" />
                    </div>
                    <OfferCard {...offers[4]} />
                    <OfferCard {...offers[5]} />
                    <OfferCard {...offers[6]} />
                    <OfferCard {...offers[7]} />
                </div>
            </div>

            <div className="md:hidden w-full">
                <WebsiteDirectory title="SFB Bingo Directory" sites={directorySites} />
            </div>

            <div className="hidden md:flex w-full max-w-[1440px] mx-auto px-16 py-4 gap-8">
                <div className="flex-1">
                    <WebsiteDirectory title="SFB Bingo Directory" sites={directorySites} />
                </div>
                <div className="flex-1">
                    <SignupForm brandName="Super Free Bingo" />
                </div>
            </div>

            <SfbFooter />
        </main>
    );
}
