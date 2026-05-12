import type React from 'react';
import Image from 'next/image';
import type { FooterNavLink, ResponsibleGamblingLogo, SsmFooterProps } from './ssm-footer.types';

const DEFAULT_NAV_LINKS: FooterNavLink[] = [
    { label: 'Privatlivspolitik' },
    { label: 'Regler og vilkår' },
    { label: 'Om Os' },
    { label: 'Kontakt Os' }
];

const RESPONSIBLE_GAMBLING_LOGOS: ResponsibleGamblingLogo[] = [
    {
        src: '/ssm/footer/ssm-rofus.png',
        alt: 'ROFUS',
        description:
            'ROFUS er Spillemyndighedens Register Over Frivilligt Udelukkede Spillere. I ROFUS kan du frivilligt registrere dig med MitID, hvis du ønsker at udelukke dig midlertidigt eller endeligt fra at kunne spille i Danmark.'
    },
    {
        src: '/ssm/footer/ssm-+18.png',
        alt: '18+',
        description:
            'Du skal være fyldt 18 år for at kunne spille casino og andre pengespil i Danmark.'
    },
    {
        src: '/ssm/footer/smm-ludomani.png',
        alt: 'Ludomani',
        description:
            'Spil skal være sjovt. Kontakt Center for Ludomani, hvis det i stedet er et problem.'
    },
    {
        src: '/ssm/footer/SSM-stopspillet.png',
        alt: 'StopSpillet',
        description:
            'StopSpillet er Spillemyndighedens uvildige hjælpelinje om spilafhængighed; i daglig tale kaldet ludomani.'
    }
];

const DEFAULT_LEGAL_TEXT =
    'Det danske Center for Ludomani er en organisation, som yder fortrolig telefonisk støtte og rådgivning til enhver, som er påvirket af ludomani.\nHjemmeside: http://www.ludomani.dk Telefonnummer: +45 70 11 18 10\nLittle Star Media Ltd, Exchange House, 450 Midsummer Boulevard, Milton Keynes, MK9 2EA, United Kingdom\n©2026 Super Spillemaskiner Alle rettigheder forbeholdes. Uautoriseret kopiering er en overtrædelse af alle gældende love om ophavsret.';

export function SsmFooter({
    navLinks = DEFAULT_NAV_LINKS,
    legalText = DEFAULT_LEGAL_TEXT
}: SsmFooterProps): React.ReactElement {
    return (
        <footer className="bg-surface pb-8">
            <div className="border-y border-outline">
                <div className="flex flex-col md:flex-row md:justify-center md:max-w-[1280px] md:mx-auto">
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

            <div className="flex flex-col md:flex-row gap-8 py-8 px-4 max-w-[1280px] mx-auto">
                {RESPONSIBLE_GAMBLING_LOGOS.map((logo) => (
                    <div key={logo.alt} className="flex flex-col items-center gap-2 flex-1">
                        <Image
                            src={logo.src}
                            alt={logo.alt}
                            width={240}
                            height={64}
                            className="object-contain"
                        />
                        <p className="text-[12px] leading-4 tracking-[0.4px] text-on-surface-light text-center">
                            {logo.description}
                        </p>
                    </div>
                ))}
            </div>

            <div className="px-4 py-4 max-w-[1280px] mx-auto">
                <p className="text-[12px] leading-4 tracking-[0.4px] text-on-surface-light text-center whitespace-pre-line">
                    {legalText}
                </p>
            </div>
        </footer>
    );
}
