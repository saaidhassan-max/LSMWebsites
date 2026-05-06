import { notFound } from 'next/navigation';
import { USP, Button, WebsiteDirectory, SignupForm, SsmFooter } from '@lsm/ui';
import { SsmNav } from '../../../components/SsmNav';
import { getCasino } from '../../../data/casinos';

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

export default async function HowToClaimPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const casino = getCasino(slug);
  if (!casino) notFound();

  const logoImg = casino.logoSrc ? (
    <img src={casino.logoSrc} alt={casino.logoAlt} className="max-h-full max-w-full object-contain" />
  ) : (
    <div className="w-full h-full bg-disabled-container rounded" />
  );

  const midpoint = Math.ceil((casino.reviewSections?.length ?? 0) / 2);
  const leftSections = casino.reviewSections?.slice(0, midpoint) ?? [];
  const rightSections = casino.reviewSections?.slice(midpoint) ?? [];

  return (
    <main className="flex flex-col w-full bg-surface">

      {/* ── Navigation ── */}
      <div className="w-full max-w-[1440px] mx-auto">
        <SsmNav />
      </div>

      {/* ── USP banner (full-bleed) ── */}
      <USP text="OVER 5,000,000 SUBSCRIBERS" />

      {/* ── Operator review card (white bg, full-bleed) ── */}
      <div className="w-full bg-surface-inverse-new">
        <div className="w-full max-w-[1440px] mx-auto">

          {/* MOBILE: vertical stack, centered — hidden on md+ */}
          <div className="md:hidden flex flex-col items-center gap-4 p-4">

            <div className="w-[144px] h-[77px] flex items-center justify-center shrink-0">
              {logoImg}
            </div>

            <h1 className="text-[36px] font-bold leading-[44px] text-on-surface-dark text-center">
              {casino.offerHeadline}
            </h1>

            <div className="flex flex-row flex-wrap gap-2 justify-center">
              {casino.trustBadges.map((badge, i) => (
                <span key={i} className="rounded-full bg-surface-container-low px-6 py-4 text-[14px] font-medium text-on-surface-dark">
                  {badge}
                </span>
              ))}
            </div>

            <div className="w-full flex flex-col gap-2">
              {casino.howToSteps.map((step, i) => (
                <p key={i} className="text-[14px] font-medium text-on-surface-dark">{step}</p>
              ))}
            </div>

            <a href={casino.ctaHref} target="_blank" rel="noopener noreferrer" className="block w-full">
              <Button variant="primary" className="w-full">{casino.ctaText}</Button>
            </a>

          </div>

          {/* DESKTOP: 3-column horizontal — hidden below md */}
          {/* Columns: headline-block (flex-1) | features (flex-1) | CTA (auto) */}
          <div className="hidden md:flex items-start gap-8 p-16">

            {/* Col 1 — logo + headline + badges */}
            <div className="flex-1 flex flex-col gap-6">
              <div className="w-[224px] h-[120px] flex items-center justify-center shrink-0">
                {logoImg}
              </div>
              <h1 className="text-[45px] font-bold leading-[52px] text-on-surface-dark">
                {casino.offerHeadline}
              </h1>
              <div className="flex flex-row flex-wrap gap-2">
                {casino.trustBadges.map((badge, i) => (
                  <span key={i} className="rounded-full bg-surface-container-low px-6 py-4 text-[14px] font-medium text-on-surface-dark">
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            {/* Col 2 — how-to steps */}
            <div className="flex-1 flex flex-col gap-6">
              {casino.howToSteps.map((step, i) => (
                <p key={i} className="text-[16px] font-medium text-on-surface-dark">{step}</p>
              ))}
            </div>

            {/* Col 3 — CTA button (auto-width) */}
            <a href={casino.ctaHref} target="_blank" rel="noopener noreferrer" className="shrink-0 self-start">
              <Button variant="primary">{casino.ctaText}</Button>
            </a>

          </div>

        </div>
      </div>

      {/* ── Body section ── */}
      <div className="w-full pt-8">

        {/* MOBILE body: single text block + CTA + directory — hidden on md+ */}
        <div className="md:hidden flex flex-col gap-6 px-4">

          <p className="text-[14px] text-on-surface-light whitespace-pre-wrap">
            {casino.reviewBody}
          </p>

          <a href={casino.ctaHref} target="_blank" rel="noopener noreferrer" className="block w-full">
            <Button variant="primary" className="w-full">{casino.ctaText}</Button>
          </a>

          <WebsiteDirectory title="SSM Casino Directory" sites={DIRECTORY_SITES} />

        </div>

        {/* DESKTOP body: structured article + directory/signup — hidden below md */}
        <div className="hidden md:flex flex-col gap-6 max-w-[1440px] mx-auto">

          {/* Article content — px-16 (64px L/R) */}
          <div className="flex flex-col gap-6 px-16">

            {casino.reviewIntro && (
              <p className="text-base font-bold text-on-surface-light">
                {casino.reviewIntro}
              </p>
            )}

            {casino.reviewSections && casino.reviewSections.length > 0 && (
              <div className="grid grid-cols-2 gap-8">
                {/* Left column */}
                <div className="flex flex-col gap-8">
                  {leftSections.map((section, i) => (
                    <div key={i} className="flex flex-col gap-2">
                      <h3 className="text-base font-bold text-tertiary">{section.heading}</h3>
                      <p className="text-[14px] text-on-surface-light">{section.body}</p>
                    </div>
                  ))}
                </div>
                {/* Right column */}
                <div className="flex flex-col gap-8">
                  {rightSections.map((section, i) => (
                    <div key={i} className="flex flex-col gap-2">
                      <h3 className="text-base font-bold text-tertiary">{section.heading}</h3>
                      <p className="text-[14px] text-on-surface-light">{section.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA — fills left column of a 2-col grid (~50% width) */}
            <div className="grid grid-cols-2 gap-[10px]">
              <a href={casino.ctaHref} target="_blank" rel="noopener noreferrer" className="block">
                <Button variant="primary" className="w-full">{casino.ctaText}</Button>
              </a>
            </div>

          </div>

          {/* Directory + Signup side-by-side — px-16 py-8 (64px L/R, 32px T/B) */}
          <div className="flex px-16 py-8">
            <div className="flex-1">
              <WebsiteDirectory title="SSM Casino Directory" sites={DIRECTORY_SITES} />
            </div>
            <div className="flex-1">
              <SignupForm brandName="Super Spillemaskiner" />
            </div>
          </div>

        </div>

      </div>

      {/* ── Footer ── */}
      <SsmFooter legalText={LEGAL_TEXT} />

    </main>
  );
}
