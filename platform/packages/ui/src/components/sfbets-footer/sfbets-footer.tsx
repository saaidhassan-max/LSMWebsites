import type React from 'react';
import Image from 'next/image';
import type { FooterNavLink, ResponsibleGamblingLogo, SfbetsFooterProps } from './sfbets-footer.types';

const DEFAULT_NAV_LINKS: FooterNavLink[] = [
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms and Conditions', href: '/terms' },
    { label: 'About Us', href: '/about' },
    { label: 'Contact Us', href: '/contact' }
];

const RESPONSIBLE_GAMBLING_LOGOS: ResponsibleGamblingLogo[] = [
    {
        src: '/sfbets/footer/21+.svg',
        alt: '21+',
        width: 52,
        height: 52,
        description:
            'Super Free Bets and the services we provide are only for those who are at least 21 years of age'
    },
    {
        src: '/sfbets/footer/nj-dge.png',
        alt: 'New Jersey Division of Gaming Enforcement',
        width: 100,
        height: 52,
        description:
            'All online casinos featured on Super Free Bets are licensed and regulated by the New Jersey Division of Gaming Enforcement'
    },
    {
        src: '/sfbets/footer/rg-nj.png',
        alt: 'Responsible Gambling New Jersey',
        width: 52,
        height: 52,
        description:
            'If you or someone you know has a gambling problem and wants help, call: 1-800-GAMBLER'
    }
];

const DEFAULT_LEGAL_TEXT =
    'Bet with your head, not over it. If you or someone you know has a gambling problem and needs help, call 1-800-GAMBLER (IL/KY/MD/NJ/MI/PA/WV), 1-800-NEXT-STEP (AZ), 1-800-522-4700 (CO), 1-800-9-WITH-IT (IN), 1-800-BETS OFF (IA), 1-800-522-4700 (KS/WY), 1-877-770-STOP (LA), 1-800-327-5050 (MA), 1-888-777-9696 (MS), 1-877-8-HOPENY (NY), 1-800-589-9966 (OH), 1-800-889-9789 (TN) or 1-888-532-3500 (VA), or visit National Council on Problem Gambling.\n\n©2026 Super Free Bets NJ All rights reserved. Unauthorized duplication is a violation of applicable laws.';

export function SfbetsFooter({
    navLinks = DEFAULT_NAV_LINKS,
    legalText = DEFAULT_LEGAL_TEXT
}: SfbetsFooterProps): React.ReactElement {
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
