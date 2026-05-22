import type { OfferCardProps } from '@lsm/ui/components/offer-card/offer-card.types';
import type { DirectoryItem } from '@lsm/ui/components/website-directory/website-directory.types';

export const termsText =
    '18+. New customers only. Opt in required. 7 day free spin expiry. All free spins will be loaded on the first eligible game loaded. Eligibility restrictions apply. Further T&Cs apply. BeGambleAware.org.';

export const directorySites: DirectoryItem[] = [
    { name: '888 Ladies' },
    { name: 'Buzz Bingo' },
    { name: 'Lucky Pants Bingo' },
    { name: 'Betfred Bingo' },
    { name: 'Fabulous Bingo' },
    { name: 'MrQ' },
    { name: 'Lottoland' },
    { name: 'Pink Casino' },
    { name: 'Dotty Bingo' }
];

export const legalText =
    'BeGambleAware.org — Free, confidential advice for anyone affected by problem gambling. Call the National Gambling Helpline: 0808 8020 133.\n\nLittle Star Media Ltd, Exchange House, 450 Midsummer Boulevard, Milton Keynes, MK9 2EA, United Kingdom\n\n©2026 Super Free Bingo. All rights reserved. Unauthorised reproduction is a violation of applicable laws.';

export const offers: OfferCardProps[] = [
    {
        label: 'HOT DEAL',
        labelColor: 'orange',
        logoSrc: '/sfb/brands/placeholder.png',
        logoAlt: 'Bingo site',
        offerMain: '200% Bingo Bonus',
        details: ['No Deposit', 'No Wagering'],
        ctaText: 'PLAY NOW',
        ctaHref: '#',
        secondaryCtaText: 'How To Claim',
        secondaryCtaHref: '/how-to-claim/888ladies',
        termsText
    },
    {
        label: 'HOT DEAL',
        labelColor: 'red',
        logoSrc: '/sfb/brands/placeholder.png',
        logoAlt: 'Bingo site',
        offerMain: '200% Bingo Bonus',
        details: ['No Deposit', 'No Wagering'],
        ctaText: 'PLAY NOW',
        ctaHref: '#',
        secondaryCtaText: 'How To Claim',
        secondaryCtaHref: '/how-to-claim/888ladies',
        termsText
    },
    {
        label: 'HOT DEAL',
        labelColor: 'red',
        logoSrc: '/sfb/brands/placeholder.png',
        logoAlt: 'Bingo site',
        offerMain: '200% Bingo Bonus',
        details: ['No Deposit', 'No Wagering'],
        ctaText: 'PLAY NOW',
        ctaHref: '#',
        secondaryCtaText: 'How To Claim',
        secondaryCtaHref: '/how-to-claim/888ladies',
        termsText
    },
    {
        label: 'HOT DEAL',
        labelColor: 'red',
        logoSrc: '/sfb/brands/placeholder.png',
        logoAlt: 'Bingo site',
        offerMain: '200% Bingo Bonus',
        details: ['No Deposit', 'No Wagering'],
        ctaText: 'PLAY NOW',
        ctaHref: '#',
        secondaryCtaText: 'How To Claim',
        secondaryCtaHref: '/how-to-claim/888ladies',
        termsText
    }
];

export const signupInstructionText =
    'Sign up below to get the latest bingo deals delivered straight to your inbox!';

export const signupLegalDisclaimer =
    'New Customers Only. 18+ Full T&Cs apply. BeGambleAware.org.';
