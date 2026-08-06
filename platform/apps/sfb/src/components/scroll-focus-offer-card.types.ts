import type { OfferCardProps } from '@lsm/ui/components/offer-card/offer-card.types';

export type ScrollFocusTier = 'full' | 'medium' | 'compact';
export type ScrollFocusDirection = 'up' | 'down';

export interface ScrollFocusOfferCardProps {
    offer: OfferCardProps;
    tier: ScrollFocusTier;
}
