import type { OfferCardProps } from '@lsm/ui/components/offer-card/offer-card.types';
import type { DirectoryItem } from '@lsm/ui/components/website-directory/website-directory.types';

export const directorySites: DirectoryItem[] = [
    { name: 'Betfair Casino' },
    { name: 'Ladbrokes' },
    { name: 'Buzz Bingo' },
    { name: 'Gala Bingo' },
    { name: 'MrQ' },
    { name: 'Sun Vegas' },
    { name: 'Sky Vegas' },
    { name: 'Glossy Bingo' },
    { name: 'Sun Bingo' },
    { name: 'Foxy Bingo' },
    { name: 'Heart Bingo' }
];

export const legalText =
    'BeGambleAware.org — Free, confidential advice for anyone affected by problem gambling. Call the National Gambling Helpline: 0808 8020 133.\n\nLittle Star Media Ltd, Exchange House, 450 Midsummer Boulevard, Milton Keynes, MK9 2EA, United Kingdom\n\n©2026 Super Free Bingo. All rights reserved. Unauthorised reproduction is a violation of applicable laws.';

export const offers: OfferCardProps[] = [
    {
        label: 'NO DEPOSIT',
        labelColor: 'orange',
        logoSrc: '/sfb/brands/placeholder.png',
        logoAlt: 'Betfair Casino',
        offerMain: '50 FREE SPINS',
        details: ['No Deposit', 'No Wagering'],
        ctaText: 'CLICK TO CLAIM',
        ctaHref: '#',
        secondaryCtaText: 'How To Claim',
        secondaryCtaHref: '/how-to-claim/betfair-casino',
        termsText: '18+. New customers only. Free spins valued at £0.10. Winnings paid in cash. T&Cs apply. BeGambleAware.org.'
    },
    {
        label: 'NO DEPOSIT',
        labelColor: 'red',
        logoSrc: '/sfb/brands/placeholder.png',
        logoAlt: 'Ladbrokes',
        offerMain: '50 FREE SPINS',
        details: ['No Deposit', 'No Wagering'],
        ctaText: 'CLICK TO CLAIM',
        ctaHref: '#',
        secondaryCtaText: 'How To Claim',
        secondaryCtaHref: '/how-to-claim/ladbrokes',
        termsText: '18+. New Casino players only. 50 Free Spins (£0.10 each, selected games, valid 7 days) awarded upon registration. T&Cs apply. BeGambleAware.org.'
    },
    {
        label: 'NO DEPOSIT',
        labelColor: 'red',
        logoSrc: '/sfb/brands/placeholder.png',
        logoAlt: 'Buzz Bingo',
        offerMain: '10 FREE SPINS',
        details: ['No Deposit', 'No Wagering'],
        ctaText: 'CLICK TO CLAIM',
        ctaHref: '#',
        secondaryCtaText: 'How To Claim',
        secondaryCtaHref: '/how-to-claim/buzz-bingo',
        termsText: '18+. New customers only. Register online to receive 10 free spins. No deposit required. T&Cs apply. BeGambleAware.org.'
    },
    {
        label: 'FOR A FIVER',
        labelColor: 'red',
        logoSrc: '/sfb/brands/placeholder.png',
        logoAlt: 'Gala Bingo',
        offerMain: '100 FREE SPINS',
        details: ['Spend: £5', '100 Free Spins'],
        ctaText: 'CLICK TO CLAIM',
        ctaHref: '#',
        secondaryCtaText: 'How To Claim',
        secondaryCtaHref: '/how-to-claim/gala-bingo',
        termsText: '18+. New customers only. Deposit & spend £5 to get 100 Free Spins on selected games. T&Cs apply. BeGambleAware.org.'
    },
    {
        label: 'NO DEPOSIT',
        labelColor: 'red',
        logoSrc: '/sfb/brands/placeholder.png',
        logoAlt: 'MrQ',
        offerMain: '10 FREE SPINS',
        details: ['No Deposit', 'No Wagering'],
        ctaText: 'CLICK TO CLAIM',
        ctaHref: '#',
        secondaryCtaText: 'How To Claim',
        secondaryCtaHref: '/how-to-claim/mrq',
        termsText: '18+. New Customers Only. First 10 spins on Big Bass Q the Splash, no deposit required, no wagering requirements. T&Cs apply. BeGambleAware.org.'
    },
    {
        label: 'UPDATED OFFER',
        labelColor: 'red',
        logoSrc: '/sfb/brands/placeholder.png',
        logoAlt: 'Sun Vegas',
        offerMain: '110 FREE SPINS',
        details: ['Spend: £10', '110 Free Spins'],
        ctaText: 'CLICK TO CLAIM',
        ctaHref: '#',
        secondaryCtaText: 'How To Claim',
        secondaryCtaHref: '/how-to-claim/sun-vegas',
        termsText: '18+. New customers only. Register today and deposit £10 to receive 110 free spins on selected games. T&Cs apply. BeGambleAware.org.'
    },
    {
        label: 'NO DEPOSIT',
        labelColor: 'red',
        logoSrc: '/sfb/brands/placeholder.png',
        logoAlt: 'Sky Vegas',
        offerMain: '70 FREE SPINS',
        details: ['No Deposit', 'No Wagering'],
        ctaText: 'CLICK TO CLAIM',
        ctaHref: '#',
        secondaryCtaText: 'How To Claim',
        secondaryCtaHref: '/how-to-claim/sky-vegas',
        termsText: '18+. New customers only. Opt-in required. 7-day free spin expiry. All free spins loaded on first eligible game. T&Cs apply. BeGambleAware.org.'
    },
    {
        label: 'EXCLUSIVE',
        labelColor: 'red',
        logoSrc: '/sfb/brands/placeholder.png',
        logoAlt: 'Glossy Bingo',
        offerMain: '100 FREE SPINS',
        details: ['Deposit: £10', '100 Free Spins'],
        ctaText: 'CLICK TO CLAIM',
        ctaHref: '#',
        secondaryCtaText: 'How To Claim',
        secondaryCtaHref: '/how-to-claim/glossy-bingo',
        termsText: '18+. New players only. Min Dep £10. Each free spin value 5p. T&Cs apply. BeGambleAware.org.'
    }
];

export const signupInstructionText =
    'Sign up below to get the latest deals delivered straight to your inbox!';

export const signupLegalDisclaimer =
    'New Customers Only. 18+ Full T&Cs apply. BeGambleAware.org.';
