import type React from 'react';
import { SignupLandingPage } from '../../components/signup-landing-page';
import { landingContent, landingOfferImageSrc } from '../../data/landing-content';

export default function SignupPage(): React.ReactElement {
    return <SignupLandingPage content={landingContent} offerImageSrc={landingOfferImageSrc} />;
}
