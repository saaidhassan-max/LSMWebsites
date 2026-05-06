import React from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { Button } from '../Button/Button';
import { Label } from '../Label/Label';

export interface OfferCardProps {
  label?: string;
  logoSrc?: string;
  logoAlt?: string;
  offerMain: string;
  details?: string[];
  ctaText?: string;
  ctaHref: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  termsText?: string;
}

export function OfferCard({
  label = 'HOT DEAL',
  logoSrc,
  logoAlt = 'Casino logo',
  offerMain,
  details = ['No Deposit', 'No Wagering'],
  ctaText = 'PLAY NOW',
  ctaHref,
  secondaryCtaText,
  secondaryCtaHref,
  termsText,
}: OfferCardProps) {
  const logoImg = logoSrc
    ? <img src={logoSrc} alt={logoAlt} className="max-h-full max-w-full object-contain" />
    : <div className="w-full h-full bg-disabled-container rounded" />;

  const ctaButton = (
    <a href={ctaHref} target="_blank" rel="noopener noreferrer" className="block">
      <Button variant="primary" trailingIcon={<ArrowRight size={24} />} className="w-full">
        {ctaText}
      </Button>
    </a>
  );

  const secondaryCta = secondaryCtaText && secondaryCtaHref ? (
    <a
      href={secondaryCtaHref}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full text-center text-base font-bold text-primary underline py-2 leading-6 tracking-[0.15px]"
    >
      {secondaryCtaText}
    </a>
  ) : null;

  return (
    <div className="w-full rounded-lg overflow-hidden bg-white">

      {/* ── MOBILE (hidden at md+) ── */}
      <div className="md:hidden">
        <Label variant="mobile" className="w-full">{label}</Label>

        {/* Offer LEFT (fills remaining) | Logo RIGHT (fixed 144px) */}
        <div className="grid grid-cols-[1fr_144px] gap-4 p-2 items-center">

          {/* Offer — left column */}
          <div className="flex flex-col gap-1">
            <div className="py-2">
              <p className="text-[28px] font-bold leading-[36px] tracking-[0] text-on-surface-dark">
                {offerMain}
              </p>
            </div>
            {details.map((detail, i) => (
              <div key={i} className="flex items-center gap-1">
                <Check size={20} className="text-primary-focused shrink-0" />
                <span className="text-base leading-6 tracking-[0.5px] text-on-surface-dark">
                  {detail}
                </span>
              </div>
            ))}
          </div>

          {/* Logo — right column, 144×72, content centered */}
          <div className="flex items-center justify-center h-[72px]">
            {logoImg}
          </div>
        </div>

        {/* CTA */}
        <div className="px-2 py-3 flex flex-col gap-1">
          {ctaButton}
          {secondaryCta}
        </div>

        {/* T&Cs */}
        {termsText && (
          <div className="p-2">
            <p className="text-[11px] leading-[13px] tracking-[0.4px] text-on-surface-dark">
              {termsText}
            </p>
          </div>
        )}
      </div>

      {/* ── DESKTOP (hidden below md) ── */}
      <div className="hidden md:block">
        <Label variant="desktop" className="w-[280px]">{label}</Label>

        {/* Offer LEFT | Logo MIDDLE | Buttons RIGHT — px-5 py-6 gap-4 */}
        <div className="flex items-center px-5 py-6 gap-4">

          {/* Offer section — fills remaining space, split into two equal halves */}
          <div className="flex-1 flex items-center px-3 gap-1">
            {/* Left half — bonus amount */}
            <div className="flex-1">
              <p className="text-[45px] font-bold leading-[52px] tracking-[0] text-on-surface-dark">
                {offerMain}
              </p>
            </div>
            {/* Right half — checkmarks */}
            <div className="flex-1 flex flex-col gap-3">
              {details.map((detail, i) => (
                <div key={i} className="flex items-center gap-1">
                  <div className="w-10 h-10 flex items-center justify-center shrink-0">
                    <Check size={32} className="text-primary-focused" />
                  </div>
                  <span className="text-[24px] leading-[32px] tracking-[0] text-on-surface-dark">
                    {detail}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Logo — fixed 224×112, content centered */}
          <div className="w-[224px] h-[112px] flex items-center justify-center shrink-0">
            {logoImg}
          </div>

          {/* Button group — fixed width, stacked */}
          <div className="w-[253px] shrink-0 flex flex-col gap-2">
            {ctaButton}
            {secondaryCta}
          </div>
        </div>

        {/* T&Cs — top border */}
        {termsText && (
          <div className="p-2 border-t border-outline-variant">
            <p className="text-[11px] leading-[13px] tracking-[0.4px] text-on-surface-dark">
              {termsText}
            </p>
          </div>
        )}
      </div>

    </div>
  );
}
