import React from 'react';
import { Menu } from 'lucide-react';

export interface LogoSectionProps {
  onMenuClick?: () => void;
  logoSrc?: string;
  backgroundSrc?: string;
  logoAlt?: string;
}

export function LogoSection({
  onMenuClick,
  logoSrc = '/ssm/LogoSection/SSMLogo.svg',
  backgroundSrc = '/ssm/LogoSection/Lego_Deco.png',
  logoAlt = 'Super Spillemaskiner',
}: LogoSectionProps) {
  return (
    <header
      className="relative bg-surface overflow-hidden h-10 md:h-[72px] w-full"
      style={
        backgroundSrc
          ? {
              backgroundImage: `url(${backgroundSrc})`,
              backgroundSize: '557px 255px',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center center',
            }
          : undefined
      }
    >
      <div className="w-full max-w-[1440px] mx-auto h-full flex items-center justify-between">
        {/* Invisible spacer — mirrors the menu button to keep logo centred.
            Mobile: sits LEFT. Desktop: sits RIGHT (order swaps). */}
        <div
          className="order-1 md:order-3 flex items-center gap-2 p-2 invisible"
          aria-hidden="true"
        >
          <Menu className="w-6 h-6 md:w-8 md:h-8" />
          <span className="hidden md:block text-base font-medium leading-6 tracking-[0.15px]">
            Menu
          </span>
        </div>

        {/* Logo — overflows the bar intentionally (clips via overflow-hidden) */}
        <img
          src={logoSrc}
          alt={logoAlt}
          className="order-2 relative z-10 shrink-0 w-[45px] h-[45px] md:w-[84px] md:h-[84px]"
        />

        {/* Menu button — Mobile: RIGHT. Desktop: LEFT with "Menu" label. */}
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Åbn menu"
          className="order-3 md:order-1 relative z-10 flex items-center gap-2 p-2 text-tertiary"
        >
          <Menu className="w-6 h-6 md:w-8 md:h-8" />
          <span className="hidden md:block text-surface-inverse-new text-base font-medium leading-6 tracking-[0.15px]">
            Menu
          </span>
        </button>
      </div>
    </header>
  );
}
