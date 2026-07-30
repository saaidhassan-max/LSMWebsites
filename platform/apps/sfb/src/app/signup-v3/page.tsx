import type React from 'react';
import { SignupLandingPageV3 } from '../../components/signup-landing-page-v3';
import { imageOfferInstructionText, signupLegalDisclaimer } from '../../data/site-content';
import { getCmsSiteSettings } from '../../data/cms-content';
import type { CmsLandingPageContent } from '../../data/cms-content.types';

const OFFER_IMAGE_SRC = '/sfb/LandingPage/v3/sfb_150fs_1200x1200_4 1.png';

const DEFAULT_CONTENT: CmsLandingPageContent = {
    heroPrefix: 'Up to',
    heroHeadline: '150 Free Spins',
    heroSubline: 'can be claimed with no deposit',
    instructionText: imageOfferInstructionText,
    backgroundImage: '/sfb/LandingPage/v3/landingpage-background.png',
    legalDisclaimer: signupLegalDisclaimer
};

export const dynamic = 'force-dynamic';

export default async function SignupV3Page(): Promise<React.ReactElement> {
    const settings = await getCmsSiteSettings();
    return (
        <SignupLandingPageV3
            content={DEFAULT_CONTENT}
            settings={settings}
            offerImageSrc={OFFER_IMAGE_SRC}
        />
    );
}
