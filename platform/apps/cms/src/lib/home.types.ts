import type { OffersItem } from './site-pages.types';

export interface HomePageConfig {
    offerItems: OffersItem[];
    sectionIds: HomeSectionId[];
    welcome: HomeWelcomeContent;
    updatedAt: string;
}

export type HomeSectionId = 'welcome' | 'terms' | 'offers' | 'signup' | 'directory';

export interface HomeWelcomeContent {
    textHighlight: string;
    text: string;
    textSuffix: string;
    features: string[];
    imageLeftSrc: string;
    imageRightSrc: string;
    imageLeftWidthMobile: number;
    imageLeftWidthDesktop: number;
}
