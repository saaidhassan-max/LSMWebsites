import type React from 'react';
import Image from 'next/image';
import { Menu } from 'lucide-react';
import type { LogoSectionProps } from './logo-section.types';

export function LogoSection({
    onMenuClick,
    logoSrc = '/ssm/LogoSection/SSMLogo.svg',
    backgroundSrc = '/ssm/LogoSection/Lego_Deco2.png',
    logoAlt = 'Super Spillemaskiner'
}: LogoSectionProps): React.ReactElement {
    return (
        <header
            className="relative bg-surface overflow-hidden h-10 md:h-[72px] w-full"
            style={
                backgroundSrc
                    ? {
                          backgroundImage: `url(${backgroundSrc})`,
                          backgroundSize: 'auto 100%',
                          backgroundPosition: 'center center',
                          backgroundRepeat: 'no-repeat'
                      }
                    : undefined
            }
        >
            <div className="w-full max-w-[1440px] mx-auto h-full flex items-center justify-between md:px-16">
                <div
                    className="order-1 flex items-center gap-2 p-2 invisible"
                    aria-hidden="true"
                >
                    <Menu className="w-6 h-6 md:w-8 md:h-8" />
                    <span className="hidden md:block text-base font-medium leading-6 tracking-[0.15px]">
                        Menu
                    </span>
                </div>

                <Image
                    src={logoSrc}
                    alt={logoAlt}
                    width={84}
                    height={84}
                    className="order-2 relative z-10 shrink-0 w-[45px] h-[45px] md:w-[84px] md:h-[84px]"
                />

                <button
                    type="button"
                    onClick={onMenuClick}
                    aria-label="Åbn menu"
                    className="order-3 relative z-10 flex items-center gap-2 p-2 text-tertiary"
                >
                    <span className="hidden md:block text-surface-inverse-new text-base font-medium leading-6 tracking-[0.15px]">
                        Menu
                    </span>
                    <Menu className="w-6 h-6 md:w-8 md:h-8" />
                </button>
            </div>
        </header>
    );
}
