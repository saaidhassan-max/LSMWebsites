import type React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import { Button } from '@lsm/ui/components/button/button';
import { LegalText } from '@lsm/ui/components/legal-text/legal-text';
import { SfsgFooter } from '@lsm/ui/components/sfsg-footer/sfsg-footer';
import { USP } from '@lsm/ui/components/usp/usp';
import { SfsgNav } from '../../components/sfsg-nav';
import { saferGamblingContent as content } from '../../data/safer-gambling-content';
import { legalText } from '../../data/site-content';

export const metadata: Metadata = {
    title: 'Safer Gambling | Super Free Slot Games',
    description: 'Safer gambling tips, tools, and support resources from Super Free Slot Games.'
};

interface RgLogo {
    src: string;
    alt: string;
    width: number;
    height: number;
}

const RESPONSIBLE_GAMBLING_LOGOS: RgLogo[] = [
    { src: '/sfsg/footer/keepitfun.svg', alt: 'Keep It Fun', width: 176, height: 39 },
    { src: '/sfsg/footer/18plus.svg', alt: '18+', width: 52, height: 52 },
    { src: '/sfsg/footer/gamcare.svg', alt: 'GamCare', width: 176, height: 50 },
    { src: '/sfsg/footer/gamstop.svg', alt: 'GAMSTOP', width: 70, height: 52 },
    { src: '/sfsg/footer/gambleaware.svg', alt: 'GambleAware', width: 176, height: 23 },
    { src: '/sfsg/footer/gamblingtherapy.svg', alt: 'Gambling Therapy', width: 137, height: 52 }
];

export default function SaferGamblingPage(): React.ReactElement {
    return (
        <main className="flex flex-col w-full bg-surface">
            <SfsgNav />
            <USP text="SAME DEALS, NEW DIGS. WELCOME BACK. 🏠" variant="slots" />

            <div className="w-full max-w-[1440px] mx-auto px-4 py-8 md:px-16 md:py-12 flex flex-col gap-8">
                <div className="py-3">
                    <h1 className="text-[32px] font-bold leading-[40px] text-tertiary md:text-[45px] md:leading-[52px]">
                        {content.title}
                    </h1>
                </div>

                <div className="flex flex-col md:flex-row md:gap-8">
                    <div className="flex-1 min-w-0 flex flex-col gap-5 text-[14px] md:text-base leading-5 md:leading-6 tracking-[0.25px] text-on-surface-light">
                        {content.introParagraphs.map((paragraph, i) => (
                            <LegalText key={i} segments={paragraph} />
                        ))}
                    </div>
                    <div className="flex flex-col gap-4 md:gap-6 p-[10px] shrink-0 mt-4 md:mt-0 md:w-[303px]">
                        {content.keyMessages.map((message) => (
                            <p key={message} className="font-bold md:font-medium text-on-surface-light">
                                {message}
                            </p>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
                    {RESPONSIBLE_GAMBLING_LOGOS.map((logo) => (
                        <div key={logo.alt} className="flex items-center justify-center h-16 px-8 py-1.5">
                            <Image
                                src={logo.src}
                                alt={logo.alt}
                                width={logo.width}
                                height={logo.height}
                                className="object-contain max-h-full w-auto"
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className="w-full max-w-[1440px] mx-auto px-4 md:px-14 pb-12 flex flex-col gap-8">

                <div className="flex flex-col gap-8 py-6">
                    <h2 className="text-[22px] font-medium leading-7 md:text-[32px] md:font-bold md:leading-10 text-on-surface-light">
                        {content.tipsTitle}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {content.tips.map((tip, i) => (
                            <div key={i} className="flex flex-col gap-2 p-4 bg-on-surface-light rounded-2xl">
                                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-on-surface-dark shrink-0">
                                    <span className="text-[28px] font-normal leading-none text-tertiary">
                                        {i + 1}
                                    </span>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <p className="text-base font-bold text-on-surface-dark">
                                        {tip.heading}
                                    </p>
                                    <p className="text-[14px] leading-5 tracking-[0.25px] text-on-surface-dark">
                                        {tip.body}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-4 md:max-w-[648px]">
                    <h2 className="text-[22px] font-medium leading-7 text-tertiary">
                        Self-Assessment:
                    </h2>
                    <LegalText
                        segments={content.selfAssessment}
                        className="text-[14px] md:text-base leading-5 md:leading-6 tracking-[0.25px] text-on-surface-light"
                    />
                    <a href={content.selfAssessmentHref} target="_blank" rel="noopener noreferrer" className="block">
                        <Button variant="tertiary" className="w-full">
                            TAKE TEST ➜
                        </Button>
                    </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-4 bg-outline rounded-lg p-3">
                        <h3 className="text-[22px] font-medium leading-7 text-on-surface-light">
                            🚫 Unsubscribe From Our Emails / SMS Updates:
                        </h3>
                        <div className="flex flex-col gap-4 text-[14px] leading-5 tracking-[0.25px] text-on-surface-light">
                            {content.unsubscribeParagraphs.map((paragraph, i) => (
                                <LegalText key={i} segments={paragraph} />
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 bg-outline rounded-lg p-3">
                        <h3 className="text-[22px] font-medium leading-7 text-on-surface-light">
                            🚫 Limit Our Social Media Ads:
                        </h3>
                        <div className="flex flex-col gap-4 text-[14px] leading-5 tracking-[0.25px] text-on-surface-light">
                            {content.socialMediaParagraphs.map((paragraph, i) => (
                                <LegalText key={i} segments={paragraph} />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-4 bg-outline rounded-lg p-3">
                        <h3 className="text-[22px] font-medium leading-7 text-on-surface-light">
                            🚫 Block Access to Online Gambling:
                        </h3>
                        <LegalText
                            segments={content.blockAccess}
                            className="text-[14px] leading-5 tracking-[0.25px] text-on-surface-light"
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {content.blockAccessLinks.map((link) => (
                                <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="block">
                                    <Button variant="primary" className="w-full">
                                        {link.label}
                                    </Button>
                                </a>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 bg-outline rounded-lg p-3">
                        <h3 className="text-[22px] font-medium leading-7 text-on-surface-light">
                            🚫 Block Gambling Transactions:
                        </h3>
                        <LegalText
                            segments={content.blockTransactions}
                            className="text-[14px] leading-5 tracking-[0.25px] text-on-surface-light"
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-4 bg-outline rounded-lg p-4">
                    <div className="flex items-center gap-4">
                        <ExternalLink className="w-6 h-6 text-on-surface-light shrink-0" />
                        <h2 className="text-[22px] font-medium leading-7 text-on-surface-light">
                            External Support
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {content.externalSupport.map((org, i) => (
                            <div
                                key={i}
                                className="flex flex-col gap-4 pb-6 border-b border-on-surface-light last:border-b-0 last:pb-0"
                            >
                                <p className="text-base font-bold text-on-surface-light">
                                    {org.title}
                                </p>
                                <LegalText
                                    segments={org.links}
                                    className="text-base font-medium text-on-surface-light"
                                />
                                <p className="text-[14px] leading-5 tracking-[0.25px] text-on-surface-light">
                                    {org.body}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <SfsgFooter legalText={legalText} />
        </main>
    );
}
