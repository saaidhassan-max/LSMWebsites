import type React from 'react';
import Image from 'next/image';
import type { FooterNavLink, SfbetsFooterProps } from './sfbets-footer.types';

const DEFAULT_NAV_LINKS: FooterNavLink[] = [
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms and Conditions', href: '/terms' },
    { label: 'About Us', href: '/about' },
    { label: 'Contact Us', href: '/contact' }
];

const NJ_DISCLAIMER_LINES = [
    'Super Free Bets and the services we provide are only for those who are at least 21 years of age',
    'Bet with your head, not over it. If you or someone you know has a gambling problem and needs help, call 1-800-GAMBLER',
    'All online casinos featured on Super Free Bets are licensed and regulated by the New Jersey Division of Gaming Enforcement'
];

const NJ_LEGAL_TEXT =
    'Bet with your head, not over it. If you or someone you know has a gambling problem and needs help, call 1-800-GAMBLER (IL/KY/MD/NJ/MI/PA/WV), 1-800-NEXT-STEP (AZ), 1-800-522-4700 (CO), 1-800-9-WITH-IT (IN), 1-800-BETS OFF (IA), 1-800-522-4700 (KS/WY), 1-877-770-STOP (LA), 1-800-327-5050 (MA), 1-888-777-9696 (MS), 1-877-8-HOPENY (NY), 1-800-589-9966 (OH), 1-800-889-9789 (TN) or 1-888-532-3500 (VA), or visit National Council on Problem Gambling.\n\n©2026 Super Free Bets NJ All rights reserved. Unauthorized duplication is a violation of applicable laws.';

export function SfbetsFooter({
    navLinks = DEFAULT_NAV_LINKS,
    legalText = NJ_LEGAL_TEXT
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
                <div className="flex flex-col md:flex-row items-start gap-6 md:gap-8">
                    <div className="flex flex-row items-center gap-4 shrink-0 flex-wrap">
                        <Image
                            src="/sfbets/footer/21+.svg"
                            alt="21+ only"
                            width={52}
                            height={52}
                            className="object-contain"
                        />
                        <Image
                            src="/sfbets/footer/1800gambler.svg"
                            alt="1-800-GAMBLER"
                            width={120}
                            height={52}
                            className="object-contain"
                        />
                        <Image
                            src="/sfbets/footer/rg-nj.png"
                            alt="Responsible Gambling New Jersey"
                            width={52}
                            height={52}
                            className="object-contain"
                        />
                        <Image
                            src="/sfbets/footer/nj-dge.png"
                            alt="New Jersey Division of Gaming Enforcement"
                            width={100}
                            height={52}
                            className="object-contain"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        {NJ_DISCLAIMER_LINES.map((line) => (
                            <p
                                key={line}
                                className="text-[12px] leading-4 tracking-[0.4px] text-on-surface-light"
                            >
                                {line}
                            </p>
                        ))}
                    </div>
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
