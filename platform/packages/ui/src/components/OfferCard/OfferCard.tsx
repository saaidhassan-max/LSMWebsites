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

  return (
    <div className="w-full rounded-lg overflow-hidden bg-white">

      {/* ── MOBILE (hidden at md+) ── */}
      <div className="md:hidden">
        <Label variant="mobile" className="w-full">{label}</Label>

        {/* Logo LEFT (fixed 144px) | Offer RIGHT (fills remaining) */}
        <div className="grid grid-cols-[144px_1fr] gap-4 p-2 items-center">

          {/* Logo — left column, 144×72, content centered */}
          <div className="flex items-center justify-center h-[72px]">
            {logoImg}
          </div>

          {/* Offer — right column */}
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
        </div>

        {/* CTA */}
        <div className="px-2 py-3">{ctaButton}</div>

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

        {/* Logo LEFT | Offer MIDDLE (fills) | Button RIGHT — px-5 py-6 gap-4 */}
        <div className="flex items-center px-5 py-6 gap-4">

          {/* Logo — fixed 224×112, content centered */}
          <div className="w-[224px] h-[112px] flex items-center justify-center shrink-0">
            {logoImg}
          </div>

          {/* Offer section — fills remaining space, split into two equal halves */}
          <div className="flex-1 flex items-center px-3 gap-1">
            {/* Left half — bonus amount */}
            <div className="flex-1">
              <p className="text-[45px] font-bold leading-[52px] tracking-[0] text-on-surface-dark">
                {offerMain}
              </p>
            </div>
            {/* Right half — checkmarks */}
            <div className="flex-1 flex flex-col gap-1">
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

          {/* Button — fixed 253px */}
          <div className="w-[253px] shrink-0">{ctaButton}</div>
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
