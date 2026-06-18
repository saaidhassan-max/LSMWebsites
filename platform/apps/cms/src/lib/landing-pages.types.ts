export type LandingPageStatus = 'published' | 'draft';

export interface LandingPageContent {
    heroPrefix: string;
    heroHeadline: string;
    heroSubline: string;
    instructionText: string;
    backgroundImage: string;
    legalDisclaimer: string;
    primaryCtaText: string;
    secondaryCtaText: string;
}

export interface LandingPageDetails {
    name: string;
    slug: string;
}

export interface LandingPage {
    id: string;
    name: string;
    slug: string;
    status: LandingPageStatus;
    publishedAt: string | null;
    createdAt: string;
    updatedAt: string;
    content: LandingPageContent;
}
