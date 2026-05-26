import type { LabelColor } from '../label/label.types';

export type CtaVariant = 'primary' | 'secondary' | 'tertiary';

export interface OfferCardProps {
    label?: string;
    labelColor?: LabelColor;
    logoSrc?: string;
    logoAlt?: string;
    offerMain: string;
    details?: string[];
    ctaText?: string;
    ctaHref: string;
    ctaVariant?: CtaVariant;
    secondaryCtaText?: string;
    secondaryCtaHref?: string;
    termsText?: string;
}
