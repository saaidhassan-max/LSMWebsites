import type React from 'react';
import { OfferCard } from '@lsm/ui/components/offer-card/offer-card';
import { OperatorBanner } from '@lsm/ui/components/operator-banner/operator-banner';
import { SignupForm } from '@lsm/ui/components/signup-form/signup-form';
import { SfbetsFooter } from '@lsm/ui/components/sfbets-footer/sfbets-footer';
import { TopTCs } from '@lsm/ui/components/top-tcs/top-tcs';
import { USP } from '@lsm/ui/components/usp/usp';
import { WebsiteDirectory } from '@lsm/ui/components/website-directory/website-directory';
import { WelcomeBanner } from '@lsm/ui/components/welcome-banner/welcome-banner';
import { SfbetsNav } from '../components/sfbets-nav';
import { directorySites, offers } from '../data/site-content';

export default function HomePage(): React.ReactElement {
    return (
        <main className="flex flex-col w-full bg-surface">
            <SfbetsNav />

            <USP text="OVER 5,000,000 SUBSCRIBERS" />

            <WelcomeBanner
                textHighlight="TOP"
                text=" FREE BET DEALS 2026"
                features={['⭐ Super Offers', '✅ Super Simple', '🛡️ Super Secure']}
                imageLeftSrc="/sfbets/welcome-images/image-left.png"
                imageRightSrc="/sfbets/welcome-images/image-right.png"
            />

            <TopTCs text='Special terms apply – including age verification. Click "How To Claim" for full details.' />

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
                            brandName="Super Free Bets MI"
                            requiredFieldLabel="* Required information"
                            ageConfirmText="By checking the box below, you confirm that you are of legal gambling age in your state and have not self-excluded from any gambling operator."
                            consentLabel="I consent to receiving emails from Super Free Bets MI, its affiliates and other websites owned or operated by its parent company."
                            consentBodyText="Emails from Super Free Bets MI and its related entities will include gambling offers for casino and sports as well as promotional content related to eCommerce offerings. Email frequency may vary."
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
                <WebsiteDirectory title="Super Free Bets Directory" sites={directorySites} />
            </div>

            <div className="hidden md:flex w-full max-w-[1440px] mx-auto px-16 py-4 gap-8">
                <div className="flex-1">
                    <WebsiteDirectory title="Super Free Bets Directory" sites={directorySites} />
                </div>
                <div className="flex-1">
                    <SignupForm
                            brandName="Super Free Bets MI"
                            requiredFieldLabel="* Required information"
                            ageConfirmText="By checking the box below, you confirm that you are of legal gambling age in your state and have not self-excluded from any gambling operator."
                            consentLabel="I consent to receiving emails from Super Free Bets MI, its affiliates and other websites owned or operated by its parent company."
                            consentBodyText="Emails from Super Free Bets MI and its related entities will include gambling offers for casino and sports as well as promotional content related to eCommerce offerings. Email frequency may vary."
                            privacyPolicyUrl="/privacy-policy"
                            termsUrl="/terms"
                        />
                </div>
            </div>

            <SfbetsFooter state="mi" />
        </main>
    );
}
