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
        label: 'NO DEPOSIT',
        labelColor: 'orange',
        logoSrc: '/sfsg/brands/placeholder.png',
        logoAlt: 'Betfair Casino',
        offerMain: '50 FREE SPINS',
        details: ['No Deposit', 'No Wagering'],
        ctaText: 'CLICK TO CLAIM',
        ctaHref: '#',
        ctaVariant: 'tertiary',
        secondaryCtaText: 'How To Claim',
        secondaryCtaHref: '/how-to-claim/betfair-casino',
        termsText: '18+. New customers only. Free spins valued at £0.10. Winnings paid in cash. T&Cs apply. BeGambleAware.org.'
    },
    {
        label: 'NO DEPOSIT',
        labelColor: 'red',
        logoSrc: '/sfsg/brands/placeholder.png',
        logoAlt: 'Ladbrokes',
        offerMain: '50 FREE SPINS',
        details: ['No Deposit', 'No Wagering'],
        ctaText: 'CLICK TO CLAIM',
        ctaHref: '#',
        ctaVariant: 'tertiary',
        secondaryCtaText: 'How To Claim',
        secondaryCtaHref: '/how-to-claim/ladbrokes',
        termsText: '18+. New Casino players only. 50 Free Spins (£0.10 each, selected games, valid 7 days) awarded upon registration. T&Cs apply. BeGambleAware.org.'
    },
    {
        label: 'NO DEPOSIT',
        labelColor: 'red',
        logoSrc: '/sfsg/brands/placeholder.png',
        logoAlt: 'Sky Vegas',
        offerMain: '70 FREE SPINS',
        details: ['No Deposit', 'No Wagering'],
        ctaText: 'CLICK TO CLAIM',
        ctaHref: '#',
        ctaVariant: 'tertiary',
        secondaryCtaText: 'How To Claim',
        secondaryCtaHref: '/how-to-claim/sky-vegas',
        termsText: '18+. New customers only. Opt-in required. 7-day free spin expiry. T&Cs apply. BeGambleAware.org.'
    },
    {
        label: 'UPDATED OFFER',
        labelColor: 'red',
        logoSrc: '/sfsg/brands/placeholder.png',
        logoAlt: 'Sun Vegas',
        offerMain: '110 FREE SPINS',
        details: ['Spend: £10', '110 Free Spins'],
        ctaText: 'CLICK TO CLAIM',
        ctaHref: '#',
        ctaVariant: 'tertiary',
        secondaryCtaText: 'How To Claim',
        secondaryCtaHref: '/how-to-claim/sun-vegas',
        termsText: '18+. New customers only. Register today and deposit £10 to receive 110 free spins on selected games. T&Cs apply. BeGambleAware.org.'
    },
    {
        label: 'NO DEPOSIT',
        labelColor: 'red',
        logoSrc: '/sfsg/brands/placeholder.png',
        logoAlt: 'MrQ',
        offerMain: '10 FREE SPINS',
        details: ['No Deposit', 'No Wagering'],
        ctaText: 'CLICK TO CLAIM',
        ctaHref: '#',
        ctaVariant: 'tertiary',
        secondaryCtaText: 'How To Claim',
        secondaryCtaHref: '/how-to-claim/mrq',
        termsText: '18+. New Customers Only. First 10 spins, no deposit required, no wagering requirements. T&Cs apply. BeGambleAware.org.'
    },
    {
        label: 'NO DEPOSIT',
        labelColor: 'red',
        logoSrc: '/sfsg/brands/placeholder.png',
        logoAlt: 'Paddy Power',
        offerMain: '30 FREE SPINS',
        details: ['No Deposit', 'No Wagering'],
        ctaText: 'CLICK TO CLAIM',
        ctaHref: '#',
        ctaVariant: 'tertiary',
        secondaryCtaText: 'How To Claim',
        secondaryCtaHref: '/how-to-claim/paddy-power',
        termsText: '18+. New customers only. Free spins on selected slots. T&Cs apply. BeGambleAware.org.'
    },
    {
        label: 'EXCLUSIVE',
        labelColor: 'red',
        logoSrc: '/sfsg/brands/placeholder.png',
        logoAlt: 'William Hill',
        offerMain: '50 FREE SPINS',
        details: ['Deposit: £10', '50 Free Spins'],
        ctaText: 'CLICK TO CLAIM',
        ctaHref: '#',
        ctaVariant: 'tertiary',
        secondaryCtaText: 'How To Claim',
        secondaryCtaHref: '/how-to-claim/william-hill',
        termsText: '18+. New customers only. Deposit £10 to receive 50 free spins. T&Cs apply. BeGambleAware.org.'
    },
    {
        label: 'NO DEPOSIT',
        labelColor: 'red',
        logoSrc: '/sfsg/brands/placeholder.png',
        logoAlt: 'Coral',
        offerMain: '30 FREE SPINS',
        details: ['No Deposit', 'No Wagering'],
        ctaText: 'CLICK TO CLAIM',
        ctaHref: '#',
        ctaVariant: 'tertiary',
        secondaryCtaText: 'How To Claim',
        secondaryCtaHref: '/how-to-claim/coral',
        termsText: '18+. New customers only. Free spins on selected games. T&Cs apply. BeGambleAware.org.'
    }
];

export const signupInstructionText =
    'Sign up below to get the latest slot deals delivered straight to your inbox!';

export const signupLegalDisclaimer =
    'New Customers Only. 18+ Full T&Cs apply. BeGambleAware.org.';
