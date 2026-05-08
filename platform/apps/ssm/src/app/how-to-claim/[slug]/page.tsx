import type React from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Button } from '@lsm/ui/components/button/button';
import { SignupForm } from '@lsm/ui/components/signup-form/signup-form';
import { SsmFooter } from '@lsm/ui/components/ssm-footer/ssm-footer';
import { USP } from '@lsm/ui/components/usp/usp';
import { WebsiteDirectory } from '@lsm/ui/components/website-directory/website-directory';
import { SsmNav } from '../../../components/ssm-nav';
import { getCasino } from '../../../data/casinos';
import { directorySites, legalText } from '../../../data/site-content';

export default async function HowToClaimPage({
    params
}: {
    params: Promise<{ slug: string }>;
}): Promise<React.ReactElement> {
    const { slug } = await params;
    const casino = getCasino(slug);
    if (casino === undefined) {
        notFound();
    }

    const logoImg = casino.logoSrc ? (
        <Image
            src={casino.logoSrc}
            alt={casino.logoAlt}
            width={224}
            height={120}
            className="max-h-full max-w-full object-contain"
        />
    ) : (
        <div className="w-full h-full bg-disabled-container rounded" />
    );

    const midpoint = Math.ceil((casino.reviewSections?.length ?? 0) / 2);
    const leftSections = casino.reviewSections?.slice(0, midpoint) ?? [];
    const rightSections = casino.reviewSections?.slice(midpoint) ?? [];

    return (
        <main className="flex flex-col w-full bg-surface">
            <div className="w-full max-w-[1440px] mx-auto">
                <SsmNav />
            </div>
            <USP text="OVER 5,000,000 SUBSCRIBERS" />
            <div className="w-full bg-surface-inverse-new">
                <div className="w-full max-w-[1440px] mx-auto">
                    <div className="md:hidden flex flex-col items-center gap-4 p-4">
                        <div className="w-[144px] h-[77px] flex items-center justify-center shrink-0">
                            {logoImg}
                        </div>

                        <h1 className="text-[36px] font-bold leading-[44px] text-on-surface-dark text-center">
                            {casino.offerHeadline}
                        </h1>

                        <div className="flex flex-row flex-wrap gap-2 justify-center">
                            {casino.trustBadges.map((badge, i) => (
                                <span
                                    key={i}
                                    className="rounded-full bg-surface-container-low px-6 py-4 text-[14px] font-medium text-on-surface-dark"
                                >
                                    {badge}
                                </span>
                            ))}
                        </div>

                        <div className="w-full flex flex-col gap-2">
                            {casino.howToSteps.map((step, i) => (
                                <p key={i} className="text-[14px] font-medium text-on-surface-dark">
                                    {step}
                                </p>
                            ))}
                        </div>

                        <a
                            href={casino.ctaHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full"
                        >
                            <Button variant="primary" className="w-full">
                                {casino.ctaText}
                            </Button>
                        </a>
                    </div>
                    <div className="hidden md:flex items-start gap-8 p-16">
                        <div className="flex-1 flex flex-col gap-6">
                            <div className="w-[224px] h-[120px] flex items-center justify-center shrink-0">
                                {logoImg}
                            </div>
                            <h1 className="text-[45px] font-bold leading-[52px] text-on-surface-dark">
                                {casino.offerHeadline}
                            </h1>
                            <div className="flex flex-row flex-wrap gap-2">
                                {casino.trustBadges.map((badge, i) => (
                                    <span
                                        key={i}
                                        className="rounded-full bg-surface-container-low px-6 py-4 text-[14px] font-medium text-on-surface-dark"
                                    >
                                        {badge}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="flex-1 flex flex-col gap-6">
                            {casino.howToSteps.map((step, i) => (
                                <p key={i} className="text-[16px] font-medium text-on-surface-dark">
                                    {step}
                                </p>
                            ))}
                        </div>
                        <a
                            href={casino.ctaHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="shrink-0 self-start"
                        >
                            <Button variant="primary">{casino.ctaText}</Button>
                        </a>
                    </div>
                </div>
            </div>
            <div className="w-full pt-8">
                <div className="md:hidden flex flex-col gap-6 px-4">
                    <p className="text-[14px] text-on-surface-light whitespace-pre-wrap">
                        {casino.reviewBody}
                    </p>

                    <a
                        href={casino.ctaHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full"
                    >
                        <Button variant="primary" className="w-full">
                            {casino.ctaText}
                        </Button>
                    </a>

                    <WebsiteDirectory title="SSM Casino Directory" sites={directorySites} />
                </div>
                <div className="hidden md:flex flex-col gap-6 max-w-[1440px] mx-auto">
                    <div className="flex flex-col gap-6 px-16">
                        {casino.reviewIntro && (
                            <p className="text-base font-bold text-on-surface-light">
                                {casino.reviewIntro}
                            </p>
                        )}

                        {casino.reviewSections && casino.reviewSections.length > 0 && (
                            <div className="grid grid-cols-2 gap-8">
                                <div className="flex flex-col gap-8">
                                    {leftSections.map((section, i) => (
                                        <div key={i} className="flex flex-col gap-2">
                                            <h3 className="text-base font-bold text-tertiary">
                                                {section.heading}
                                            </h3>
                                            <p className="text-[14px] text-on-surface-light">
                                                {section.body}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex flex-col gap-8">
                                    {rightSections.map((section, i) => (
                                        <div key={i} className="flex flex-col gap-2">
                                            <h3 className="text-base font-bold text-tertiary">
                                                {section.heading}
                                            </h3>
                                            <p className="text-[14px] text-on-surface-light">
                                                {section.body}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        <div className="grid grid-cols-2 gap-[10px]">
                            <a
                                href={casino.ctaHref}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block"
                            >
                                <Button variant="primary" className="w-full">
                                    {casino.ctaText}
                                </Button>
                            </a>
                        </div>
                    </div>
                    <div className="flex px-16 py-8">
                        <div className="flex-1">
                            <WebsiteDirectory title="SSM Casino Directory" sites={directorySites} />
                        </div>
                        <div className="flex-1">
                            <SignupForm brandName="Super Spillemaskiner" />
                        </div>
                    </div>
                </div>
            </div>
            <SsmFooter legalText={legalText} />
        </main>
    );
}
