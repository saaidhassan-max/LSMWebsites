import type { OfferCardProps } from '@lsm/ui/components/offer-card/offer-card.types';
import type { DirectoryItem } from '@lsm/ui/components/website-directory/website-directory.types';

export const directorySites: DirectoryItem[] = [
    { name: 'Borgata' },
    { name: 'FanDuel Casino' },
    { name: 'BetMGM' },
    { name: 'BetRivers' },
    { name: 'Golden Nugget' },
    { name: 'Bally Bet' },
    { name: 'PlayStar' },
    { name: 'Hard Rock Bet' },
    { name: 'Wheel of Fortune Casino' }
];

export const legalText =
    'Bet with your head, not over it. If you or someone you know has a gambling problem and needs help, call 1-800-GAMBLER (IL/KY/MD/NJ/MI/PA/WV), 1-800-NEXT-STEP (AZ), 1-800-522-4700 (CO), 1-800-9-WITH-IT (IN), 1-800-BETS OFF (IA), 1-800-522-4700 (KS/WY), 1-877-770-STOP (LA), 1-800-327-5050 (MA), 1-888-777-9696 (MS) 1-877-8-HOPENY (NY), 1-800-589-9966 (OH), 1-800-889-9789 (TN) or 1-888-532-3500 (VA), or visit National Council on Problem Gambling.\n\n©2026 Super Free Bets NJ All rights reserved. Unauthorized duplication is a violation of applicable laws.';

