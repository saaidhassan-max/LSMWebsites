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
    'betfair-casino': {
        slug: 'betfair-casino',
        logoSrc: '/sfsg/brands/placeholder.png',
        logoAlt: 'Betfair Casino',
        offerHeadline: '50 FREE SPINS No Deposit & No Wagering',
        trustBadges: ['No Deposit', 'No Wagering'],
        howToSteps: [
            '1. Click here to go to Betfair Casino!',
            '2. Register your new account',
            '3. Verify your identity',
            '4. Your 50 free spins will be credited automatically — no deposit needed!'
        ],
        howToTermsText:
            'Betfair Casino T&Cs apply. Click for more details.\n\n18+. New customers only. Free spins valued at £0.10. Winnings paid in cash. T&Cs apply. BeGambleAware.org.',
        howToImageSrc: '/sfsg/howtoclaim/landingpageimage.png',
        howToImageAlt: 'Betfair Casino offer',
        ctaText: 'CLICK TO CLAIM →',
        ctaHref: '#',
        reviewIntro:
            'Betfair Casino is one of the most trusted names in online gaming. This site offers a premium slots experience with an exclusive no deposit free spins offer for new players.',
        reviewBody:
            'Betfair Casino combines sport-betting heritage with a top-tier slots experience.\n\nNo Deposit Required\n\nNew players receive 50 free spins without needing to make a deposit. Winnings are paid in cash with no wagering requirements attached.\n\nGame Selection\n\nChoose from hundreds of slots and jackpot games from leading providers including Playtech and more.\n\nSecurity and Trust\n\nBetfair is fully licensed by the UK Gambling Commission and the Malta Gaming Authority.',
        reviewSections: [
            {
                heading: 'Slots',
                body: 'Betfair Casino hosts hundreds of slot titles from top providers including Playtech and Blueprint Gaming. Popular titles include Age of the Gods, Starburst, and Buffalo Blitz.'
            },
            {
                heading: 'Jackpots',
                body: 'Betfair Casino offers a wide range of progressive and fixed jackpot slots with prizes reaching millions of pounds.'
            },
            {
                heading: 'Promotions',
                body: 'Beyond the welcome offer, Betfair Casino runs regular reload bonuses, prize draws, and cashback promotions for existing players.'
            },
            {
                heading: 'Payment Methods',
                body: 'Betfair Casino accepts Visa, Mastercard, PayPal, Skrill, Neteller, and bank transfer. Withdrawals are processed quickly with no hidden fees.'
            }
        ]
    }
};

export function getCasino(slug: string): CasinoPageData | undefined {
    return CASINOS[slug];
}
