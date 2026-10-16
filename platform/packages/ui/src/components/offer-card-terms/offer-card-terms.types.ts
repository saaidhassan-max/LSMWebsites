export type OfferCardTermsSize = 'mobile' | 'desktop';

export interface OfferCardTermsProps {
    text: string;
    size?: OfferCardTermsSize;
}

export interface OfferCardTermsStyle {
    wrapper: string;
    measureInset: string;
    text: string;
    clamp: string;
    visibleLines: number;
    seeLess: string;
}
