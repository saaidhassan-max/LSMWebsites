import type { SignupLandingPageContent } from '../components/signup-landing-page.types';
import { signupInstructionText, signupLegalDisclaimer } from './site-content';

export const landingOfferImageSrc = '/sfbets/LandingPage/v5/sfsg_neon_250_1400x1400.png';

export const landingContent: SignupLandingPageContent = {
    heroPrefix: 'Up to',
    heroHeadline: '250 Free Spins',
    heroSubline: '& "No Deposit" Offers',
    instructionText: signupInstructionText,
    backgroundImage: '/sfbets/LandingPage/v5/sfsg_neon_250_1400x1400-1.png',
    legalDisclaimer: signupLegalDisclaimer
};
