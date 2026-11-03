import type { OfferCardProps } from '@lsm/ui/components/offer-card/offer-card.types';

export interface CategoryPage {
    slug: string;
    title: string;
    navEmoji: string;
    headlineHighlight: string;
    headlineRest: string;
    offers: OfferCardProps[];
}
