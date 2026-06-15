export type CmsRecordStatus = 'active' | 'hidden';
export type CmsLabelColor = 'blue' | 'red' | 'orange';

export interface CmsOperator {
    id: string;
    name: string;
    slug: string;
    logoSrc: string;
    status: CmsRecordStatus;
    reviewIntro: string;
    reviewBody: string;
    updatedAt: string;
}

export interface CmsOffer {
    id: string;
    operatorId: string;
    headline: string;
    label: string;
    labelColor: CmsLabelColor;
    details: string[];
    howToClaimSteps?: string[];
    termsText: string;
    ctaHref: string;
    status: CmsRecordStatus;
    updatedAt: string;
}

export interface CmsHomeConfig {
    offerIds: string[];
    welcome?: CmsHomeWelcomeContent;
    updatedAt: string;
}

export interface CmsHomeWelcomeContent {
    textHighlight: string;
    text: string;
    textSuffix: string;
    features: string[];
    imageLeftSrc: string;
    imageRightSrc: string;
    imageLeftWidthMobile: number;
    imageLeftWidthDesktop: number;
}

export interface CmsSiteSettingsNavItem {
    emoji: string;
    label: string;
    href: string;
}

export interface CmsSiteSettingsDirectoryItem {
    name: string;
    href?: string;
}

export interface CmsSiteSettings {
    uspText: string;
    howToClaimUspText: string;
    directoryTitle: string;
    directorySites: CmsSiteSettingsDirectoryItem[];
    footerLegalText: string;
    navItems: CmsSiteSettingsNavItem[];
    updatedAt: string;
}

export type CmsLandingPageStatus = 'published' | 'draft';

export interface CmsLandingPageContent {
    heroPrefix: string;
    heroHeadline: string;
    heroSubline: string;
    instructionText: string;
    backgroundImage: string;
    legalDisclaimer: string;
}

export interface CmsLandingPage {
    id: string;
    name: string;
    slug: string;
    status: CmsLandingPageStatus;
    publishedAt: string | null;
    updatedAt: string;
    content: CmsLandingPageContent;
}

export type CmsSitePageStatus = 'draft' | 'published';
export type CmsSitePageSectionType = 'welcome' | 'terms' | 'richText' | 'signup' | 'directory';

export interface CmsSitePageSectionContent {
    textHighlight?: string;
    text?: string;
    textSuffix?: string;
    features?: string[];
    imageLeftSrc?: string;
    imageRightSrc?: string;
    heading?: string;
    body?: string;
    title?: string;
}

export interface CmsSitePageSection {
    id: string;
    type: CmsSitePageSectionType;
    content: CmsSitePageSectionContent;
}

export interface CmsSitePage {
    id: string;
    name: string;
    slug: string;
    status: CmsSitePageStatus;
    publishedAt: string | null;
    updatedAt: string;
    sections: CmsSitePageSection[];
}

export interface CmsOfferPageData {
    id: string;
    operatorSlug: string;
    logoSrc: string;
    logoAlt: string;
    offerHeadline: string;
    trustBadges: string[];
    howToSteps: string[];
    howToTermsText: string;
    howToImageSrc: string;
    howToImageAlt: string;
    ctaText: string;
    ctaHref: string;
    reviewBody: string;
    reviewIntro: string;
}
