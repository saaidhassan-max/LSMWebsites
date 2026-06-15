import type React from 'react';
import { SignupLandingPage } from '../../components/signup-landing-page';
import { signupInstructionText, signupLegalDisclaimer } from '../../data/site-content';
import { getCmsSiteSettings } from '../../data/cms-content';
import type { CmsLandingPageContent } from '../../data/cms-content.types';

const DEFAULT_CONTENT: CmsLandingPageContent = {
    heroPrefix: 'Up to',
    heroHeadline: '500 Free Tickets',
    heroSubline: 'No Deposit & No Wagering',
    instructionText: signupInstructionText,
    backgroundImage: '/sfb/LandingPage/landingpage-background.png',
    legalDisclaimer: signupLegalDisclaimer
};

export const dynamic = 'force-dynamic';

export default async function SignupPage(): Promise<React.ReactElement> {
    const settings = await getCmsSiteSettings();
    return <SignupLandingPage content={DEFAULT_CONTENT} settings={settings} />;
}
