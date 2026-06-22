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

export interface CmsOfferBanner {
    mobileSrc: string;
    desktopSrc: string;
    href: string;
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
    startDate?: string | null;
    endDate?: string | null;
    banner?: CmsOfferBanner | null;
    updatedAt: string;
}

export interface CmsHomeConfig {
    sections?: CmsSitePageSection[];
    offerItems?: CmsOffersItem[];
    offerIds?: string[];
    sectionIds?: CmsHomeSectionId[];
    welcome?: CmsHomeWelcomeContent;
    updatedAt: string;
}

export type CmsHomeSectionId = 'welcome' | 'terms' | 'offers' | 'signup' | 'directory';

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
    pageId?: string;
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
    primaryCtaText?: string;
    secondaryCtaText?: string;
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
export type CmsSitePageSectionType =
    | 'welcome'
    | 'terms'
    | 'richText'
    | 'signup'
    | 'directory'
    | 'directorySignup'
    | 'offers'
    | 'image';

export interface CmsOffersOfferItem {
    kind: 'offer';
    offerId: string;
}

export interface CmsOffersGeneralBannerItem {
    kind: 'banner';
    tie?: 'general';
    mobileSrc: string;
    desktopSrc: string;
    href: string;
}

export interface CmsOffersOfferBannerItem {
    kind: 'banner';
    tie: 'offer';
    offerId: string;
}

export type CmsOffersBannerItem = CmsOffersGeneralBannerItem | CmsOffersOfferBannerItem;

export type CmsOffersItem = CmsOffersOfferItem | CmsOffersBannerItem;

export interface CmsSitePageSectionContent {
    textHighlight?: string;
    text?: string;
    textSuffix?: string;
    features?: string[];
    imageLeftSrc?: string;
    imageRightSrc?: string;
    imageLeftWidthMobile?: number;
    imageLeftWidthDesktop?: number;
    heading?: string;
    body?: string;
    title?: string;
    directoryTitle?: string;
    signupHeading?: string;
    offerIds?: string[];
    items?: CmsOffersItem[];
    src?: string;
    alt?: string;
    href?: string;
    desktopWidth?: number;
    desktopHeight?: number;
    mobileWidth?: number;
    mobileHeight?: number;
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
