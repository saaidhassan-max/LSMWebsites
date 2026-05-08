import type { OfferCardProps } from '@lsm/ui/components/offer-card/offer-card.types';
import type { DirectoryItem } from '@lsm/ui/components/website-directory/website-directory.types';

export const termsText =
    '18+. New customers only. Opt in required. 7 day free spin expiry. All free spins will be loaded on the first eligible game loaded. Eligibility restrictions apply. Further T&Cs apply. GambleAware.org.';

export const directorySites: DirectoryItem[] = [
    { name: '888 Ladies' },
    { name: 'Buzz Bingo' },
    { name: 'Lucky Pants Bingo' },
    { name: 'Betfred' },
    { name: 'Fabulous Bingo' },
    { name: 'MrQ' },
    { name: 'Lottoland' },
    { name: 'Pink Casino' },
    { name: 'Dotty Bingo' }
];

export const legalText =
    'Det danske Center for Ludomani er en organisation, som yder fortrolig telefonisk støtte og rådgivning til enhver, som er påvirket af ludomani. Hjemmeside: http://www.ludomani.dk Telefonnummer: +45 70 11 18 10\n\nLittle Star Media Ltd, Exchange House, 450 Midsummer Boulevard, Milton Keynes, MK9 2EA, United Kingdom\n\n©2026 Super Spillemaskiner Alle rettigheder forbeholdes. Uautoriseret kopiering er en overtrædelse af alle gældende love.';

export const offers: OfferCardProps[] = Array.from({ length: 4 }, () => ({
    label: 'HOT DEAL',
    logoSrc: '/ssm/brands/888logo.png',
    logoAlt: '888 Poker',
    offerMain: '$100 Casino Bonus',
    details: ['No Deposit', 'No Wagering'],
    ctaText: 'PLAY NOW',
    ctaHref: '#',
    secondaryCtaText: 'How To Claim',
    secondaryCtaHref: '/how-to-claim/888poker',
    termsText
}));

export const signupInstructionText =
    'Sign up below to get the latest deals delivered straight to your inbox!';

export const signupLegalDisclaimer =
    'New Customers Only. First 10 spins: Players who have successfully completed age verification will be credited 10 Free Spins on Big Bass Q the Splash 10p per spin, no deposit required, no wagering requirements. 18+ Full T&Cs apply. GambleAware.org.';
