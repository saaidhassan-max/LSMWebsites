export type SitePageStatus = 'draft' | 'published';
export type SitePageSectionType = 'welcome' | 'terms' | 'richText' | 'signup' | 'directory' | 'offers';

export interface WelcomeContent {
    textHighlight: string;
    text: string;
    textSuffix: string;
    features: string[];
    imageLeftSrc: string;
    imageRightSrc: string;
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

export interface OffersOfferItem {
    kind: 'offer';
    offerId: string;
}

export interface OffersBannerItem {
    kind: 'banner';
    mobileSrc: string;
    desktopSrc: string;
    href: string;
}

export type OffersItem = OffersOfferItem | OffersBannerItem;

export interface OffersContent {
    items: OffersItem[];
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

export interface OffersSection {
    id: string;
    type: 'offers';
    content: OffersContent;
}

export type SitePageSection =
    | WelcomeSection
    | TermsSection
    | RichTextSection
    | SignupSection
    | DirectorySection
    | OffersSection;

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
