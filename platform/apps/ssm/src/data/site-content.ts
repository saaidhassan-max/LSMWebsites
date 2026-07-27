import type { OfferCardProps } from '@lsm/ui/components/offer-card/offer-card.types';
import type { DirectoryItem } from '@lsm/ui/components/website-directory/website-directory.types';

export const directorySites: DirectoryItem[] = [
    { name: 'Royal Casino' },
    { name: 'Mr Green' },
    { name: 'Kapow Casino' },
    { name: 'PokerStars Casino' },
    { name: 'Nye Expekt' },
    { name: 'Betinia' },
    { name: 'Mega Casino' },
    { name: 'ComeOn Casino' },
    { name: 'Bet365 Casino' },
    { name: 'NordicBet' },
    { name: 'PlayJango' }
];

export const legalText =
    'Det danske Center for Ludomani er en organisation, som yder fortrolig telefonisk støtte og rådgivning til enhver, som er påvirket af ludomani. Hjemmeside: http://www.ludomani.dk Telefonnummer: +45 70 11 18 10\n\nLittle Star Media Ltd, Exchange House, 450 Midsummer Boulevard, Milton Keynes, MK9 2EA, United Kingdom\n\n©2026 Super Spillemaskiner Alle rettigheder forbeholdes. Uautoriseret kopiering er en overtrædelse af alle gældende love.';

export const offers: OfferCardProps[] = [
    {
        label: 'EKSKLUSIV AFTALE',
        logoSrc: '/ssm/brands/888logo.png',
        logoAlt: 'Royal Casino',
        offerMain: '225 SPINS Uden Indbetaling',
        details: [
            { emoji: '💸', text: 'Ingen Indbetaling' },
            { emoji: '✅', text: 'Ingen Satsningskrav' }
        ],
        ctaText: 'FÅ BONUS',
        ctaHref: '#',
        termsText: '10x Gennemspilskrav, fx. 2.250 kr. ved gennemspilning. Max 100 kr. pr. indsats. Gyldig 60 dage.'
    },
    {
        label: 'UDEN SATSNINGSKRAV',
        logoSrc: '/ssm/brands/888logo.png',
        logoAlt: 'Mr Green',
        offerMain: '50 SPINS Uden Indbetaling',
        details: [
            { emoji: '💸', text: 'Ingen Indbetaling' },
            { emoji: '✅', text: 'Uden Satsningskrav' }
        ],
        ctaText: 'FÅ BONUS',
        ctaHref: '#',
        termsText: '50 cash spins krediteres automatisk til Legacy of Dead og har en værdi á 1 kr. per spin. Tilgængelige i 60 dage.'
    },
    {
        label: 'EKSKLUSIV BONUS',
        logoSrc: '/ssm/brands/888logo.png',
        logoAlt: 'Kapow Casino',
        offerMain: '50 SPINS Til Big Bass Splash Uden Indbetaling',
        details: [
            { emoji: '💸', text: 'Ingen Indbetaling' },
            { emoji: '🎰', text: '0,50 kr. per spin' }
        ],
        ctaText: 'FÅ BONUS',
        ctaHref: '#',
        termsText: '10x Gennemspilskrav, fx. 250 kr. ved gennemspilning. Max 100 kr. pr. indsats. Gyldig 60 dage.'
    },
    {
        label: 'EKSKLUSIV AFTALE',
        logoSrc: '/ssm/brands/888logo.png',
        logoAlt: 'PokerStars Casino',
        offerMain: '100% BONUS Op Til: 650 kr.',
        details: [
            { emoji: '🎁', text: '100% Match Bonus' },
            { emoji: '💳', text: 'Min. indbetaling 10 kr.' }
        ],
        ctaText: 'FÅ BONUS',
        ctaHref: '#',
        termsText: 'Gennemspilles 10x (bonus+indbetaling) inden 60 dage.'
    }
];

export const signupInstructionText =
    'Tilmeld dig nedenfor for at modtage de seneste tilbud direkte i din indbakke!';

export const signupLegalDisclaimer =
    'Kun nye kunder. Særlige vilkår er gældende – herunder identificering med MitID. 18+ Fuld T&Cs gælder. GambleAware.org.';
