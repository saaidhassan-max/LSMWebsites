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
    '888ladies': {
        slug: '888ladies',
        logoSrc: '/sfb/brands/placeholder.png',
        logoAlt: '888 Ladies Bingo',
        offerHeadline: '200 FREE SPINS',
        trustBadges: ['No Wagering', 'No Deposit'],
        howToSteps: [
            '1. Click here to go to 888 Ladies Bingo!',
            '2. Select your state & sign up with code: SFBETSLAUNCH',
            '3. Get $10 bonus - no deposit needed',
            '4. Plus, get a 100% bonus match up to $1000!'
        ],
        howToTermsText:
            '888 Ladies T&C Apply, click for more details\n\n18+. UK new customers only; re-registrations excluded. Claim Free Spins [FS] (£0.10 each) within 48h; valid 3 days on selected games (excl. JP). FS wins converted to Bonus and must be wagered 10x within 90 days to withdraw. Max withdrawal £100. One per person. T&Cs apply. GambleAware.org. #ad',
        howToImageSrc: '/sfb/howtoclaim/landingpageimage.png',
        howToImageAlt: '888 Ladies Bingo offer',
        ctaText: 'VISIT CASINO →',
        ctaHref: '#',
        reviewBody: 'Placeholder review body — replace with real bingo site review copy.',
        reviewIntro:
            'Placeholder intro — replace with real bingo site review copy. This bold paragraph introduces the site and appears at the top of the desktop review section.',
        reviewSections: [
            {
                heading: 'Bingo Games',
                body: "Placeholder — replace with real copy about the bingo site's game selection, rooms, and standout titles."
            },
            {
                heading: 'Slots',
                body: 'Placeholder — replace with real copy about slot game selection, software providers, and featured titles.'
            },
            {
                heading: 'Promotions',
                body: 'Placeholder — replace with real copy about ongoing promotions, loyalty programmes, and bonus terms.'
            },
            {
                heading: 'Payment Methods',
                body: 'Placeholder — replace with real copy about deposit and withdrawal options, processing times, and limits.'
            }
        ]
    }
};

export function getCasino(slug: string): CasinoPageData | undefined {
    return CASINOS[slug];
}
