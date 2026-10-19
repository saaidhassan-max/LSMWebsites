import type React from 'react';
import { OfferCard } from '@lsm/ui/components/offer-card/offer-card';
import { SignupForm } from '@lsm/ui/components/signup-form/signup-form';
import { SfsgFooter } from '@lsm/ui/components/sfsg-footer/sfsg-footer';
import { WelcomeBanner } from '@lsm/ui/components/welcome-banner/welcome-banner';
import { SfsgNav } from '../components/sfsg-nav';
import { ctaColorForLogo } from '../data/operator-cta-colors';
import { offers } from '../data/site-content';

const signupForm = (): React.ReactElement => (
    <SignupForm
        variant="sfb-sfsg"
        brandName="Super Free Slot Games"
        privacyPolicyUrl="/privacy-policy"
        termsUrl="/terms-and-conditions"
    />
);

export default function HomePage(): React.ReactElement {
    return (
        <main className="flex flex-col w-full bg-surface">
            <SfsgNav />

            <WelcomeBanner
                uspText="SAME DEALS, NEW DIGS. WELCOME BACK. 🏠"
                uspVariant="slots"
                textHighlight="TOP"
                text=" SLOT DEALS 2026"
                features={['⭐ Super Offers', '✅ Super Simple', '🛡️ Super Secure']}
                imageLeftSrc="/sfsg/welcome-images/image-left.png"
                imageRightSrc="/sfsg/welcome-images/image-right.png"
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

            <SfsgFooter />
        </main>
    );
}
