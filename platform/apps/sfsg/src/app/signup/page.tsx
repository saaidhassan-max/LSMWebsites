import type React from 'react';
import { SignupLandingPage } from '../../components/signup-landing-page';
import type { SignupLandingPageContent } from '../../components/signup-landing-page.types';
import { landingOfferInstructionText, signupLegalDisclaimer } from '../../data/site-content';

const OFFER_IMAGE_SRC = '/sfsg/LandingPage/v5/sfsg_neon_250_1400x1400.png';

const CONTENT: SignupLandingPageContent = {
    heroPrefix: 'Up to',
    heroHeadline: '250 Free Spins',
    heroSubline: '& "No Deposit" Offers',
    instructionText: landingOfferInstructionText,
    backgroundImage: '/sfsg/LandingPage/v5/sfsg_neon_250_1400x1400-1.png',
    legalDisclaimer: signupLegalDisclaimer
};

export default function SignupPage(): React.ReactElement {
    return <SignupLandingPage content={CONTENT} offerImageSrc={OFFER_IMAGE_SRC} />;
}
