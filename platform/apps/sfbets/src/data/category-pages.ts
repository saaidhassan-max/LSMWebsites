import type { OfferCardProps } from '@lsm/ui/components/offer-card/offer-card.types';
import type { CategoryPage } from './category-pages.types';
import { offers } from './site-content';

const offersForBrands = (brands: string[]): OfferCardProps[] =>
    offers.filter((offer) => offer.logoAlt !== undefined && brands.includes(offer.logoAlt));

export const categoryPages: CategoryPage[] = [
    {
        slug: 'no-deposit-offers',
        title: 'No Deposit Offers',
        navEmoji: '🎁',
        headlineHighlight: 'NO DEPOSIT',
        headlineRest: ' OFFERS',
        offers: offersForBrands(['Fanatics Casino', 'Golden Nugget'])
    }
];
