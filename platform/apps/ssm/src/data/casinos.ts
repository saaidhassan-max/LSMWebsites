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
    '888poker': {
        slug: '888poker',
        logoSrc: '/ssm/brands/888logo.png',
        logoAlt: '888 Poker',
        offerHeadline: '10 FREE SPINS',
        trustBadges: ['No Deposit', 'No Wagering'],
        howToSteps: [
            '1. Click here to go to Caesars Palace Online Casino!',
            '2. Select your state & sign up with code: SFBETSLAUNCH',
            '3. Get $10 bonus - no deposit needed',
            '4. Plus, get a 100% bonus match up to $1000!'
        ],
        howToTermsText:
            '888casino T&C Apply, click for more details\n\n18+. UK new customers only; re-registrations excluded. Claim Free Spins [FS] (£0.10 each) within 48h; valid 3 days on selected games (excl. JP). FS wins converted to Bonus and must be wagered 10x within 90 days to withdraw. Max withdrawal £100. One per person. T&Cs apply. GambleAware.org. #ad',
        howToImageSrc: '/ssm/howtoclaim/landingpageimage.png',
        howToImageAlt: 'Big Bass Splash casino offer',
        ctaText: 'VISIT CASINO →',
        ctaHref: '#',
        reviewBody: `Om Royal Casino\n\nHvis du ønsker en royal behandling, så skal du vælge Royal Casino. Den velkendte kasinohjemmeside tilbyder et stort udvalg af lækkerier til sine spillere, uanset hvilket spil du foretrækker. Royal Casino giver masser af bonusser, så du kan spille og have det sjovt.\n\nKampagner og bonusser\n\nHjemmesiden byder på massevis af kampagner og bonusser, og det hele begynder med velkomstbonussen. Med den får du meget at spille for med det samme, og du behøver ikke engang foretage en indbetaling for at komme i gang. Indtast dine oplysninger på siden, og så er du klar til at spille med velkomstbonussen.\n\nFantastisk udvalg af spil\n\nHjemmesiden byder på hundredvis af forskellige spil fra de bedste spiludviklere.\n\nNår du bladrer igennem de forskellige spilmenuer, får du vist en masse forskellige slags spil. Hvis du vil spille fantasy spil, spil uden indbetaling eller spilleautomater, finder du dem alle lige her. Spillere hos Royal Casino bliver forkælet med de nyeste spil, da siden hele tiden opdateres med de nyeste spil på markedet.\n\nSikkerheden\n\nHvis du ønsker at foretage en indbetaling, er der forskellige betalingsmuligheder til rådighed. Alle transaktioner behandles sikkert.`,
        reviewIntro:
            'Placeholder intro — replace with real casino review copy. This bold paragraph introduces the casino and appears at the top of the desktop review section.',
        reviewSections: [
            {
                heading: 'Online Slots',
                body: "Placeholder — replace with real copy about the casino's slot game selection, software providers, and standout titles."
            },
            {
                heading: 'Casino Games',
                body: 'Placeholder — replace with real copy about table games, live casino, video poker, and other casino game categories.'
            },
            {
                heading: 'Sports Betting',
                body: 'Placeholder — replace with real copy about the sportsbook offering, supported sports, bet types, and any promotional offers.'
            },
            {
                heading: 'Casino Promotions',
                body: 'Placeholder — replace with real copy about ongoing promotions, loyalty programmes, and bonus terms.'
            },
            {
                heading: 'Caesars Rewards',
                body: 'Placeholder — replace with real copy about the VIP or rewards programme and its benefits.'
            }
        ]
    }
};

export function getCasino(slug: string): CasinoPageData | undefined {
    return CASINOS[slug];
}
