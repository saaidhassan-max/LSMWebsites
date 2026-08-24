export type WelcomeBannerVariant = 'classic' | 'modern' | 'merged';

export interface WelcomeBannerProps {
    text: string;
    textPrefix?: string;
    textHighlight?: string;
    textSuffix?: string;
    features?: string[];
    uspText?: string;
    imageLeftSrc?: string;
    imageRightSrc?: string;
    imageLeftWidthMobile?: number;
    imageLeftWidthDesktop?: number;
    variant?: WelcomeBannerVariant;
}
