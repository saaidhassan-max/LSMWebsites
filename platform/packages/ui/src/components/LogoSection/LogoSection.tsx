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
      className="relative flex items-center justify-between bg-surface overflow-hidden h-10 w-full"
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

      {/* Left spacer — invisible clone of menu button keeps logo centred */}
      <div className="p-2 invisible" aria-hidden="true">
        <Menu size={24} />
      </div>

      {/* Logo — 45×45 intentionally overflows the 40px bar (clips at top/bottom) */}
      <img
        src={logoSrc}
        alt={logoAlt}
        width={45}
        height={45}
        className="relative z-10 shrink-0"
      />

      {/* Hamburger menu button */}
      <button
        type="button"
        onClick={onMenuClick}
        aria-label="Åbn menu"
        className="relative z-10 p-2 text-tertiary"
      >
        <Menu size={24} />
      </button>

    </header>
  );
}
