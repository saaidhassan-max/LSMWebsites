import {
  LogoSection,
  USP,
  WelcomeBanner,
  OfferCard,
  SignupForm,
  WebsiteDirectory,
  SsmFooter,
} from '@lsm/ui';

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

      {/* 1 — Header */}
      <LogoSection
        logoSrc="/ssm/LogoSection/SSMLogo.svg"
        backgroundSrc="/ssm/LogoSection/Lego_Deco.png"
      />

      {/* 2 — USP banner */}
      <USP text="OVER 5,000,000 SUBSCRIBERS" />

      {/* 3 — Welcome banner */}
      <WelcomeBanner
        text="🎰 Velkommen til Super Spillemaskiner!"
        features={[
          '✅ Danske licenserede casinoer',
          '✅ Klare betingelser',
          '✅ Sikker og Pålidelig',
        ]}
      />

      {/* 4 — Offer cards + signup form */}
      <div className="flex flex-col gap-2 p-4">
        <OfferCard {...OFFERS[0]} />
        <OfferCard {...OFFERS[1]} />
        <SignupForm brandName="Super Spillemaskiner" />
        <OfferCard {...OFFERS[2]} />
        <OfferCard {...OFFERS[3]} />
      </div>

      {/* 5 — Casino directory */}
      <WebsiteDirectory
        title="SSM Casino Directory"
        sites={DIRECTORY_SITES}
      />

      {/* 6 — Footer */}
      <SsmFooter legalText={LEGAL_TEXT} />

    </main>
  );
}
