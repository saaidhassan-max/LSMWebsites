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
        logoSrc: '/sfb/brands/placeholder.png',
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
        howToImageSrc: '/sfb/howtoclaim/landingpageimage.png',
        howToImageAlt: 'Betfair Casino offer',
        ctaText: 'CLICK TO CLAIM →',
        ctaHref: '#',
        reviewIntro:
            'Betfair Casino is one of the most trusted names in online gaming. Backed by the Betfair brand, this site offers a premium experience with an exclusive no deposit free spins offer for new players.',
        reviewBody:
            'Betfair Casino combines sport-betting heritage with a top-tier casino experience.\n\nNo Deposit Required\n\nNew players receive 50 free spins without needing to make a deposit. Winnings are paid in cash with no wagering requirements attached.\n\nGame Selection\n\nChoose from hundreds of slots, live casino tables, and jackpot games from leading providers including Playtech, Evolution, and more.\n\nSecurity and Trust\n\nBetfair is fully licensed by the UK Gambling Commission and the Malta Gaming Authority. All transactions are encrypted and processed securely.',
        reviewSections: [
            {
                heading: 'Slots',
                body: 'Betfair Casino hosts hundreds of slot titles from top providers including Playtech and Blueprint Gaming. Popular titles include Age of the Gods, Starburst, and Buffalo Blitz.'
            },
            {
                heading: 'Live Casino',
                body: 'Betfair\'s live casino is powered by Evolution Gaming and Playtech Live, offering blackjack, roulette, baccarat, and exclusive live game shows.'
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
    },
    'ladbrokes': {
        slug: 'ladbrokes',
        logoSrc: '/sfb/brands/placeholder.png',
        logoAlt: 'Ladbrokes',
        offerHeadline: '50 FREE SPINS No Deposit & No Wagering',
        trustBadges: ['No Deposit', 'No Wagering'],
        howToSteps: [
            '1. Click here to go to Ladbrokes!',
            '2. Register your new account',
            '3. Your 50 free spins are credited on registration',
            '4. Play on selected games — no deposit required!'
        ],
        howToTermsText:
            'Ladbrokes T&Cs apply. Click for more details.\n\n18+. New Casino players only. 50 Free Spins (£0.10 each, selected games, valid 7 days) awarded upon registration. T&Cs apply. BeGambleAware.org.',
        howToImageSrc: '/sfb/howtoclaim/landingpageimage.png',
        howToImageAlt: 'Ladbrokes offer',
        ctaText: 'CLICK TO CLAIM →',
        ctaHref: '#',
        reviewIntro:
            'Ladbrokes is one of the most recognisable names in UK gambling. With decades of history on the high street and a world-class online casino, Ladbrokes is a natural choice for new players.',
        reviewBody:
            'Ladbrokes Casino delivers a premium gambling experience with a huge game library and trusted payments.\n\nNo Deposit Spins\n\nNew casino players receive 50 free spins on registration with no deposit required and no wagering on winnings.\n\nMassive Game Library\n\nFrom classic slots to cutting-edge live tables, Ladbrokes offers thousands of games from the world\'s best studios.\n\nSafe and Licensed\n\nLadbrokes holds a full UK Gambling Commission licence and is committed to responsible gambling tools for all players.',
        reviewSections: [
            {
                heading: 'Slots',
                body: 'Ladbrokes Casino features thousands of slots from providers including Microgaming, NetEnt, Playtech, and Big Time Gaming. Find daily jackpot games and branded titles.'
            },
            {
                heading: 'Live Casino',
                body: 'Ladbrokes live casino is powered by Evolution and Playtech, with tables for blackjack, roulette, poker, and exclusive game shows like Crazy Time and Monopoly Live.'
            },
            {
                heading: 'Bingo',
                body: 'Ladbrokes Bingo offers a wide range of rooms including 90-ball, 75-ball, and speed bingo. Chat features and jackpot games make every session more exciting.'
            },
            {
                heading: 'Payment Methods',
                body: 'Ladbrokes accepts Visa, Mastercard, PayPal, Skrill, and bank transfer. Fast withdrawals and a fully secure environment for all financial transactions.'
            }
        ]
    },
    'buzz-bingo': {
        slug: 'buzz-bingo',
        logoSrc: '/sfb/brands/placeholder.png',
        logoAlt: 'Buzz Bingo',
        offerHeadline: '10 FREE SPINS No Deposit Required',
        trustBadges: ['No Deposit', 'No Wagering'],
        howToSteps: [
            '1. Click here to go to Buzz Bingo!',
            '2. Register your new account online',
            '3. Your 10 free spins are added automatically',
            '4. No deposit needed — start playing right away!'
        ],
        howToTermsText:
            'Buzz Bingo T&Cs apply. Click for more details.\n\n18+. New customers only. Register online to receive 10 free spins. No deposit required. T&Cs apply. BeGambleAware.org.',
        howToImageSrc: '/sfb/howtoclaim/landingpageimage.png',
        howToImageAlt: 'Buzz Bingo offer',
        ctaText: 'CLICK TO CLAIM →',
        ctaHref: '#',
        reviewIntro:
            'Buzz Bingo is the UK\'s leading bingo brand, combining a huge online presence with real-world Buzz Bingo clubs across the country. New players can claim 10 free spins with no deposit required.',
        reviewBody:
            'Buzz Bingo offers a lively, community-driven bingo experience both online and on the high street.\n\nFree Spins on Registration\n\nNew players get 10 free spins just for registering — no deposit, no wagering requirements.\n\nBingo and Slots Together\n\nBuzz Bingo blends traditional bingo rooms with a full slots lobby, so you can switch between bingo and your favourite slot games seamlessly.\n\nClub Network\n\nBuzz Bingo operates real clubs across the UK, giving players a true community feel both online and offline.',
        reviewSections: [
            {
                heading: 'Bingo Rooms',
                body: 'Buzz Bingo offers 90-ball, 75-ball, 52-ball, and speed bingo rooms. Free bingo, jackpot bingo, and exclusive online-only rooms run around the clock.'
            },
            {
                heading: 'Slots',
                body: 'The slots lobby at Buzz Bingo features games from Blueprint Gaming, IGT, Microgaming, and more. From classic fruit machines to modern video slots with big jackpots.'
            },
            {
                heading: 'Promotions',
                body: 'Buzz Bingo runs daily deals, free bingo sessions, and slot tournaments for existing players. The loyalty programme rewards regular players with extra bonuses and perks.'
            },
            {
                heading: 'Payment Methods',
                body: 'Buzz Bingo accepts Visa, Mastercard, PayPal, Apple Pay, and Paysafecard. Deposits and withdrawals are fast and fully secure.'
            }
        ]
    },
    'gala-bingo': {
        slug: 'gala-bingo',
        logoSrc: '/sfb/brands/placeholder.png',
        logoAlt: 'Gala Bingo',
        offerHeadline: '100 FREE SPINS For A Fiver',
        trustBadges: ['Spend: £5', '100 Free Spins'],
        howToSteps: [
            '1. Click here to go to Gala Bingo!',
            '2. Register your new account',
            '3. Deposit and spend £5 on bingo tickets',
            '4. Receive 100 free spins on selected games!'
        ],
        howToTermsText:
            'Gala Bingo T&Cs apply. Click for more details.\n\n18+. New customers only. Deposit & spend £5 to get 100 Free Spins on selected games. T&Cs apply. BeGambleAware.org.',
        howToImageSrc: '/sfb/howtoclaim/landingpageimage.png',
        howToImageAlt: 'Gala Bingo offer',
        ctaText: 'CLICK TO CLAIM →',
        ctaHref: '#',
        reviewIntro:
            'Gala Bingo is one of the UK\'s biggest and best-loved bingo brands. With a colourful site, generous welcome offer, and a huge range of bingo rooms and slots, Gala Bingo has something for everyone.',
        reviewBody:
            'Gala Bingo delivers a fun, polished bingo experience packed with games, promotions, and community features.\n\nSpend £5 Get 100 Spins\n\nNew players who deposit and spend £5 on bingo receive 100 free spins on selected slot games.\n\nTons of Bingo Rooms\n\nFrom 1p bingo to big-money jackpot rooms, Gala Bingo offers a wide variety of games to suit every budget.\n\nRegular Promotions\n\nGala Bingo runs daily, weekly, and seasonal promotions keeping the experience fresh for both new and loyal players.',
        reviewSections: [
            {
                heading: 'Bingo Rooms',
                body: 'Gala Bingo has dozens of rooms including Deal or No Deal Bingo, penny bingo, and exclusive jackpot rooms. 90-ball, 75-ball, and 52-ball formats all available.'
            },
            {
                heading: 'Slots',
                body: 'The Gala Bingo slots lobby features titles from leading providers including Playtech, NetEnt, and Microgaming. Jackpot slots and daily winners available.'
            },
            {
                heading: 'Chat and Community',
                body: 'Gala Bingo is famous for its lively chat rooms with friendly chat hosts, community events, and regular chat game prizes alongside standard bingo games.'
            },
            {
                heading: 'Payment Methods',
                body: 'Gala Bingo accepts Visa, Mastercard, PayPal, Skrill, and Neteller. Safe, fast deposits and withdrawals with no hidden fees.'
            }
        ]
    },
    'mrq': {
        slug: 'mrq',
        logoSrc: '/sfb/brands/placeholder.png',
        logoAlt: 'MrQ',
        offerHeadline: '10 FREE SPINS No Deposit & No Wagering',
        trustBadges: ['No Deposit', 'No Wagering'],
        howToSteps: [
            '1. Click here to go to MrQ!',
            '2. Register your new account',
            '3. Your 10 free spins are credited instantly',
            '4. Play Big Bass Q the Splash — no deposit, no wagering!'
        ],
        howToTermsText:
            'MrQ T&Cs apply. Click for more details.\n\n18+. New Customers Only. First 10 spins on Big Bass Q the Splash, no deposit required, no wagering requirements. T&Cs apply. BeGambleAware.org.',
        howToImageSrc: '/sfb/howtoclaim/landingpageimage.png',
        howToImageAlt: 'MrQ offer',
        ctaText: 'CLICK TO CLAIM →',
        ctaHref: '#',
        reviewIntro:
            'MrQ is a fresh, fair, and fully transparent UK casino and bingo site. With no wagering requirements on any bonus, MrQ makes it simple: what you win, you keep.',
        reviewBody:
            'MrQ has built a reputation for being one of the most player-friendly sites in the UK.\n\nZero Wagering Requirements\n\nEvery bonus at MrQ comes with zero wagering requirements — no confusing terms, just real winnings you can withdraw straight away.\n\nNo Deposit Spins\n\nNew players get 10 free spins on Big Bass Q the Splash with no deposit required.\n\nFair and Transparent\n\nMrQ publishes full pay-out statistics and keeps terms short and readable. A genuinely player-first brand.',
        reviewSections: [
            {
                heading: 'Bingo',
                body: 'MrQ offers a clean bingo lobby with 90-ball, 75-ball, and speed bingo options. Free bingo tickets are regularly available to all players.'
            },
            {
                heading: 'Slots',
                body: 'MrQ\'s slots selection covers top Pragmatic Play and Big Time Gaming titles. Highlights include Big Bass Bonanza, Reactoonz, and Bonanza Megaways.'
            },
            {
                heading: 'Promotions',
                body: 'MrQ keeps promotions simple and fair. No wagering bonuses, free tickets, and free spin drops are awarded regularly to active players.'
            },
            {
                heading: 'Payment Methods',
                body: 'MrQ supports Visa, Mastercard, PayPal, and bank transfer. Instant deposits and same-day withdrawals with no fees charged to players.'
            }
        ]
    },
    'sun-vegas': {
        slug: 'sun-vegas',
        logoSrc: '/sfb/brands/placeholder.png',
        logoAlt: 'Sun Vegas',
        offerHeadline: '110 FREE SPINS Updated Offer',
        trustBadges: ['Spend: £10', '110 Free Spins'],
        howToSteps: [
            '1. Click here to go to Sun Vegas!',
            '2. Register your new account today',
            '3. Make your first deposit of £10',
            '4. Receive 110 free spins on selected games!'
        ],
        howToTermsText:
            'Sun Vegas T&Cs apply. Click for more details.\n\n18+. New customers only. Register today and deposit £10 to receive 110 free spins on selected games. T&Cs apply. BeGambleAware.org.',
        howToImageSrc: '/sfb/howtoclaim/landingpageimage.png',
        howToImageAlt: 'Sun Vegas offer',
        ctaText: 'CLICK TO CLAIM →',
        ctaHref: '#',
        reviewIntro:
            'Sun Vegas is News UK\'s premium online casino, offering 110 free spins to new players who deposit £10. With a slick interface and hundreds of top-quality games, Sun Vegas is a strong choice for UK players.',
        reviewBody:
            'Sun Vegas combines trusted News UK brand recognition with a premium casino and bingo experience.\n\n110 Free Spins\n\nNew players who register and deposit £10 receive 110 free spins on selected slot games — a generous welcome to the site.\n\nPremium Game Library\n\nSun Vegas features games from the world\'s top studios including NetEnt, IGT, and Playtech, with new titles added regularly.\n\nSafe and Trusted\n\nBacked by News UK, Sun Vegas is fully licensed by the UK Gambling Commission with robust responsible gambling tools.',
        reviewSections: [
            {
                heading: 'Slots',
                body: 'Sun Vegas offers a broad slots selection from NetEnt, IGT, and Playtech. Featured titles include Starburst, Rainbow Riches, and Cleopatra, alongside daily jackpot games.'
            },
            {
                heading: 'Live Casino',
                body: 'Sun Vegas live casino features Evolution Gaming tables for roulette, blackjack, and baccarat, plus exclusive live game show titles.'
            },
            {
                heading: 'Promotions',
                body: 'Regular reload bonuses, free spin drops, and prize draws are available to Sun Vegas players. The VIP programme rewards the most loyal customers.'
            },
            {
                heading: 'Payment Methods',
                body: 'Sun Vegas accepts Visa, Mastercard, PayPal, Skrill, and Neteller. All transactions are secured with industry-standard encryption.'
            }
        ]
    },
    'sky-vegas': {
        slug: 'sky-vegas',
        logoSrc: '/sfb/brands/placeholder.png',
        logoAlt: 'Sky Vegas',
        offerHeadline: '70 FREE SPINS No Deposit & No Wagering',
        trustBadges: ['No Deposit', 'No Wagering'],
        howToSteps: [
            '1. Click here to go to Sky Vegas!',
            '2. Register and opt in to the offer',
            '3. Your 70 free spins are loaded on your first eligible game',
            '4. No deposit required — valid for 7 days!'
        ],
        howToTermsText:
            'Sky Vegas T&Cs apply. Click for more details.\n\n18+. New customers only. Opt-in required. 7-day free spin expiry. All free spins loaded on first eligible game. T&Cs apply. BeGambleAware.org.',
        howToImageSrc: '/sfb/howtoclaim/landingpageimage.png',
        howToImageAlt: 'Sky Vegas offer',
        ctaText: 'CLICK TO CLAIM →',
        ctaHref: '#',
        reviewIntro:
            'Sky Vegas is one of the UK\'s most popular online casinos, trusted by millions of players. New customers can claim 70 free spins with no deposit and no wagering requirements.',
        reviewBody:
            'Sky Vegas delivers a polished casino experience backed by the Sky brand that millions of UK customers already trust.\n\nNo Deposit Free Spins\n\nNew players receive 70 free spins with no deposit required. Opt in after registering and your spins are loaded directly on to your first eligible game.\n\nVast Game Selection\n\nSky Vegas hosts hundreds of slots, table games, and live casino options from the industry\'s leading studios.\n\nResponsible Gambling\n\nSky Vegas is a leader in responsible gambling tools with self-exclusion, deposit limits, and reality checks all built into the account dashboard.',
        reviewSections: [
            {
                heading: 'Slots',
                body: 'Sky Vegas has a massive slots library covering everything from classic three-reel fruit machines to the latest Megaways and cluster pays titles from top providers.'
            },
            {
                heading: 'Live Casino',
                body: 'Sky Vegas live casino runs 24/7 with tables hosted by professional dealers. Games include live roulette, live blackjack, live baccarat, and exclusive Sky game shows.'
            },
            {
                heading: 'Sky Rewards',
                body: 'Sky Vegas integrates with Sky\'s wider loyalty ecosystem. Earn points through play and redeem them across Sky products including TV and broadband.'
            },
            {
                heading: 'Payment Methods',
                body: 'Sky Vegas accepts Visa, Mastercard, PayPal, and bank transfer. Sky Bet account holders can use a shared wallet across all Sky products.'
            }
        ]
    },
    'glossy-bingo': {
        slug: 'glossy-bingo',
        logoSrc: '/sfb/brands/placeholder.png',
        logoAlt: 'Glossy Bingo',
        offerHeadline: '100 FREE SPINS Exclusive Offer',
        trustBadges: ['Deposit: £10', '100 Free Spins'],
        howToSteps: [
            '1. Click here to go to Glossy Bingo!',
            '2. Register your new account',
            '3. Make a minimum deposit of £10',
            '4. Receive 100 free spins — exclusive via Super Free Bingo!'
        ],
        howToTermsText:
            'Glossy Bingo T&Cs apply. Click for more details.\n\n18+. New players only. Min Dep £10. Each free spin value 5p. T&Cs apply. BeGambleAware.org.',
        howToImageSrc: '/sfb/howtoclaim/landingpageimage.png',
        howToImageAlt: 'Glossy Bingo offer',
        ctaText: 'CLICK TO CLAIM →',
        ctaHref: '#',
        reviewIntro:
            'Glossy Bingo is a stylish, modern bingo site with an exclusive 100 free spins offer available only through Super Free Bingo. Deposit just £10 and start spinning immediately.',
        reviewBody:
            'Glossy Bingo brings a glamorous, fashion-forward feel to online bingo with generous rewards for new players.\n\nExclusive 100 Free Spins\n\nThis 100 free spins offer (valued at 5p each) is exclusive to Super Free Bingo players — you won\'t find it elsewhere.\n\nChic Bingo Experience\n\nGlossy Bingo\'s sleek design and curated game selection make it a standout choice for players who want something a little different.\n\nOngoing Rewards\n\nBeyond the welcome offer, Glossy Bingo rewards loyal players with weekly free spins, bingo bonuses, and exclusive VIP promotions.',
        reviewSections: [
            {
                heading: 'Bingo Rooms',
                body: 'Glossy Bingo offers stylishly themed bingo rooms covering 90-ball, 75-ball, and speed bingo. Special jackpot rooms and seasonal events run throughout the year.'
            },
            {
                heading: 'Slots',
                body: 'The Glossy Bingo slots lobby features hand-picked titles from leading providers. Expect a curated mix of popular slots and exclusive titles not found on every site.'
            },
            {
                heading: 'Promotions',
                body: 'Glossy Bingo runs a rolling calendar of promotions including free spin drops, bingo bonuses, and weekly prize draws for both new and returning players.'
            },
            {
                heading: 'Payment Methods',
                body: 'Glossy Bingo accepts Visa, Mastercard, PayPal, and Apple Pay. Smooth, fast deposits and straightforward withdrawals with no surprise charges.'
            }
        ]
    }
};

export function getCasino(slug: string): CasinoPageData | undefined {
    return CASINOS[slug];
}
