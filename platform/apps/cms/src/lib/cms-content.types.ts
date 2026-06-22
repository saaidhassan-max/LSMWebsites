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

export interface CmsOperatorDetails {
    name: string;
    slug: string;
    logoSrc: string;
    reviewIntro: string;
    reviewBody: string;
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
    howToClaimSteps: string[];
    termsText: string;
    ctaHref: string;
    status: CmsRecordStatus;
    startDate: string | null;
    endDate: string | null;
    banner: CmsOfferBanner | null;
    updatedAt: string;
}

export interface CmsOfferDetails {
    operatorId: string;
    headline: string;
    label: string;
    labelColor: CmsLabelColor;
    details: string[];
    howToClaimSteps: string[];
    termsText: string;
    ctaHref: string;
    startDate: string | null;
    endDate: string | null;
    banner: CmsOfferBanner | null;
}

export interface CmsCampaign {
    id: string;
    operatorId: string;
    name: string;
    offerIds: string[];
    landingPageIds: string[];
    trackingHref: string;
    startDate: string | null;
    endDate: string | null;
    status: CmsRecordStatus;
    updatedAt: string;
}

export interface CmsCampaignDetails {
    name: string;
    offerIds: string[];
    landingPageIds: string[];
    trackingHref: string;
    startDate: string | null;
    endDate: string | null;
}

export interface CmsCreativePlacement {
    label: string;
    state: 'live' | 'draft';
}
