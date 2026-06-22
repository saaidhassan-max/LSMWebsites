export type SitePageStatus = 'draft' | 'published';
export type SitePageSectionType =
    | 'welcome'
    | 'terms'
    | 'richText'
    | 'signup'
    | 'directory'
    | 'directorySignup'
    | 'offers'
    | 'image';

export interface WelcomeContent {
    textHighlight: string;
    text: string;
    textSuffix: string;
    features: string[];
    imageLeftSrc: string;
    imageRightSrc: string;
    imageLeftWidthMobile: number;
    imageLeftWidthDesktop: number;
}

export interface TermsContent {
    text: string;
}

export interface RichTextContent {
    heading: string;
    body: string;
}

export interface SignupContent {
    heading: string;
}

export interface DirectoryContent {
    title: string;
}

export interface DirectorySignupContent {
    directoryTitle: string;
    signupHeading: string;
}

export interface OffersOfferItem {
    kind: 'offer';
    offerId: string;
}

export interface OffersGeneralBannerItem {
    kind: 'banner';
    tie: 'general';
    mobileSrc: string;
    desktopSrc: string;
    href: string;
}

export interface OffersOfferBannerItem {
    kind: 'banner';
    tie: 'offer';
    offerId: string;
}

export type OffersBannerItem = OffersGeneralBannerItem | OffersOfferBannerItem;

export type OffersItem = OffersOfferItem | OffersBannerItem;

export interface OffersContent {
    items: OffersItem[];
}

export interface ImageContent {
    src: string;
    alt: string;
    href: string;
    desktopWidth: number;
    desktopHeight: number;
    mobileWidth: number;
    mobileHeight: number;
}

export interface WelcomeSection {
    id: string;
    type: 'welcome';
    content: WelcomeContent;
}

export interface TermsSection {
    id: string;
    type: 'terms';
    content: TermsContent;
}

export interface RichTextSection {
    id: string;
    type: 'richText';
    content: RichTextContent;
}

export interface SignupSection {
    id: string;
    type: 'signup';
    content: SignupContent;
}

export interface DirectorySection {
    id: string;
    type: 'directory';
    content: DirectoryContent;
}

export interface DirectorySignupSection {
    id: string;
    type: 'directorySignup';
    content: DirectorySignupContent;
}

export interface OffersSection {
    id: string;
    type: 'offers';
    content: OffersContent;
}

export interface ImageSection {
    id: string;
    type: 'image';
    content: ImageContent;
}

export type SitePageSection =
    | WelcomeSection
    | TermsSection
    | RichTextSection
    | SignupSection
    | DirectorySection
    | DirectorySignupSection
    | OffersSection
    | ImageSection;

export interface SitePageDetails {
    name: string;
    slug: string;
}

export interface SitePage {
    id: string;
    name: string;
    slug: string;
    status: SitePageStatus;
    publishedAt: string | null;
    updatedAt: string;
    sections: SitePageSection[];
}
