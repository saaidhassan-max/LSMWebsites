export interface HomePageConfig {
    offerIds: string[];
    welcome: HomeWelcomeContent;
    updatedAt: string;
}

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
