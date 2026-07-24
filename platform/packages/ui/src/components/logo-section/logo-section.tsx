import type React from 'react';
import Image from 'next/image';
import { Menu } from 'lucide-react';
import type { LogoSectionProps } from './logo-section.types';

export function LogoSection({
    onMenuClick,
    showMenu = true,
    logoSrc = '/ssm/LogoSection/SSMLogo.svg',
    logoDesktopSrc,
    backgroundSrc = '/ssm/LogoSection/Lego_Deco2.png',
    logoAlt = 'Super Spillemaskiner',
    logoHref
}: LogoSectionProps): React.ReactElement {
    const logoContent = (
        <>
            <Image
                src={logoSrc}
                alt={logoAlt}
                width={84}
                height={84}
                className={
                    logoDesktopSrc
                        ? 'w-[44px] h-[44px] self-start mt-1 md:hidden'
                        : 'w-[44px] h-[44px] self-start mt-1 md:w-[84px] md:h-[84px] md:self-auto md:mt-0'
                }
            />
            {logoDesktopSrc && (
                <Image
                    src={logoDesktopSrc}
                    alt={logoAlt}
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="hidden md:block h-full w-auto"
                />
            )}
        </>
    );

    return (
        <header
            className="relative bg-surface overflow-hidden h-11 md:h-[72px] w-full"
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
            <div
                className={
                    'w-full max-w-[1440px] mx-auto h-full flex items-center md:px-16 ' +
                    (showMenu === true ? 'justify-between' : 'justify-center')
                }
            >
                {showMenu === true && (
                    <div
                        className="order-1 flex items-center gap-2 p-2 invisible"
                        aria-hidden="true"
                    >
                        <Menu className="w-6 h-6 md:w-8 md:h-8" />
                        <span className="hidden md:block text-base font-medium leading-6 tracking-[0.15px]">
                            Menu
                        </span>
                    </div>
                )}

                {logoHref ? (
                    <a href={logoHref} className="order-2 relative z-10 shrink-0 h-full flex items-center">
                        {logoContent}
                    </a>
                ) : (
                    <div className="order-2 relative z-10 shrink-0 h-full flex items-center">
                        {logoContent}
                    </div>
                )}

                {showMenu === true && (
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
                )}
            </div>
        </header>
    );
}
