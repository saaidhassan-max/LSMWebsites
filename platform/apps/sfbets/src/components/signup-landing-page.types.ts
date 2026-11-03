export interface SignupLandingPageContent {
    heroPrefix: string;
    heroHeadline: string;
    heroSubline: string;
    instructionText: string;
    backgroundImage: string;
    legalDisclaimer: string;
}

export type ConsentStyle = 'standard' | 'highlighted';

export interface SignupLandingPageProps {
    content: SignupLandingPageContent;
    offerImageSrc: string;
    consentStyle?: ConsentStyle;
}

export type GuideStep = 'name' | 'email' | 'consent';