export const offers: OfferCardProps[] = [
    {
        label: 'HOT OFFER',
        labelColor: 'orange',
        logoSrc: '/sfbets/brands/placeholder.png',
        logoAlt: 'Borgata',
        offerMain: 'Win up to 1,000 Bonus Spins on the House',
        details: [
            { emoji: '', text: '+ A 100% Deposit Match up to $500' },
            { emoji: '', text: 'When You Deposit $10 & Spin the Wheel' }
        ],
        ctaText: 'CLICK TO CLAIM',
        ctaHref: '#',
        ctaVariant: 'tertiary',
        termsText:
            'Gambling Problem? Call 1-800-GAMBLER. Must be 21+. NJ and PA only. Please Gamble Responsibly. Visit BorgataOnline.com for Terms and Conditions. All promotions are subject to qualification and eligibility requirements. Rewards issued as non-withdrawable site credit/Bonus Bets unless otherwise provided in the applicable terms. Rewards subject to expiry.'
    },
    {
        showLabel: false,
        logoSrc: '/sfbets/brands/placeholder.png',
        logoAlt: 'FanDuel Casino',
        offerMain: '1,000 Bonus Spins',
        details: [
            { emoji: '', text: 'Deposit: $5' },
            { emoji: '', text: '$25 Casino Bonus' }
        ],
        ctaText: 'CLICK TO CLAIM',
        ctaHref: '#',
        ctaVariant: 'tertiary',
        termsText:
            'Gambling Problem? Call 1-800-GAMBLER. 21+ and present in MI, NJ, PA, or WV. $5 first deposit req. Must not have previously placed any wager on FanDuel Sportsbook, FanDuel Casino, Betfair Casino or Mohegan Sun Casino. For Bonus Spins offer: Bonus issued as non-withdrawable bonus spins that expire 3 days after receipt. Bonus spins are received in increments of 50 and may only be used in the state of first deposit and on select games. For Casino Bonus offer: Bonus issued as non-withdrawable Casino site credit that expires 7 days after receipt. Restrictions apply. To see terms for both offers, including eligible games, visit fanduel.com/casino. © 2026 Light and Wonder. All rights reserved.'
    },
    {
        label: 'EXCLUSIVE BETMGM BONUS',
        labelColor: 'orange',
        logoSrc: '/sfbets/brands/betmgm.png',
        logoAlt: 'BetMGM',
        offerMain: 'Deposit for up to 1000 Bonus Spins',
        details: [
            { emoji: '', text: 'Take on the Wheel for more' },
            { emoji: '', text: 'Bonus Code: SFBNJ' }
        ],
        ctaText: 'CLICK TO CLAIM',
        ctaHref: '#',
        ctaVariant: 'tertiary',
        termsText:
            'Visit BetMGM.com for Terms and Conditions. 21+ years of age or older to wager. MI, NJ, PA or WV only. Excludes Michigan Disassociated Persons. All promotions are subject to qualification and eligibility requirements. Rewards issued as non-withdrawable site credit, unless otherwise provided in the applicable Terms. Please Gamble Responsibly. Gambling Problem? 1-800-270-7117 for confidential help (MI), 1-800-GAMBLER (NJ, PA & WV). #ad'
    },
    {
        label: 'EPIC DEAL',
        labelColor: 'orange',
        logoSrc: '/sfbets/brands/placeholder.png',
        logoAlt: 'BetRivers',
        offerMain: 'Up To $500 Back',
        details: [
            { emoji: '', text: 'When You Deposit $10' },
            { emoji: '', text: '+ Up To 500 Bonus Spins' }
        ],
        ctaText: 'CLICK TO CLAIM',
        ctaHref: '#',
        ctaVariant: 'tertiary',
        termsText:
            'Steps to Claim: 1. Click \'Claim Now\' | 2. Click \'Play Now\' | 3. Sign Up | 4. Deposit $10+ and enjoy up to $500 in Bonus Money on your first deposit plus up to 500 Bonus Spins (Bonus Spins only available on eligible games, 10 consecutive daily logins required to receive all spins) | T&Cs apply, new players only, 21+. Promo code: CASINOBACK'
    },
    {
        label: 'HOT OFFER',
        labelColor: 'orange',
        logoSrc: '/sfbets/brands/placeholder.png',
        logoAlt: 'Golden Nugget',
        offerMain: 'Get 500 Spins Over 10 Days',
        details: [
            { emoji: '', text: 'Play $5' }
        ],
        ctaText: 'CLICK TO CLAIM',
        ctaHref: '#',
        ctaVariant: 'tertiary',
        termsText:
            'Gambling problem? Call 1-800-GAMBLER(MI/NJ/PA/WV). 21+. Physically present in MI/NJ/PA/WV only. Void in ONT/AB. Eligibility restrictions apply. Please play responsibly. 1 per new customer. Opt-in req. Min. $5 in wagers req. Max. 500 Flex Spins issued for choice of Select Games. Spins issued as 50 Spins per day upon login for 10 days. Spins are non-withdrawable, single-use, and expire 24 hours after choosing Select Game. Spins allotment is locked to choice of select game until expired. $0.20 per Spin. Game availability may vary. Terms: goldennuggetcasino.com/promos. Ends 11/29/26 at 11:59 PM ET.'
    },
    {
        label: 'EPIC DEAL',
        labelColor: 'orange',
        logoSrc: '/sfbets/brands/placeholder.png',
        logoAlt: 'Bally Bet',
        offerMain: 'Up To $500 Reload Bonus',
        details: [
            { emoji: '', text: 'On Your First Deposit' }
        ],
        ctaText: 'CLICK TO CLAIM',
        ctaHref: '#',
        ctaVariant: 'tertiary',
        termsText:
            'Steps To Claim: 1. Tap \'Claim Now\' | 2. Sign Up | 3. Enjoy Up To $500 Reload Bonus On Your First Deposit. $10 Minimum Deposit. 1x Wagering. New customers only. Time limits and T&Cs apply 21+.'
    },
    {
        label: 'EPIC DEAL',
        labelColor: 'orange',
        logoSrc: '/sfbets/brands/placeholder.png',
        logoAlt: 'PlayStar',
        offerMain: 'Up To 500 Bonus Spins',
        details: [
            { emoji: '', text: '+ 100% Deposit Match Up To $500' },
            { emoji: '', text: 'On Your First Deposit' }
        ],
        ctaText: 'CLICK TO CLAIM',
        ctaHref: '#',
        ctaVariant: 'tertiary',
        termsText:
            'Steps to Claim: 1. Click \'Claim Now\' | 2. Click \'Join Now\' | 3. Sign up | 4. Enjoy 100% Deposit match up to $500 + up to 500 Bonus Spins | T&Cs apply, 30x wagering, valid SSN required, new players only, 25+.'
    },
    {
        label: 'GREAT VALUE',
        labelColor: 'blue',
        logoSrc: '/sfbets/brands/placeholder.png',
        logoAlt: 'Hard Rock Bet',
        offerMain: '500 Bonus Spins',
        details: [
            { emoji: '', text: 'When You Deposit $10' },
            { emoji: '', text: '+ Up To $1000 Lossback In Casino Bonus' }
        ],
        ctaText: 'CLICK TO CLAIM',
        ctaHref: '#',
        ctaVariant: 'tertiary',
        termsText:
            'Steps to Claim: 1. Click ‘Claim Now’ | 2. Download the Hard Rock Bet: Casino app | 3. Sign up for a new account | 4. Deposit $10 or more and receive 500 Bonus Spins (valid on Cash Eruption only. Spins will be awarded in 10 consecutive daily increments of 50 spins.) | 5. Start playing slots to activate your Up to $1,000 Lossback offer | Receive a 100% refund of your net cash losses incurred during your first 24 hours of casino slot play | Lossback is issued as a Casino Bonus with 1x wagering, valid for 14 days. T&Cs apply, 21+'
    },
    {
        label: 'HOT OFFER',
        labelColor: 'orange',
        logoSrc: '/sfbets/brands/placeholder.png',
        logoAlt: 'Wheel of Fortune Casino',
        offerMain: 'Get $40',
        details: [
            { emoji: '', text: 'When You Deposit $10' }
        ],
        ctaText: 'CLICK TO CLAIM',
        ctaHref: '#',
        ctaVariant: 'tertiary',
        termsText:
            'Steps to Claim: 1. Click ‘Claim Now\' | 2. Click \'LEARN MORE\' | 3. Click \'SIGN UP’| 4. Minimum $10 Deposit | 5. Get $40 bonus dollars | T&Cs apply, valid SSN required, new players only, 21+. This Promotion runs from October 1, 12:00 AM EST, 2023 through December 31, 11:59 PM EST #ad'
    }
];

export const signupInstructionText =
    'Sign up below to get the latest deals delivered straight to your inbox!';

export const signupLegalDisclaimer =
    'New Customers Only. 21+ Full T&Cs apply. Gambling Problem? Call 1-800-GAMBLER.';
