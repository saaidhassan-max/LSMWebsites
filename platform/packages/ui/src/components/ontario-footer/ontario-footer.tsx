import type React from 'react';
import Image from 'next/image';
import type { OntarioFooterNavLink, OntarioFooterProps } from './ontario-footer.types';

const DEFAULT_NAV_LINKS: OntarioFooterNavLink[] = [
    { label: 'Terms & Conditions', href: '/terms' },
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'About Us', href: '/about' },
    { label: 'Contact Us', href: '/contact' }
];

interface RgSection {
    logoSrc: string;
    logoAlt: string;
    logoWidth: number;
    logoHeight: number;
    body: string;
    href: string;
    external: boolean;
}

const RG_SECTIONS: RgSection[] = [
    {
        logoSrc: '/ontario/footer/19plus.png',
        logoAlt: '19+',
        logoWidth: 32,
        logoHeight: 32,
        body: 'Good.Choice Ontario and the services we provide are only for those who are at least 19 years of age.',
        href: '/safer-gambling',
        external: false
    },
    {
        logoSrc: '/ontario/footer/igamingontario.png',
        logoAlt: 'iGaming Ontario',
        logoWidth: 95,
        logoHeight: 32,
        body: 'iGaming Ontario (iGO) works with the AGCO and the Government of Ontario to establish an online gaming market that helps protect consumers gambling through private gaming companies.',
        href: 'https://igamingontario.ca/en',
        external: true
    },
    {
        logoSrc: '/ontario/footer/connex.png',
        logoAlt: 'ConnexOntario',
        logoWidth: 120,
        logoHeight: 32,
        body: 'ConnexOntario offers free, confidential information on health services for those facing issues with alcohol, drugs, mental illness, or gambling. You can access their support 24/7 via text, live chat, email or toll-free helpline: 1-866-531-2600.',
        href: 'https://connexontario.ca/154&m=dev',
        external: true
    },
    {
        logoSrc: '/ontario/footer/keepitfun.png',
        logoAlt: 'Keep It Fun',
        logoWidth: 112,
        logoHeight: 32,
        body: 'We want your online gaming experience to be an enjoyable one, and that means enabling you to stay in control of your play. For more information, help, and advice, you can visit our Safer Gambling page via our main menu at any time.',
        href: '/safer-gambling',
        external: false
    }
];

const COPYRIGHT = '©2026 Good.Choice All rights reserved. Unauthorized duplication is a violation of applicable laws.';

export function OntarioFooter({
    navLinks = DEFAULT_NAV_LINKS
}: OntarioFooterProps): React.ReactElement {
    return (
        <footer className="w-full bg-tertiary">
            <div className="bg-tertiary-hover border border-outline">
                <div className="flex flex-col md:flex-row w-full max-w-[1280px] md:mx-auto md:justify-between py-2 md:py-0">
                    {navLinks.map((link) =>
                        link.href !== undefined ? (
                            <a
                                key={link.label}
                                href={link.href}
                                className="flex min-h-10 flex-1 items-center justify-center py-1 md:py-4 text-sm leading-5 tracking-[0.25px] text-on-surface-dark hover:underline"
                            >
                                {link.label}
                            </a>
                        ) : (
                            <span
                                key={link.label}
                                className="flex min-h-10 flex-1 items-center justify-center py-1 md:py-4 text-sm leading-5 tracking-[0.25px] text-on-surface-dark"
                            >
                                {link.label}
                            </span>
                        )
                    )}
                </div>
            </div>

            <div className="w-full max-w-[1280px] mx-auto px-4 py-4 md:py-8">
                <div className="flex flex-col md:flex-row gap-8">
                    {RG_SECTIONS.map((section) => (
                        <div key={section.logoAlt} className="flex flex-col items-center gap-2 md:flex-1">
                            <a
                                href={section.href}
                                target={section.external ? '_blank' : undefined}
                                rel={section.external ? 'noopener noreferrer' : undefined}
                                className="flex h-8 items-center justify-center px-1"
                            >
                                <Image
                                    src={section.logoSrc}
                                    alt={section.logoAlt}
                                    width={section.logoWidth}
                                    height={section.logoHeight}
                                    className="object-contain"
                                />
                            </a>
                            <p className="text-[12px] leading-4 tracking-[0.4px] text-on-surface-dark text-center">
                                {section.body}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="w-full max-w-[610px] mx-auto px-4 pt-4 pb-4 md:pb-8">
                <p className="text-[12px] leading-4 tracking-[0.4px] text-on-surface-dark text-center">
                    {COPYRIGHT}
                </p>
            </div>
        </footer>
    );
}
