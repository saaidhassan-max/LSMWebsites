export interface ReviewSection {
    heading: string;
    body: string;
}

export interface CasinoPageData {
    slug: string;
    logoSrc: string;
    logoAlt: string;
    offerHeadline: string;
    trustBadges: string[];
    howToSteps: string[];
    howToTermsText: string;
    howToImageSrc: string;
    howToImageAlt: string;
    ctaText: string;
    ctaHref: string;
    reviewBody: string;
    reviewIntro?: string;
    reviewSections?: ReviewSection[];
}

const CASINOS: Record<string, CasinoPageData> = {
    'betfair-sportsbook': {
        slug: 'betfair-sportsbook',
        logoSrc: '/sfbets/brands/placeholder.png',
        logoAlt: 'Betfair Sportsbook',
        offerHeadline: '£30 FREE BET No Deposit Required',
        trustBadges: ['No Deposit', 'No Wagering'],
        howToSteps: [
            '1. Click here to go to Betfair Sportsbook!',
            '2. Register your new account',
            '3. Verify your identity',
            '4. Your £30 free bet will be credited automatically — no deposit needed!'
        ],
        howToTermsText:
            'Betfair Sportsbook T&Cs apply. Click for more details.\n\n18+. New customers only. Free bet credited upon registration. T&Cs apply. BeGambleAware.org.',
        howToImageSrc: '/sfbets/howtoclaim/landingpageimage.png',
        howToImageAlt: 'Betfair Sportsbook offer',
        ctaText: 'CLICK TO CLAIM →',
        ctaHref: '#',
        reviewIntro:
            'Betfair Sportsbook is one of the most trusted names in online sports betting. This site offers a premium betting experience with an exclusive no deposit free bet offer for new customers.',
        reviewBody:
            'Betfair Sportsbook combines exchange heritage with a top-tier sports betting experience.\n\nNo Deposit Required\n\nNew customers receive a £30 free bet without needing to make a deposit. The free bet is credited in cash with no wagering requirements attached.\n\nMarkets\n\nChoose from thousands of markets across football, horse racing, tennis, and more.\n\nSecurity and Trust\n\nBetfair is fully licensed by the UK Gambling Commission and the Malta Gaming Authority.',
        reviewSections: [
            {
                heading: 'Football',
                body: 'Betfair Sportsbook covers thousands of football markets including Premier League, Champions League, international fixtures, and in-play betting on every major competition.'
            },
            {
                heading: 'Horse Racing',
                body: 'Betfair offers best-odds-guaranteed on all UK and Irish horse racing, plus extensive ante-post markets for major festivals including Cheltenham and Royal Ascot.'
            },
            {
                heading: 'Promotions',
                body: 'Beyond the welcome offer, Betfair runs regular price boosts, accumulator bonuses, and money-back specials for existing customers.'
            },
            {
                heading: 'Payment Methods',
                body: 'Betfair Sportsbook accepts Visa, Mastercard, PayPal, Skrill, Neteller, and bank transfer. Withdrawals are processed quickly with no hidden fees.'
            }
        ]
    }
};

export function getCasino(slug: string): CasinoPageData | undefined {
    return CASINOS[slug];
}
