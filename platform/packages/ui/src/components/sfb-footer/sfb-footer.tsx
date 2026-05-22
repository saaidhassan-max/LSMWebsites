import type React from 'react';
import Image from 'next/image';
import type { FooterNavLink, ResponsibleGamblingLogo, SfbFooterProps } from './sfb-footer.types';

const DEFAULT_NAV_LINKS: FooterNavLink[] = [
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms and Conditions', href: '/terms' },
    { label: 'About Us', href: '/about' },
    { label: 'Disclaimer', href: '/disclaimer' },
    { label: 'Contact Us', href: '/contact' }
];

const RESPONSIBLE_GAMBLING_LOGOS: ResponsibleGamblingLogo[] = [
    {
        src: '/sfb/footer/keepitfun.svg',
        alt: 'Keep It Fun',
        width: 176,
        height: 39,
        description:
            'We want your online gaming experience to be an enjoyable one, and that means enabling you to stay in control of your play. For more information, help, and advice, you can visit our Safer Gambling page via our main menu at any time.'
    },
    {
        src: '/sfb/footer/18plus.svg',
        alt: '18+',
        width: 52,
        height: 52,
        description:
            'Gambling whilst under the age of 18 is a criminal offence. We take this very seriously, so to use this site and access the gambling sites that we are promoting, you must be aged 18 or over.'
    },
    {
        src: '/sfb/footer/gamcare.svg',
        alt: 'GamCare',
        width: 176,
        height: 50,
        description:
            'GamCare is the leading national provider of information, advice, support and free treatment for anyone affected by problem gambling. You can contact them confidentially via Netline or on Freephone: 0808 8020 133'
    },
    {
        src: '/sfb/footer/gamstop.svg',
        alt: 'GAMSTOP',
        width: 70,
        height: 52,
        description:
            'GAMSTOP is a free service that lets you put controls in place to help restrict your online gambling activities. Sign up to be prevented from using gambling websites and apps run by companies licensed in Great Britain, for a period of your choosing.'
    },
    {
        src: '/sfb/footer/gambleaware.svg',
        alt: 'GambleAware',
        width: 176,
        height: 23,
        description:
            'GambleAware is an independent charity, and a commissioning and grant-making body. They fund research, education and treatment services to help to reduce gambling-related harms in Great Britain.'
    },
    {
        src: '/sfb/footer/gamblingtherapy.svg',
        alt: 'Gambling Therapy',
        width: 137,
        height: 52,
        description:
            'Gambling Therapy are a global online support service, offering advice in multiple languages for people who have been adversely affected by gambling.'
    }
];

const DEFAULT_LEGAL_TEXT =
    "Super Free Bingo is a well established, independent slots comparison site, operated by Little Star Media. To read more about Super Free Bingo, please click here to go to 'About Us' section. Little Star Media Ltd, Exchange House, 450 Midsummer Boulevard, Milton Keynes, MK9 2EA, United Kingdom\n©2026 Super Free Bingo All rights reserved. Unauthorised duplication is a violation of applicable laws.";

export function SfbFooter({
    navLinks = DEFAULT_NAV_LINKS,
    legalText = DEFAULT_LEGAL_TEXT
}: SfbFooterProps): React.ReactElement {
    return (
        <footer className="bg-surface pb-8">
            <div className="border-y border-outline">
                <div className="flex flex-col md:flex-row w-full max-w-[1280px] md:mx-auto">
                    {navLinks.map((link) =>
                        link.href ? (
                            <a
                                key={link.label}
                                href={link.href}
                                className="flex min-h-12 flex-1 items-center justify-center py-2 text-sm leading-5 tracking-[0.25px] text-on-surface-light hover:underline"
                            >
                                {link.label}
                            </a>
                        ) : (
                            <span
                                key={link.label}
                                className="flex min-h-12 flex-1 items-center justify-center py-2 text-sm leading-5 tracking-[0.25px] text-on-surface-light"
                            >
                                {link.label}
                            </span>
                        )
                    )}
                </div>
            </div>

            <div className="w-full max-w-[1280px] mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {RESPONSIBLE_GAMBLING_LOGOS.map((logo) => (
                        <div key={logo.alt} className="flex flex-col items-center gap-2">
                            <div className="flex h-16 items-center justify-center px-8 py-1.5">
                                <Image
                                    src={logo.src}
                                    alt={logo.alt}
                                    width={logo.width}
                                    height={logo.height}
                                    className="object-contain"
                                />
                            </div>
                            <p className="text-[12px] leading-4 tracking-[0.4px] text-on-surface-light text-center">
                                {logo.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="w-full max-w-[1280px] mx-auto px-4 py-4">
                <p className="text-[12px] leading-4 tracking-[0.4px] text-on-surface-light text-center whitespace-pre-line">
                    {legalText}
                </p>
            </div>
        </footer>
    );
}
