import {
  USP,
  WelcomeBanner,
  TopTCs,
  OfferCard,
  SignupForm,
  WebsiteDirectory,
  SsmFooter,
} from '@lsm/ui';
import { SsmNav } from '../components/SsmNav';

const TERMS =
  '18+. New customers only. Opt in required. 7 day free spin expiry. All free spins will be loaded on the first eligible game loaded. Eligibility restrictions apply. Further T&Cs apply. GambleAware.org.';

const OFFERS = [
  {
    label: 'HOT DEAL',
    logoSrc: '/ssm/brands/888logo.png',
    logoAlt: '888 Poker',
    offerMain: '$100 Casino Bonus',
    details: ['No Deposit', 'No Wagering'],
    ctaText: 'PLAY NOW',
    ctaHref: '#',
    secondaryCtaText: 'How To Claim',
    secondaryCtaHref: '/how-to-claim/888poker',
    termsText: TERMS,
  },
  {
    label: 'HOT DEAL',
    logoSrc: '/ssm/brands/888logo.png',
    logoAlt: '888 Poker',
    offerMain: '$100 Casino Bonus',
    details: ['No Deposit', 'No Wagering'],
    ctaText: 'PLAY NOW',
    ctaHref: '#',
    secondaryCtaText: 'How To Claim',
    secondaryCtaHref: '/how-to-claim/888poker',
    termsText: TERMS,
  },
  {
    label: 'HOT DEAL',
    logoSrc: '/ssm/brands/888logo.png',
    logoAlt: '888 Poker',
    offerMain: '$100 Casino Bonus',
    details: ['No Deposit', 'No Wagering'],
    ctaText: 'PLAY NOW',
    ctaHref: '#',
    secondaryCtaText: 'How To Claim',
    secondaryCtaHref: '/how-to-claim/888poker',
    termsText: TERMS,
  },
  {
    label: 'HOT DEAL',
    logoSrc: '/ssm/brands/888logo.png',
    logoAlt: '888 Poker',
    offerMain: '$100 Casino Bonus',
    details: ['No Deposit', 'No Wagering'],
    ctaText: 'PLAY NOW',
    ctaHref: '#',
    secondaryCtaText: 'How To Claim',
    secondaryCtaHref: '/how-to-claim/888poker',
    termsText: TERMS,
  },
];

const DIRECTORY_SITES = [
  { name: '888 Ladies' },
  { name: 'Buzz Bingo' },
  { name: 'Lucky Pants Bingo' },
  { name: 'Betfred' },
  { name: 'Fabulous Bingo' },
  { name: 'MrQ' },
  { name: 'Lottoland' },
  { name: 'Pink Casino' },
  { name: 'Dotty Bingo' },
];

const LEGAL_TEXT =
  'Det danske Center for Ludomani er en organisation, som yder fortrolig telefonisk støtte og rådgivning til enhver, som er påvirket af ludomani. Hjemmeside: http://www.ludomani.dk Telefonnummer: +45 70 11 18 10\n\nLittle Star Media Ltd, Exchange House, 450 Midsummer Boulevard, Milton Keynes, MK9 2EA, United Kingdom\n\n©2026 Super Spillemaskiner Alle rettigheder forbeholdes. Uautoriseret kopiering er en overtrædelse af alle gældende love.';

export default function Home() {
  return (
    <main className="flex flex-col w-full bg-surface">

      {/* 1 — Header + navigation drawer (constrained to 1440px on desktop) */}
      <div className="w-full max-w-[1440px] mx-auto">
        <SsmNav />
      </div>

      {/* 2 — USP banner (full-bleed) */}
      <USP text="OVER 5,000,000 SUBSCRIBERS" />

      {/* 3 — Welcome banner (full-bleed) */}
      <WelcomeBanner
        text="🎰 Velkommen til Super Spillemaskiner!"
        features={[
          '✅ Danske licenserede casinoer',
          '✅ Klare betingelser',
          '✅ Sikker og Pålidelig',
        ]}
      />

      {/* 4 — Top T&Cs (full-bleed) */}
      <TopTCs text='Særlige vilkår er gældende – herunder identificering med MitID. Klikke på "Læs mere" for detaljer.' />

      {/* 5 — Offer cards (constrained to 1440px, px-16 on desktop) */}
      <div className="w-full max-w-[1440px] mx-auto">
        <div className="flex flex-col gap-2 p-4 md:px-16 md:py-4">
          <OfferCard {...OFFERS[0]} />
          <OfferCard {...OFFERS[1]} />
          {/* Signup form sits between cards on mobile only */}
          <div className="md:hidden">
            <SignupForm brandName="Super Spillemaskiner" />
          </div>
          <OfferCard {...OFFERS[2]} />
          <OfferCard {...OFFERS[3]} />
        </div>
      </div>

      {/* 6 — Casino directory (mobile only — shown inline on desktop below) */}
      <div className="md:hidden w-full">
        <WebsiteDirectory
          title="SSM Casino Directory"
          sites={DIRECTORY_SITES}
        />
      </div>

      {/* 7 — Desktop: directory + signup side by side (constrained to 1440px, px-16) */}
      <div className="hidden md:flex w-full max-w-[1440px] mx-auto px-16 py-4 gap-8">
        <div className="flex-1">
          <WebsiteDirectory
            title="SSM Casino Directory"
            sites={DIRECTORY_SITES}
          />
        </div>
        <div className="flex-1">
          <SignupForm brandName="Super Spillemaskiner" />
        </div>
      </div>

      {/* 8 — Footer (full-bleed) */}
      <SsmFooter legalText={LEGAL_TEXT} />

    </main>
  );
}
