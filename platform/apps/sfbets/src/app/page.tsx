import type React from 'react';
import { LegalContent } from '@lsm/ui/components/legal-content/legal-content';
import { OfferCard } from '@lsm/ui/components/offer-card/offer-card';
import { SignupForm } from '@lsm/ui/components/signup-form/signup-form';
import { SfbetsFooter } from '@lsm/ui/components/sfbets-footer/sfbets-footer';
import { WelcomeBanner } from '@lsm/ui/components/welcome-banner/welcome-banner';
import { SfbetsNav } from '../components/sfbets-nav';
import { casinoGuideBlocks } from '../data/casino-guide';
import { ctaColorForLogo } from '../data/operator-cta-colors';
import { legalText, offers } from '../data/site-content';

const signupForm = (): React.ReactElement => (
    <SignupForm
        variant="sfbets"
        brandName="Super Free Bets NJ"
        privacyPolicyUrl="/privacy-policy"
        termsUrl="/terms-and-conditions"
    />
);

export default function HomePage(): React.ReactElement {
    return (
        <main className="flex flex-col w-full bg-surface">
            <SfbetsNav />

            <WelcomeBanner
                uspText="OVER 150,000 OFFERS CLAIMED"
                uspVariant="slots"
                textHighlight="TOP"
                text=" CASINO DEALS 2026"
                features={['⭐ Super Offers', '✅ Super Simple', '🛡️ Super Secure']}
                imageLeftSrc="/sfbets/welcome-images/image-left.png"
                imageRightSrc="/sfbets/welcome-images/image-right.png"
                variant="merged"
            />

            <div className="flex w-full max-w-[1440px] mx-auto flex-col gap-[10px] px-4 py-4 md:px-16 md:py-8">
                {offers.map((offer, index) => (
                    <OfferCard key={index} {...offer} ctaColor={ctaColorForLogo(offer.logoSrc)} />
                ))}
            </div>

            <div className="w-full">
                <div className="md:hidden flex flex-col">
                    <div className="w-full max-w-[720px] mx-auto p-4 flex flex-col gap-4">
                        {signupForm()}
                    </div>
                </div>
                <div className="hidden md:flex w-full max-w-[1440px] mx-auto px-16 py-4 gap-8">
                    <div className="flex-1 flex flex-col gap-4">{signupForm()}</div>
                    <div className="flex-1" />
                </div>
            </div>

            <section className="w-full max-w-[1440px] mx-auto px-4 py-8 md:px-16 md:py-12">
                <div className="px-4">
                    <LegalContent blocks={casinoGuideBlocks} />
                </div>
            </section>

            <SfbetsFooter legalText={legalText} state="nj" />
        </main>
    );
}
