import type React from 'react';
import { SignupLandingPageV4D } from '../../components/signup-landing-page-v4d';
import { landingOfferInstructionText, signupLegalDisclaimer } from '../../data/site-content';
import { getCmsSiteSettings } from '../../data/cms-content';
import type { CmsLandingPageContent } from '../../data/cms-content.types';

const OFFER_IMAGE_SRC = '/sfb/LandingPage/v5/sfsg_neon_250_1400x1400.png';

const DEFAULT_CONTENT: CmsLandingPageContent = {
    heroPrefix: 'Up to',
    heroHeadline: '250 Free Spins',
    heroSubline: '& "No Deposit" Offers',
    instructionText: landingOfferInstructionText,
    backgroundImage: '/sfb/LandingPage/v5/sfsg_neon_250_1400x1400-1.png',
    legalDisclaimer: signupLegalDisclaimer
};

export const dynamic = 'force-dynamic';

export default async function SignupV4DPage(): Promise<React.ReactElement> {
    const settings = await getCmsSiteSettings();
    return (
        <SignupLandingPageV4D
            content={DEFAULT_CONTENT}
            settings={settings}
            offerImageSrc={OFFER_IMAGE_SRC}
        />
    );
}
