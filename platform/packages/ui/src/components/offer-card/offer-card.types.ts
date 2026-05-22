import type { LabelColor } from '../label/label.types';

export interface OfferCardProps {
    label?: string;
    labelColor?: LabelColor;
    logoSrc?: string;
    logoAlt?: string;
    offerMain: string;
    details?: string[];
    ctaText?: string;
    ctaHref: string;
    secondaryCtaText?: string;
    secondaryCtaHref?: string;
    termsText?: string;
}
