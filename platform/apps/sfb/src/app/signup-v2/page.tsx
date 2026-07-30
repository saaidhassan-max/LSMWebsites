import type React from 'react';
import { SignupLandingPageV2 } from '../../components/signup-landing-page-v2';
import { landingOfferInstructionText, signupLegalDisclaimer } from '../../data/site-content';
import { getCmsSiteSettings } from '../../data/cms-content';
import type { CmsLandingPageContent } from '../../data/cms-content.types';

const DEFAULT_CONTENT: CmsLandingPageContent = {
    heroPrefix: 'Up to',
    heroHeadline: '150 Free Spins',
    heroSubline: 'No Deposit & No Wagering',
    instructionText: landingOfferInstructionText,
    backgroundImage: '/sfb/LandingPage/v2/landingpage-background.png',
    legalDisclaimer: signupLegalDisclaimer
};

export const dynamic = 'force-dynamic';

export default async function SignupV2Page(): Promise<React.ReactElement> {
    const settings = await getCmsSiteSettings();
    return <SignupLandingPageV2 content={DEFAULT_CONTENT} settings={settings} />;
}
