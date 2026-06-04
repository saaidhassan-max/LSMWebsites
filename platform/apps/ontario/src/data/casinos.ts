export interface ReviewSection {
    heading: string;
    body: string;
}

export interface Casino {
    slug: string;
    name: string;
    logoSrc: string;
    offerHeadline: string;
    usps: string[];
    ctaHref: string;
    learnMoreHref: string;
    disclaimerText: string;
    trustBadges: string[];
    features: string[];
    reviewIntro: string;
    reviewSections: ReviewSection[];
}

export const casinos: Casino[] = [
    {
        slug: 'caesars-palace',
        name: 'Caesars Palace Online Casino',
        logoSrc: '/ontario/casinos/caesars-palace.png',
        offerHeadline: '1 DAY\nPAYOUT',
        usps: [
            'Fast Payouts',
            'Video slots, live dealer games & tournaments',
            'Tiered reward program with real-world perks',
            'Exclusive Table Games'
        ],
        ctaHref: '#',
        learnMoreHref: '/review/caesars-palace',
        disclaimerText: '19+ only. Please play responsibly. Gambling problem? Call 1-866-531-2600 or visit Connex Ontario. T&Cs apply.',
        trustBadges: ['🔒 Secure & Trusted', '🏅 Ontario Licensed'],
        features: [
            'Fast Payouts',
            'Video slots, live dealer games & tournaments',
            'Tiered reward program with real-world perks',
            'Exclusive Table Games'
        ],
        reviewIntro: 'Caesars Palace Online Casino, which went live in November 2013, is one of the most recognisable names in online gaming. With a massive library of games, a world-class rewards programme, and a commitment to responsible gambling, it continues to be one of Ontario\'s most trusted platforms.',
        reviewSections: [
            {
                heading: 'Online Slots',
                body: 'Caesars Palace offers hundreds of online slot titles from leading providers including NetEnt, IGT, and Evolution. From classic three-reel slots to modern video slots with bonus rounds, there is something for every type of player.'
            },
            {
                heading: 'Casino Games',
                body: 'The table games selection includes multiple variants of blackjack, roulette, baccarat, and poker. Players can also enjoy a live dealer section with real croupiers streaming in real time from professional studios.'
            },
            {
                heading: 'Sports Betting',
                body: 'Caesars Sportsbook is integrated into the platform, giving players access to a full range of sports markets. From NFL and NBA to international football and tennis, the odds are competitive and the interface is intuitive.'
            },
            {
                heading: 'Casino Promotions',
                body: 'New players benefit from a generous welcome bonus, while existing customers are regularly rewarded with free spins, deposit matches, and tournament entries. Promotional terms are clearly stated and fair.'
            },
            {
                heading: 'Caesars Rewards',
                body: 'The Caesars Rewards programme is one of the most prestigious loyalty schemes in the industry. Members earn Reward Credits on every wager, which can be redeemed for free play, hotel stays, dining, and entertainment at Caesars properties worldwide.'
            }
        ]
    }
];

export function getCasinoBySlug(slug: string): Casino | undefined {
    return casinos.find((c) => c.slug === slug);
}
