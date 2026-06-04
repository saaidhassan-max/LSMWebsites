export interface OntarioOffer {
    slug: string;
    logoSrc?: string;
    logoAlt: string;
    offerHeadline: string;
    usps: string[];
    ctaHref: string;
    learnMoreHref: string;
    disclaimerText: string;
}

const DISCLAIMER = '19+ only. Please play responsibly. Gambling problem? Call 1-866-531-2600 or visit Connex Ontario. T&Cs apply.';

const LOGOS = [
    '/ontario/brands/betmgm-logo.png',
    '/ontario/brands/draftkingcasino-logo.png',
    '/ontario/brands/fanduel-logo.png'
];

export const offers: OntarioOffer[] = [
    {
        slug: 'caesars-palace',
        logoSrc: LOGOS[0],
        logoAlt: 'Caesars Palace Online Casino',
        offerHeadline: '1 DAY\nPAYOUT',
        usps: [
            'Fast Payouts',
            'Video slots, live dealer games & tournaments',
            'Tiered reward program with real-world perks',
            'Exclusive Table Games'
        ],
        ctaHref: '#',
        learnMoreHref: '/review/caesars-palace',
        disclaimerText: DISCLAIMER
    },
    {
        slug: 'betway',
        logoSrc: LOGOS[1],
        logoAlt: 'Betway Casino',
        offerHeadline: '3,500+\nGAMES',
        usps: [
            'Fast Payouts',
            '1500+ Games!',
            'Over 550 games, including progressive jackpots'
        ],
        ctaHref: '#',
        learnMoreHref: '/review/betway',
        disclaimerText: DISCLAIMER
    },
    {
        slug: 'bet365',
        logoSrc: LOGOS[2],
        logoAlt: 'Bet365 Casino',
        offerHeadline: '1 DAY\nPAYOUT',
        usps: [
            'Fast Payouts',
            '1500+ Games!',
            'Over 550 games, including progressive jackpots'
        ],
        ctaHref: '#',
        learnMoreHref: '/review/bet365',
        disclaimerText: DISCLAIMER
    },
    {
        slug: 'draftkings',
        logoSrc: LOGOS[0],
        logoAlt: 'DraftKings Casino',
        offerHeadline: '1 DAY\nPAYOUT',
        usps: [
            'Fast Payouts',
            '1500+ Games!',
            'Over 550 games, including progressive jackpots'
        ],
        ctaHref: '#',
        learnMoreHref: '/review/draftkings',
        disclaimerText: DISCLAIMER
    },
    {
        slug: 'fanduel',
        logoSrc: LOGOS[1],
        logoAlt: 'FanDuel Casino',
        offerHeadline: '1 DAY\nPAYOUT',
        usps: [
            'Fast Payouts',
            '1500+ Games!',
            'Over 550 games, including progressive jackpots'
        ],
        ctaHref: '#',
        learnMoreHref: '/review/fanduel',
        disclaimerText: DISCLAIMER
    },
    {
        slug: 'pointsbet',
        logoSrc: LOGOS[2],
        logoAlt: 'PointsBet Casino',
        offerHeadline: '1 DAY\nPAYOUT',
        usps: [
            'Fast Payouts',
            '1500+ Games!',
            'Over 550 games, including progressive jackpots'
        ],
        ctaHref: '#',
        learnMoreHref: '/review/pointsbet',
        disclaimerText: DISCLAIMER
    }
];

export const directorySites = [
    { name: '888 Casino', href: '#' },
    { name: 'Betway', href: '#' },
    { name: 'Bet365', href: '#' },
    { name: 'DraftKings', href: '#' },
    { name: 'FanDuel', href: '#' },
    { name: 'PointsBet', href: '#' },
    { name: 'Caesars Palace', href: '#' },
    { name: 'BetMGM', href: '#' },
    { name: 'LeoVegas', href: '#' },
    { name: 'Spin Casino', href: '#' },
    { name: 'Jackpot City', href: '#' }
];

export const AFFILIATE_DISCLOSURE = 'Affiliate Disclosure: We may earn a commission if you bet through our links, which may influence our listings. Our opinions are independent.';

export const PAGE_HEADER_SUBTITLE = "Ontario's most trusted online casino — 750+ games, fast payouts, and real-world rewards through Caesars Rewards.";

export const PAGE_HEADER_BADGES = [
    { text: '🔒 Secure & Trusted' },
    { text: '🏅 Ontario Licensed' }
];
