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
}
