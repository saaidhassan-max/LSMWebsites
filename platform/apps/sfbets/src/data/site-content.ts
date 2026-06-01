import type { OfferCardProps } from '@lsm/ui/components/offer-card/offer-card.types';
import type { DirectoryItem } from '@lsm/ui/components/website-directory/website-directory.types';

export const directorySites: DirectoryItem[] = [
    { name: 'Betfair Sportsbook' },
    { name: 'Ladbrokes' },
    { name: 'Sky Bet' },
    { name: 'Paddy Power' },
    { name: 'William Hill' },
    { name: 'Coral' },
    { name: 'bet365' },
    { name: 'BetVictor' },
    { name: 'Unibet' },
    { name: 'BoyleSports' },
    { name: 'Betway' }
];

export const legalText =
    'BeGambleAware.org — Free, confidential advice for anyone affected by problem gambling. Call the National Gambling Helpline: 0808 8020 133.\n\nLittle Star Media Ltd, Exchange House, 450 Midsummer Boulevard, Milton Keynes, MK9 2EA, United Kingdom\n\n©2026 Super Free Bets. All rights reserved. Unauthorised reproduction is a violation of applicable laws.';

export const offers: OfferCardProps[] = [
    {
        label: 'NO DEPOSIT',
        labelColor: 'orange',
        logoSrc: '/sfbets/brands/placeholder.png',
        logoAlt: 'Betfair Sportsbook',
        offerMain: '£30 FREE BET',
        details: ['No Deposit', 'No Wagering'],
        ctaText: 'CLICK TO CLAIM',
        ctaHref: '#',
        ctaVariant: 'tertiary',
        secondaryCtaText: 'How To Claim',
        secondaryCtaHref: '/how-to-claim/betfair-sportsbook',
        termsText: '18+. New customers only. Free bet credited upon registration. T&Cs apply. BeGambleAware.org.'
    },
    {
        label: 'NO DEPOSIT',
        labelColor: 'red',
        logoSrc: '/sfbets/brands/placeholder.png',
        logoAlt: 'Ladbrokes',
        offerMain: '£20 FREE BET',
        details: ['No Deposit', 'No Wagering'],
        ctaText: 'CLICK TO CLAIM',
        ctaHref: '#',
        ctaVariant: 'tertiary',
        secondaryCtaText: 'How To Claim',
        secondaryCtaHref: '/how-to-claim/ladbrokes',
        termsText: '18+. New customers only. Free bet credited on first qualifying bet. T&Cs apply. BeGambleAware.org.'
    },
    {
        label: 'NO DEPOSIT',
        labelColor: 'red',
        logoSrc: '/sfbets/brands/placeholder.png',
        logoAlt: 'Sky Bet',
        offerMain: '£30 FREE BET',
        details: ['No Deposit', 'No Wagering'],
        ctaText: 'CLICK TO CLAIM',
        ctaHref: '#',
        ctaVariant: 'tertiary',
        secondaryCtaText: 'How To Claim',
        secondaryCtaHref: '/how-to-claim/sky-bet',
        termsText: '18+. New customers only. Free bet valid 7 days. T&Cs apply. BeGambleAware.org.'
    },
    {
        label: 'UPDATED OFFER',
        labelColor: 'red',
        logoSrc: '/sfbets/brands/placeholder.png',
        logoAlt: 'Paddy Power',
        offerMain: '£40 FREE BET',
        details: ['Bet: £10', '£40 Free Bets'],
        ctaText: 'CLICK TO CLAIM',
        ctaHref: '#',
        ctaVariant: 'tertiary',
        secondaryCtaText: 'How To Claim',
        secondaryCtaHref: '/how-to-claim/paddy-power',
        termsText: '18+. New customers only. Place £10 qualifying bet to receive £40 in free bets. T&Cs apply. BeGambleAware.org.'
    },
    {
        label: 'NO DEPOSIT',
        labelColor: 'red',
        logoSrc: '/sfbets/brands/placeholder.png',
        logoAlt: 'William Hill',
        offerMain: '£30 FREE BET',
        details: ['No Deposit', 'No Wagering'],
        ctaText: 'CLICK TO CLAIM',
        ctaHref: '#',
        ctaVariant: 'tertiary',
        secondaryCtaText: 'How To Claim',
        secondaryCtaHref: '/how-to-claim/william-hill',
        termsText: '18+. New customers only. Free bet credited after first qualifying bet. T&Cs apply. BeGambleAware.org.'
    },
    {
        label: 'NO DEPOSIT',
        labelColor: 'red',
        logoSrc: '/sfbets/brands/placeholder.png',
        logoAlt: 'Coral',
        offerMain: '£20 FREE BET',
        details: ['No Deposit', 'No Wagering'],
        ctaText: 'CLICK TO CLAIM',
        ctaHref: '#',
        ctaVariant: 'tertiary',
        secondaryCtaText: 'How To Claim',
        secondaryCtaHref: '/how-to-claim/coral',
        termsText: '18+. New customers only. Free bets on selected markets. T&Cs apply. BeGambleAware.org.'
    },
    {
        label: 'EXCLUSIVE',
        labelColor: 'red',
        logoSrc: '/sfbets/brands/placeholder.png',
        logoAlt: 'bet365',
        offerMain: '£50 FREE BET',
        details: ['Deposit: £10', '£50 Free Bet'],
        ctaText: 'CLICK TO CLAIM',
        ctaHref: '#',
        ctaVariant: 'tertiary',
        secondaryCtaText: 'How To Claim',
        secondaryCtaHref: '/how-to-claim/bet365',
        termsText: '18+. New customers only. Min deposit £10. Free bet credited on qualifying bet. T&Cs apply. BeGambleAware.org.'
    },
    {
        label: 'NO DEPOSIT',
        labelColor: 'red',
        logoSrc: '/sfbets/brands/placeholder.png',
        logoAlt: 'BetVictor',
        offerMain: '£30 FREE BET',
        details: ['No Deposit', 'No Wagering'],
        ctaText: 'CLICK TO CLAIM',
        ctaHref: '#',
        ctaVariant: 'tertiary',
        secondaryCtaText: 'How To Claim',
        secondaryCtaHref: '/how-to-claim/betvictor',
        termsText: '18+. New customers only. Free bet valid for 7 days. T&Cs apply. BeGambleAware.org.'
    }
];

export const signupInstructionText =
    'Sign up below to get the latest free bet deals delivered straight to your inbox!';

export const signupLegalDisclaimer =
    'New Customers Only. 18+ Full T&Cs apply. BeGambleAware.org.';
