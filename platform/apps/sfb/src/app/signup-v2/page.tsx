import type React from 'react';
import { SignupLandingPageV2 } from '../../components/signup-landing-page-v2';
import { signupInstructionText, signupLegalDisclaimer } from '../../data/site-content';
import { getCmsSiteSettings } from '../../data/cms-content';
import type { CmsLandingPageContent } from '../../data/cms-content.types';

const OFFER_IMAGE_SRC = '/sfb/LandingPage/offer-150-free-spins-v2.jpg';

const DEFAULT_CONTENT: CmsLandingPageContent = {
    heroPrefix: 'Up to',
    heroHeadline: '150 Free Spins',
    heroSubline: 'can be claimed with no deposit',
    instructionText: signupInstructionText,
    backgroundImage: '/sfb/LandingPage/landingpage-background.png',
    legalDisclaimer: signupLegalDisclaimer
};

export const dynamic = 'force-dynamic';

export default async function SignupV2Page(): Promise<React.ReactElement> {
    const settings = await getCmsSiteSettings();
    return (
        <SignupLandingPageV2
            content={DEFAULT_CONTENT}
            settings={settings}
            offerImageSrc={OFFER_IMAGE_SRC}
        />
    );
}
