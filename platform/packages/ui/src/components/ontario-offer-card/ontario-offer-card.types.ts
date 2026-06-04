import type React from 'react';

export type OntarioOfferCardVariant = 'primary' | 'secondary';

export interface OntarioOfferCardProps {
    variant?: OntarioOfferCardVariant;
    logoSrc?: string;
    logoAlt?: string;
    offerHeadline: string;
    usps: string[];
    ctaHref?: string;
    learnMoreHref?: string;
    disclaimerText?: string;
}
