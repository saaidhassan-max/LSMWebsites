import type { OfferCardProps } from '@lsm/ui/components/offer-card/offer-card.types';
import type { DirectoryItem } from '@lsm/ui/components/website-directory/website-directory.types';

export const directorySites: DirectoryItem[] = [
    { name: 'Betfair Casino' },
    { name: 'Ladbrokes' },
    { name: 'Sky Vegas' },
    { name: 'Sun Vegas' },
    { name: 'MrQ' },
    { name: 'Paddy Power' },
    { name: 'William Hill' },
    { name: 'Coral' },
    { name: 'Grosvenor Casino' },
    { name: 'Casumo' },
    { name: 'LeoVegas' }
];

export const legalText =
    'BeGambleAware.org — Free, confidential advice for anyone affected by problem gambling. Call the National Gambling Helpline: 0808 8020 133.\n\nLittle Star Media Ltd, Exchange House, 450 Midsummer Boulevard, Milton Keynes, MK9 2EA, United Kingdom\n\n©2026 Super Free Slot Games. All rights reserved. Unauthorised reproduction is a violation of applicable laws.';

export const offers: OfferCardProps[] = [
    {
        label: 'HOT EXCLUSIVE',
        labelColor: 'red',
        logoSrc: '/sfsg/brands/ladbrokes.png',
        logoAlt: 'Ladbrokes',
        offerMain: '50 FREE SPINS',
        details: [
            { emoji: '💸', text: 'No Deposit' },
            { emoji: '✅', text: 'No Wagering' }
        ],
        ctaText: 'CLICK TO CLAIM',
        ctaHref: '#',
        ctaVariant: 'tertiary',
        termsText:
            '18+. New Casino players only. 50 Free Spins (£0.10 each, selected games only, valid 7 days) awarded upon registration. For additional 150 Free Spins (£0.10 each, selected games only, valid 7 days) deposit (certain deposit types excluded) and bet £10+ on any Slot games within 30 days of registration. Restrictions and T&Cs apply. GambleAware.org.'
    },
    {
        label: 'EXCLUSIVE OFFER',
        labelColor: 'orange',
        logoSrc: '/sfsg/brands/coral.png',
        logoAlt: 'Coral',
        offerMain: '50 Free Spins',
        details: [
            { emoji: '💸', text: 'No Deposit' },
            { emoji: '✅', text: 'No Wagering' }
        ],
        ctaText: 'CLICK TO CLAIM',
        ctaHref: '#',
        ctaVariant: 'tertiary',
        termsText:
            '18+. New Casino players only. 50 Free Spins (£0.10 each, valid on selected games, valid 7 days) will be awarded upon registration. For the additional 150 Free Spins the customer must deposit (certain deposit types excluded) and Bet £10+ on Any Slot games (within 7 days of registration) for 150 free Spins (£0.10 each, valid on selected games, valid 7 days). Restrictions and T&Cs apply. GambleAware.org.'
    },
    {
        label: 'NO DEPOSIT OFFER',
        labelColor: 'orange',
        logoSrc: '/sfsg/brands/williamhill.png',
        logoAlt: 'William Hill',
        offerMain: '£20 BONUS',
        details: [
            { emoji: '💸', text: 'No Deposit' }
        ],
        ctaText: 'CLICK TO CLAIM',
        ctaHref: '#',
        ctaVariant: 'tertiary',
        termsText:
            '18+. Play Safe. Online only. For new UK registered players. Runs this month. Register with code V26 and opt in via the promo page to receive a £20 bonus for use on the promotion game. Bonus valid for 72h and subject to x10 wagering, which must be completed on the promo game within that 72h. Max redeemable winnings - £25. One per player. Ts&Cs apply. GambleAware.org #ad'
    },
    {
        label: 'NO DEPOSIT OFFER',
        labelColor: 'orange',
        logoSrc: '/sfsg/brands/sunbingo.png',
        logoAlt: 'Sun Bingo',
        offerMain: '10 FREE SPINS',
        details: [
            { emoji: '💳', text: '+ Spend £10' },
            { emoji: '🎰', text: 'Get 200 Free Spins' }
        ],
        ctaText: 'CLICK TO CLAIM',
        ctaHref: '#',
        ctaVariant: 'tertiary',
        termsText:
            '18+. New customers only. Register today to receive 10 Free Spins (accept within 48 hours & wager winnings 10x within 3 days), deposit & spend £10+ on Casino to receive 200 Free Spins on selected games (accept within 48 hours & wager winnings 10x within 3 days). Debit cards only. GamCare.org.uk'
    },
    {
        label: 'NO DEPOSIT NO WAGERING',
        labelColor: 'red',
        logoSrc: '/sfsg/brands/skyvegas.png',
        logoAlt: 'Sky Vegas',
        offerMain: '70 FREE SPINS',
        details: [
            { emoji: '💸', text: 'No Deposit' },
            { emoji: '✅', text: 'No Wagering' }
        ],
        ctaText: 'CLICK TO CLAIM',
        ctaHref: '#',
        ctaVariant: 'tertiary',
        termsText:
            '18+ new customers only. Opt-in required. 7-day Free Spin expiry. All Free Spins will be loaded on the first eligible game selected. Game and eligibility restrictions apply. Further T&Cs apply. gambleaware.org'
    },
    {
        label: 'NO WAGERING',
        labelColor: 'orange',
        logoSrc: '/sfsg/brands/gala.png',
        logoAlt: 'Gala Bingo',
        offerMain: '100 FREE SPINS',
        details: [
            { emoji: '💳', text: 'Spend: £5' },
            { emoji: '💳', text: '+ £10 Casino Bonus' }
        ],
        ctaText: 'CLICK TO CLAIM',
        ctaHref: '#',
        ctaVariant: 'tertiary',
        termsText:
            '18+. New customers only. Deposit & Spend £5 on selected slots within 7 days of acc. regist. to get a £10 Casino Bonus (max stake £2, valid 7 days, 10x wag) and 100 Free Spins (£0.10 each, valid on selected games, claim within 7 days, valid 7 days). Restrictions & T&Cs apply. GambleAware.org'
    },
    {
        label: 'EASY TO CLAIM',
        labelColor: 'orange',
        logoSrc: '/sfsg/brands/mrq.png',
        logoAlt: 'MrQ',
        offerMain: '10 FREE SPINS',
        details: [
            { emoji: '💸', text: 'No Deposit' },
            { emoji: '✅', text: 'No Wagering' }
        ],
        ctaText: 'CLICK TO CLAIM',
        ctaHref: '#',
        ctaVariant: 'tertiary',
        termsText:
            '18+. New Customers Only. First 10 spins: Players who have successfully completed age verification will be credited 10 Free Spins on Big Bass Q the Splash 10p per spin, no deposit required, no wagering requirements. Full T&Cs Apply. GambleAware.org. #ad'
    },
    {
        label: 'UPDATED OFFER',
        labelColor: 'blue',
        logoSrc: '/sfsg/brands/boylecasino.png',
        logoAlt: 'BoyleSports Casino',
        offerMain: 'Up To 100 Free Spins',
        details: [
            { emoji: '✅', text: 'No Wagering' },
            { emoji: '✅', text: '+ Weekly Tournaments!' }
        ],
        ctaText: 'CLICK TO CLAIM',
        ctaHref: '#',
        ctaVariant: 'tertiary',
        termsText:
            '18+. Opt in. Acc. games, & payment restrictions apply. 100 Free Spins (FS): Exp. 01.12.26. New UK/ROI gaming players. Same day min. stake req. (€/£ 20/50/100 to get 20/50/100 FS) by 23:59. FS Values £/€0.10. FS valid 72h. Lucky Rush: 06/03/26 - 17/01/27. Min. stake €0.10. Prize paid in GBP/EUR. Win-to-bet ratio points awarded per spin. Points lost if player leaves. Min. 1 point to qualify. Opt into each leaderboard separately. 1 real-money spin to enter. T&Cs Apply'
    },
    {
        label: 'DAILY REWARDS',
        labelColor: 'blue',
        logoSrc: '/sfsg/brands/betfaircasino.png',
        logoAlt: 'Betfair Casino',
        offerMain: '50 FREE SPINS',
        details: [
            { emoji: '💸', text: 'No Deposit' },
            { emoji: '✅', text: 'No Wagering' }
        ],
        ctaText: 'CLICK TO CLAIM',
        ctaHref: '#',
        ctaVariant: 'tertiary',
        termsText:
            '18+. Offer is available to new customers who register via the promo code CASAFS. Winnings are paid in cash. Free spins valued at 10p. Get an additional 100 free spins when you deposit and spend £10 on eligible games. Full T&Cs apply. GambleAware.org.'
    },
    {
        label: 'DAILY REWARDS',
        labelColor: 'blue',
        logoSrc: '/sfsg/brands/betfred.png',
        logoAlt: 'Betfred',
        offerMain: 'Up to 50 FREE SPINS',
        details: [
            { emoji: '💸', text: 'NO DEPOSIT' }
        ],
        ctaText: 'CLICK TO CLAIM',
        ctaHref: '#',
        ctaVariant: 'tertiary',
        termsText:
            '18+ 00:00 – 23:59 daily. Available once per customer, per day. Free Spins rewards vary. Max 50. £0.10 per spin on selected games. Claim by 23:59. Same day expiry. Max winnings £10. Game restrictions & T&Cs Apply. GambleAware.org'
    },
    {
        label: 'UPGRADED OFFER',
        labelColor: 'blue',
        logoSrc: '/sfsg/brands/sunvegas.png',
        logoAlt: 'The Sun Vegas',
        offerMain: '10 FREE SPINS',
        details: [
            { emoji: '💸', text: 'NO DEPOSIT' },
            { emoji: '🎰', text: '+100 Free Spins' }
        ],
        ctaText: 'CLICK TO CLAIM',
        ctaHref: '#',
        ctaVariant: 'tertiary',
        termsText:
            '18+. . New customers only. Register today to receive 10 free spins on selected games (accept within 48hrs & use within 3 days), plus deposit & spend £10 to receive 100 free spins on selected games (accept within 48hrs & wager winnings 10x within 3 days). Debit cards only. Offer Ends 31.01.27. T&Cs Apply. GamCare.org.uk'
    },
    {
        label: 'NO DEPOSIT OFFER',
        labelColor: 'orange',
        logoSrc: '/sfsg/brands/888casino.png',
        logoAlt: '888 Casino',
        offerMain: '50 FREE SPINS',
        details: [
            { emoji: '💸', text: 'No Deposit' }
        ],
        ctaText: 'CLICK TO CLAIM',
        ctaHref: '#',
        ctaVariant: 'tertiary',
        termsText:
            '18+. UK new customers only; re-registrations excluded. Claim Free Spins [FS] (£0.10 each) within 48h; valid 3 days on selected games (excl. JP). FS wins converted to Bonus and must be wagered 10x within 90 days to withdraw. Max withdrawal £100. One per person. T&Cs apply. GambleAware.org. #ad'
    },
    {
        label: 'UPGRADED OFFER',
        labelColor: 'blue',
        logoSrc: '/sfsg/brands/glossybingo.png',
        logoAlt: 'Glossy Bingo',
        offerMain: '100 FREE SPINS',
        details: [
            { emoji: '💳', text: 'Deposit: £10' }
        ],
        ctaText: 'CLICK TO CLAIM',
        ctaHref: '#',
        ctaVariant: 'tertiary',
        termsText:
            '18+. New players only. Min Dep £10. Each free spin value 5p. Free spins wins paid to casino bonus. Offer valid 48 hours after registration. Debit cards only. 3x bingo, 10x casino wagering required. Game weighting applies. 2-day bonus expiry. T&Cs apply.GambleAware.org.'
    },
    {
        label: 'NO WAGERING',
        labelColor: 'orange',
        logoSrc: '/sfsg/brands/betfred.png',
        logoAlt: 'Betfred',
        offerMain: '200 FREE SPINS',
        details: [
            { emoji: '💳', text: 'Spend: £10' },
            { emoji: '🎰', text: 'Code: SPINS' }
        ],
        ctaText: 'CLICK TO CLAIM',
        ctaHref: '#',
        ctaVariant: 'tertiary',
        termsText:
            '18+. New customers only. Register and enter promo code SPINS prior to deposit. Deposit, using a Debit Card, and stake £10+ within 14 days on Slots at Betfred Games and/or Vegas to get 200 Free Spins on selected titles. £0.10 per spin. Credited within 48 hours and valid for 7 days.T&Cs apply. GambleAware.org'
    },
    {
        label: 'UPDATED OFFER',
        labelColor: 'blue',
        logoSrc: '/sfsg/brands/mecca.png',
        logoAlt: 'Mecca',
        offerMain: '50 FREE SPINS',
        details: [
            { emoji: '💳', text: 'Spend: £5' }
        ],
        ctaText: 'CLICK TO CLAIM',
        ctaHref: '#',
        ctaVariant: 'tertiary',
        termsText:
            '18+. New players. Dep (exc. Paypal & Paysafe) & spend £5 on select slots for free spins. PromoT&Cs apply. GambleAware.org.'
    },
    {
        label: 'MEGA BONUS',
        labelColor: 'orange',
        logoSrc: '/sfsg/brands/foxybingo.png',
        logoAlt: 'Foxy Bingo',
        offerMain: '100 FREE SPINS',
        details: [
            { emoji: '💳', text: 'Spend: £10' }
        ],
        ctaText: 'CLICK TO CLAIM',
        ctaHref: '#',
        ctaVariant: 'tertiary',
        termsText:
            '18+. New Customers Only. Deposit & Spend £10 on any Casino or Slot games for 100 Free Spins (selected games, value £0.10 each, claim within 7 days, valid 7 days). T&Cs apply. GambleAware.org.'
    },
    {
        label: 'EASY TO CLAIM',
        labelColor: 'orange',
        logoSrc: '/sfsg/brands/888ladies.png',
        logoAlt: '888 Ladies',
        offerMain: '50 FREE SPINS',
        details: [
            { emoji: '💳', text: 'Deposit: £10' }
        ],
        ctaText: 'CLICK TO CLAIM',
        ctaHref: '#',
        ctaVariant: 'tertiary',
        termsText:
            '18+. New players only. Min dep £10. Each free spin value 25p. Wins cap £25 & paid to games bonus. 10x games bonus wagering required. 5-day expiry. GambleAware. T&Cs apply.'
    },
    {
        label: 'HOT EXCLUSIVE',
        labelColor: 'red',
        logoSrc: '/sfsg/brands/luckypantsbingo.png',
        logoAlt: 'Lucky Pants Bingo',
        offerMain: '100 FREE SPINS',
        details: [
            { emoji: '💳', text: 'Deposit: £10' }
        ],
        ctaText: 'CLICK TO CLAIM',
        ctaHref: '#',
        ctaVariant: 'tertiary',
        termsText:
            '18+. New players. Dep (exc. PayPal & Paysafe) & spend min £10 on a selected slot for spins or in Main Event Bingo for bonus. Wagering & max wins apply. Individual promo T&C\'s apply. GambleAware.org'
    },
    {
        label: 'UPGRADED OFFER',
        labelColor: 'blue',
        logoSrc: '/sfsg/brands/williamhill.png',
        logoAlt: 'William Hill',
        offerMain: '200 FREE SPINS',
        details: [
            { emoji: '💳', text: 'Spend: £10' }
        ],
        ctaText: 'CLICK TO CLAIM',
        ctaHref: '#',
        ctaVariant: 'tertiary',
        termsText:
            '18+. Play Safe. Ends 31/12/26. New UK customers only. Register with code WHV200, opt in via promo page and within 7 days deposit £10+ & stake £10+ from main balance on the advertised game to receive 200 Free Spins (10p each). Free Spins expire 72 hours from credit. Free Spins winnings must be wagered 10x on the advertised game within the same period. Winnings capped at £30. 1 per person. T&Cs apply. gambleaware.org. #ad'
    },
    {
        label: 'UPDATED OFFER',
        labelColor: 'blue',
        logoSrc: '/sfsg/brands/dottybingo.png',
        logoAlt: 'Dotty Bingo',
        offerMain: '50 FREE SPINS',
        details: [
            { emoji: '💳', text: 'Deposit: £10' }
        ],
        ctaText: 'CLICK TO CLAIM',
        ctaHref: '#',
        ctaVariant: 'tertiary',
        termsText:
            '18+ New players only. Min deposit £10. Each free spin value 10p. Free spins wins paid to casino bonus. Offer valid 48 hours after registration. Debit cards only. 3x bingo, 10x casino wagering required. Game weighting applies. 2-day bonus expiry. T&Cs apply. GambleAware.org.'
    },
    {
        label: 'UPGRADED OFFER',
        labelColor: 'blue',
        logoSrc: '/sfsg/brands/lottomartgames.png',
        logoAlt: 'Lottomart Games',
        offerMain: 'Up to 500 FREE SPINS',
        details: [
            { emoji: '💳', text: 'Spend: £10' }
        ],
        ctaText: 'CLICK TO CLAIM',
        ctaHref: '#',
        ctaVariant: 'tertiary',
        termsText:
            '18+. New players only. Opt-in required. Min. £10 cash stakes on slots to qualify. Prize Wheel must be used & Free Spins claimed within 4 days. Free Spins must be played within 24 hours of claim. Free Spin winnings credited as cash. Max 1x claim. Full prize list in main terms. GambleAware.org. Further T&Cs apply.'
    },
    {
        label: 'NO WAGERING',
        labelColor: 'orange',
        logoSrc: '/sfsg/brands/mrq.png',
        logoAlt: 'MrQ',
        offerMain: '200 FREE SPINS',
        details: [
            { emoji: '✅', text: 'NO WAGERING' }
        ],
        ctaText: 'CLICK TO CLAIM',
        ctaHref: '#',
        ctaVariant: 'tertiary',
        termsText:
            '18+. First deposit only. Min deposit & spend £10. Max 200 spins on Fishin’ Frenzy Even Bigger Fish 3 Megaways Rapid Fire. 10p per spin. Spins credited upon spend of £10. Full T&Cs apply. GambleAware.org #ad'
    },
    {
        label: 'HOT EXCLUSIVE',
        labelColor: 'red',
        logoSrc: '/sfsg/brands/bwin.png',
        logoAlt: 'bwin',
        offerMain: '100 FREE SPINS',
        details: [
            { emoji: '💳', text: 'Spend: £10' }
        ],
        ctaText: 'CLICK TO CLAIM',
        ctaHref: '#',
        ctaVariant: 'tertiary',
        termsText:
            '18+. UK only. From 17.02.2025. New Casino players only. Deposit (certain types excluded) and Bet £10+ on qualifying games to get 100 Free Spins (selected games, value £0.10 each, 48 hrs to accept, valid for 7 days). Restrictions and T&Cs apply.'
    },
    {
        label: 'NO WAGERING',
        labelColor: 'orange',
        logoSrc: '/sfsg/brands/midnite.png',
        logoAlt: 'Midnite',
        offerMain: '100 FREE SPINS',
        details: [
            { emoji: '💳', text: 'Spend: £20' },
            { emoji: '✅', text: 'No Wagering' }
        ],
        ctaText: 'CLICK TO CLAIM',
        ctaHref: '#',
        ctaVariant: 'tertiary',
        termsText:
            '18+ New customers only. Wager £20 or more on Midnite Casino within 14 days of sign-up. Get 100 Free Spins to use on selected games, valued at 10p and valid for 7 days. T&Cs apply. BeGambleAware.org'
    },
    {
        label: 'NO WAGERING',
        labelColor: 'orange',
        logoSrc: '/sfsg/brands/heartbingo.png',
        logoAlt: 'Heart Bingo',
        offerMain: '100 FREE SPINS',
        details: [
            { emoji: '💳', text: 'Spend: £10' }
        ],
        ctaText: 'CLICK TO CLAIM',
        ctaHref: '#',
        ctaVariant: 'tertiary',
        termsText:
            '18+ New Customers. Opt in. Deposit & play £10 on any Slot game within 7 days. Get 100 Free Spins on Make Me a Millionaire Slot Game. Rewards expire after 7 days. T&Cs apply. GambleAware.org. Please gamble responsibly'
    },
    {
        label: 'UPDATED OFFER',
        labelColor: 'blue',
        logoSrc: '/sfsg/brands/32red.png',
        logoAlt: '32Red',
        offerMain: '200 FREE SPINS',
        details: [
            { emoji: '💳', text: 'Deposit: £20' }
        ],
        ctaText: 'CLICK TO CLAIM',
        ctaHref: '#',
        ctaVariant: 'tertiary',
        termsText:
            '18+ | GambleAware.org. New GB customers only. Opt in and play within 7 days of registration. Deposit & stake £20 on Slots to qualify for 200 x £0.10 Free Spins on Cube Contained. Claim Spins within 48 hours of qualifying. Free Spins expire 30 days after claiming. 10x wagering on Free Spins winnings. Debit card or instant bank transfer only. Geographical restrictions and T&Cs apply.'
    },
    {
        label: 'NO WAGERING',
        labelColor: 'orange',
        logoSrc: '/sfsg/brands/galaspins.png',
        logoAlt: 'Gala Spins',
        offerMain: '100 FREE SPINS',
        details: [
            { emoji: '💳', text: 'Spend: £10' }
        ],
        ctaText: 'CLICK TO CLAIM',
        ctaHref: '#',
        ctaVariant: 'tertiary',
        termsText:
            '18+. New customers only. Min 1st Deposit £10. Deposit & Spend £10 on Slots & get 100 Free Spins (£0.10 each, valid for 7 days, selected games). Deposit & Spend £10 on Bingo & get £10 Bingo Bonus (2 x wag, valid for 7 days). Claim within 7 days from reg. Player restrictions and T&Cs apply. GambleAware.org.'
    },
    {
        label: 'NEW BRAND',
        labelColor: 'red',
        logoSrc: '/sfsg/brands/megawayscasino.png',
        logoAlt: 'Megaways Casino',
        offerMain: 'Up to £120 BONUS',
        details: [
            { emoji: '🎰', text: '+ 50 FREE SPINS' },
            { emoji: '💳', text: 'Deposit: £10' }
        ],
        ctaText: 'CLICK TO CLAIM',
        ctaHref: '#',
        ctaVariant: 'tertiary',
        termsText:
            '18+. First Deposit Only. Min. deposit: £10, max. Bonus £120. Game: Fishing Frenzy Big Catch Megaways, Spin Value: £0.10, Max Free Spins: 50. WR of 10x Bonus amount and Free Spin winnings amount (only Slots count) within 30 days. Max bet is 10% (min £0.10) of the free spin winnings and bonus amount or £5 (lowest amount applies). Free Spins must be used before deposited funds. This offer is only available for specific players that have been selected by Megaways Casino. If you have arrived on this page not via the designated offer via Megaways Casino you will not be eligible for the offer. Spins must be used and/or Bonus must be claimed before using deposited funds. Deposit/Welcome Bonus can only be claimed once every 72 hours across all Casinos. Bonus Policy applies. T&Cs apply. GambleAware.org.'
    },
    {
        label: 'NO WAGERING',
        labelColor: 'orange',
        logoSrc: '/sfsg/brands/mrq.png',
        logoAlt: 'MrQ',
        offerMain: 'Up To 300 FREE Spins',
        details: [
            { emoji: '✅', text: 'No Wagering' }
        ],
        ctaText: 'CLICK TO CLAIM',
        ctaHref: '#',
        ctaVariant: 'tertiary',
        termsText:
            'New customers only. Up to 300 spins over 3 day period from first deposit & spend of £10. Max 100 spins each day on Fishin\' BIGGER Pots of Gold at 10p per spin for 3 consecutive days. Deposit & spend £10 each day for 100 spins. Spins credited upon spend of £10 each day. 18+. Full T&Cs apply. #ad'
    },
    {
        label: 'NEW BRAND',
        labelColor: 'red',
        logoSrc: '/sfsg/brands/kittybingo.png',
        logoAlt: 'Kitty Bingo',
        offerMain: '100 FREE SPINS',
        details: [
            { emoji: '💳', text: 'Spend: £10' }
        ],
        ctaText: 'CLICK TO CLAIM',
        ctaHref: '#',
        ctaVariant: 'tertiary',
        termsText:
            '18+. New players. Dep (exc. PayPal & Paysafe) & spend min £10 on a selected slot for spins or in Main Event Bingo for bonus. Wagering & max wins apply. Individual promo T&Cs Apply.'
    },
    {
        label: 'NO DEPOSIT OFFER',
        labelColor: 'orange',
        logoSrc: '/sfsg/brands/paddypowergames.png',
        logoAlt: 'Paddy Power Games',
        offerMain: '60 FREE SPINS',
        details: [
            { emoji: '💳', text: '+ Spend £10' },
            { emoji: '🎰', text: 'Get 200 Free Spins' }
        ],
        ctaText: 'CLICK TO CLAIM',
        ctaHref: '#',
        ctaVariant: 'tertiary',
        termsText:
            '18+. New customers only. Enjoy 50 Free Spins on any of the eligible slot games + 10 Free Spins on Paddy’s Mansion Heist. Claim your 50 Free spins from your promotional hub. Next, enjoy your 10 Free spins on Paddy’s Mansion Heist (Awarded in the form of a £1 bonus). Free Spins expire after 7 days. T&Cs apply. GambleAware.org.'
    },
    {
        label: 'NEW BRAND',
        labelColor: 'red',
        logoSrc: '/sfsg/brands/lottogo.png',
        logoAlt: 'LottoGo',
        offerMain: '£10 BONUS CASH',
        details: [
            { emoji: '💳', text: 'Deposit: £5' },
            { emoji: '🎰', text: '+ 50 FREE SPINS' }
        ],
        ctaText: 'CLICK TO CLAIM',
        ctaHref: '#',
        ctaVariant: 'tertiary',
        termsText:
            '18+. New Players Only. 10x Wagering in 7 days, Max Bet £5, Max Win applies., Spin value £0.1 each. Terms & Conditions Apply. GambleAware.org.'
    },
    {
        label: 'UPGRADED OFFER',
        labelColor: 'blue',
        logoSrc: '/sfsg/brands/bet365casino.png',
        logoAlt: 'bet365 Games',
        offerMain: 'Up To 500 FREE SPINS',
        details: [
            { emoji: '💳', text: 'Deposit: £10' }
        ],
        ctaText: 'CLICK TO CLAIM',
        ctaHref: '#',
        ctaVariant: 'tertiary',
        termsText:
            'Min. £10 in lifetime deposits required. Offer must be claimed within 30 days of registering a bet365 account. Select prizes of 5, 10, 20 or 50 Free Spins; 10 selections available within 20 days, 24 hours between each selection. Max. prize, game restrictions, time limits and T&Cs apply.'
    },
    {
        label: 'NO WAGERING',
        labelColor: 'orange',
        logoSrc: '/sfsg/brands/kwiff.png',
        logoAlt: 'kwiff',
        offerMain: '200 FREE SPINS',
        details: [
            { emoji: '💳', text: 'Spend: £20' }
        ],
        ctaText: 'CLICK TO CLAIM',
        ctaHref: '#',
        ctaVariant: 'tertiary',
        termsText:
            '18+. Wager £20 cash on slots within 5 days of first deposit and Get 200 Free Spins on Book of Dead. £0.10 per spin. £250 total max withdrawal. E-wallets and virtual cards excluded. New customers only. Full T&Cs apply. Gamble Responsibly. GambleAware.org.'
    },
    {
        label: 'KEEP WHAT YOU WIN',
        labelColor: 'blue',
        logoSrc: '/sfsg/brands/mrvegas.png',
        logoAlt: 'Mr Vegas',
        offerMain: '11 WAGER-FREE SPINS',
        details: [
            { emoji: '💳', text: 'Spend: £10' },
            { emoji: '💳', text: 'Play: £10' }
        ],
        ctaText: 'CLICK TO CLAIM',
        ctaHref: '#',
        ctaVariant: 'tertiary',
        termsText:
            '18+. New players only. Minimum deposit £10. Free spins are only valid for Pink Elephants 2 game. Welcome Deposit Bonus wagering requirement: 35x. Maximum available Bonus £ 200. Play Responsibly. Full T&Cs apply. MrVegas is operated by Videoslots Ltd as licensed by UKGC under account 39380. GambleAware.org.'
    },
    {
        label: 'NEW BRAND',
        labelColor: 'red',
        logoSrc: '/sfsg/brands/losvegas.png',
        logoAlt: 'Los Vegas',
        offerMain: 'UP TO 140 FREE SPINS',
        details: [
            { emoji: '💳', text: 'Deposit: £25' }
        ],
        ctaText: 'CLICK TO CLAIM',
        ctaHref: '#',
        ctaVariant: 'tertiary',
        termsText:
            '18+. Welcome offer for new players residing in Great Britain only. Opt in to the offer and deposit £25 for the first time to get up to 140 Free Spins (20 Free Spins per day for 7 consecutive days on selected games). Free Spins must be manually claimed each day during the 7-day period via the pop-up. Unclaimed spins expire at midnight and do not roll over. Once claimed, Free Spins expire after 3 days. Failure to log in forfeits that day\'s Free Spins only; eligibility for future days is unaffected. Free spin value: £0.1. Maximum Free Spins winnings: £100/day. Winnings from Free Spins are credited as bonus money, subject to a 10x wagering requirement, and expire after 7 days if the wagering requirement is not met. Some games may not be played with bonus funds. One bonus allowed per person, address, device, IP. Own payment methods only. Play Responsibly! T&Cs Apply. GambleAware.org.'
    },
    {
        label: 'NEW BRAND',
        labelColor: 'red',
        logoSrc: '/sfsg/brands/mrben.png',
        logoAlt: 'MrBen',
        offerMain: 'Up To £100 Bonus',
        details: [
            { emoji: '✅', text: '+ 500 Loyalty Points' },
            { emoji: '💳', text: 'Deposit: £20' }
        ],
        ctaText: 'CLICK TO CLAIM',
        ctaHref: '#',
        ctaVariant: 'tertiary',
        termsText:
            '18+. New players only. Opt in required. Min deposit £20. Offer is 50% match bonus up to £100 on your 1st deposit. Bonus funds are separate to cash funds and subject to 10x wagering requirement. Only bonus funds count towards wagering contribution. £5 bonus max bet. Bonus funds must be used within 30 days, Affordability checks apply. Terms Apply. BeGambleAware.org'
    },
    {
        label: 'BIG BASS BONANZA SPINS',
        labelColor: 'blue',
        logoSrc: '/sfsg/brands/casumo.png',
        logoAlt: 'Casumo',
        offerMain: '£30 BONUS',
        details: [
            { emoji: '💳', text: 'Deposit: £20' }
        ],
        ctaText: 'CLICK TO CLAIM',
        ctaHref: '#',
        ctaVariant: 'tertiary',
        termsText:
            '18+. New customers only. Opt-in required. 50% Deposit Bonus up to £100 on first deposit. Min deposit £20. 10x wagering on bonus amount. Max £5 per bet. Bonus valid for 7 days. Game, play and payment method restrictions apply. Play responsibly • BeGambleAware.org'
    },
    {
        label: 'UPDATED OFFER',
        labelColor: 'blue',
        logoSrc: '/sfsg/brands/sunvegas.png',
        logoAlt: 'The Sun Vegas',
        offerMain: '100 Free Spins',
        details: [
            { emoji: '💳', text: '+100% Deposit Match' },
            { emoji: '💳', text: 'On Your First Deposit' }
        ],
        ctaText: 'CLICK TO CLAIM',
        ctaHref: '#',
        ctaVariant: 'tertiary',
        termsText:
            '18+. New customers only. Min deposit £10 for 100% deposit match bonus up to £100 on selected games (accept within 48 hrs & wager bonus 10x within 3 days) and 100 Free Spins on selected games (accept within 48hrs & wager winnings 10x within 3 days). Debit cards only. Offer Ends 31.01.27. T&Cs Apply. GamCare.org.uk. GambleAware.org.'
    }
];

export const landingOfferInstructionText =
    "You're one step away from the latest free spins & no-deposit offers! Sign up below for our FREE updates!";

export const signupLegalDisclaimer =
    'New Customers Only. 18+ Full T&Cs apply. BeGambleAware.org.';
