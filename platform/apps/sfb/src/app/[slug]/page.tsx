import type React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SignupForm } from '@lsm/ui/components/signup-form/signup-form';
import { TopTCs } from '@lsm/ui/components/top-tcs/top-tcs';
import { USP } from '@lsm/ui/components/usp/usp';
import { WebsiteDirectory } from '@lsm/ui/components/website-directory/website-directory';
import { WelcomeBanner } from '@lsm/ui/components/welcome-banner/welcome-banner';
import { SfbFooter } from '@lsm/ui/components/sfb-footer/sfb-footer';
import { SfbNav } from '../../components/sfb-nav';
import { getCmsSitePage, getCmsSiteSettings } from '../../data/cms-content';
import type { CmsSitePageSection } from '../../data/cms-content.types';

export async function generateMetadata({
    params
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const page = await getCmsSitePage(slug);
    return { title: page === null ? 'Super Free Bingo' : page.name + ' — Super Free Bingo' };
}

function renderSection(section: CmsSitePageSection): React.ReactElement {
    const content = section.content;

    if (section.type === 'welcome') {
        const suffix = content.textSuffix ?? '';
        return (
            <WelcomeBanner
                key={section.id}
                textHighlight={content.textHighlight ?? 'TOP'}
                text={content.text ?? ' BINGO DEALS 2026'}
                textSuffix={suffix === '' ? undefined : suffix}
                features={content.features ?? ['⭐ Super Offers', '✅ Super Simple', '🛡️ Super Secure']}
                imageLeftSrc={content.imageLeftSrc ?? '/sfb/welcome-images/image-left.png'}
                imageRightSrc={content.imageRightSrc ?? '/sfb/welcome-images/image-right.png'}
            />
        );
    }
    if (section.type === 'terms') {
        return (
            <TopTCs
                key={section.id}
                text={
                    content.text ??
                    'Special terms apply – including age verification. Click "How To Claim" for full details.'
                }
            />
        );
    }
    if (section.type === 'richText') {
        return (
            <div
                key={section.id}
                className="w-full max-w-[960px] mx-auto px-4 py-6 flex flex-col gap-3"
            >
                <h2 className="text-[24px] md:text-[32px] font-bold text-on-surface-light">
                    {content.heading ?? ''}
                </h2>
                <p className="text-[14px] md:text-base text-on-surface-light whitespace-pre-wrap leading-6">
                    {content.body ?? ''}
                </p>
            </div>
        );
    }
    if (section.type === 'signup') {
        return (
            <div key={section.id} className="w-full max-w-[720px] mx-auto p-4 flex flex-col gap-4">
                {content.heading !== undefined && content.heading !== '' && (
                    <h2 className="text-[22px] md:text-[28px] font-bold text-on-surface-light text-center">
                        {content.heading}
                    </h2>
                )}
                <SignupForm
                    variant="sfb-sfsg"
                    brandName="Super Free Bingo"
                    privacyPolicyUrl="/privacy-policy"
                    termsUrl="/terms"
                />
            </div>
        );
    }
    return (
        <WebsiteDirectory key={section.id} title={content.title ?? 'Super Free Bingo Directory'} sites={[]} splitAtDot />
    );
}

export default async function CmsSitePageRoute({
    params
}: {
    params: Promise<{ slug: string }>;
}): Promise<React.ReactElement> {
    const { slug } = await params;
    const [page, settings] = await Promise.all([getCmsSitePage(slug), getCmsSiteSettings()]);
    if (page === null) notFound();

    function renderConfiguredSection(section: CmsSitePageSection): React.ReactElement {
        if (section.type !== 'directory') return renderSection(section);
        return (
            <WebsiteDirectory
                key={section.id}
                title={section.content.title ?? settings.directoryTitle}
                sites={settings.directorySites}
                splitAtDot
            />
        );
    }

    return (
        <main className="flex flex-col w-full bg-surface min-h-screen">
            <SfbNav items={settings.navItems} />
            <USP text={settings.uspText} />
            {page.sections.map(renderConfiguredSection)}
            <SfbFooter legalText={settings.footerLegalText} />
        </main>
    );
}
