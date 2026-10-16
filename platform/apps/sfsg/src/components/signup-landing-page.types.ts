export interface SignupLandingPageContent {
    heroPrefix: string;
    heroHeadline: string;
    heroSubline: string;
    instructionText: string;
    backgroundImage: string;
    legalDisclaimer: string;
}

export interface SignupLandingPageProps {
    content: SignupLandingPageContent;
    offerImageSrc: string;
}
