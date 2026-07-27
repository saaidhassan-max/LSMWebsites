import type { LabelColor } from '../label/label.types';

export type CtaVariant = 'primary' | 'secondary' | 'tertiary';

export interface OfferCardDetail {
    emoji: string;
    text: string;
}

export interface OfferCardProps {
    label?: string;
    labelColor?: LabelColor;
    showLabel?: boolean;
    logoSrc?: string;
    logoAlt?: string;
    offerMain: string;
    details?: OfferCardDetail[];
    ctaText?: string;
    ctaHref: string;
    ctaVariant?: CtaVariant;
    secondaryCtaText?: string;
    secondaryCtaHref?: string;
    termsText?: string;
}
